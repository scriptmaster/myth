import { colors } from "https://deno.land/x/cliffy@v0.24.2/ansi/colors.ts";
import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";
import * as path from "https://deno.land/std@0.147.0/path/mod.ts";
import { existsSync } from "https://deno.land/std@0.63.0/fs/exists.ts";
import { ensureDirSync } from "https://deno.land/std/fs/mod.ts";
import { parse as parseYaml } from "https://deno.land/std@0.63.0/encoding/yaml.ts";

import { readableStreamFromReader, writableStreamFromWriter, } from "https://deno.land/std@0.148.0/streams/conversion.ts";
import { mergeReadableStreams } from "https://deno.land/std@0.148.0/streams/merge.ts";

export async function buildAndroid(srcDir: string, keyStoreFile: string, storepass: string) {
    try {
        const buildDir = path.join(srcDir, '.build');
        ensureDirSync(buildDir);
        const paddleYml = 'paddle.yml';

        console.log(colors.brightBlue(`Starting android build: ${paddleYml}`), buildDir);
        const buildStart = new Date().getTime();

        const yaml = Deno.readTextFileSync(path.join(srcDir, paddleYml));
        const config: AndroidBuildConfig = await parseYaml(yaml) as AndroidBuildConfig;

        if(!config.src_dir) config.src_dir = srcDir;
        if(!config.build_dir) config.build_dir = buildDir;
        const sh = new AndroidBuildShell(config);

        // sh.srcDir = srcDir;
        // sh.buildDir = buildDir;

        // console.log(Deno.env.toObject());

        // sh.exec('echo', ['hi']);
        // await exec('echo Hi there');
        // sh.devices();
        // sh.aapt(['version']);
        await sh.generateResources();

        const compilationStatus = await sh.compileClasses('obj/');
        if(!compilationStatus) return console.log(colors.red('Please correct the above code errors and retry android build.'));

        await sh.outputClassesDex('obj/');

        await sh.addDexToApk('classes.dex');

        // await sh.downloadDeps('deps.txt');
        await sh.downloadDeps();

        await sh.alignApk();

        await sh.checkOrCreateKeyStore(keyStoreFile); // android-myth
        await sh.jarsigner(sh.APK_NAME, keyStoreFile, storepass);
        await sh.checkApk();
        // Congrats :) 
        //******************************************************
        console.log('Built within '+(Math.ceil(new Date().getTime() - buildStart) / 1000)+' seconds '+String.fromCodePoint(0x1F44F));
        //******************************************************
        //******************************************************

        
        await sh.checkAdbInstall();

    } catch(e) {
        console.error(e);
    }
}

// function ensuredirInCwd(dir: string) { try { ensureDirSync(dir); } catch(e) { if(e.code != "EEXIST") { throw e; } } return dir; };
function getSourceFiles(dir: string, filter = /\.java$/) {
    const files: string[] = [];
    for (const entry of Deno.readDirSync(dir)) {
        if(entry.isDirectory) files.push(...getSourceFiles(path.join(dir, entry.name), filter));
        else if (entry.isFile) filter.test(entry.name) && files.push(path.join(dir,entry.name));
        else console.log('Ignoring:', entry.name, entry);
    }
    return files;
}


interface AndroidBuildConfig {
    apk_name: string;
    deps: string[];

    src_dir: string;
    build_dir: string;
    // deps_test: string[];
}

class AndroidBuildShell {
    ANDROID_SDK:        string;
    BUILD_TOOLS_VERSION:string = '30.0.3';
    PLATFORM_VERSION:   string = 'android-32';
    BUILD_TOOLS:        string = '';
    PLATFORM_PATH:      string = '';
    PLATFORM_TOOLS:     string = '';
    TOOLS:              string = '';
    TOOLS_BIN:          string = '';

    srcDir:             string = '';
    buildDir:           string = '';

    BUILD_PATH  = '';
    // PATH_DX  = 'dx';
    D8     = 'd8';
    // ENV_PATH_SEP    = ':'; // *nix, for windows it is ;
    ANDROID_JAR = '';

    UNALIGNED_NAME = 'unaligned.apk';
    APK_NAME = '';

    //DEX_DIR = 'bin';
    isWindows = Deno.build.os == 'windows';

    config: AndroidBuildConfig;

    constructor(buildConfig: AndroidBuildConfig) {
        this.config = buildConfig;

        this.srcDir = buildConfig.src_dir;
        this.buildDir = buildConfig.build_dir;
        this.APK_NAME = (buildConfig.apk_name || 'signed') + '.apk';

        this.ANDROID_SDK = Deno.env.get("ANDROID_SDK") || '';
        if(!this.ANDROID_SDK) throw 'Please set ANDROID_SDK in path and retry build';

        const PATH = Deno.env.get('PATH') || '';
        const JAVA_HOME = Deno.env.get('JAVA_HOME') || '';

        if(this.isWindows) this.D8 = 'd8.bat';

        this.BUILD_TOOLS    = path.join(this.ANDROID_SDK, 'build-tools', this.BUILD_TOOLS_VERSION);
        this.BUILD_PATH     = this.BUILD_TOOLS + path.delimiter + path.join(JAVA_HOME, 'bin');
        this.PLATFORM_PATH  = path.join(this.ANDROID_SDK, 'platforms', this.PLATFORM_VERSION);
        this.PLATFORM_TOOLS = path.join(this.ANDROID_SDK, 'platforms-tools');
        this.ANDROID_JAR    = path.join(this.PLATFORM_PATH, 'android.jar');

        // console.log('BUILD_TOOLS: ', this.BUILD_TOOLS);

        console.log(colors.gray('ANDROID_SDK='+this.ANDROID_SDK));
        console.log(`BUILD_TOOLS_VERSION: ${colors.yellow(this.BUILD_TOOLS_VERSION)}, PLATFORM_VERSION: ${colors.yellow(this.PLATFORM_VERSION)}`);
        //console.log(colors.yellow('BUILD_TOOLS='+this.BUILD_TOOLS));
        //console.log(colors.yellow('PLATFORM_PATH='+this.PLATFORM_PATH));

        // this.APK_NAME = 'release.apk';
    }

    ensuredir(dir: string) { try { ensureDirSync(path.join(this.buildDir, dir)); } catch(e) { if(e.code != "EEXIST") { throw e; } } return dir; };

    async generateResources() {
        //$ aapt package -m -J gen/ -M ./AndroidManifest.xml -S res1/ -S res2 ... -I android.jar
        const generated = 'gen/';
        const genPath = path.join(this.buildDir, generated);

        if(existsSync(genPath)) Deno.removeSync(genPath, { recursive: true });
        this.ensuredir(generated);

        // const resourcesDir = path.relative(this.buildDir, path.join(this.srcDir, 'res'));
        const relativePath = path.relative(this.buildDir, this.srcDir);
        // console.log(relativePath, path.join(relativePath, 'AndroidManifest.xml'), path.join(relativePath, 'res'));

        const unalignedFilePath = path.join(this.buildDir, this.UNALIGNED_NAME);
        if(existsSync(unalignedFilePath)) Deno.removeSync(unalignedFilePath, { recursive: true });

        var p = [];
        p.push('package');
        p.push('-m');
        p.push('-J', generated);
        p.push('-M', path.join(relativePath, 'AndroidManifest.xml'));
        p.push('-S', path.join(relativePath, 'res/'));
        // p.push('-S', 'res2/');
        p.push('-I', this.ANDROID_JAR);

        // aapt package -m -J gen/ -M ./AndroidManifest.xml -S res/ -I android.jar -F bin/resources.ap_
        // p.push('-F', 'bin/resources.ap_');
        p.push('-F', this.UNALIGNED_NAME);

        await this.aapt(p);
        // console.log(await this.aapt(['list', this.UNALIGNED_NAME]));
    }

    async addDexToApk(dexFile: string) {
        //$ aapt add 
        const dexFilePath = path.join(this.buildDir, dexFile); // Add any relative paths
        const dexCwd = path.dirname(dexFilePath);
        const unalignedFilePath = path.join(this.buildDir, this.UNALIGNED_NAME);
        const unalignedFile = path.relative(dexCwd, unalignedFilePath);

        // console.log(dexCwd, this.cwd, unalignedFile, dexFilePath);

        await this.aapt([
            'add', unalignedFile, path.basename(dexFile)
        ], '');
        // console.log(await this.aapt(['list', this.UNALIGNED_NAME]));
    }

    cacheDir = '.cache/';
    async downloadDeps() {   // depsFile: string = 'deps') {
        // const depsPath = path.join(this.srcDir, depsFile);
        // const depsList = Deno.readTextFileSync(depsPath).split(this.isWindows? '\r\n': '\n');
        const depsList = this.config.deps || [];
        if(!depsList.length) return;

        const cacheDir = path.join(this.buildDir, this.cacheDir);
        ensureDirSync(cacheDir);

        for (const dep of depsList) {
            if (!dep || !/\w+\:/.test(dep)) continue;
            const [ lib, name, version ] = dep.replace(/ /g, ':').split(':');
            if (existsSync(path.join(cacheDir, `${name}-${version}.aar`)) || existsSync(path.join(cacheDir, `${name}-${version}.jar`))) continue

            console.log(colors.magenta(`Downloading ${name}-${version} from package ${lib}`));
            //const match = dep.match(/(implementation)?\s+\'?(\w+[\: ]\w+[\: ]\'?)
            await this.downloadFromMavenRepo(lib, name, version, cacheDir);
        }
    }

    // "https://dl.google.com/dl/android/maven2"
    // "https://maven.google.com"
    mavenRepoUrl = "https://dl.google.com/dl/android/maven2";
    async downloadFromMavenRepo(lib: string, name: string, version: string, toDir: string) {
        
        const urlPrefix = `${this.mavenRepoUrl}/${lib.replace(/\./g, '/')}/${name}/${version}/${name}-${version}`;

        if (await this.downloadFile(urlPrefix + '.aar', toDir)) return true;

        console.error(colors.gray(`Could not download ${urlPrefix}.aar   Trying for .jar`));
        if (await this.downloadFile(urlPrefix + '.jar', toDir)) return true;

        console.error(colors.red(`Could not download ${urlPrefix}.aar or .jar`));
        return false;
    }

    async downloadFile(url: string, dir: string) {
        try {
            const name = path.basename(url);
            const filePath = path.join(dir, name);

            const res = await fetch(url);

            if (!res.ok) return false;

            const file = await Deno.open(filePath, { create: true, write: true });

            await res.body?.pipeTo(file.writable);

            try { file.close(); } catch(e) { }
            // try { Deno.writeTextFileSync(path.join(dir, 'downloads.log'), `[${new Date().toLocaleString()}] ${url}\n`, { append: true }) } catch(e) { }
        } catch(e) {
            console.error('downloadFileToCache: ', e);
            return false;
        }
        return true;
    }

    async checkOrCreateKeyStore(keyStoreFile: string) {
        const keyStoreDir = path.dirname(keyStoreFile);
        if(!existsSync(keyStoreDir)) ensureDirSync(keyStoreDir);
        if(!existsSync(keyStoreFile)) {
            const name = path.basename(keyStoreFile);
            // %JAVABIN%\keytool  -genkey -v -keystore  my-release-key.keystore -alias alias_name  -keyalg RSA -keysize 2048  -validity 10000
            const cmd = [
                'keytool',
                '-genkey', '-v',
                '-keystore', name, // 'android-myth.keystore',
                '-alias', name, // 'android-myth',
                '-keyalg', 'RSA',
                '-keysize', '2048',
                '-validity', '10000',
            ];
            console.log(cmd.join(' '));
            throw new Error('Ensure the keystore password and common name prompts are checked and created by you with above command');

            console.log(this.run(cmd, {
                cwd: keyStoreDir,
                // PATH: this.BUILD_PATH
            }));
        }
    }

    async alignApk() {
        await this.zipalign(this.UNALIGNED_NAME, this.APK_NAME);
    }

    async checkAdbInstall() {
        // const adbInstall = confirm("Skip adb install?");
        // if(!adbInstall) return;

        const devices = await this.adb('devices');
        // console.log(devices.output);

        if (devices.output) {
            const [header, firstDevice] = devices.output.split('\n');
            if(firstDevice) {
                console.log(`adb device found: ${firstDevice}`);
                const [match, device] = firstDevice.match(/^(\S+)\s/);
                // console.log(`adb -s ${device} install`);
                console.log(colors.blue((await this.adb(`-s ${device} install ${this.APK_NAME}`)).output));
            }
        }
    }

    async checkApk() {
        const apk = path.join(this.buildDir, this.APK_NAME);
        if(existsSync(apk)) {
            const stat = await Deno.stat(apk);
            // console.log(String.fromCodePoint(0x1F44B) colors.green("APK BUILT: "+this.APK_NAME));
            const party = String.fromCodePoint(0x1f389);
            const gift = String.fromCodePoint(0x1f381);
            console.log(party, colors.green("APK BUILT: "+this.APK_NAME), gift, Math.round(stat.size / 1024)+'KB');
        } else {
            console.error(colors.red(apk));
        }
    }

    async jarsigner(file: string, keyStoreFile: string, storepass: string) {
        const keyStoreDir = path.dirname(keyStoreFile);
        const name = path.basename(keyStoreFile);
        const cmd = [
            'jarsigner',
            '-keystore', name,
            '-storepass', storepass,
            path.relative(keyStoreDir, path.join(this.buildDir, file)),
            name
        ];
        // console.log(cmd.join(' '));
        await this.run(cmd, {
            cwd: keyStoreDir
        });
    }

    async compileClasses(output: string) {
        // ensuredir(path.join(this.cwd, 'bin/'));
        this.ensuredir(output);

        const sourceFiles = getSourceFiles(this.srcDir, /\.java$/).map(f => path.relative(this.buildDir, f));
        // console.log('sourceFiles:', sourceFiles);

        const jars = [
            this.ANDROID_JAR
        ];
        // converted .jars (from extracted classes.jar and rewritten R.java values)
        // jars.push(path.join(this.buildDir, '.cache/jars/appcompat-1.4.1.jar'))

        const compilation = await this.javac([
            '-classpath', jars.join(this.isWindows? ';': ':'),
            // '-sourcepath', sourcepath, // 'gen;java'
            '-d', output,
            //'-target', '1.7',
            //'-source', '1.7',
            // 'gen\\com\\msheriff\\kingdom\\R.java',
            // 'java/com/msheriff/kingdom/MainActivity.java',
            ...sourceFiles
        ]);

        return compilation.status;
    }

    async outputClassesDex(input: string) {
        // $(DX) --dex --output=classes.dex bin
        // https://r8.googlesource.com/r8
        // $(D8) --output classes.dex input-file1 input-file2
        // this.ensuredir(this.DEX_DIR);

        const classFiles = getSourceFiles(path.join(this.buildDir, input), /\.class$/).map(f => path.relative(this.buildDir, f));
        // console.log(classFiles);

        await this.d8([
            '--output', '.', // this.DEX_DIR,
            // 'bin\\com\\msheriff\\kingdom\\*.class'
            ...classFiles
        ]);
    }

    // DONT DO THIS - THIS PROCESS IS WAAAYYYY TOO SLOW //
    async jar_dex_move(input: string, name: string) {
        // jar_dex_move('obj', 'libs_r');
        // ensureDirSync(this.DEX_DIR);
        // jar: $CMD_JAR --create --file bin/libs_r.jar -C 'obj/' .
        // dexes should be added to root in apk: // await this.jar(`--create --file ${this.DEX_DIR}/${name}.jar -C ${input} .`.split(' '));
        await this.jar(`--create --file ${name}.jar -C ${input} .`.split(' '));
        // dex: $CMD_D8 --intermediate lib/libs.jar --classpath $PLATFORM_DIR/android.jar --output lib/
        // dexes should be added to root in apk: // await this.d8(`--intermediate ${this.DEX_DIR}/${name}.jar --classpath ${this.ANDROID_JAR} --output ${this.DEX_DIR}/`.split(' '));
        await this.d8(`--intermediate ${name}.jar --classpath ${this.ANDROID_JAR} --output .`.split(' '));
        // rename: mv 
        // this.rename(this.DEX_DIR+'/classes.dex', this.DEX_DIR+'/'+name+'.dex');
        this.rename('classes.dex', name+'.dex');
    }

    rename(oldir: string, newdir: string) { return Deno.renameSync(path.join(this.buildDir, oldir), path.join(this.buildDir, newdir)); }

    devices() { return this.adb('devices'); }

    async aapt(commands: string[], cwd: string = '') {
        return `aapt ${commands[0]}:\n` + (await this.run(['aapt', ...commands], {PATH: this.BUILD_PATH, cwd })).output;
    }

    async javac(commands: string[]) {
        // console.log(['javac', ...commands].join(' '));
        return await this.run(['javac', ...commands], {PATH: this.BUILD_PATH});
    }

    // dx is deprecated. use d8 (r8.d8 like r2.d2 android :)
    // async dx(commands: string[]) {
    //     return 'dx: ' + (await this.run([this.PATH_DX, ...commands], {PATH: this.BUILD_PATH})).output;
    // }

    async jar(commands: string[]) {
        return 'jar: ' + (await this.run(['jar', ...commands], {PATH: this.BUILD_PATH})).output;
    }

    async d8(commands: string[]) {
        return 'd8: ' + (await this.run([
            'java',
            '-Xmx124M', // '-Xmx1024M',
            '-Xss1m',
            '-cp', `${this.BUILD_TOOLS}/lib/d8.jar`,
            'com.android.tools.r8.D8',
            ...commands
        ], { PATH: this.BUILD_PATH })).output;
    }

    async zipalign(unaligned: string, aligned: string) {
        return '' + (await this.run([
            'zipalign', '-f', '4',
            unaligned, aligned
        ], {PATH: this.BUILD_PATH})).output;
    }

    async adb(commands: string) {
        return await this.run(['adb', ...commands.split(' ')], {PATH: this.PLATFORM_TOOLS});
    }

    async android(commands: string[]) {
        return 'android: ' + (await this.run(['android', ...commands], {PATH: this.TOOLS}));
    }

    async sdkmanager(commands: string[]) {
        return 'sdkmanager: ' + (await this.run(['sdkmanager', ...commands], {PATH: this.TOOLS_BIN}));
    }

    async avdmanager(commands: string[]) {
        return 'avdmanager: ' + (await this.run(['avdmanager', ...commands], {PATH: this.TOOLS_BIN}));
    }

    async exec(cmd: string, p: string[] = []) {
        cmd = cmd + ' ' + p.join(' ');
        console.log(colors.brightYellow('exec: ' + cmd));
        const output = await exec(cmd, {
            output: OutputMode.Capture
        });
        // console.log(output.status.success, output.output);
        if (output.status.success) {
            console.log(colors.green(output.output));
        } else {
            console.log(colors.red('error:'), output.status.code, cmd, output.output);
        }
    }

    async run(cmd: string[], env?: {[key: string]: string}) {
        try {
            console.log('run:', colors.yellow(cmd[0]));
            const p = Deno.run({
                cmd: cmd,
                env: env,
                cwd: env?.cwd || this.buildDir,
                stdout: "piped",
                stderr: "piped",
            });

            const { code } = await p.status();

            // Reading the outputs closes their pipes
            const rawOutput = await p.output();
            const rawError = await p.stderrOutput();
            
            const td = new TextDecoder();
            if (code === 0) {
                // await Deno.stdout.write(rawOutput);
                return {
                    status: true,
                    output: td.decode(rawOutput),
                    code
                };
            } else {
                const errorString = td.decode(rawError)+td.decode(rawOutput);
                console.log(colors.red(cmd[0]), errorString);
                return {
                    status: false,
                    output: errorString,
                    code
                };
            }
        } catch(e) {
            if (e.code=='ENOENT') console.error(colors.red(cmd.join(' ')), env?.PATH || '', e);
            else console.error(colors.red(e.code), e);
            return { status: false, output: e, code: e.code };
        }
    }


    async aapt2(cmd: string[], env?: {[key: string]: string}) {
        // create the file to attach the process to
        const file = await Deno.open("./aapt2.log", {
            read: true,
            write: true,
            create: true,
        });
        const fileWriter = await writableStreamFromWriter(file);

        // start the process //
        const process = Deno.run({
            cmd: cmd,
            env: env,
            cwd: env?.cwd || this.buildDir,
            stdout: "piped",
            stderr: "piped",
        });

        // example of combining stdout and stderr while sending to a file
        const stdout = readableStreamFromReader(process.stdout);
        const stderr = readableStreamFromReader(process.stderr);
        const joined = mergeReadableStreams(stdout, stderr);

        // returns a promise that resolves when the process is killed/closed
        joined.pipeTo(fileWriter).then(() => console.log("pipe join done"));
    }

}

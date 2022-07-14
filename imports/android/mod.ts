import { colors } from "https://deno.land/x/cliffy@v0.24.2/ansi/colors.ts";
import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";
import * as path from "https://deno.land/std@0.147.0/path/mod.ts";
import { existsSync } from "https://deno.land/std@0.63.0/fs/exists.ts";
import { ensureDirSync } from "https://deno.land/std/fs/mod.ts";

import { readableStreamFromReader, writableStreamFromWriter, } from "https://deno.land/std@0.148.0/streams/conversion.ts";
import { mergeReadableStreams } from "https://deno.land/std@0.148.0/streams/merge.ts";

export async function buildAndroid(buildDir: string, keyStoreFile: string, storepass: string) {
    try {
        console.log(colors.brightBlue('Starting android build:'), buildDir);
        const buildStart = new Date().getTime();

        const sh = new AndroidBuildShell();
        sh.cwd = buildDir;
        // sh.setDir(buildDir);

        // console.log(Deno.env.toObject());

        // sh.exec('echo', ['hi']);
        // await exec('echo Hi there');
        // sh.devices();
        // sh.aapt(['version']);
        await sh.generateResources();
        await sh.compileClasses();
        await sh.outputClassesDex();
        await sh.addDexToApk();

        await sh.alignApk();

        await sh.checkOrCreateKeyStore(keyStoreFile); // android-myth
        await sh.jarsigner(keyStoreFile, storepass);
        await sh.checkApk();

        console.log('Built within '+(Math.ceil(new Date().getTime() - buildStart) / 1000)+' seconds '+String.fromCodePoint(0x1F44F));
    } catch(e) {
        console.error(e);
    }
}

// export async function prepareKeyStore(keyStoreDir: string) {
//     // 
// }

// export async function signKey(keyStoreDir: string) {
//     // 
// }


function ensuredir(dir: string) { try { ensureDirSync(dir); } catch(e) { if(e.code != "EEXIST") { throw e; } } return dir; };
function getSourceFiles(dir: string, filter = /\.java$/) {
    const files: string[] = [];
    for (const entry of Deno.readDirSync(dir)) {
        if(entry.isDirectory) files.push(...getSourceFiles(path.join(dir, entry.name), filter));
        else if (entry.isFile) filter.test(entry.name) && files.push(path.join(dir,entry.name));
        else console.log('Ignoring:', entry.name, entry);
    }
    return files;
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

    cwd:                string = '';

    BUILD_PATH  = '';
    // PATH_DX  = 'dx';
    PATH_DX     = 'd8';
    // ENV_PATH_SEP    = ':'; // *nix, for windows it is ;
    ANDROID_JAR = '';

    UNALIGNED_NAME = 'unaligned.apk';
    APK_NAME = '';

    constructor() {
        this.ANDROID_SDK = Deno.env.get("ANDROID_SDK") || '';
        if(!this.ANDROID_SDK) throw 'Please set ANDROID_SDK in path and retry build';

        const PATH = Deno.env.get('PATH') || '';
        const JAVA_HOME = Deno.env.get('JAVA_HOME') || '';

        switch(Deno.build.os) {
            case 'windows':
                this.PATH_DX = 'd8.bat'; // check if file exists
                break;
            case 'linux':
                // 
                break;
            case 'darwin':
                // 
                break;
        }

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

        this.APK_NAME = 'signed.apk';
        // this.APK_NAME = 'release.apk';
    }
    // setDir(cwd: string) { this.cwd = cwd; }

    async generateResources() {
        //$ aapt package -m -J gen/ -M ./AndroidManifest.xml -S res1/ -S res2 ... -I android.jar
        const generated = 'gen/';
        ensuredir(path.join(this.cwd, generated));
        // ensuredir(path.join(this.cwd, 'bin/'));

        var p = [];
        p.push('package');
        p.push('-m');
        p.push('-J', generated);
        p.push('-M', './AndroidManifest.xml');
        p.push('-S', 'res');
        // p.push('-S', 'res2/');
        p.push('-I', this.ANDROID_JAR);

        // aapt package -m -J gen/ -M ./AndroidManifest.xml -S res/ -I android.jar -F bin/resources.ap_
        // p.push('-F', 'bin/resources.ap_');
        p.push('-F', this.UNALIGNED_NAME);

        await this.aapt(p);
        // console.log(await this.aapt(['list', this.UNALIGNED_NAME]));
    }

    async addDexToApk() {
        //$ aapt add 
        await this.aapt([
            'add', this.UNALIGNED_NAME, 'classes.dex'
        ]);
        // console.log(await this.aapt(['list', this.UNALIGNED_NAME]));
    }

    async checkOrCreateKeyStore(keyStoreFile: string) {
        const keyStoreDir = path.dirname(keyStoreFile);
        if(!existsSync(keyStoreDir)) ensuredir(keyStoreDir);
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

    async checkApk() {
        const apk = path.join(this.cwd, this.APK_NAME);
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

    async jarsigner(keyStoreFile: string, storepass: string) {
        const keyStoreDir = path.dirname(keyStoreFile);
        const name = path.basename(keyStoreFile);
        const cmd = [
            'jarsigner',
            '-keystore', name,
            '-storepass', storepass,
            path.relative(keyStoreDir, path.join(this.cwd, this.APK_NAME)),
            name
        ];
        // console.log(cmd.join(' '));
        await this.run(cmd, {
            cwd: keyStoreDir
        });
    }

    async compileClasses() {
        ensuredir(path.join(this.cwd, 'bin/'));

        const sourceFiles = getSourceFiles(this.cwd, /\.java$/).map(f => path.relative(this.cwd, f));
        // console.log('sourceFiles:', sourceFiles);
        
        await this.javac([
            '-classpath', this.ANDROID_JAR,
            '-sourcepath', 'gen;java',
            '-d', 'bin',
            //'-target', '1.7',
            //'-source', '1.7',
            // 'gen\\com\\msheriff\\kingdom\\R.java',
            // 'java/com/msheriff/kingdom/MainActivity.java',
            ...sourceFiles
        ]);
    }

    async outputClassesDex() {
        // $(DX) --dex --output=classes.dex bin
        // https://r8.googlesource.com/r8
        // $(D8) --output classes.dex input-file1 input-file2
        // await this.dx([
        //     //'--dex',
        //     '--output=classes.dex',
        //     ...getSourceFiles(this.cwd, /\.class$/).map(f => f.substring(this.cwd.length+1))
        // ]);

        const classFiles = getSourceFiles(this.cwd, /\.class$/).map(f => path.relative(this.cwd, f));
        // console.log(classFiles);

        await this.d8([
            '--output', '.',
            // 'bin\\com\\msheriff\\kingdom\\*.class'
            ...classFiles
        ]);
    }

    devices() { return this.adb('devices'); }

    async aapt(commands: string[]) {
        return `aapt ${commands[0]}:\n` + (await this.run(['aapt', ...commands], {PATH: this.BUILD_PATH})).output;
    }

    async javac(commands: string[]) {
        return `javac ${commands[0]}:\n` + (await this.run(['javac', ...commands], {PATH: this.BUILD_PATH})).output;
    }

    async dx(commands: string[]) {
        return 'dx: ' + (await this.run([this.PATH_DX, ...commands], {PATH: this.BUILD_PATH})).output;
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
                cwd: env?.cwd || this.cwd,
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
                const errorString = td.decode(rawError);
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
            cwd: env?.cwd || this.cwd,
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

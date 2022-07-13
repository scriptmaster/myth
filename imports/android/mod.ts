import { colors } from "https://deno.land/x/cliffy@v0.24.2/ansi/colors.ts";
import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";
import * as path from "https://deno.land/std@0.147.0/path/mod.ts";
import { platform } from "https://deno.land/std@0.139.0/node/os.ts";
import * as fs from "https://deno.land/std@0.147.0/fs/mod.ts";

export async function buildAndroid(buildDir: string) {
    try {
        console.log(colors.brightBlue('Starting android build:'), buildDir);

        const sh = new AndroidBuildShell();
        sh.cwd = buildDir;
        // sh.setDir(buildDir);

        // console.log(Deno.env.toObject());

        // sh.exec('echo', ['hi']);
        // await exec('echo Hi there');
        sh.devices();
        sh.aapt(['version']);
        sh.generateResources();
        // sh.dx(['--help']);
        // sh.zipalign(['--help']);
    } catch(e) {
        console.error(e);
    }
}


function ensuredir(dir: string) { try { fs.ensureDirSync(dir); } catch(e) { if(e.code != "EEXIST") { throw e; } } return dir; };

class AndroidBuildShell {
    ANDROID_SDK: string;
    BUILD_TOOLS_VERSION: string = '30.0.3';
    PLATFORM_VERSION: string = 'android-32';
    BUILD_TOOLS: string = '';
    PLATFORM_PATH: string = '';
    PLATFORM_TOOLS: string = '';
    cwd: string = '';
    // public ANDROID_SDK, BUILD_TOOLS, BUILD_TOOLS_VERSION;

    // PATH_DX = ['dx'];
    PATH_DX = 'd8';
    PATH_SEP = ':'; // *nix, for windows it is ;

    constructor() {
        this.ANDROID_SDK = Deno.env.get("ANDROID_SDK") || '';
        if(!this.ANDROID_SDK) throw 'Please set ANDROID_SDK in path and retry build';

        const PATH = Deno.env.get('PATH') || '';
        const JAVA_HOME = Deno.env.get('JAVA_HOME') || '';

        switch(platform()) {
            case 'win32':
                this.PATH_SEP = ';';
                this.PATH_DX = 'd8.bat'; // check if file exists
                break;
            case 'linux':
                // 
                break;
            case 'darwin':
                // 
                break;
        }

        this.BUILD_TOOLS = path.join(this.ANDROID_SDK, 'build-tools', this.BUILD_TOOLS_VERSION) + this.PATH_SEP + path.join(JAVA_HOME, 'bin');
        this.PLATFORM_PATH = path.join(this.ANDROID_SDK, 'platforms', this.PLATFORM_VERSION);
        this.PLATFORM_TOOLS = path.join(this.ANDROID_SDK, 'platforms-tools');

        console.log(this.BUILD_TOOLS);

        console.log(colors.gray('ANDROID_SDK='+this.ANDROID_SDK));
        console.log(`BUILD_TOOLS_VERSION: ${colors.yellow(this.BUILD_TOOLS_VERSION)}, PLATFORM_VERSION: ${colors.yellow(this.PLATFORM_VERSION)}`);
        //console.log(colors.yellow('BUILD_TOOLS='+this.BUILD_TOOLS));
        //console.log(colors.yellow('PLATFORM_PATH='+this.PLATFORM_PATH));
    }
    // setDir(cwd: string) { this.cwd = cwd; }

    generateResources() {
        //$ aapt package -m -J gen/ -M ./AndroidManifest.xml -S res1/ -S res2 ... -I android.jar
        ensuredir(path.join(this.cwd, 'gen/'));

        var p = [];
        p.push('package');
        p.push('-m');
        p.push('-J', 'gen/');
        p.push('-M', './AndroidManifest.xml');
        p.push('-S', 'res');
        // p.push('-S', 'res2/');
        p.push('-I', path.join(this.PLATFORM_PATH, 'android.jar'));

        this.aapt(p);
    }

    devices() { return this.adb('devices'); }

    async aapt(commands: string[]) {
        return 'aapt: ' + (await this.run(['aapt', ...commands], {PATH: this.BUILD_TOOLS}));
    }

    async dx(commands: string[]) {
        return 'dx: ' + (await this.run([this.PATH_DX, ...commands], {PATH: this.BUILD_TOOLS}));
    }

    async zipalign(commands: string[]) {
        return 'zipalign: ' + (await this.run(['zipalign', ...commands], {PATH: this.BUILD_TOOLS}));
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
            const p = Deno.run({
                cmd: cmd,
                env: env,
                cwd: this.cwd,
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
        }

    }
}

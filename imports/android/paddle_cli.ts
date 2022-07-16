import { buildAndroid } from "./mod.ts";

import * as path from "https://deno.land/std@0.147.0/path/mod.ts";
import { existsSync } from "https://deno.land/std@0.63.0/fs/exists.ts";
import { parse as parseYaml } from "https://deno.land/std@0.63.0/encoding/yaml.ts";
import { Command, CompletionsCommand, HelpCommand } from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";

const cwd = Deno.cwd();

interface ButterPaddle {
    type: string;
    main: string;
    apk_name: string;
    build_version: string;
    min_sdk: string;
    target_sdk: string;

    libs: string[];
    deps: string[];
    build_deps?: string[];
    // test_deps?: string[];

    // multi_builds:
    builds: string[];

    keystore: string;
    storepass: string;
}

function writeNewConfig() {
    paddleYml = path.join(cwd, 'paddle.yml');
    Deno.writeTextFileSync(paddleYml,
`type: app
apk_name: app.apk
libs:
 - 
deps:
 - androidx.appcompat:appcompat:1.4.1
 - com.google.android.material:material:1.6.0
`);
}

var paddleYml = '';

function readConfig(opts: any, dep: string = '') {
    paddleYml = path.join(cwd, (opts.config || '').toString() || 'paddle.yml');
    if(existsSync(path.join(cwd, 'butter_paddle.yml'))) {
        paddleYml = path.join(cwd, 'butter_paddle.yml');
    }

    if(!existsSync(paddleYml) || dep) {
        const create = dep || confirm('Create paddle.yml?');
        if(!create) {
            console.error('Need paddle.yml or butter_paddle.yml see: http://github.com/scriptmaster/butter_paddle');
            Deno.exit();
        }
        writeNewConfig();
    }

    const yaml = Deno.readTextFileSync(paddleYml);
    return parseYaml(yaml) as ButterPaddle;
}

function installDeps(deps: string[]) {
    // download and write to config
    // Not implemented
}

function installBuildDeps(deps: string[]) {
    // download and write to config
    // Not implemented
}

function startBuild(ymlFile: string, paddle: ButterPaddle) {
    buildAndroid(path.dirname(ymlFile), paddle.keystore || '', paddle.storepass || '');
}

await new Command()
.name("butter_paddle")
.description("A modern and fast build tool for android projects without gradle[w]/bazel/buck/ant")
.version("v1.0.2")
.option("-c, --config [paddle.yml]", "Alternative: butter_paddle.yml", { default: 'paddle.yml' })
.action(async (opts) => {
    const paddle = readConfig(opts);
    if(!paddle) return console.log("Couldn't read config");

    if(/builds$/.test(paddle.type)) {
        console.log('Multi builds paddle: ', paddleYml);
        if (paddle.builds) {
            for (const b of paddle.builds) {
                if (paddle.main && b == paddle.main) continue; // don't build main project twice; wait for all the other projects to finish build.
                const projectYml = path.join(cwd, b, 'paddle.yml');
                if(existsSync(projectYml)) {
                    startBuild(projectYml, paddle);
                }
            }
        } else {
            for (const d of Deno.readDirSync(cwd)) {
                if (d.isDirectory && d.name[0] != '.') {
                    if (paddle.main && d.name == paddle.main) continue; // don't build main project twice; wait for all the other projects to finish build.
                    const projectYml = path.join(cwd, d.name, 'paddle.yml');
                    if(existsSync(projectYml)) {
                        startBuild(projectYml, paddle);
                    }
                }
            }
        }
        if(paddle.main) {
            const main = path.join(cwd, paddle.main);
            if (existsSync(main)) {
                buildAndroid(main, paddle.keystore || '', paddle.storepass || '');
            }
            else console.log('Could not locate the main build: ' + paddle.main);
        }
    } else {
        console.log('Single build paddle: ', paddleYml);
        startBuild(paddleYml, paddle);
    }
})
.command('i,install,ci [dep]', 'Only install all deps or the new dep, to .build/')
.action(async (opts, dep) => {
	const paddle = readConfig(opts, dep);
    if(!paddle) return console.log("Couldn't read config");

    if(dep) return installDeps([dep]);

    if (paddle.deps || paddle.build_deps) {
        if (paddle.deps) return installDeps(paddle.deps);
        if (paddle.build_deps) return installBuildDeps(paddle.build_deps);
    }

    console.log('No dependencies installed.');
})
.command('n,new [dir] [android_template]', 'Create new android app with the template to dir')
.action(async (opts, dir, template) => {
	if (!dir || dir == '.') dir = '';
    // Generate template from https://github.com/scriptmaster/butter_paddle/templates/tpl_name/
})
.command("help", new HelpCommand().global())
.command("completions", new CompletionsCommand())
//.command("upgrade", new UpgradeCommand({provider: [ new DenoLandProvider({ name: "cliffy" }), new NestLandProvider({ name: "cliffy" }), new GithubProvider({ repository: "c4spar/deno-cliffy" }),],}))
.parse(Deno.args);

import * as path from "https://deno.land/std@0.147.0/path/mod.ts";
import * as fs from "https://deno.land/std@0.147.0/fs/mod.ts";
import { existsSync } from "https://deno.land/std@0.63.0/fs/exists.ts";
import { Command, CompletionsCommand, HelpCommand } from "https://deno.land/x/cliffy@v0.24.2/command/mod.ts";
import { colors } from "https://deno.land/x/cliffy@v0.24.2/ansi/colors.ts";

// FOR DEV SERVER //
// import { serve } from "https://deno.land/std@0.85.0/http/server.ts";
import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";

// import { Language, minify } from "https://deno.land/x/minifier/mod.ts";
// import parseJSX from './parse-jsx.js';
// import Babel from 'https://jspm.dev/@babel/standalone';
import Babel from "https://esm.sh/@babel/standalone@7.18.8";
// import * as minifyPreset from 'https://esm.sh/babel-preset-minify@0.5.2';
import { default as babelMinify } from 'https://esm.sh/babel-minify@0.5.2';
// import * as Terser from "https://esm.sh/terser@5.7.1";
import { buildAndroid } from "./imports/android/mod.ts";
import { buildSEOPages } from "./imports/html/mod.ts";
import { buildRazorPages } from "./imports/razor/mod.ts";

const __filename = path.fromFileUrl(import.meta.url);
const __dirname = path.dirname(__filename);

const configFileName = 'myth.json';
const defaultConfig = {
	root: 'src',
    dist: 'dist',
	hashing: true,
	minify: true,
	assets: 'assets',
	components: 'components',
	routes: 'pages',
	assetsExclude: 'exclude|node_modules',
	vendorDir: 'lib',
    //target: 'mithril',
	builds: ['mithril', 'android'],
	buildsDir: 'builds',
    vendorIncludes: {
        "react": ["react.js", "react-dom.js", "react-router-dom.js"],
        "mithril": ["mithril.js"]
    },
	install: {},
	downloadAssets: {},
	// defaultDownloadCDN: 'https://unpkg.com/', // ga.jspm.io,jspm.dev,cdnjs

	mount: "document.querySelector('#myth')",
    port: 5000,

	//generate: "../Pages/Generated/",
    //generate_templates: ["razor_pages", "html"]
};

var config = Object.assign({}, defaultConfig);

function readConfig(opts:any) {
	const newConfig = configFile(opts.config || configFileName);
	config = Object.assign({}, defaultConfig, newConfig);
	assetsExcludeRegex = new RegExp(newConfig.assetsExclude);
}

var assetsExcludeRegex = new RegExp(config.assetsExclude);

// console.log(config);
const root = (p:string) => path.join(__dirname, config.root, p);
const dist = (p:string) => path.join(__dirname, config.dist, p);
const vendor = (p:string) => path.join(__dirname, config.vendorDir, p);
const assets = (p:string) => path.join(__dirname, config.root, config.assets, p);
const comps = (p:string) => path.join(__dirname, config.root, config.components, p);
const routes = (p:string) => path.join(__dirname, config.root, config.routes, p);
const copybuild = (p:string) => ccopy(root(p), path.join(__dirname, config.buildsDir, p));
const join = (a:string,b:string) => path.join(a, b);

function exists(path: string) { return existsSync(path) };
function readFile(path: string) {
    try { return Deno.readTextFileSync(path); } catch(e) { console.log('Error in readFile:', e.stack); }
}

function configFile(configFileName: string) {
    const configFile = path.join(__dirname, configFileName);
    if(exists(configFile)) {
        try {
            var configFileJSONText = readFile(configFile) || '';
            return JSON.parse(configFileJSONText);
        } catch(e) {
            console.error(`Reading/parsing error: ${configFile}`, e.stack);
        }
    } else {
        const createConfig = confirm("Config file does not exist. Create one?");
        if(!createConfig) {
            throw 'Cannot continue without config file.';
        }
        Deno.writeTextFileSync(configFile, JSON.stringify(defaultConfig));
    }
    return {};
}

function ensuredir(dir: string) {
	try {
		fs.ensureDirSync(dir);
	} catch(e) {
		if(e.code != "EEXIST") { throw e; }
	}
	return dir;
};

// function buildDir(p: string) { return  }

function rmdir(dir: string) {
	if (exists(dir)) {
		fs.emptyDirSync(dir);
	} else { console.warn("warn: " + dir + " not exists"); }
};

function copy(src: string, dest: string) {
	try { fs.copySync(src, dest); }catch(e){console.warn(e)}
	return dest;
};

function ccopy(src: string, dest: string) {
	// clear and copy
	//ensuredir(dest);
	rmdir(dest);
	try { fs.copySync(src, dest, {overwrite: true}); }catch(e){console.warn(e)}
	return dest;
};

function new_() {
    // Ensure project structure is initialized.  This is like ng new project2
    ensuredir(root(''));
    ensuredir(assets(''));
	ensuredir(vendor(''));
	ensuredir(comps(''));
	ensuredir(routes(''));
	//ensuredir(root('docs'));
	//ensuredir(root('tests'));
	// Create index.html template if not exists
	if (!exists('index.html')) {
		Deno.writeTextFileSync(root('index.html'), '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>myth</title>\n</head>\n<body>\n\t<h1>Welcome to Myth</h1>\n\t<div id="myth"></div>\n\t<script defer src="bundle.js"></script>\n</body>\n</html>');
	}
}


async function prepareDistDir() {
	rmdir(dist('./'));
	ensuredir(dist('./'));
	ensuredir(dist('./'+config.assets));

	copy(root('index.html'), dist('index.html'));
	console.log('Copied index.html')

	const files = Deno.readDirSync(assets(''));
	// for await (const a of files) {
	for (const a of files) {
		if(assetsExcludeRegex.test(a.name)) continue;
		// console.log('copying', a.name, assets_(a.name), dist(a.name));
		copy(assets(a.name), dist(`${config.assets}/${a.name}`));
	}
	console.log('Copied all assets');
}

var code = '';
async function createMain() {
	const main = dist('main.js');

	console.log("Creating main bundle: ", main);
	if(config.minify) {
		console.log(colors.gray('Before minification: '+code.length));
		// code = minify(Language.JS, code);
		code = babelTransformMinify(code);
		// code = await terserMinify(code) || '';
		console.log(colors.gray('After minification: '+code.length));
	}

	Deno.writeTextFileSync(main, code);
}

async function createBundle(build: string) {
	createMain();

	const bundle = dist('bundle.js');
	// const bundleMin = dist('bundle.min.js');

	console.log("Creating dist bundle (vendor+main): ", bundle);
	Deno.writeTextFileSync(bundle, vendorCode + '\n\n\/\*main.js\*\/\n' + code);

	// Deno.writeTextFileSync(bundleMin, minify(Language.JS, code));
	// console.log('minified bundle: ', bundleMin);

	// if(config.generate) {
	// 	createHtmlFiles();
	// }
}

var vendorCode = '';
async function createVendor(target: string) {
	await writeVendorIncludes(target);
	const vendorFile = dist('vendor.js');
	console.log("Creating vendor bundle: ", vendorFile);
	Deno.writeTextFileSync(vendorFile, vendorCode);
}

function parseComponents(build: string) {
	code += '\n/* --- Components --- */\n';
	const compDirs = Deno.readDirSync(comps(''));
	for(const comp of compDirs) {
		// console.log('comp', comp);
		writeComponent(build, comp.name);
	}
}

function writeRoutes(build: string) {
	code += '\n/* --- Routes --- */\n';
	const routeDirs = Deno.readDirSync(routes(''));
	var routeList = [], rt, routeComp;
	for(rt of routeDirs) {
		routeComp = writeComponent(build, rt.name, true);
		// routeMap[rt.name] = Route;
		routeList.push("'/"+(/^(home|index)$/i.test(rt.name)? '': rt.name)+"': "+(routeComp || '{}'));
	}
	switch(build) {
		case 'react':
			// const router = babelTransformHtml('<Router>Hello</Router>');
			const mountElement = config.mount || 'App';
			code += `ReactDOM.render(h(${mountElement}), ${config.mount});`;
			break;
		case 'mithril':
		default:
			// routeMap = JSON.stringify(routeMap)
			code += `
m.route(${config.mount}, '/', {
	${routeList.join(',\n	')}
});
`;
	}
}

const templateFiles = ['template.html', 'template.myhtml', 'template.mythml', 'component.html', 'index.html', 'Index.cshtml'];
// const templateFilesMissing = `[missing:${templateFiles.join(',')}]`;
const templateFilesMissing = `[missing:(template|component|index).(cs)html}]`;

const componentFiles = ['component.js', 'component.ts', 'index.js'];
const functionFiles = ['functions.js', 'functions.ts', 'designer.js', 'designerteam.js', 'codeless.js', 'nocode.js', 'code.js'];
const variableFiles = ['variables.js', 'variables.ts', 'bindings.js'];
//const bindingFiles = ['bindings.js', 'bindings.ts'];
const constructorFiles = ['constructor.js'];
// const componentFilesMissing = `[missing:${componentFiles.join(',')}]`; // Component files are optional

function readFiles(dirpath: string, files: string[], missing = '') {
	for (const name of files) {
		let fpath = join(dirpath, name);
		if(exists(fpath)) return { text: readFile(fpath) || '', fpath, missing: false };
	}
	return { text: '', fpath: dirpath + missing, missing: true };
}

function writeComponent(build: string, dirname: string, isRoute = false) {
	const name = dirname.replace(/(^.|\W.)/g, function(c){ return c.toUpperCase().replace('-', ''); });
	const dirpath = isRoute? routes(dirname): comps(dirname);

	const { text: jsx, fpath: tpath } = readFiles(dirpath, templateFiles, templateFilesMissing);

	//Will parse depending on target lib/framework:
	var parsed;

	code += `
/**
 * @component: ${name}
 * @template: ${tpath}
 */
`;

	const { text: compCode, fpath: cpath } = readFiles(dirpath, componentFiles);
	const { text: functions, fpath: fnspath } = readFiles(dirpath, functionFiles);
	const { text: variables, fpath: varspath } = readFiles(dirpath, variableFiles);
	//const { text: bindings, fpath: bpath } = readFiles(dirpath, bindingFiles);
	//variables += '\n'+bindings;
	const { text: constructorLines, fpath: clpath } = readFiles(dirpath, constructorFiles);

	switch(build) {
		case 'react':
			parsed = babelTransform(jsx || '');
			// const parsed = jsx;
			code += `
class ${name} extends Component {

${compCode}

	render() {
		return ${parsed}
	}
}
`;
		break;
	case 'mithril':
	default:
		parsed = babelTransform(jsx || '', 'm', "'['");

		if(compCode) {
			code += patternMatchMithrilClassComponent(compCode, name, parsed, functions+variables);
		} else {
			const defaultViewOnlyComp = `
class ${name} {
	viewOnly = true;

	constructor(props) {
		${constructorLines}
	}

	view(props) {
		${functions+variables}
		return ${parsed}
	}
}
`;
			// console.log('Whats undefined?', defaultViewOnlyComp);
			code += defaultViewOnlyComp;
		}

		break;
	}

	return name;
}


// const embedCode = (compCode || '').replace(/^\s*export\s+default\s+class\s+.*?{(.*?)}$/, 'EMBED CODE');
// const embedCode = (compCode || '').replace(/^\s*export\s*}\s*$/, 'EMBED CODE');
// const rgx1 = /^\s*export\s+default\s+class\s*\{\s*(.+?)\s*\}\s*$/;


// const rgxExportDefaultNamedClassStart = () => new RegExp('export\s+default\s+class\s*(.+)?\{');
// const rgxExportNamedClassStart = /export\s+default\s+class\s*(.+)?\{/;
const stExportDefaultClassStart = (s:string) => `(export\\s+)?(default\\s+)?class\\s*(${s})?\{`;
const rgxExportDefaultClassStart = new RegExp(stExportDefaultClassStart('.+')); // /(export\s+)?(default\s+)?class\s*(.+)?\{/;

function patternMatchMithrilClassComponent(compCode: string, name: string, parsedJsx: string, functions: string) {
	// #1: export default class name {
	// #2: export class name {
	// #3: export default class {
	// else: first available: export [default] class AnyOtherName {
	// else: first available: export class {

	const startCode = (n: string, j: string, f: string) => `class ${n} {
	view(props) {
${f}
		return ${j}
	}
`;
	var matched: RegExpMatchArray | null;

	const rgxExactMatch = new RegExp(stExportDefaultClassStart(`${name}.*`));
	// console.log(rgxExactMatch);
	if ((matched = compCode.match(rgxExactMatch))) {
		// console.log('exact match:', matched);
		return compCode.replace(matched[0], (matched[1]||'')+(matched[2]||'')+startCode(matched[3]? matched[3]: name, parsedJsx, functions));
	} else if ((matched = compCode.match(rgxExportDefaultClassStart))) {
		// console.log('alt match:',matched);
		return compCode.replace(matched[0], (matched[1]||'')+(matched[2]||'')+startCode(matched[3]? matched[3]: name, parsedJsx, functions));
	}

	return compCode;
}


async function writeHeader(build: string) {
	code = `/*
Bundle created by ${__filename}
@author: msheriffusa
*/
`;

	// Write globals
	switch(build) {
		case 'react':
			code += `
const Component = React.Component;
const h = React.createElement;
const Fragment = React.Fragment;
const Router = ReactRouterDOM.BrowserRouter;
const { Route, Link, Switch } = ReactRouterDOM;
`;
			break;
		case 'mithril':
		default:
			break;
	}
}

/*
async function readOrDownload(file: string, fileName: string) {
	if(!exists(file)) {
		let fileDownload = confirm(`File ${file} does not exist.  Proceed to download?`);
		if (fileDownload) {
			// Download from configured pkg manager
			var downloadUrl = config.install && config.install[fileName];
			if(!downloadUrl) {
				downloadUrl = config.defaultDownloadCDN + fileName.replace(/(\.min)?\.js$/, '');
			}
			console.log(`Downloading ${fileName}: ${downloadUrl}`);
			// const text = fetchTextSync(downloadUrl);
			const text = await fetch(downloadUrl).then(r => r.text());
			// console.log(`Downloaded size: ${text.length}. Writing to ${file}`);
			console.log(`Writing to ${file}`);
			Deno.writeTextFileSync(file, text);
		} else {
			throw 'Please download file contents manually to ' + file;
		}
	}
	return readFile(file);
}
*/

async function install() {
	let urls: {[key:string]: string} = config.install;
	for (const name of Object.keys(urls)) {
		if(exists(vendor(name))) {
			console.log(colors.gray(`Ignored: [${name}]`));
		} else {
			installFile(name, urls); // Can do parallelly instead of awaiting
		}
	}

	let downloads: {[key:string]: string} = config.downloadAssets || {};
	for (const name of Object.keys(downloads)) {
		if(exists(assets(name))) {
			console.log(colors.gray(`Ignored: [${name}]`));
		} else {
			installFile(name, downloads, assets(''));
		}
	}
}

function validUrl(downloadUrl: string) { return downloadUrl? true: false; }

async function installFile(name: string, urls: {[key:string]: string} = config.install, dir: string = '') {
	// console.log(config.install);
	let downloadUrl = urls[name] || '';
	while(!validUrl(downloadUrl)) {
		downloadUrl = prompt(`Specify URL to download [${name}]`) || '';
		// urls[name] = downloadUrl;
	}

	try { Deno.writeTextFileSync('install.log', `[${new Date().getTime()}] Downloading: ${name} [${downloadUrl}]\n`, { append: true }); } catch(e) { console.warn("Couldn't write to install.log") }
	const text = await fetch(downloadUrl).then(r => r.text());
	const sizeKB = Math.round(text.length/1024);
	console.log(colors.green(`Downloaded: [${name}] [${downloadUrl}] [size: ${sizeKB}KB]`));
	const file = join(dir || vendor(''), name);
	try {
		ensuredir(path.dirname(file));
		Deno.writeTextFileSync(file, text);
		try { Deno.writeTextFileSync('install.log', `[${new Date().getTime()}] Installed: [${name}] [size: ${sizeKB}KB] [path: ${file}]\n`, { append: true }); } catch(e) { console.warn("Couldn't write to install.log") }
	} catch(e) { console.error("Couldn't install downloaded file to: " + file, e) }
}


// console.log('Test', babelMinify('/* Some comments */ class Test { view() { return m("h1", null, "Hi comments"); } }'));

function babelTransformHtml(html: string, pragma = 'h', pragmaFragment = 'Fragment') { return (Babel.transform(html, { presets: [['react', {pragma: pragma, pragmaFrag: pragmaFragment}], ], }).code || ''); /*.replace(/;$/, '');*/ }
function babelTransform(html: string, pragma = 'h', pragmaFragment = 'Fragment') { return babelTransformMinify(babelTransformHtml('<>'+html+'</>', pragma, pragmaFragment)) }
function babelTransformMinify(code: string) { return babelMinify(code, { mangle: { keepClassName: true, }, }).code; }
// async function terserMinify(code: string) {  const output = await Terser.minify(code);  return output.code;  }


/*
function fetchTextSync(downloadUrl: string): string {
	var syncThreadFlag = new Date().getTime();
	var fileContents = '';
	// const res = await fetch(downloadUrl);
	// const resText = await res.text();
	console.log('Downloading...' + downloadUrl);
	fetch(downloadUrl)
	.then(resp => {
		syncThreadFlag = 0;
		return resp.text();
	})
	.then(text => {
		console.log(`Downloaded size: ${text.length}.`);
		fileContents = text;
		syncThreadFlag = 0;
		// console.log(syncThreadFlag);
	})
	.catch(e => {
		syncThreadFlag = 0;
		console.log('Error in download', e);
	});

	while(syncThreadFlag > 0) {
		// console.log(syncThreadFlag);
		// if ((((new Date().getTime() - syncThreadFlag) / 500) % 10) == 0) console.log(syncThreadFlag, new Date().getTime());
		if (new Date().getTime() - syncThreadFlag > 2000) break;
		// execSync('sleep 0.1');
	}

	return fileContents;
}
*/

// interface IConfig { vendorIncludes: { [key: string]: string[] } }

async function writeVendorIncludes(target:any) {
    if (!config.vendorIncludes) throw 'Please configure vendorIncludes.';
	const vendorIncludes: {[key:string]: string[]} = config.vendorIncludes;
	const vendorFiles: string[] = vendorIncludes[target] || [];
    //if (!vendorIncludes) throw `No array of files specified for vendorIncludes[${target}]`;
    if (!config.vendorDir) throw 'Vendor dir not configured.';

	for(const file of vendorFiles) {
		const path = vendor(file);
		if(!exists(path)) {
			console.log('Downloading: ' + file);
			await installFile(file); // And add to myth.json install if not exists
		}

		const fileContents = await readFile(path);
		vendorCode += `
/* @name: ${file}
 */
${fileContents}
`
	};
}

async function bundleWeb(build: string) {
	await prepareDistDir();
	await createVendor(build);
	await writeHeader(build);
	await parseComponents(build);
	await writeRoutes(build);
	await createBundle(build);
}

// aggregate watch events into 1 call every 350ms instead of every time
function memoize(key, cb, timeout = 350) {
	if(memoize.timeouts[key]) {
		clearTimeout(memoize.timeouts[key]);
		delete memoize.timeouts[key];
	}
	memoize.timeouts[key] = setTimeout(function(){
		//delete memoize.timeouts[key];
		// console.log(colors.green('Changes detected. ' + new Date().toISOString()));
		console.log(colors.green('Changes detected. ' + new Date().toLocaleTimeString()));
		cb();
	}, timeout);
}
memoize.timeouts = {};

async function build(opts:any = {}) {
	const builds = opts && opts.builds? opts.builds: config.builds;
	// console.log(builds);

	for (const build of builds) {
		switch(build.toLowerCase()) {
			case 'mithril':
			case 'react':
				await bundleWeb(build);
				break;
			case 'web':
			case 'spa':
				await bundleWeb('mithril'); break;
			case 'android':
				await buildAndroid(copybuild('android'));
				break;
			case 'html':
			case 'www':
			case 'mpa':
				await buildSEOPages(build);
				break;
			case 'razor':
				await buildRazorPages(build);
				break;
		}
	}
}

async function watch(watchPath: string, cb: Function) {
	const watcher = Deno.watchFs(watchPath);
	for await (const event of watcher) {
		//memoize(watchPath, bundle);
		memoize('watch', cb);
	}
}

async function watchSources(opts:any) {
	const watchPath = root('');
	console.log(colors.white.bgBrightBlue('Watching for changes:'), watchPath);
	watch(watchPath, build);
}

async function watchConfig(configFile: string) { watch(path.join(__dirname, configFile), restart) }
async function watchCli() { watch(__filename, restart); }
async function restart() { console.log(colors.brightYellow('Restarting... try denon scripts.yml watcher:match instead?')) }

async function startWebServer(opts:any) {
	const port = opts.port || config.port || 5000;
	const host = opts.host || config.host || 'localhost';
	console.log(colors.brightGreen(`Serving at http://${host}:${port} for path: ${dist('.')}`));
	// const server = serve({ hostname: "0.0.0.0", port: port });
	// for await (const request of server) {
	// 	// let bodyContent = "Your user-agent is:\n\n";
	// 	// bodyContent += request.headers.get("user-agent") || "Unknown";
	// 	let bodyContent = readFile(dist('index.html'));
	// 	request.respond({ status: 200, body: bodyContent });
	// }
	const app = new Application();

	app
		.get("/api/context", (c) => {
			return Object.keys(c);
		})
		.static("/", "./dist")
		.file("/", "dist/index.html")
		.start({ port: port, hostname: host });
	;

	if (opts.watch) {
		watchSources(opts);
		//For watching config and cli, please use the denon app
		//watchConfig(opts.config);
		//watchCli();
	}
}

await new Command()
.name("myth")
.description("A modern component-based frontend tool to build single page apps without node_modules folder.")
.version("v1.0.1")
.option("-w, --watch", "To start a dev server and watch for changes in source directory", { default: true, })
.option("-c, --config [myth.json]", "The config file to use.", { default: configFileName, })
.option("-p, --port <port:number>", "The port number for the local server.", { default: 5000, })
.option("-h, --host [hostname]", "The host name for the local server.", { default: "localhost", })
.action(async (opts) => {
	console.log(
		colors.bold("Welcome to"),
		colors.bold.underline.rgb24("myth", 0x33ff33),
	);
	// console.log(opts);
	await readConfig(opts);
	await build(opts);

	// State is cached on the server and state is managed on the client.
	await startWebServer(opts);
})
.command('new', 'Create a new project. Similar to create-myth-app or ng new')
.action(async (opts) => {
    console.log('Creating new project.');
	new_();
})
.command('build [name]', 'Build the project (fast CI builds).')
// .option('-b, --builds ["android", "razor" "seo" "wp"]', "JSON array of builds for more platform builds", { default: config.builds, })
.action(async (opts, name) => {
    // console.log('Building project:', opts, name);
    // console.log(opts);
	await readConfig(opts);
	await build(name? {builds: [name]}: opts);
})
.command('i,install,ci [name]', 'Install all deps in lib/ specified in config install.')
.action(async (opts) => {
	await readConfig(opts);
    console.log('Downloading and installing deps.');
	await install();
})
.command("help", new HelpCommand().global())
.command("completions", new CompletionsCommand())
//.command("upgrade", new UpgradeCommand({provider: [ new DenoLandProvider({ name: "cliffy" }), new NestLandProvider({ name: "cliffy" }), new GithubProvider({ repository: "c4spar/deno-cliffy" }),],}))
.parse(Deno.args);

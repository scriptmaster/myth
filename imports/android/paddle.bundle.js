// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const { Deno: Deno1  } = globalThis;
const noColor = typeof Deno1?.noColor === "boolean" ? Deno1.noColor : true;
let enabled = !noColor;
function setColorEnabled(value) {
    if (noColor) {
        return;
    }
    enabled = value;
}
function getColorEnabled() {
    return enabled;
}
function code(open, close) {
    return {
        open: `\x1b[${open.join(";")}m`,
        close: `\x1b[${close}m`,
        regexp: new RegExp(`\\x1b\\[${close}m`, "g")
    };
}
function run(str, code) {
    return enabled ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}` : str;
}
function reset(str) {
    return run(str, code([
        0
    ], 0));
}
function bold(str) {
    return run(str, code([
        1
    ], 22));
}
function dim(str) {
    return run(str, code([
        2
    ], 22));
}
function italic(str) {
    return run(str, code([
        3
    ], 23));
}
function underline(str) {
    return run(str, code([
        4
    ], 24));
}
function inverse(str) {
    return run(str, code([
        7
    ], 27));
}
function hidden(str) {
    return run(str, code([
        8
    ], 28));
}
function strikethrough(str) {
    return run(str, code([
        9
    ], 29));
}
function black(str) {
    return run(str, code([
        30
    ], 39));
}
function red(str) {
    return run(str, code([
        31
    ], 39));
}
function green(str) {
    return run(str, code([
        32
    ], 39));
}
function yellow(str) {
    return run(str, code([
        33
    ], 39));
}
function blue(str) {
    return run(str, code([
        34
    ], 39));
}
function magenta(str) {
    return run(str, code([
        35
    ], 39));
}
function cyan(str) {
    return run(str, code([
        36
    ], 39));
}
function white(str) {
    return run(str, code([
        37
    ], 39));
}
function gray(str) {
    return brightBlack(str);
}
function brightBlack(str) {
    return run(str, code([
        90
    ], 39));
}
function brightRed(str) {
    return run(str, code([
        91
    ], 39));
}
function brightGreen(str) {
    return run(str, code([
        92
    ], 39));
}
function brightYellow(str) {
    return run(str, code([
        93
    ], 39));
}
function brightBlue(str) {
    return run(str, code([
        94
    ], 39));
}
function brightMagenta(str) {
    return run(str, code([
        95
    ], 39));
}
function brightCyan(str) {
    return run(str, code([
        96
    ], 39));
}
function brightWhite(str) {
    return run(str, code([
        97
    ], 39));
}
function bgBlack(str) {
    return run(str, code([
        40
    ], 49));
}
function bgRed(str) {
    return run(str, code([
        41
    ], 49));
}
function bgGreen(str) {
    return run(str, code([
        42
    ], 49));
}
function bgYellow(str) {
    return run(str, code([
        43
    ], 49));
}
function bgBlue(str) {
    return run(str, code([
        44
    ], 49));
}
function bgMagenta(str) {
    return run(str, code([
        45
    ], 49));
}
function bgCyan(str) {
    return run(str, code([
        46
    ], 49));
}
function bgWhite(str) {
    return run(str, code([
        47
    ], 49));
}
function bgBrightBlack(str) {
    return run(str, code([
        100
    ], 49));
}
function bgBrightRed(str) {
    return run(str, code([
        101
    ], 49));
}
function bgBrightGreen(str) {
    return run(str, code([
        102
    ], 49));
}
function bgBrightYellow(str) {
    return run(str, code([
        103
    ], 49));
}
function bgBrightBlue(str) {
    return run(str, code([
        104
    ], 49));
}
function bgBrightMagenta(str) {
    return run(str, code([
        105
    ], 49));
}
function bgBrightCyan(str) {
    return run(str, code([
        106
    ], 49));
}
function bgBrightWhite(str) {
    return run(str, code([
        107
    ], 49));
}
function clampAndTruncate(n, max = 255, min = 0) {
    return Math.trunc(Math.max(Math.min(n, max), min));
}
function rgb8(str, color) {
    return run(str, code([
        38,
        5,
        clampAndTruncate(color)
    ], 39));
}
function bgRgb8(str, color) {
    return run(str, code([
        48,
        5,
        clampAndTruncate(color)
    ], 49));
}
function rgb24(str, color) {
    if (typeof color === "number") {
        return run(str, code([
            38,
            2,
            color >> 16 & 0xff,
            color >> 8 & 0xff,
            color & 0xff
        ], 39));
    }
    return run(str, code([
        38,
        2,
        clampAndTruncate(color.r),
        clampAndTruncate(color.g),
        clampAndTruncate(color.b), 
    ], 39));
}
function bgRgb24(str, color) {
    if (typeof color === "number") {
        return run(str, code([
            48,
            2,
            color >> 16 & 0xff,
            color >> 8 & 0xff,
            color & 0xff
        ], 49));
    }
    return run(str, code([
        48,
        2,
        clampAndTruncate(color.r),
        clampAndTruncate(color.g),
        clampAndTruncate(color.b), 
    ], 49));
}
const ANSI_PATTERN = new RegExp([
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))", 
].join("|"), "g");
function stripColor(string) {
    return string.replace(ANSI_PATTERN, "");
}
const mod = {
    setColorEnabled: setColorEnabled,
    getColorEnabled: getColorEnabled,
    reset: reset,
    bold: bold,
    dim: dim,
    italic: italic,
    underline: underline,
    inverse: inverse,
    hidden: hidden,
    strikethrough: strikethrough,
    black: black,
    red: red,
    green: green,
    yellow: yellow,
    blue: blue,
    magenta: magenta,
    cyan: cyan,
    white: white,
    gray: gray,
    brightBlack: brightBlack,
    brightRed: brightRed,
    brightGreen: brightGreen,
    brightYellow: brightYellow,
    brightBlue: brightBlue,
    brightMagenta: brightMagenta,
    brightCyan: brightCyan,
    brightWhite: brightWhite,
    bgBlack: bgBlack,
    bgRed: bgRed,
    bgGreen: bgGreen,
    bgYellow: bgYellow,
    bgBlue: bgBlue,
    bgMagenta: bgMagenta,
    bgCyan: bgCyan,
    bgWhite: bgWhite,
    bgBrightBlack: bgBrightBlack,
    bgBrightRed: bgBrightRed,
    bgBrightGreen: bgBrightGreen,
    bgBrightYellow: bgBrightYellow,
    bgBrightBlue: bgBrightBlue,
    bgBrightMagenta: bgBrightMagenta,
    bgBrightCyan: bgBrightCyan,
    bgBrightWhite: bgBrightWhite,
    rgb8: rgb8,
    bgRgb8: bgRgb8,
    rgb24: rgb24,
    bgRgb24: bgRgb24,
    stripColor: stripColor
};
const proto = Object.create(null);
const methodNames = Object.keys(mod);
for (const name of methodNames){
    if (name === "setColorEnabled" || name === "getColorEnabled") {
        continue;
    }
    Object.defineProperty(proto, name, {
        get () {
            return factory([
                ...this._stack,
                name
            ]);
        }
    });
}
const colors = factory();
function factory(stack = []) {
    const colors = function(str, ...args) {
        if (str) {
            const lastIndex = stack.length - 1;
            return stack.reduce((str, name, index)=>index === lastIndex ? mod[name](str, ...args) : mod[name](str), str);
        }
        const tmp = stack.slice();
        stack = [];
        return factory(tmp);
    };
    Object.setPrototypeOf(colors, proto);
    colors._stack = stack;
    return colors;
}
const osType = (()=>{
    const { Deno: Deno1  } = globalThis;
    if (typeof Deno1?.build?.os === "string") {
        return Deno1.build.os;
    }
    const { navigator  } = globalThis;
    if (navigator?.appVersion?.includes?.("Win")) {
        return "windows";
    }
    return "linux";
})();
const isWindows = osType === "windows";
const CHAR_FORWARD_SLASH = 47;
function assertPath(path) {
    if (typeof path !== "string") {
        throw new TypeError(`Path must be a string. Received ${JSON.stringify(path)}`);
    }
}
function isPosixPathSeparator(code) {
    return code === 47;
}
function isPathSeparator(code) {
    return isPosixPathSeparator(code) || code === 92;
}
function isWindowsDeviceRoot(code) {
    return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code;
    for(let i = 0, len = path.length; i <= len; ++i){
        if (i < len) code = path.charCodeAt(i);
        else if (isPathSeparator(code)) break;
        else code = CHAR_FORWARD_SLASH;
        if (isPathSeparator(code)) {
            if (lastSlash === i - 1 || dots === 1) {} else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = "";
                            lastSegmentLength = 0;
                        } else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i;
                        dots = 0;
                        continue;
                    } else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) res += `${separator}..`;
                    else res = "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += separator + path.slice(lastSlash + 1, i);
                else res = path.slice(lastSlash + 1, i);
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        } else if (code === 46 && dots !== -1) {
            ++dots;
        } else {
            dots = -1;
        }
    }
    return res;
}
function _format(sep, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) return base;
    if (dir === pathObject.root) return dir + base;
    return dir + sep + base;
}
const WHITESPACE_ENCODINGS = {
    "\u0009": "%09",
    "\u000A": "%0A",
    "\u000B": "%0B",
    "\u000C": "%0C",
    "\u000D": "%0D",
    "\u0020": "%20"
};
function encodeWhitespace(string) {
    return string.replaceAll(/[\s]/g, (c)=>{
        return WHITESPACE_ENCODINGS[c] ?? c;
    });
}
class DenoStdInternalError extends Error {
    constructor(message){
        super(message);
        this.name = "DenoStdInternalError";
    }
}
function assert(expr, msg = "") {
    if (!expr) {
        throw new DenoStdInternalError(msg);
    }
}
const sep = "\\";
const delimiter = ";";
function resolve(...pathSegments) {
    let resolvedDevice = "";
    let resolvedTail = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1; i--){
        let path;
        const { Deno: Deno1  } = globalThis;
        if (i >= 0) {
            path = pathSegments[i];
        } else if (!resolvedDevice) {
            if (typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a drive-letter-less path without a CWD.");
            }
            path = Deno1.cwd();
        } else {
            if (typeof Deno1?.env?.get !== "function" || typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno1.cwd();
            if (path === undefined || path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                path = `${resolvedDevice}\\`;
            }
        }
        assertPath(path);
        const len = path.length;
        if (len === 0) continue;
        let rootEnd = 0;
        let device = "";
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        if (len > 1) {
            if (isPathSeparator(code)) {
                isAbsolute = true;
                if (isPathSeparator(path.charCodeAt(1))) {
                    let j = 2;
                    let last = j;
                    for(; j < len; ++j){
                        if (isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        last = j;
                        for(; j < len; ++j){
                            if (!isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j < len && j !== last) {
                            last = j;
                            for(; j < len; ++j){
                                if (isPathSeparator(path.charCodeAt(j))) break;
                            }
                            if (j === len) {
                                device = `\\\\${firstPart}\\${path.slice(last)}`;
                                rootEnd = j;
                            } else if (j !== last) {
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                } else {
                    rootEnd = 1;
                }
            } else if (isWindowsDeviceRoot(code)) {
                if (path.charCodeAt(1) === 58) {
                    device = path.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (isPathSeparator(path.charCodeAt(2))) {
                            isAbsolute = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        } else if (isPathSeparator(code)) {
            rootEnd = 1;
            isAbsolute = true;
        }
        if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            continue;
        }
        if (resolvedDevice.length === 0 && device.length > 0) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
            resolvedAbsolute = isAbsolute;
        }
        if (resolvedAbsolute && resolvedDevice.length > 0) break;
    }
    resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator);
    return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return ".";
    let rootEnd = 0;
    let device;
    let isAbsolute = false;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            isAbsolute = true;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    const firstPart = path.slice(last, j);
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return `\\\\${firstPart}\\${path.slice(last)}\\`;
                        } else if (j !== last) {
                            device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                            rootEnd = j;
                        }
                    }
                }
            } else {
                rootEnd = 1;
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) {
                        isAbsolute = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    } else if (isPathSeparator(code)) {
        return "\\";
    }
    let tail;
    if (rootEnd < len) {
        tail = normalizeString(path.slice(rootEnd), !isAbsolute, "\\", isPathSeparator);
    } else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute) tail = ".";
    if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
        tail += "\\";
    }
    if (device === undefined) {
        if (isAbsolute) {
            if (tail.length > 0) return `\\${tail}`;
            else return "\\";
        } else if (tail.length > 0) {
            return tail;
        } else {
            return "";
        }
    } else if (isAbsolute) {
        if (tail.length > 0) return `${device}\\${tail}`;
        else return `${device}\\`;
    } else if (tail.length > 0) {
        return device + tail;
    } else {
        return device;
    }
}
function isAbsolute(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return false;
    const code = path.charCodeAt(0);
    if (isPathSeparator(code)) {
        return true;
    } else if (isWindowsDeviceRoot(code)) {
        if (len > 2 && path.charCodeAt(1) === 58) {
            if (isPathSeparator(path.charCodeAt(2))) return true;
        }
    }
    return false;
}
function join(...paths) {
    const pathsCount = paths.length;
    if (pathsCount === 0) return ".";
    let joined;
    let firstPart = null;
    for(let i = 0; i < pathsCount; ++i){
        const path = paths[i];
        assertPath(path);
        if (path.length > 0) {
            if (joined === undefined) joined = firstPart = path;
            else joined += `\\${path}`;
        }
    }
    if (joined === undefined) return ".";
    let needsReplace = true;
    let slashCount = 0;
    assert(firstPart != null);
    if (isPathSeparator(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
            if (isPathSeparator(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    if (needsReplace) {
        for(; slashCount < joined.length; ++slashCount){
            if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
        }
        if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
    }
    return normalize(joined);
}
function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    const fromOrig = resolve(from);
    const toOrig = resolve(to);
    if (fromOrig === toOrig) return "";
    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();
    if (from === to) return "";
    let fromStart = 0;
    let fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 92) break;
    }
    for(; fromEnd - 1 > fromStart; --fromEnd){
        if (from.charCodeAt(fromEnd - 1) !== 92) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 0;
    let toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 92) break;
    }
    for(; toEnd - 1 > toStart; --toEnd){
        if (to.charCodeAt(toEnd - 1) !== 92) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 92) {
                    return toOrig.slice(toStart + i + 1);
                } else if (i === 2) {
                    return toOrig.slice(toStart + i);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 92) {
                    lastCommonSep = i;
                } else if (i === 2) {
                    lastCommonSep = 3;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 92) lastCommonSep = i;
    }
    if (i !== length && lastCommonSep === -1) {
        return toOrig;
    }
    let out = "";
    if (lastCommonSep === -1) lastCommonSep = 0;
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || from.charCodeAt(i) === 92) {
            if (out.length === 0) out += "..";
            else out += "\\..";
        }
    }
    if (out.length > 0) {
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    } else {
        toStart += lastCommonSep;
        if (toOrig.charCodeAt(toStart) === 92) ++toStart;
        return toOrig.slice(toStart, toEnd);
    }
}
function toNamespacedPath(path) {
    if (typeof path !== "string") return path;
    if (path.length === 0) return "";
    const resolvedPath = resolve(path);
    if (resolvedPath.length >= 3) {
        if (resolvedPath.charCodeAt(0) === 92) {
            if (resolvedPath.charCodeAt(1) === 92) {
                const code = resolvedPath.charCodeAt(2);
                if (code !== 63 && code !== 46) {
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
            if (resolvedPath.charCodeAt(1) === 58 && resolvedPath.charCodeAt(2) === 92) {
                return `\\\\?\\${resolvedPath}`;
            }
        }
    }
    return path;
}
function dirname(path) {
    assertPath(path);
    const len = path.length;
    if (len === 0) return ".";
    let rootEnd = -1;
    let end = -1;
    let matchedSlash = true;
    let offset = 0;
    const code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            rootEnd = offset = 1;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            return path;
                        }
                        if (j !== last) {
                            rootEnd = offset = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                rootEnd = offset = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) rootEnd = offset = 3;
                }
            }
        }
    } else if (isPathSeparator(code)) {
        return path;
    }
    for(let i = len - 1; i >= offset; --i){
        if (isPathSeparator(path.charCodeAt(i))) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) {
        if (rootEnd === -1) return ".";
        else end = rootEnd;
    }
    return path.slice(0, end);
}
function basename(path, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (path.length >= 2) {
        const drive = path.charCodeAt(0);
        if (isWindowsDeviceRoot(drive)) {
            if (path.charCodeAt(1) === 58) start = 2;
        }
    }
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i = path.length - 1; i >= start; --i){
            const code = path.charCodeAt(i);
            if (isPathSeparator(code)) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path.length;
        return path.slice(start, end);
    } else {
        for(i = path.length - 1; i >= start; --i){
            if (isPathSeparator(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return "";
        return path.slice(start, end);
    }
}
function extname(path) {
    assertPath(path);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (path.length >= 2 && path.charCodeAt(1) === 58 && isWindowsDeviceRoot(path.charCodeAt(0))) {
        start = startPart = 2;
    }
    for(let i = path.length - 1; i >= start; --i){
        const code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path.slice(startDot, end);
}
function format(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format("\\", pathObject);
}
function parse(path) {
    assertPath(path);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    const len = path.length;
    if (len === 0) return ret;
    let rootEnd = 0;
    let code = path.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            rootEnd = 1;
            if (isPathSeparator(path.charCodeAt(1))) {
                let j = 2;
                let last = j;
                for(; j < len; ++j){
                    if (isPathSeparator(path.charCodeAt(j))) break;
                }
                if (j < len && j !== last) {
                    last = j;
                    for(; j < len; ++j){
                        if (!isPathSeparator(path.charCodeAt(j))) break;
                    }
                    if (j < len && j !== last) {
                        last = j;
                        for(; j < len; ++j){
                            if (isPathSeparator(path.charCodeAt(j))) break;
                        }
                        if (j === len) {
                            rootEnd = j;
                        } else if (j !== last) {
                            rootEnd = j + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path.charCodeAt(1) === 58) {
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path.charCodeAt(2))) {
                        if (len === 3) {
                            ret.root = ret.dir = path;
                            return ret;
                        }
                        rootEnd = 3;
                    }
                } else {
                    ret.root = ret.dir = path;
                    return ret;
                }
            }
        }
    } else if (isPathSeparator(code)) {
        ret.root = ret.dir = path;
        return ret;
    }
    if (rootEnd > 0) ret.root = path.slice(0, rootEnd);
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for(; i >= rootEnd; --i){
        code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            ret.base = ret.name = path.slice(startPart, end);
        }
    } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
        ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path.slice(0, startPart - 1);
    } else ret.dir = ret.root;
    return ret;
}
function fromFileUrl(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    let path = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname != "") {
        path = `\\\\${url.hostname}${path}`;
    }
    return path;
}
function toFileUrl(path) {
    if (!isAbsolute(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const [, hostname, pathname] = path.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
    if (hostname != null && hostname != "localhost") {
        url.hostname = hostname;
        if (!url.hostname) {
            throw new TypeError("Invalid hostname.");
        }
    }
    return url;
}
const mod1 = {
    sep: sep,
    delimiter: delimiter,
    resolve: resolve,
    normalize: normalize,
    isAbsolute: isAbsolute,
    join: join,
    relative: relative,
    toNamespacedPath: toNamespacedPath,
    dirname: dirname,
    basename: basename,
    extname: extname,
    format: format,
    parse: parse,
    fromFileUrl: fromFileUrl,
    toFileUrl: toFileUrl
};
const sep1 = "/";
const delimiter1 = ":";
function resolve1(...pathSegments) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for(let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--){
        let path;
        if (i >= 0) path = pathSegments[i];
        else {
            const { Deno: Deno1  } = globalThis;
            if (typeof Deno1?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path = Deno1.cwd();
        }
        assertPath(path);
        if (path.length === 0) {
            continue;
        }
        resolvedPath = `${path}/${resolvedPath}`;
        resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
    }
    resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator);
    if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return `/${resolvedPath}`;
        else return "/";
    } else if (resolvedPath.length > 0) return resolvedPath;
    else return ".";
}
function normalize1(path) {
    assertPath(path);
    if (path.length === 0) return ".";
    const isAbsolute = path.charCodeAt(0) === 47;
    const trailingSeparator = path.charCodeAt(path.length - 1) === 47;
    path = normalizeString(path, !isAbsolute, "/", isPosixPathSeparator);
    if (path.length === 0 && !isAbsolute) path = ".";
    if (path.length > 0 && trailingSeparator) path += "/";
    if (isAbsolute) return `/${path}`;
    return path;
}
function isAbsolute1(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47;
}
function join1(...paths) {
    if (paths.length === 0) return ".";
    let joined;
    for(let i = 0, len = paths.length; i < len; ++i){
        const path = paths[i];
        assertPath(path);
        if (path.length > 0) {
            if (!joined) joined = path;
            else joined += `/${path}`;
        }
    }
    if (!joined) return ".";
    return normalize1(joined);
}
function relative1(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    from = resolve1(from);
    to = resolve1(to);
    if (from === to) return "";
    let fromStart = 1;
    const fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 47) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 1;
    const toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 47) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === 47) {
                    return to.slice(toStart + i + 1);
                } else if (i === 0) {
                    return to.slice(toStart + i);
                }
            } else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === 47) {
                    lastCommonSep = i;
                } else if (i === 0) {
                    lastCommonSep = 0;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i;
    }
    let out = "";
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || from.charCodeAt(i) === 47) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
    }
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
    }
}
function toNamespacedPath1(path) {
    return path;
}
function dirname1(path) {
    assertPath(path);
    if (path.length === 0) return ".";
    const hasRoot = path.charCodeAt(0) === 47;
    let end = -1;
    let matchedSlash = true;
    for(let i = path.length - 1; i >= 1; --i){
        if (path.charCodeAt(i) === 47) {
            if (!matchedSlash) {
                end = i;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) return hasRoot ? "/" : ".";
    if (hasRoot && end === 1) return "//";
    return path.slice(0, end);
}
function basename1(path, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i;
    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i = path.length - 1; i >= 0; --i){
            const code = path.charCodeAt(i);
            if (code === 47) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path.length;
        return path.slice(start, end);
    } else {
        for(i = path.length - 1; i >= 0; --i){
            if (path.charCodeAt(i) === 47) {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return "";
        return path.slice(start, end);
    }
}
function extname1(path) {
    assertPath(path);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for(let i = path.length - 1; i >= 0; --i){
        const code = path.charCodeAt(i);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path.slice(startDot, end);
}
function format1(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format("/", pathObject);
}
function parse1(path) {
    assertPath(path);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    if (path.length === 0) return ret;
    const isAbsolute = path.charCodeAt(0) === 47;
    let start;
    if (isAbsolute) {
        ret.root = "/";
        start = 1;
    } else {
        start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for(; i >= start; --i){
        const code = path.charCodeAt(i);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            if (startPart === 0 && isAbsolute) {
                ret.base = ret.name = path.slice(1, end);
            } else {
                ret.base = ret.name = path.slice(startPart, end);
            }
        }
    } else {
        if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
        } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
        }
        ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
    else if (isAbsolute) ret.dir = "/";
    return ret;
}
function fromFileUrl1(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function toFileUrl1(path) {
    if (!isAbsolute1(path)) {
        throw new TypeError("Must be an absolute path.");
    }
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(path.replace(/%/g, "%25").replace(/\\/g, "%5C"));
    return url;
}
const mod2 = {
    sep: sep1,
    delimiter: delimiter1,
    resolve: resolve1,
    normalize: normalize1,
    isAbsolute: isAbsolute1,
    join: join1,
    relative: relative1,
    toNamespacedPath: toNamespacedPath1,
    dirname: dirname1,
    basename: basename1,
    extname: extname1,
    format: format1,
    parse: parse1,
    fromFileUrl: fromFileUrl1,
    toFileUrl: toFileUrl1
};
const path = isWindows ? mod1 : mod2;
const { join: join2 , normalize: normalize2  } = path;
const path1 = isWindows ? mod1 : mod2;
const { basename: basename2 , delimiter: delimiter2 , dirname: dirname2 , extname: extname2 , format: format2 , fromFileUrl: fromFileUrl2 , isAbsolute: isAbsolute2 , join: join3 , normalize: normalize3 , parse: parse2 , relative: relative2 , resolve: resolve2 , sep: sep2 , toFileUrl: toFileUrl2 , toNamespacedPath: toNamespacedPath2 ,  } = path1;
function existsSync(filePath) {
    try {
        Deno.lstatSync(filePath);
        return true;
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            return false;
        }
        throw err;
    }
}
function getFileInfoType(fileInfo) {
    return fileInfo.isFile ? "file" : fileInfo.isDirectory ? "dir" : fileInfo.isSymlink ? "symlink" : undefined;
}
function ensureDirSync(dir) {
    try {
        const fileInfo = Deno.lstatSync(dir);
        if (!fileInfo.isDirectory) {
            throw new Error(`Ensure path exists, expected 'dir', got '${getFileInfoType(fileInfo)}'`);
        }
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            Deno.mkdirSync(dir, {
                recursive: true
            });
            return;
        }
        throw err;
    }
}
var EOL;
(function(EOL) {
    EOL["LF"] = "\n";
    EOL["CRLF"] = "\r\n";
})(EOL || (EOL = {}));
class YAMLError extends Error {
    constructor(message = "(unknown reason)", mark = ""){
        super(`${message} ${mark}`);
        this.mark = mark;
        this.name = this.constructor.name;
    }
    toString(_compact) {
        return `${this.name}: ${this.message} ${this.mark}`;
    }
    mark;
}
function isBoolean(value) {
    return typeof value === "boolean" || value instanceof Boolean;
}
function isObject(value) {
    return value !== null && typeof value === "object";
}
function repeat(str, count) {
    let result = "";
    for(let cycle = 0; cycle < count; cycle++){
        result += str;
    }
    return result;
}
function isNegativeZero(i) {
    return i === 0 && Number.NEGATIVE_INFINITY === 1 / i;
}
class Mark {
    constructor(name, buffer, position, line, column){
        this.name = name;
        this.buffer = buffer;
        this.position = position;
        this.line = line;
        this.column = column;
    }
    getSnippet(indent = 4, maxLength = 75) {
        if (!this.buffer) return null;
        let head = "";
        let start = this.position;
        while(start > 0 && "\x00\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1){
            start -= 1;
            if (this.position - start > maxLength / 2 - 1) {
                head = " ... ";
                start += 5;
                break;
            }
        }
        let tail = "";
        let end = this.position;
        while(end < this.buffer.length && "\x00\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1){
            end += 1;
            if (end - this.position > maxLength / 2 - 1) {
                tail = " ... ";
                end -= 5;
                break;
            }
        }
        const snippet = this.buffer.slice(start, end);
        return `${repeat(" ", indent)}${head}${snippet}${tail}\n${repeat(" ", indent + this.position - start + head.length)}^`;
    }
    toString(compact) {
        let snippet, where = "";
        if (this.name) {
            where += `in "${this.name}" `;
        }
        where += `at line ${this.line + 1}, column ${this.column + 1}`;
        if (!compact) {
            snippet = this.getSnippet();
            if (snippet) {
                where += `:\n${snippet}`;
            }
        }
        return where;
    }
    name;
    buffer;
    position;
    line;
    column;
}
function compileList(schema, name, result) {
    const exclude = [];
    for (const includedSchema of schema.include){
        result = compileList(includedSchema, name, result);
    }
    for (const currentType of schema[name]){
        for(let previousIndex = 0; previousIndex < result.length; previousIndex++){
            const previousType = result[previousIndex];
            if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
                exclude.push(previousIndex);
            }
        }
        result.push(currentType);
    }
    return result.filter((type, index)=>!exclude.includes(index));
}
function compileMap(...typesList) {
    const result = {
        fallback: {},
        mapping: {},
        scalar: {},
        sequence: {}
    };
    for (const types of typesList){
        for (const type of types){
            if (type.kind !== null) {
                result[type.kind][type.tag] = result["fallback"][type.tag] = type;
            }
        }
    }
    return result;
}
class Schema {
    static SCHEMA_DEFAULT;
    implicit;
    explicit;
    include;
    compiledImplicit;
    compiledExplicit;
    compiledTypeMap;
    constructor(definition){
        this.explicit = definition.explicit || [];
        this.implicit = definition.implicit || [];
        this.include = definition.include || [];
        for (const type of this.implicit){
            if (type.loadKind && type.loadKind !== "scalar") {
                throw new YAMLError("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
            }
        }
        this.compiledImplicit = compileList(this, "implicit", []);
        this.compiledExplicit = compileList(this, "explicit", []);
        this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }
    static create() {}
}
const DEFAULT_RESOLVE = ()=>true;
const DEFAULT_CONSTRUCT = (data)=>data;
function checkTagFormat(tag) {
    return tag;
}
class Type {
    tag;
    kind = null;
    instanceOf;
    predicate;
    represent;
    defaultStyle;
    styleAliases;
    loadKind;
    constructor(tag, options){
        this.tag = checkTagFormat(tag);
        if (options) {
            this.kind = options.kind;
            this.resolve = options.resolve || DEFAULT_RESOLVE;
            this.construct = options.construct || DEFAULT_CONSTRUCT;
            this.instanceOf = options.instanceOf;
            this.predicate = options.predicate;
            this.represent = options.represent;
            this.defaultStyle = options.defaultStyle;
            this.styleAliases = options.styleAliases;
        }
    }
    resolve = ()=>true;
    construct = (data)=>data;
}
const BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
    if (data === null) return false;
    let code;
    let bitlen = 0;
    const max = data.length;
    const map = BASE64_MAP;
    for(let idx = 0; idx < max; idx++){
        code = map.indexOf(data.charAt(idx));
        if (code > 64) continue;
        if (code < 0) return false;
        bitlen += 6;
    }
    return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
    const input = data.replace(/[\r\n=]/g, "");
    const max = input.length;
    const map = BASE64_MAP;
    const result = [];
    let bits = 0;
    for(let idx = 0; idx < max; idx++){
        if (idx % 4 === 0 && idx) {
            result.push(bits >> 16 & 0xff);
            result.push(bits >> 8 & 0xff);
            result.push(bits & 0xff);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
    }
    const tailbits = max % 4 * 6;
    if (tailbits === 0) {
        result.push(bits >> 16 & 0xff);
        result.push(bits >> 8 & 0xff);
        result.push(bits & 0xff);
    } else if (tailbits === 18) {
        result.push(bits >> 10 & 0xff);
        result.push(bits >> 2 & 0xff);
    } else if (tailbits === 12) {
        result.push(bits >> 4 & 0xff);
    }
    return new Deno.Buffer(new Uint8Array(result));
}
function representYamlBinary(object) {
    const max = object.length;
    const map = BASE64_MAP;
    let result = "";
    let bits = 0;
    for(let idx = 0; idx < max; idx++){
        if (idx % 3 === 0 && idx) {
            result += map[bits >> 18 & 0x3f];
            result += map[bits >> 12 & 0x3f];
            result += map[bits >> 6 & 0x3f];
            result += map[bits & 0x3f];
        }
        bits = (bits << 8) + object[idx];
    }
    const tail = max % 3;
    if (tail === 0) {
        result += map[bits >> 18 & 0x3f];
        result += map[bits >> 12 & 0x3f];
        result += map[bits >> 6 & 0x3f];
        result += map[bits & 0x3f];
    } else if (tail === 2) {
        result += map[bits >> 10 & 0x3f];
        result += map[bits >> 4 & 0x3f];
        result += map[bits << 2 & 0x3f];
        result += map[64];
    } else if (tail === 1) {
        result += map[bits >> 2 & 0x3f];
        result += map[bits << 4 & 0x3f];
        result += map[64];
        result += map[64];
    }
    return result;
}
function isBinary(obj) {
    const buf = new Deno.Buffer();
    try {
        if (0 > buf.readFromSync(obj)) return true;
        return false;
    } catch  {
        return false;
    } finally{
        buf.reset();
    }
}
const binary = new Type("tag:yaml.org,2002:binary", {
    construct: constructYamlBinary,
    kind: "scalar",
    predicate: isBinary,
    represent: representYamlBinary,
    resolve: resolveYamlBinary
});
function resolveYamlBoolean(data) {
    const max = data.length;
    return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
    return data === "true" || data === "True" || data === "TRUE";
}
const bool = new Type("tag:yaml.org,2002:bool", {
    construct: constructYamlBoolean,
    defaultStyle: "lowercase",
    kind: "scalar",
    predicate: isBoolean,
    represent: {
        lowercase (object) {
            return object ? "true" : "false";
        },
        uppercase (object) {
            return object ? "TRUE" : "FALSE";
        },
        camelcase (object) {
            return object ? "True" : "False";
        }
    },
    resolve: resolveYamlBoolean
});
const YAML_FLOAT_PATTERN = new RegExp("^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?" + "|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?" + "|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*" + "|[-+]?\\.(?:inf|Inf|INF)" + "|\\.(?:nan|NaN|NAN))$");
function resolveYamlFloat(data) {
    if (!YAML_FLOAT_PATTERN.test(data) || data[data.length - 1] === "_") {
        return false;
    }
    return true;
}
function constructYamlFloat(data) {
    let value = data.replace(/_/g, "").toLowerCase();
    const sign = value[0] === "-" ? -1 : 1;
    const digits = [];
    if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
    }
    if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    }
    if (value === ".nan") {
        return NaN;
    }
    if (value.indexOf(":") >= 0) {
        value.split(":").forEach((v)=>{
            digits.unshift(parseFloat(v));
        });
        let valueNb = 0.0;
        let base = 1;
        digits.forEach((d)=>{
            valueNb += d * base;
            base *= 60;
        });
        return sign * valueNb;
    }
    return sign * parseFloat(value);
}
const SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
    if (isNaN(object)) {
        switch(style){
            case "lowercase":
                return ".nan";
            case "uppercase":
                return ".NAN";
            case "camelcase":
                return ".NaN";
        }
    } else if (Number.POSITIVE_INFINITY === object) {
        switch(style){
            case "lowercase":
                return ".inf";
            case "uppercase":
                return ".INF";
            case "camelcase":
                return ".Inf";
        }
    } else if (Number.NEGATIVE_INFINITY === object) {
        switch(style){
            case "lowercase":
                return "-.inf";
            case "uppercase":
                return "-.INF";
            case "camelcase":
                return "-.Inf";
        }
    } else if (isNegativeZero(object)) {
        return "-0.0";
    }
    const res = object.toString(10);
    return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || isNegativeZero(object));
}
const __float = new Type("tag:yaml.org,2002:float", {
    construct: constructYamlFloat,
    defaultStyle: "lowercase",
    kind: "scalar",
    predicate: isFloat,
    represent: representYamlFloat,
    resolve: resolveYamlFloat
});
function isHexCode(c) {
    return 0x30 <= c && c <= 0x39 || 0x41 <= c && c <= 0x46 || 0x61 <= c && c <= 0x66;
}
function isOctCode(c) {
    return 0x30 <= c && c <= 0x37;
}
function isDecCode(c) {
    return 0x30 <= c && c <= 0x39;
}
function resolveYamlInteger(data) {
    const max = data.length;
    let index = 0;
    let hasDigits = false;
    if (!max) return false;
    let ch = data[index];
    if (ch === "-" || ch === "+") {
        ch = data[++index];
    }
    if (ch === "0") {
        if (index + 1 === max) return true;
        ch = data[++index];
        if (ch === "b") {
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === "_") continue;
                if (ch !== "0" && ch !== "1") return false;
                hasDigits = true;
            }
            return hasDigits && ch !== "_";
        }
        if (ch === "x") {
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === "_") continue;
                if (!isHexCode(data.charCodeAt(index))) return false;
                hasDigits = true;
            }
            return hasDigits && ch !== "_";
        }
        for(; index < max; index++){
            ch = data[index];
            if (ch === "_") continue;
            if (!isOctCode(data.charCodeAt(index))) return false;
            hasDigits = true;
        }
        return hasDigits && ch !== "_";
    }
    if (ch === "_") return false;
    for(; index < max; index++){
        ch = data[index];
        if (ch === "_") continue;
        if (ch === ":") break;
        if (!isDecCode(data.charCodeAt(index))) {
            return false;
        }
        hasDigits = true;
    }
    if (!hasDigits || ch === "_") return false;
    if (ch !== ":") return true;
    return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
}
function constructYamlInteger(data) {
    let value = data;
    const digits = [];
    if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
    }
    let sign = 1;
    let ch = value[0];
    if (ch === "-" || ch === "+") {
        if (ch === "-") sign = -1;
        value = value.slice(1);
        ch = value[0];
    }
    if (value === "0") return 0;
    if (ch === "0") {
        if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x") return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
    }
    if (value.indexOf(":") !== -1) {
        value.split(":").forEach((v)=>{
            digits.unshift(parseInt(v, 10));
        });
        let valueInt = 0;
        let base = 1;
        digits.forEach((d)=>{
            valueInt += d * base;
            base *= 60;
        });
        return sign * valueInt;
    }
    return sign * parseInt(value, 10);
}
function isInteger(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && object % 1 === 0 && !isNegativeZero(object);
}
const __int = new Type("tag:yaml.org,2002:int", {
    construct: constructYamlInteger,
    defaultStyle: "decimal",
    kind: "scalar",
    predicate: isInteger,
    represent: {
        binary (obj) {
            return obj >= 0 ? `0b${obj.toString(2)}` : `-0b${obj.toString(2).slice(1)}`;
        },
        octal (obj) {
            return obj >= 0 ? `0${obj.toString(8)}` : `-0${obj.toString(8).slice(1)}`;
        },
        decimal (obj) {
            return obj.toString(10);
        },
        hexadecimal (obj) {
            return obj >= 0 ? `0x${obj.toString(16).toUpperCase()}` : `-0x${obj.toString(16).toUpperCase().slice(1)}`;
        }
    },
    resolve: resolveYamlInteger,
    styleAliases: {
        binary: [
            2,
            "bin"
        ],
        decimal: [
            10,
            "dec"
        ],
        hexadecimal: [
            16,
            "hex"
        ],
        octal: [
            8,
            "oct"
        ]
    }
});
const map = new Type("tag:yaml.org,2002:map", {
    construct (data) {
        return data !== null ? data : {};
    },
    kind: "mapping"
});
function resolveYamlMerge(data) {
    return data === "<<" || data === null;
}
const merge = new Type("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: resolveYamlMerge
});
function resolveYamlNull(data) {
    const max = data.length;
    return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
    return null;
}
function isNull(object) {
    return object === null;
}
const nil = new Type("tag:yaml.org,2002:null", {
    construct: constructYamlNull,
    defaultStyle: "lowercase",
    kind: "scalar",
    predicate: isNull,
    represent: {
        canonical () {
            return "~";
        },
        lowercase () {
            return "null";
        },
        uppercase () {
            return "NULL";
        },
        camelcase () {
            return "Null";
        }
    },
    resolve: resolveYamlNull
});
const _hasOwnProperty = Object.prototype.hasOwnProperty;
const _toString = Object.prototype.toString;
function resolveYamlOmap(data) {
    const objectKeys = [];
    let pairKey = "";
    let pairHasKey = false;
    for (const pair of data){
        pairHasKey = false;
        if (_toString.call(pair) !== "[object Object]") return false;
        for(pairKey in pair){
            if (_hasOwnProperty.call(pair, pairKey)) {
                if (!pairHasKey) pairHasKey = true;
                else return false;
            }
        }
        if (!pairHasKey) return false;
        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
    }
    return true;
}
function constructYamlOmap(data) {
    return data !== null ? data : [];
}
const omap = new Type("tag:yaml.org,2002:omap", {
    construct: constructYamlOmap,
    kind: "sequence",
    resolve: resolveYamlOmap
});
const _toString1 = Object.prototype.toString;
function resolveYamlPairs(data) {
    const result = new Array(data.length);
    for(let index = 0; index < data.length; index++){
        const pair = data[index];
        if (_toString1.call(pair) !== "[object Object]") return false;
        const keys = Object.keys(pair);
        if (keys.length !== 1) return false;
        result[index] = [
            keys[0],
            pair[keys[0]]
        ];
    }
    return true;
}
function constructYamlPairs(data) {
    if (data === null) return [];
    const result = new Array(data.length);
    for(let index = 0; index < data.length; index += 1){
        const pair = data[index];
        const keys = Object.keys(pair);
        result[index] = [
            keys[0],
            pair[keys[0]]
        ];
    }
    return result;
}
const pairs = new Type("tag:yaml.org,2002:pairs", {
    construct: constructYamlPairs,
    kind: "sequence",
    resolve: resolveYamlPairs
});
const seq = new Type("tag:yaml.org,2002:seq", {
    construct (data) {
        return data !== null ? data : [];
    },
    kind: "sequence"
});
const _hasOwnProperty1 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
    if (data === null) return true;
    for(const key in data){
        if (_hasOwnProperty1.call(data, key)) {
            if (data[key] !== null) return false;
        }
    }
    return true;
}
function constructYamlSet(data) {
    return data !== null ? data : {};
}
const set = new Type("tag:yaml.org,2002:set", {
    construct: constructYamlSet,
    kind: "mapping",
    resolve: resolveYamlSet
});
const str = new Type("tag:yaml.org,2002:str", {
    construct (data) {
        return data !== null ? data : "";
    },
    kind: "scalar"
});
const YAML_DATE_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])" + "-([0-9][0-9])" + "-([0-9][0-9])$");
const YAML_TIMESTAMP_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])" + "-([0-9][0-9]?)" + "-([0-9][0-9]?)" + "(?:[Tt]|[ \\t]+)" + "([0-9][0-9]?)" + ":([0-9][0-9])" + ":([0-9][0-9])" + "(?:\\.([0-9]*))?" + "(?:[ \\t]*(Z|([-+])([0-9][0-9]?)" + "(?::([0-9][0-9]))?))?$");
function resolveYamlTimestamp(data) {
    if (data === null) return false;
    if (YAML_DATE_REGEXP.exec(data) !== null) return true;
    if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
    return false;
}
function constructYamlTimestamp(data) {
    let match = YAML_DATE_REGEXP.exec(data);
    if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (match === null) throw new Error("Date resolve error");
    const year = +match[1];
    const month = +match[2] - 1;
    const day = +match[3];
    if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
    }
    const hour = +match[4];
    const minute = +match[5];
    const second = +match[6];
    let fraction = 0;
    if (match[7]) {
        let partFraction = match[7].slice(0, 3);
        while(partFraction.length < 3){
            partFraction += "0";
        }
        fraction = +partFraction;
    }
    let delta = null;
    if (match[9]) {
        const tzHour = +match[10];
        const tzMinute = +(match[11] || 0);
        delta = (tzHour * 60 + tzMinute) * 60000;
        if (match[9] === "-") delta = -delta;
    }
    const date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (delta) date.setTime(date.getTime() - delta);
    return date;
}
function representYamlTimestamp(date) {
    return date.toISOString();
}
const timestamp = new Type("tag:yaml.org,2002:timestamp", {
    construct: constructYamlTimestamp,
    instanceOf: Date,
    kind: "scalar",
    represent: representYamlTimestamp,
    resolve: resolveYamlTimestamp
});
const failsafe = new Schema({
    explicit: [
        str,
        seq,
        map
    ]
});
const json = new Schema({
    implicit: [
        nil,
        bool,
        __int,
        __float
    ],
    include: [
        failsafe
    ]
});
const core = new Schema({
    include: [
        json
    ]
});
const def = new Schema({
    explicit: [
        binary,
        omap,
        pairs,
        set
    ],
    implicit: [
        timestamp,
        merge
    ],
    include: [
        core
    ]
});
class State {
    constructor(schema = def){
        this.schema = schema;
    }
    schema;
}
class LoaderState extends State {
    documents;
    length;
    lineIndent;
    lineStart;
    position;
    line;
    filename;
    onWarning;
    legacy;
    json;
    listener;
    implicitTypes;
    typeMap;
    version;
    checkLineBreaks;
    tagMap;
    anchorMap;
    tag;
    anchor;
    kind;
    result;
    constructor(input, { filename , schema , onWarning , legacy =false , json =false , listener =null  }){
        super(schema);
        this.input = input;
        this.documents = [];
        this.lineIndent = 0;
        this.lineStart = 0;
        this.position = 0;
        this.line = 0;
        this.result = "";
        this.filename = filename;
        this.onWarning = onWarning;
        this.legacy = legacy;
        this.json = json;
        this.listener = listener;
        this.implicitTypes = this.schema.compiledImplicit;
        this.typeMap = this.schema.compiledTypeMap;
        this.length = input.length;
    }
    input;
}
const _hasOwnProperty2 = Object.prototype.hasOwnProperty;
const CONTEXT_BLOCK_IN = 3;
const CONTEXT_BLOCK_OUT = 4;
const CHOMPING_STRIP = 2;
const CHOMPING_KEEP = 3;
const PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
const PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
const PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
const PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
const PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
    return Object.prototype.toString.call(obj);
}
function isEOL(c) {
    return c === 0x0a || c === 0x0d;
}
function isWhiteSpace(c) {
    return c === 0x09 || c === 0x20;
}
function isWsOrEol(c) {
    return c === 0x09 || c === 0x20 || c === 0x0a || c === 0x0d;
}
function isFlowIndicator(c) {
    return c === 0x2c || c === 0x5b || c === 0x5d || c === 0x7b || c === 0x7d;
}
function fromHexCode(c) {
    if (0x30 <= c && c <= 0x39) {
        return c - 0x30;
    }
    const lc = c | 0x20;
    if (0x61 <= lc && lc <= 0x66) {
        return lc - 0x61 + 10;
    }
    return -1;
}
function escapedHexLen(c) {
    if (c === 0x78) {
        return 2;
    }
    if (c === 0x75) {
        return 4;
    }
    if (c === 0x55) {
        return 8;
    }
    return 0;
}
function fromDecimalCode(c) {
    if (0x30 <= c && c <= 0x39) {
        return c - 0x30;
    }
    return -1;
}
function simpleEscapeSequence(c) {
    return c === 0x30 ? "\x00" : c === 0x61 ? "\x07" : c === 0x62 ? "\x08" : c === 0x74 ? "\x09" : c === 0x09 ? "\x09" : c === 0x6e ? "\x0A" : c === 0x76 ? "\x0B" : c === 0x66 ? "\x0C" : c === 0x72 ? "\x0D" : c === 0x65 ? "\x1B" : c === 0x20 ? " " : c === 0x22 ? "\x22" : c === 0x2f ? "/" : c === 0x5c ? "\x5C" : c === 0x4e ? "\x85" : c === 0x5f ? "\xA0" : c === 0x4c ? "\u2028" : c === 0x50 ? "\u2029" : "";
}
function charFromCodepoint(c) {
    if (c <= 0xffff) {
        return String.fromCharCode(c);
    }
    return String.fromCharCode((c - 0x010000 >> 10) + 0xd800, (c - 0x010000 & 0x03ff) + 0xdc00);
}
const simpleEscapeCheck = new Array(256);
const simpleEscapeMap = new Array(256);
for(let i = 0; i < 256; i++){
    simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function generateError(state, message) {
    return new YAMLError(message, new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart));
}
function throwError(state, message) {
    throw generateError(state, message);
}
function throwWarning(state, message) {
    if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
    }
}
const directiveHandlers = {
    YAML (state, _name, ...args) {
        if (state.version !== null) {
            return throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
            return throwError(state, "YAML directive accepts exactly one argument");
        }
        const match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
            return throwError(state, "ill-formed argument of the YAML directive");
        }
        const major = parseInt(match[1], 10);
        const minor = parseInt(match[2], 10);
        if (major !== 1) {
            return throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
            return throwWarning(state, "unsupported YAML version of the document");
        }
    },
    TAG (state, _name, ...args) {
        if (args.length !== 2) {
            return throwError(state, "TAG directive accepts exactly two arguments");
        }
        const handle = args[0];
        const prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
            return throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty2.call(state.tagMap, handle)) {
            return throwError(state, `there is a previously declared suffix for "${handle}" tag handle`);
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
            return throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        if (typeof state.tagMap === "undefined") {
            state.tagMap = {};
        }
        state.tagMap[handle] = prefix;
    }
};
function captureSegment(state, start, end, checkJson) {
    let result;
    if (start < end) {
        result = state.input.slice(start, end);
        if (checkJson) {
            for(let position = 0, length = result.length; position < length; position++){
                const character = result.charCodeAt(position);
                if (!(character === 0x09 || 0x20 <= character && character <= 0x10ffff)) {
                    return throwError(state, "expected valid JSON character");
                }
            }
        } else if (PATTERN_NON_PRINTABLE.test(result)) {
            return throwError(state, "the stream contains non-printable characters");
        }
        state.result += result;
    }
}
function mergeMappings(state, destination, source, overridableKeys) {
    if (!isObject(source)) {
        return throwError(state, "cannot merge mappings; the provided source object is unacceptable");
    }
    const keys = Object.keys(source);
    for(let i = 0, len = keys.length; i < len; i++){
        const key = keys[i];
        if (!_hasOwnProperty2.call(destination, key)) {
            destination[key] = source[key];
            overridableKeys[key] = true;
        }
    }
}
function storeMappingPair(state, result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
    if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for(let index = 0, quantity = keyNode.length; index < quantity; index++){
            if (Array.isArray(keyNode[index])) {
                return throwError(state, "nested arrays are not supported inside keys");
            }
            if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
                keyNode[index] = "[object Object]";
            }
        }
    }
    if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
    }
    keyNode = String(keyNode);
    if (result === null) {
        result = {};
    }
    if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
            for(let index1 = 0, quantity1 = valueNode.length; index1 < quantity1; index1++){
                mergeMappings(state, result, valueNode[index1], overridableKeys);
            }
        } else {
            mergeMappings(state, result, valueNode, overridableKeys);
        }
    } else {
        if (!state.json && !_hasOwnProperty2.call(overridableKeys, keyNode) && _hasOwnProperty2.call(result, keyNode)) {
            state.line = startLine || state.line;
            state.position = startPos || state.position;
            return throwError(state, "duplicated mapping key");
        }
        result[keyNode] = valueNode;
        delete overridableKeys[keyNode];
    }
    return result;
}
function readLineBreak(state) {
    const ch = state.input.charCodeAt(state.position);
    if (ch === 0x0a) {
        state.position++;
    } else if (ch === 0x0d) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 0x0a) {
            state.position++;
        }
    } else {
        return throwError(state, "a line break is expected");
    }
    state.line += 1;
    state.lineStart = state.position;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
    let lineBreaks = 0, ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        while(isWhiteSpace(ch)){
            ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 0x23) {
            do {
                ch = state.input.charCodeAt(++state.position);
            }while (ch !== 0x0a && ch !== 0x0d && ch !== 0)
        }
        if (isEOL(ch)) {
            readLineBreak(state);
            ch = state.input.charCodeAt(state.position);
            lineBreaks++;
            state.lineIndent = 0;
            while(ch === 0x20){
                state.lineIndent++;
                ch = state.input.charCodeAt(++state.position);
            }
        } else {
            break;
        }
    }
    if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
    }
    return lineBreaks;
}
function testDocumentSeparator(state) {
    let _position = state.position;
    let ch = state.input.charCodeAt(_position);
    if ((ch === 0x2d || ch === 0x2e) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || isWsOrEol(ch)) {
            return true;
        }
    }
    return false;
}
function writeFoldedLines(state, count) {
    if (count === 1) {
        state.result += " ";
    } else if (count > 1) {
        state.result += repeat("\n", count - 1);
    }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    const kind = state.kind;
    const result = state.result;
    let ch = state.input.charCodeAt(state.position);
    if (isWsOrEol(ch) || isFlowIndicator(ch) || ch === 0x23 || ch === 0x26 || ch === 0x2a || ch === 0x21 || ch === 0x7c || ch === 0x3e || ch === 0x27 || ch === 0x22 || ch === 0x25 || ch === 0x40 || ch === 0x60) {
        return false;
    }
    let following;
    if (ch === 0x3f || ch === 0x2d) {
        following = state.input.charCodeAt(state.position + 1);
        if (isWsOrEol(following) || withinFlowCollection && isFlowIndicator(following)) {
            return false;
        }
    }
    state.kind = "scalar";
    state.result = "";
    let captureEnd, captureStart = captureEnd = state.position;
    let hasPendingContent = false;
    let line = 0;
    while(ch !== 0){
        if (ch === 0x3a) {
            following = state.input.charCodeAt(state.position + 1);
            if (isWsOrEol(following) || withinFlowCollection && isFlowIndicator(following)) {
                break;
            }
        } else if (ch === 0x23) {
            const preceding = state.input.charCodeAt(state.position - 1);
            if (isWsOrEol(preceding)) {
                break;
            }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && isFlowIndicator(ch)) {
            break;
        } else if (isEOL(ch)) {
            line = state.line;
            const lineStart = state.lineStart;
            const lineIndent = state.lineIndent;
            skipSeparationSpace(state, false, -1);
            if (state.lineIndent >= nodeIndent) {
                hasPendingContent = true;
                ch = state.input.charCodeAt(state.position);
                continue;
            } else {
                state.position = captureEnd;
                state.line = line;
                state.lineStart = lineStart;
                state.lineIndent = lineIndent;
                break;
            }
        }
        if (hasPendingContent) {
            captureSegment(state, captureStart, captureEnd, false);
            writeFoldedLines(state, state.line - line);
            captureStart = captureEnd = state.position;
            hasPendingContent = false;
        }
        if (!isWhiteSpace(ch)) {
            captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, captureEnd, false);
    if (state.result) {
        return true;
    }
    state.kind = kind;
    state.result = result;
    return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
    let ch, captureStart, captureEnd;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x27) {
        return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        if (ch === 0x27) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (ch === 0x27) {
                captureStart = state.position;
                state.position++;
                captureEnd = state.position;
            } else {
                return true;
            }
        } else if (isEOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            return throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
            state.position++;
            captureEnd = state.position;
        }
    }
    return throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
    let ch = state.input.charCodeAt(state.position);
    if (ch !== 0x22) {
        return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    let captureEnd, captureStart = captureEnd = state.position;
    let tmp;
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        if (ch === 0x22) {
            captureSegment(state, captureStart, state.position, true);
            state.position++;
            return true;
        }
        if (ch === 0x5c) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (isEOL(ch)) {
                skipSeparationSpace(state, false, nodeIndent);
            } else if (ch < 256 && simpleEscapeCheck[ch]) {
                state.result += simpleEscapeMap[ch];
                state.position++;
            } else if ((tmp = escapedHexLen(ch)) > 0) {
                let hexLength = tmp;
                let hexResult = 0;
                for(; hexLength > 0; hexLength--){
                    ch = state.input.charCodeAt(++state.position);
                    if ((tmp = fromHexCode(ch)) >= 0) {
                        hexResult = (hexResult << 4) + tmp;
                    } else {
                        return throwError(state, "expected hexadecimal character");
                    }
                }
                state.result += charFromCodepoint(hexResult);
                state.position++;
            } else {
                return throwError(state, "unknown escape sequence");
            }
            captureStart = captureEnd = state.position;
        } else if (isEOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            return throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
            state.position++;
            captureEnd = state.position;
        }
    }
    return throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
    let ch = state.input.charCodeAt(state.position);
    let terminator;
    let isMapping = true;
    let result = {};
    if (ch === 0x5b) {
        terminator = 0x5d;
        isMapping = false;
        result = [];
    } else if (ch === 0x7b) {
        terminator = 0x7d;
    } else {
        return false;
    }
    if (state.anchor !== null && typeof state.anchor != "undefined" && typeof state.anchorMap != "undefined") {
        state.anchorMap[state.anchor] = result;
    }
    ch = state.input.charCodeAt(++state.position);
    const tag = state.tag, anchor = state.anchor;
    let readNext = true;
    let valueNode, keyNode, keyTag = keyNode = valueNode = null, isExplicitPair, isPair = isExplicitPair = false;
    let following = 0, line = 0;
    const overridableKeys = {};
    while(ch !== 0){
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
            state.position++;
            state.tag = tag;
            state.anchor = anchor;
            state.kind = isMapping ? "mapping" : "sequence";
            state.result = result;
            return true;
        }
        if (!readNext) {
            return throwError(state, "missed comma between flow collection entries");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 0x3f) {
            following = state.input.charCodeAt(state.position + 1);
            if (isWsOrEol(following)) {
                isPair = isExplicitPair = true;
                state.position++;
                skipSeparationSpace(state, true, nodeIndent);
            }
        }
        line = state.line;
        composeNode(state, nodeIndent, 1, false, true);
        keyTag = state.tag || null;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === line) && ch === 0x3a) {
            isPair = true;
            ch = state.input.charCodeAt(++state.position);
            skipSeparationSpace(state, true, nodeIndent);
            composeNode(state, nodeIndent, 1, false, true);
            valueNode = state.result;
        }
        if (isMapping) {
            storeMappingPair(state, result, overridableKeys, keyTag, keyNode, valueNode);
        } else if (isPair) {
            result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        } else {
            result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 0x2c) {
            readNext = true;
            ch = state.input.charCodeAt(++state.position);
        } else {
            readNext = false;
        }
    }
    return throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
    let chomping = 1, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false;
    let ch = state.input.charCodeAt(state.position);
    let folding = false;
    if (ch === 0x7c) {
        folding = false;
    } else if (ch === 0x3e) {
        folding = true;
    } else {
        return false;
    }
    state.kind = "scalar";
    state.result = "";
    let tmp = 0;
    while(ch !== 0){
        ch = state.input.charCodeAt(++state.position);
        if (ch === 0x2b || ch === 0x2d) {
            if (1 === chomping) {
                chomping = ch === 0x2b ? CHOMPING_KEEP : CHOMPING_STRIP;
            } else {
                return throwError(state, "repeat of a chomping mode identifier");
            }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
            if (tmp === 0) {
                return throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
            } else if (!detectedIndent) {
                textIndent = nodeIndent + tmp - 1;
                detectedIndent = true;
            } else {
                return throwError(state, "repeat of an indentation width identifier");
            }
        } else {
            break;
        }
    }
    if (isWhiteSpace(ch)) {
        do {
            ch = state.input.charCodeAt(++state.position);
        }while (isWhiteSpace(ch))
        if (ch === 0x23) {
            do {
                ch = state.input.charCodeAt(++state.position);
            }while (!isEOL(ch) && ch !== 0)
        }
    }
    while(ch !== 0){
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while((!detectedIndent || state.lineIndent < textIndent) && ch === 0x20){
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
            textIndent = state.lineIndent;
        }
        if (isEOL(ch)) {
            emptyLines++;
            continue;
        }
        if (state.lineIndent < textIndent) {
            if (chomping === 3) {
                state.result += repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
            } else if (chomping === 1) {
                if (didReadContent) {
                    state.result += "\n";
                }
            }
            break;
        }
        if (folding) {
            if (isWhiteSpace(ch)) {
                atMoreIndented = true;
                state.result += repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
            } else if (atMoreIndented) {
                atMoreIndented = false;
                state.result += repeat("\n", emptyLines + 1);
            } else if (emptyLines === 0) {
                if (didReadContent) {
                    state.result += " ";
                }
            } else {
                state.result += repeat("\n", emptyLines);
            }
        } else {
            state.result += repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        const captureStart = state.position;
        while(!isEOL(ch) && ch !== 0){
            ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
    }
    return true;
}
function readBlockSequence(state, nodeIndent) {
    let line, following, detected = false, ch;
    const tag = state.tag, anchor = state.anchor, result = [];
    if (state.anchor !== null && typeof state.anchor !== "undefined" && typeof state.anchorMap !== "undefined") {
        state.anchorMap[state.anchor] = result;
    }
    ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        if (ch !== 0x2d) {
            break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!isWsOrEol(following)) {
            break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
            if (state.lineIndent <= nodeIndent) {
                result.push(null);
                ch = state.input.charCodeAt(state.position);
                continue;
            }
        }
        line = state.line;
        composeNode(state, nodeIndent, 3, false, true);
        result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === line || state.lineIndent > nodeIndent) && ch !== 0) {
            return throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
            break;
        }
    }
    if (detected) {
        state.tag = tag;
        state.anchor = anchor;
        state.kind = "sequence";
        state.result = result;
        return true;
    }
    return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
    const tag = state.tag, anchor = state.anchor, result = {}, overridableKeys = {};
    let following, allowCompact = false, line, pos, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
    if (state.anchor !== null && typeof state.anchor !== "undefined" && typeof state.anchorMap !== "undefined") {
        state.anchorMap[state.anchor] = result;
    }
    ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        following = state.input.charCodeAt(state.position + 1);
        line = state.line;
        pos = state.position;
        if ((ch === 0x3f || ch === 0x3a) && isWsOrEol(following)) {
            if (ch === 0x3f) {
                if (atExplicitKey) {
                    storeMappingPair(state, result, overridableKeys, keyTag, keyNode, null);
                    keyTag = keyNode = valueNode = null;
                }
                detected = true;
                atExplicitKey = true;
                allowCompact = true;
            } else if (atExplicitKey) {
                atExplicitKey = false;
                allowCompact = true;
            } else {
                return throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
            }
            state.position += 1;
            ch = following;
        } else if (composeNode(state, flowIndent, 2, false, true)) {
            if (state.line === line) {
                ch = state.input.charCodeAt(state.position);
                while(isWhiteSpace(ch)){
                    ch = state.input.charCodeAt(++state.position);
                }
                if (ch === 0x3a) {
                    ch = state.input.charCodeAt(++state.position);
                    if (!isWsOrEol(ch)) {
                        return throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
                    }
                    if (atExplicitKey) {
                        storeMappingPair(state, result, overridableKeys, keyTag, keyNode, null);
                        keyTag = keyNode = valueNode = null;
                    }
                    detected = true;
                    atExplicitKey = false;
                    allowCompact = false;
                    keyTag = state.tag;
                    keyNode = state.result;
                } else if (detected) {
                    return throwError(state, "can not read an implicit mapping pair; a colon is missed");
                } else {
                    state.tag = tag;
                    state.anchor = anchor;
                    return true;
                }
            } else if (detected) {
                return throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
            } else {
                state.tag = tag;
                state.anchor = anchor;
                return true;
            }
        } else {
            break;
        }
        if (state.line === line || state.lineIndent > nodeIndent) {
            if (composeNode(state, nodeIndent, 4, true, allowCompact)) {
                if (atExplicitKey) {
                    keyNode = state.result;
                } else {
                    valueNode = state.result;
                }
            }
            if (!atExplicitKey) {
                storeMappingPair(state, result, overridableKeys, keyTag, keyNode, valueNode, line, pos);
                keyTag = keyNode = valueNode = null;
            }
            skipSeparationSpace(state, true, -1);
            ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && ch !== 0) {
            return throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
            break;
        }
    }
    if (atExplicitKey) {
        storeMappingPair(state, result, overridableKeys, keyTag, keyNode, null);
    }
    if (detected) {
        state.tag = tag;
        state.anchor = anchor;
        state.kind = "mapping";
        state.result = result;
    }
    return detected;
}
function readTagProperty(state) {
    let position, isVerbatim = false, isNamed = false, tagHandle = "", tagName, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x21) return false;
    if (state.tag !== null) {
        return throwError(state, "duplication of a tag property");
    }
    ch = state.input.charCodeAt(++state.position);
    if (ch === 0x3c) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
    } else if (ch === 0x21) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
    } else {
        tagHandle = "!";
    }
    position = state.position;
    if (isVerbatim) {
        do {
            ch = state.input.charCodeAt(++state.position);
        }while (ch !== 0 && ch !== 0x3e)
        if (state.position < state.length) {
            tagName = state.input.slice(position, state.position);
            ch = state.input.charCodeAt(++state.position);
        } else {
            return throwError(state, "unexpected end of the stream within a verbatim tag");
        }
    } else {
        while(ch !== 0 && !isWsOrEol(ch)){
            if (ch === 0x21) {
                if (!isNamed) {
                    tagHandle = state.input.slice(position - 1, state.position + 1);
                    if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                        return throwError(state, "named tag handle cannot contain such characters");
                    }
                    isNamed = true;
                    position = state.position + 1;
                } else {
                    return throwError(state, "tag suffix cannot contain exclamation marks");
                }
            }
            ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
            return throwError(state, "tag suffix cannot contain flow indicator characters");
        }
    }
    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        return throwError(state, `tag name cannot contain such characters: ${tagName}`);
    }
    if (isVerbatim) {
        state.tag = tagName;
    } else if (typeof state.tagMap !== "undefined" && _hasOwnProperty2.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
    } else if (tagHandle === "!") {
        state.tag = `!${tagName}`;
    } else if (tagHandle === "!!") {
        state.tag = `tag:yaml.org,2002:${tagName}`;
    } else {
        return throwError(state, `undeclared tag handle "${tagHandle}"`);
    }
    return true;
}
function readAnchorProperty(state) {
    let ch = state.input.charCodeAt(state.position);
    if (ch !== 0x26) return false;
    if (state.anchor !== null) {
        return throwError(state, "duplication of an anchor property");
    }
    ch = state.input.charCodeAt(++state.position);
    const position = state.position;
    while(ch !== 0 && !isWsOrEol(ch) && !isFlowIndicator(ch)){
        ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === position) {
        return throwError(state, "name of an anchor node must contain at least one character");
    }
    state.anchor = state.input.slice(position, state.position);
    return true;
}
function readAlias(state) {
    let ch = state.input.charCodeAt(state.position);
    if (ch !== 0x2a) return false;
    ch = state.input.charCodeAt(++state.position);
    const _position = state.position;
    while(ch !== 0 && !isWsOrEol(ch) && !isFlowIndicator(ch)){
        ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
        return throwError(state, "name of an alias node must contain at least one character");
    }
    const alias = state.input.slice(_position, state.position);
    if (typeof state.anchorMap !== "undefined" && !Object.prototype.hasOwnProperty.call(state.anchorMap, alias)) {
        return throwError(state, `unidentified alias "${alias}"`);
    }
    if (typeof state.anchorMap !== "undefined") {
        state.result = state.anchorMap[alias];
    }
    skipSeparationSpace(state, true, -1);
    return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    let allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, type, flowIndent, blockIndent;
    if (state.listener && state.listener !== null) {
        state.listener("open", state);
    }
    state.tag = null;
    state.anchor = null;
    state.kind = null;
    state.result = null;
    const allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
    if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            if (state.lineIndent > parentIndent) {
                indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
                indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
                indentStatus = -1;
            }
        }
    }
    if (indentStatus === 1) {
        while(readTagProperty(state) || readAnchorProperty(state)){
            if (skipSeparationSpace(state, true, -1)) {
                atNewLine = true;
                allowBlockCollections = allowBlockStyles;
                if (state.lineIndent > parentIndent) {
                    indentStatus = 1;
                } else if (state.lineIndent === parentIndent) {
                    indentStatus = 0;
                } else if (state.lineIndent < parentIndent) {
                    indentStatus = -1;
                }
            } else {
                allowBlockCollections = false;
            }
        }
    }
    if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
    }
    if (indentStatus === 1 || 4 === nodeContext) {
        const cond = 1 === nodeContext || 2 === nodeContext;
        flowIndent = cond ? parentIndent : parentIndent + 1;
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
            if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
                hasContent = true;
            } else {
                if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
                    hasContent = true;
                } else if (readAlias(state)) {
                    hasContent = true;
                    if (state.tag !== null || state.anchor !== null) {
                        return throwError(state, "alias node should not have Any properties");
                    }
                } else if (readPlainScalar(state, flowIndent, 1 === nodeContext)) {
                    hasContent = true;
                    if (state.tag === null) {
                        state.tag = "?";
                    }
                }
                if (state.anchor !== null && typeof state.anchorMap !== "undefined") {
                    state.anchorMap[state.anchor] = state.result;
                }
            }
        } else if (indentStatus === 0) {
            hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
    }
    if (state.tag !== null && state.tag !== "!") {
        if (state.tag === "?") {
            for(let typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex++){
                type = state.implicitTypes[typeIndex];
                if (type.resolve(state.result)) {
                    state.result = type.construct(state.result);
                    state.tag = type.tag;
                    if (state.anchor !== null && typeof state.anchorMap !== "undefined") {
                        state.anchorMap[state.anchor] = state.result;
                    }
                    break;
                }
            }
        } else if (_hasOwnProperty2.call(state.typeMap[state.kind || "fallback"], state.tag)) {
            type = state.typeMap[state.kind || "fallback"][state.tag];
            if (state.result !== null && type.kind !== state.kind) {
                return throwError(state, `unacceptable node kind for !<${state.tag}> tag; it should be "${type.kind}", not "${state.kind}"`);
            }
            if (!type.resolve(state.result)) {
                return throwError(state, `cannot resolve a node with !<${state.tag}> explicit tag`);
            } else {
                state.result = type.construct(state.result);
                if (state.anchor !== null && typeof state.anchorMap !== "undefined") {
                    state.anchorMap[state.anchor] = state.result;
                }
            }
        } else {
            return throwError(state, `unknown tag !<${state.tag}>`);
        }
    }
    if (state.listener && state.listener !== null) {
        state.listener("close", state);
    }
    return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
    const documentStart = state.position;
    let position, directiveName, directiveArgs, hasDirectives = false, ch;
    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = {};
    state.anchorMap = {};
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 0x25) {
            break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        position = state.position;
        while(ch !== 0 && !isWsOrEol(ch)){
            ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
            return throwError(state, "directive name must not be less than one character in length");
        }
        while(ch !== 0){
            while(isWhiteSpace(ch)){
                ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 0x23) {
                do {
                    ch = state.input.charCodeAt(++state.position);
                }while (ch !== 0 && !isEOL(ch))
                break;
            }
            if (isEOL(ch)) break;
            position = state.position;
            while(ch !== 0 && !isWsOrEol(ch)){
                ch = state.input.charCodeAt(++state.position);
            }
            directiveArgs.push(state.input.slice(position, state.position));
        }
        if (ch !== 0) readLineBreak(state);
        if (_hasOwnProperty2.call(directiveHandlers, directiveName)) {
            directiveHandlers[directiveName](state, directiveName, ...directiveArgs);
        } else {
            throwWarning(state, `unknown document directive "${directiveName}"`);
        }
    }
    skipSeparationSpace(state, true, -1);
    if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 0x2d && state.input.charCodeAt(state.position + 1) === 0x2d && state.input.charCodeAt(state.position + 2) === 0x2d) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
    } else if (hasDirectives) {
        return throwError(state, "directives end mark is expected");
    }
    composeNode(state, state.lineIndent - 1, 4, false, true);
    skipSeparationSpace(state, true, -1);
    if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
    }
    state.documents.push(state.result);
    if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 0x2e) {
            state.position += 3;
            skipSeparationSpace(state, true, -1);
        }
        return;
    }
    if (state.position < state.length - 1) {
        return throwError(state, "end of the stream or a document separator is expected");
    } else {
        return;
    }
}
function loadDocuments(input, options) {
    input = String(input);
    options = options || {};
    if (input.length !== 0) {
        if (input.charCodeAt(input.length - 1) !== 0x0a && input.charCodeAt(input.length - 1) !== 0x0d) {
            input += "\n";
        }
        if (input.charCodeAt(0) === 0xfeff) {
            input = input.slice(1);
        }
    }
    const state = new LoaderState(input, options);
    state.input += "\0";
    while(state.input.charCodeAt(state.position) === 0x20){
        state.lineIndent += 1;
        state.position += 1;
    }
    while(state.position < state.length - 1){
        readDocument(state);
    }
    return state.documents;
}
function load(input, options) {
    const documents = loadDocuments(input, options);
    if (documents.length === 0) {
        return;
    }
    if (documents.length === 1) {
        return documents[0];
    }
    throw new YAMLError("expected a single document in the stream, but found more");
}
function parse3(content, options) {
    return load(content, options);
}
Object.prototype.hasOwnProperty;
const _toString2 = Object.prototype.toString;
const _hasOwnProperty3 = Object.prototype.hasOwnProperty;
const ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0x00] = "\\0";
ESCAPE_SEQUENCES[0x07] = "\\a";
ESCAPE_SEQUENCES[0x08] = "\\b";
ESCAPE_SEQUENCES[0x09] = "\\t";
ESCAPE_SEQUENCES[0x0a] = "\\n";
ESCAPE_SEQUENCES[0x0b] = "\\v";
ESCAPE_SEQUENCES[0x0c] = "\\f";
ESCAPE_SEQUENCES[0x0d] = "\\r";
ESCAPE_SEQUENCES[0x1b] = "\\e";
ESCAPE_SEQUENCES[0x22] = '\\"';
ESCAPE_SEQUENCES[0x5c] = "\\\\";
ESCAPE_SEQUENCES[0x85] = "\\N";
ESCAPE_SEQUENCES[0xa0] = "\\_";
ESCAPE_SEQUENCES[0x2028] = "\\L";
ESCAPE_SEQUENCES[0x2029] = "\\P";
const DEPRECATED_BOOLEANS_SYNTAX = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF", 
];
function encodeHex(character) {
    const string = character.toString(16).toUpperCase();
    let handle;
    let length;
    if (character <= 0xff) {
        handle = "x";
        length = 2;
    } else if (character <= 0xffff) {
        handle = "u";
        length = 4;
    } else if (character <= 0xffffffff) {
        handle = "U";
        length = 8;
    } else {
        throw new YAMLError("code point within a string may not be greater than 0xFFFFFFFF");
    }
    return `\\${handle}${repeat("0", length - string.length)}${string}`;
}
function indentString(string, spaces) {
    const ind = repeat(" ", spaces), length = string.length;
    let position = 0, next = -1, result = "", line;
    while(position < length){
        next = string.indexOf("\n", position);
        if (next === -1) {
            line = string.slice(position);
            position = length;
        } else {
            line = string.slice(position, next + 1);
            position = next + 1;
        }
        if (line.length && line !== "\n") result += ind;
        result += line;
    }
    return result;
}
function generateNextLine(state, level) {
    return `\n${repeat(" ", state.indent * level)}`;
}
function testImplicitResolving(state, str) {
    let type;
    for(let index = 0, length = state.implicitTypes.length; index < length; index += 1){
        type = state.implicitTypes[index];
        if (type.resolve(str)) {
            return true;
        }
    }
    return false;
}
function isWhitespace(c) {
    return c === 0x20 || c === 0x09;
}
function isPrintable(c) {
    return 0x00020 <= c && c <= 0x00007e || 0x000a1 <= c && c <= 0x00d7ff && c !== 0x2028 && c !== 0x2029 || 0x0e000 <= c && c <= 0x00fffd && c !== 0xfeff || 0x10000 <= c && c <= 0x10ffff;
}
function isPlainSafe(c) {
    return isPrintable(c) && c !== 0xfeff && c !== 0x2c && c !== 0x5b && c !== 0x5d && c !== 0x7b && c !== 0x7d && c !== 0x3a && c !== 0x23;
}
function isPlainSafeFirst(c) {
    return isPrintable(c) && c !== 0xfeff && !isWhitespace(c) && c !== 0x2d && c !== 0x3f && c !== 0x3a && c !== 0x2c && c !== 0x5b && c !== 0x5d && c !== 0x7b && c !== 0x7d && c !== 0x23 && c !== 0x26 && c !== 0x2a && c !== 0x21 && c !== 0x7c && c !== 0x3e && c !== 0x27 && c !== 0x22 && c !== 0x25 && c !== 0x40 && c !== 0x60;
}
function needIndentIndicator(string) {
    const leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string);
}
const STYLE_PLAIN = 1, STYLE_SINGLE = 2, STYLE_LITERAL = 3, STYLE_FOLDED = 4, STYLE_DOUBLE = 5;
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
    const shouldTrackWidth = lineWidth !== -1;
    let hasLineBreak = false, hasFoldableLine = false, previousLineBreak = -1, plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
    let __char, i;
    if (singleLineOnly) {
        for(i = 0; i < string.length; i++){
            __char = string.charCodeAt(i);
            if (!isPrintable(__char)) {
                return 5;
            }
            plain = plain && isPlainSafe(__char);
        }
    } else {
        for(i = 0; i < string.length; i++){
            __char = string.charCodeAt(i);
            if (__char === 0x0a) {
                hasLineBreak = true;
                if (shouldTrackWidth) {
                    hasFoldableLine = hasFoldableLine || i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
                    previousLineBreak = i;
                }
            } else if (!isPrintable(__char)) {
                return 5;
            }
            plain = plain && isPlainSafe(__char);
        }
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
    }
    if (!hasLineBreak && !hasFoldableLine) {
        return plain && !testAmbiguousType(string) ? 1 : 2;
    }
    if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return 5;
    }
    return hasFoldableLine ? 4 : 3;
}
function foldLine(line, width) {
    if (line === "" || line[0] === " ") return line;
    const breakRe = / [^ ]/g;
    let match;
    let start = 0, end, curr = 0, next = 0;
    let result = "";
    while(match = breakRe.exec(line)){
        next = match.index;
        if (next - start > width) {
            end = curr > start ? curr : next;
            result += `\n${line.slice(start, end)}`;
            start = end + 1;
        }
        curr = next;
    }
    result += "\n";
    if (line.length - start > width && curr > start) {
        result += `${line.slice(start, curr)}\n${line.slice(curr + 1)}`;
    } else {
        result += line.slice(start);
    }
    return result.slice(1);
}
function dropEndingNewline(string) {
    return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
function foldString(string, width) {
    const lineRe = /(\n+)([^\n]*)/g;
    let result = (()=>{
        let nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
    })();
    let prevMoreIndented = string[0] === "\n" || string[0] === " ";
    let moreIndented;
    let match;
    while(match = lineRe.exec(string)){
        const prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
    }
    return result;
}
function escapeString(string) {
    let result = "";
    let __char, nextChar;
    let escapeSeq;
    for(let i = 0; i < string.length; i++){
        __char = string.charCodeAt(i);
        if (__char >= 0xd800 && __char <= 0xdbff) {
            nextChar = string.charCodeAt(i + 1);
            if (nextChar >= 0xdc00 && nextChar <= 0xdfff) {
                result += encodeHex((__char - 0xd800) * 0x400 + nextChar - 0xdc00 + 0x10000);
                i++;
                continue;
            }
        }
        escapeSeq = ESCAPE_SEQUENCES[__char];
        result += !escapeSeq && isPrintable(__char) ? string[i] : escapeSeq || encodeHex(__char);
    }
    return result;
}
function blockHeader(string, indentPerLevel) {
    const indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
    const clip = string[string.length - 1] === "\n";
    const keep = clip && (string[string.length - 2] === "\n" || string === "\n");
    const chomp = keep ? "+" : clip ? "" : "-";
    return `${indentIndicator}${chomp}\n`;
}
function writeScalar(state, string, level, iskey) {
    state.dump = (()=>{
        if (string.length === 0) {
            return "''";
        }
        if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
            return `'${string}'`;
        }
        const indent = state.indent * Math.max(1, level);
        const lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        const singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(str) {
            return testImplicitResolving(state, str);
        }
        switch(chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)){
            case STYLE_PLAIN:
                return string;
            case STYLE_SINGLE:
                return `'${string.replace(/'/g, "''")}'`;
            case STYLE_LITERAL:
                return `|${blockHeader(string, state.indent)}${dropEndingNewline(indentString(string, indent))}`;
            case STYLE_FOLDED:
                return `>${blockHeader(string, state.indent)}${dropEndingNewline(indentString(foldString(string, lineWidth), indent))}`;
            case STYLE_DOUBLE:
                return `"${escapeString(string)}"`;
            default:
                throw new YAMLError("impossible error: invalid scalar style");
        }
    })();
}
function writeFlowSequence(state, level, object) {
    let _result = "";
    const _tag = state.tag;
    for(let index = 0, length = object.length; index < length; index += 1){
        if (writeNode(state, level, object[index], false, false)) {
            if (index !== 0) _result += `,${!state.condenseFlow ? " " : ""}`;
            _result += state.dump;
        }
    }
    state.tag = _tag;
    state.dump = `[${_result}]`;
}
function writeBlockSequence(state, level, object, compact = false) {
    let _result = "";
    const _tag = state.tag;
    for(let index = 0, length = object.length; index < length; index += 1){
        if (writeNode(state, level + 1, object[index], true, true)) {
            if (!compact || index !== 0) {
                _result += generateNextLine(state, level);
            }
            if (state.dump && 0x0a === state.dump.charCodeAt(0)) {
                _result += "-";
            } else {
                _result += "- ";
            }
            _result += state.dump;
        }
    }
    state.tag = _tag;
    state.dump = _result || "[]";
}
function writeFlowMapping(state, level, object) {
    let _result = "";
    const _tag = state.tag, objectKeyList = Object.keys(object);
    let pairBuffer, objectKey, objectValue;
    for(let index = 0, length = objectKeyList.length; index < length; index += 1){
        pairBuffer = state.condenseFlow ? '"' : "";
        if (index !== 0) pairBuffer += ", ";
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
            continue;
        }
        if (state.dump.length > 1024) pairBuffer += "? ";
        pairBuffer += `${state.dump}${state.condenseFlow ? '"' : ""}:${state.condenseFlow ? "" : " "}`;
        if (!writeNode(state, level, objectValue, false, false)) {
            continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = `{${_result}}`;
}
function writeBlockMapping(state, level, object, compact = false) {
    const _tag = state.tag, objectKeyList = Object.keys(object);
    let _result = "";
    if (state.sortKeys === true) {
        objectKeyList.sort();
    } else if (typeof state.sortKeys === "function") {
        objectKeyList.sort(state.sortKeys);
    } else if (state.sortKeys) {
        throw new YAMLError("sortKeys must be a boolean or a function");
    }
    let pairBuffer = "", objectKey, objectValue, explicitPair;
    for(let index = 0, length = objectKeyList.length; index < length; index += 1){
        pairBuffer = "";
        if (!compact || index !== 0) {
            pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
            continue;
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
            if (state.dump && 0x0a === state.dump.charCodeAt(0)) {
                pairBuffer += "?";
            } else {
                pairBuffer += "? ";
            }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
            pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
            continue;
        }
        if (state.dump && 0x0a === state.dump.charCodeAt(0)) {
            pairBuffer += ":";
        } else {
            pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = _result || "{}";
}
function detectType(state, object, explicit = false) {
    const typeList = explicit ? state.explicitTypes : state.implicitTypes;
    let type;
    let style;
    let _result;
    for(let index = 0, length = typeList.length; index < length; index += 1){
        type = typeList[index];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
            state.tag = explicit ? type.tag : "?";
            if (type.represent) {
                style = state.styleMap[type.tag] || type.defaultStyle;
                if (_toString2.call(type.represent) === "[object Function]") {
                    _result = type.represent(object, style);
                } else if (_hasOwnProperty3.call(type.represent, style)) {
                    _result = type.represent[style](object, style);
                } else {
                    throw new YAMLError(`!<${type.tag}> tag resolver accepts not "${style}" style`);
                }
                state.dump = _result;
            }
            return true;
        }
    }
    return false;
}
function writeNode(state, level, object, block, compact, iskey = false) {
    state.tag = null;
    state.dump = object;
    if (!detectType(state, object, false)) {
        detectType(state, object, true);
    }
    const type = _toString2.call(state.dump);
    if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
    }
    const objectOrArray = type === "[object Object]" || type === "[object Array]";
    let duplicateIndex = -1;
    let duplicate = false;
    if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
    }
    if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
    }
    if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = `*ref_${duplicateIndex}`;
    } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
            state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === "[object Object]") {
            if (block && Object.keys(state.dump).length !== 0) {
                writeBlockMapping(state, level, state.dump, compact);
                if (duplicate) {
                    state.dump = `&ref_${duplicateIndex}${state.dump}`;
                }
            } else {
                writeFlowMapping(state, level, state.dump);
                if (duplicate) {
                    state.dump = `&ref_${duplicateIndex} ${state.dump}`;
                }
            }
        } else if (type === "[object Array]") {
            const arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
            if (block && state.dump.length !== 0) {
                writeBlockSequence(state, arrayLevel, state.dump, compact);
                if (duplicate) {
                    state.dump = `&ref_${duplicateIndex}${state.dump}`;
                }
            } else {
                writeFlowSequence(state, arrayLevel, state.dump);
                if (duplicate) {
                    state.dump = `&ref_${duplicateIndex} ${state.dump}`;
                }
            }
        } else if (type === "[object String]") {
            if (state.tag !== "?") {
                writeScalar(state, state.dump, level, iskey);
            }
        } else {
            if (state.skipInvalid) return false;
            throw new YAMLError(`unacceptable kind of an object to dump ${type}`);
        }
        if (state.tag !== null && state.tag !== "?") {
            state.dump = `!<${state.tag}> ${state.dump}`;
        }
    }
    return true;
}
class DenoStdInternalError1 extends Error {
    constructor(message){
        super(message);
        this.name = "DenoStdInternalError";
    }
}
function assert1(expr, msg = "") {
    if (!expr) {
        throw new DenoStdInternalError1(msg);
    }
}
function copy(src, dst, off = 0) {
    off = Math.max(0, Math.min(off, dst.byteLength));
    const dstBytesAvailable = dst.byteLength - off;
    if (src.byteLength > dstBytesAvailable) {
        src = src.subarray(0, dstBytesAvailable);
    }
    dst.set(src, off);
    return src.byteLength;
}
const MIN_BUF_SIZE = 16;
const CR = "\r".charCodeAt(0);
const LF = "\n".charCodeAt(0);
class BufferFullError extends Error {
    name;
    constructor(partial){
        super("Buffer full");
        this.partial = partial;
        this.name = "BufferFullError";
    }
    partial;
}
class PartialReadError extends Error {
    name = "PartialReadError";
    partial;
    constructor(){
        super("Encountered UnexpectedEof, data only partially read");
    }
}
class BufReader {
    #buf;
    #rd;
    #r = 0;
    #w = 0;
    #eof = false;
    static create(r, size = 4096) {
        return r instanceof BufReader ? r : new BufReader(r, size);
    }
    constructor(rd, size = 4096){
        if (size < 16) {
            size = MIN_BUF_SIZE;
        }
        this.#reset(new Uint8Array(size), rd);
    }
    size() {
        return this.#buf.byteLength;
    }
    buffered() {
        return this.#w - this.#r;
    }
    #fill = async ()=>{
        if (this.#r > 0) {
            this.#buf.copyWithin(0, this.#r, this.#w);
            this.#w -= this.#r;
            this.#r = 0;
        }
        if (this.#w >= this.#buf.byteLength) {
            throw Error("bufio: tried to fill full buffer");
        }
        for(let i = 100; i > 0; i--){
            const rr = await this.#rd.read(this.#buf.subarray(this.#w));
            if (rr === null) {
                this.#eof = true;
                return;
            }
            assert1(rr >= 0, "negative read");
            this.#w += rr;
            if (rr > 0) {
                return;
            }
        }
        throw new Error(`No progress after ${100} read() calls`);
    };
    reset(r) {
        this.#reset(this.#buf, r);
    }
    #reset = (buf, rd)=>{
        this.#buf = buf;
        this.#rd = rd;
        this.#eof = false;
    };
    async read(p) {
        let rr = p.byteLength;
        if (p.byteLength === 0) return rr;
        if (this.#r === this.#w) {
            if (p.byteLength >= this.#buf.byteLength) {
                const rr1 = await this.#rd.read(p);
                const nread = rr1 ?? 0;
                assert1(nread >= 0, "negative read");
                return rr1;
            }
            this.#r = 0;
            this.#w = 0;
            rr = await this.#rd.read(this.#buf);
            if (rr === 0 || rr === null) return rr;
            assert1(rr >= 0, "negative read");
            this.#w += rr;
        }
        const copied = copy(this.#buf.subarray(this.#r, this.#w), p, 0);
        this.#r += copied;
        return copied;
    }
    async readFull(p) {
        let bytesRead = 0;
        while(bytesRead < p.length){
            try {
                const rr = await this.read(p.subarray(bytesRead));
                if (rr === null) {
                    if (bytesRead === 0) {
                        return null;
                    } else {
                        throw new PartialReadError();
                    }
                }
                bytesRead += rr;
            } catch (err) {
                if (err instanceof PartialReadError) {
                    err.partial = p.subarray(0, bytesRead);
                } else if (err instanceof Error) {
                    const e = new PartialReadError();
                    e.partial = p.subarray(0, bytesRead);
                    e.stack = err.stack;
                    e.message = err.message;
                    e.cause = err.cause;
                    throw err;
                }
                throw err;
            }
        }
        return p;
    }
    async readByte() {
        while(this.#r === this.#w){
            if (this.#eof) return null;
            await this.#fill();
        }
        const c = this.#buf[this.#r];
        this.#r++;
        return c;
    }
    async readString(delim) {
        if (delim.length !== 1) {
            throw new Error("Delimiter should be a single character");
        }
        const buffer = await this.readSlice(delim.charCodeAt(0));
        if (buffer === null) return null;
        return new TextDecoder().decode(buffer);
    }
    async readLine() {
        let line = null;
        try {
            line = await this.readSlice(LF);
        } catch (err) {
            if (err instanceof Deno.errors.BadResource) {
                throw err;
            }
            let partial;
            if (err instanceof PartialReadError) {
                partial = err.partial;
                assert1(partial instanceof Uint8Array, "bufio: caught error from `readSlice()` without `partial` property");
            }
            if (!(err instanceof BufferFullError)) {
                throw err;
            }
            partial = err.partial;
            if (!this.#eof && partial && partial.byteLength > 0 && partial[partial.byteLength - 1] === CR) {
                assert1(this.#r > 0, "bufio: tried to rewind past start of buffer");
                this.#r--;
                partial = partial.subarray(0, partial.byteLength - 1);
            }
            if (partial) {
                return {
                    line: partial,
                    more: !this.#eof
                };
            }
        }
        if (line === null) {
            return null;
        }
        if (line.byteLength === 0) {
            return {
                line,
                more: false
            };
        }
        if (line[line.byteLength - 1] == LF) {
            let drop = 1;
            if (line.byteLength > 1 && line[line.byteLength - 2] === CR) {
                drop = 2;
            }
            line = line.subarray(0, line.byteLength - drop);
        }
        return {
            line,
            more: false
        };
    }
    async readSlice(delim) {
        let s = 0;
        let slice;
        while(true){
            let i = this.#buf.subarray(this.#r + s, this.#w).indexOf(delim);
            if (i >= 0) {
                i += s;
                slice = this.#buf.subarray(this.#r, this.#r + i + 1);
                this.#r += i + 1;
                break;
            }
            if (this.#eof) {
                if (this.#r === this.#w) {
                    return null;
                }
                slice = this.#buf.subarray(this.#r, this.#w);
                this.#r = this.#w;
                break;
            }
            if (this.buffered() >= this.#buf.byteLength) {
                this.#r = this.#w;
                const oldbuf = this.#buf;
                const newbuf = this.#buf.slice(0);
                this.#buf = newbuf;
                throw new BufferFullError(oldbuf);
            }
            s = this.#w - this.#r;
            try {
                await this.#fill();
            } catch (err) {
                if (err instanceof PartialReadError) {
                    err.partial = slice;
                } else if (err instanceof Error) {
                    const e = new PartialReadError();
                    e.partial = slice;
                    e.stack = err.stack;
                    e.message = err.message;
                    e.cause = err.cause;
                    throw err;
                }
                throw err;
            }
        }
        return slice;
    }
    async peek(n) {
        if (n < 0) {
            throw Error("negative count");
        }
        let avail = this.#w - this.#r;
        while(avail < n && avail < this.#buf.byteLength && !this.#eof){
            try {
                await this.#fill();
            } catch (err) {
                if (err instanceof PartialReadError) {
                    err.partial = this.#buf.subarray(this.#r, this.#w);
                } else if (err instanceof Error) {
                    const e = new PartialReadError();
                    e.partial = this.#buf.subarray(this.#r, this.#w);
                    e.stack = err.stack;
                    e.message = err.message;
                    e.cause = err.cause;
                    throw err;
                }
                throw err;
            }
            avail = this.#w - this.#r;
        }
        if (avail === 0 && this.#eof) {
            return null;
        } else if (avail < n && this.#eof) {
            return this.#buf.subarray(this.#r, this.#r + avail);
        } else if (avail < n) {
            throw new BufferFullError(this.#buf.subarray(this.#r, this.#w));
        }
        return this.#buf.subarray(this.#r, this.#r + n);
    }
}
class AbstractBufBase {
    buf;
    usedBufferBytes = 0;
    err = null;
    constructor(buf){
        this.buf = buf;
    }
    size() {
        return this.buf.byteLength;
    }
    available() {
        return this.buf.byteLength - this.usedBufferBytes;
    }
    buffered() {
        return this.usedBufferBytes;
    }
}
class BufWriter extends AbstractBufBase {
    #writer;
    static create(writer, size = 4096) {
        return writer instanceof BufWriter ? writer : new BufWriter(writer, size);
    }
    constructor(writer, size = 4096){
        super(new Uint8Array(size <= 0 ? 4096 : size));
        this.#writer = writer;
    }
    reset(w) {
        this.err = null;
        this.usedBufferBytes = 0;
        this.#writer = w;
    }
    async flush() {
        if (this.err !== null) throw this.err;
        if (this.usedBufferBytes === 0) return;
        try {
            const p = this.buf.subarray(0, this.usedBufferBytes);
            let nwritten = 0;
            while(nwritten < p.length){
                nwritten += await this.#writer.write(p.subarray(nwritten));
            }
        } catch (e) {
            if (e instanceof Error) {
                this.err = e;
            }
            throw e;
        }
        this.buf = new Uint8Array(this.buf.length);
        this.usedBufferBytes = 0;
    }
    async write(data) {
        if (this.err !== null) throw this.err;
        if (data.length === 0) return 0;
        let totalBytesWritten = 0;
        let numBytesWritten = 0;
        while(data.byteLength > this.available()){
            if (this.buffered() === 0) {
                try {
                    numBytesWritten = await this.#writer.write(data);
                } catch (e) {
                    if (e instanceof Error) {
                        this.err = e;
                    }
                    throw e;
                }
            } else {
                numBytesWritten = copy(data, this.buf, this.usedBufferBytes);
                this.usedBufferBytes += numBytesWritten;
                await this.flush();
            }
            totalBytesWritten += numBytesWritten;
            data = data.subarray(numBytesWritten);
        }
        numBytesWritten = copy(data, this.buf, this.usedBufferBytes);
        this.usedBufferBytes += numBytesWritten;
        totalBytesWritten += numBytesWritten;
        return totalBytesWritten;
    }
}
class BufWriterSync extends AbstractBufBase {
    #writer;
    static create(writer, size = 4096) {
        return writer instanceof BufWriterSync ? writer : new BufWriterSync(writer, size);
    }
    constructor(writer, size = 4096){
        super(new Uint8Array(size <= 0 ? 4096 : size));
        this.#writer = writer;
    }
    reset(w) {
        this.err = null;
        this.usedBufferBytes = 0;
        this.#writer = w;
    }
    flush() {
        if (this.err !== null) throw this.err;
        if (this.usedBufferBytes === 0) return;
        try {
            const p = this.buf.subarray(0, this.usedBufferBytes);
            let nwritten = 0;
            while(nwritten < p.length){
                nwritten += this.#writer.writeSync(p.subarray(nwritten));
            }
        } catch (e) {
            if (e instanceof Error) {
                this.err = e;
            }
            throw e;
        }
        this.buf = new Uint8Array(this.buf.length);
        this.usedBufferBytes = 0;
    }
    writeSync(data) {
        if (this.err !== null) throw this.err;
        if (data.length === 0) return 0;
        let totalBytesWritten = 0;
        let numBytesWritten = 0;
        while(data.byteLength > this.available()){
            if (this.buffered() === 0) {
                try {
                    numBytesWritten = this.#writer.writeSync(data);
                } catch (e) {
                    if (e instanceof Error) {
                        this.err = e;
                    }
                    throw e;
                }
            } else {
                numBytesWritten = copy(data, this.buf, this.usedBufferBytes);
                this.usedBufferBytes += numBytesWritten;
                this.flush();
            }
            totalBytesWritten += numBytesWritten;
            data = data.subarray(numBytesWritten);
        }
        numBytesWritten = copy(data, this.buf, this.usedBufferBytes);
        this.usedBufferBytes += numBytesWritten;
        totalBytesWritten += numBytesWritten;
        return totalBytesWritten;
    }
}
function isCloser(value) {
    return typeof value === "object" && value != null && "close" in value && typeof value["close"] === "function";
}
function writableStreamFromWriter(writer, options = {}) {
    const { autoClose =true  } = options;
    return new WritableStream({
        async write (chunk, controller) {
            try {
                await writeAll(writer, chunk);
            } catch (e) {
                controller.error(e);
                if (isCloser(writer) && autoClose) {
                    writer.close();
                }
            }
        },
        close () {
            if (isCloser(writer) && autoClose) {
                writer.close();
            }
        },
        abort () {
            if (isCloser(writer) && autoClose) {
                writer.close();
            }
        }
    });
}
function readableStreamFromReader(reader, options = {}) {
    const { autoClose =true , chunkSize =16_640 , strategy ,  } = options;
    return new ReadableStream({
        async pull (controller) {
            const chunk = new Uint8Array(chunkSize);
            try {
                const read = await reader.read(chunk);
                if (read === null) {
                    if (isCloser(reader) && autoClose) {
                        reader.close();
                    }
                    controller.close();
                    return;
                }
                controller.enqueue(chunk.subarray(0, read));
            } catch (e) {
                controller.error(e);
                if (isCloser(reader)) {
                    reader.close();
                }
            }
        },
        cancel () {
            if (isCloser(reader) && autoClose) {
                reader.close();
            }
        }
    }, strategy);
}
async function writeAll(w, arr) {
    let nwritten = 0;
    while(nwritten < arr.length){
        nwritten += await w.write(arr.subarray(nwritten));
    }
}
function deferred() {
    let methods;
    let state = "pending";
    const promise = new Promise((resolve, reject)=>{
        methods = {
            async resolve (value) {
                await value;
                state = "fulfilled";
                resolve(value);
            },
            reject (reason) {
                state = "rejected";
                reject(reason);
            }
        };
    });
    Object.defineProperty(promise, "state", {
        get: ()=>state
    });
    return Object.assign(promise, methods);
}
function mergeReadableStreams(...streams) {
    const resolvePromises = streams.map(()=>deferred());
    return new ReadableStream({
        start (controller) {
            Promise.all(resolvePromises).then(()=>{
                controller.close();
            });
            try {
                for (const [key, stream] of Object.entries(streams)){
                    (async ()=>{
                        for await (const data of stream){
                            controller.enqueue(data);
                        }
                        resolvePromises[+key].resolve();
                    })();
                }
            } catch (e) {
                controller.error(e);
            }
        }
    });
}
async function buildAndroid(srcDir, keyStoreFile, storepass) {
    try {
        if (!existsSync(join3(srcDir, 'AndroidManifest.xml'))) return console.error('1 of 3] Need AndroidManifest.xml file in ' + srcDir);
        if (!existsSync(join3(srcDir, 'java/'))) return console.error('2 of 3] Need java/ dir in ' + srcDir);
        if (!existsSync(join3(srcDir, 'res/'))) return console.error('3 of 3] Need res/ in ' + srcDir);
        const buildDir = join3(srcDir, '.build');
        ensureDirSync(buildDir);
        const paddleYml = 'paddle.yml';
        const yaml = Deno.readTextFileSync(join3(srcDir, paddleYml));
        const config = await parse3(yaml);
        console.log(colors.brightBlue(`Starting android build: ${paddleYml} (type: ${config.type})`), buildDir);
        const buildStart = new Date().getTime();
        if (!config.src_dir) config.src_dir = srcDir;
        if (!config.build_dir) config.build_dir = buildDir;
        const sh = new AndroidBuildShell(config);
        await sh.downloadDeps();
        await sh.extractDeps();
        await sh.generateResources();
        const compilationStatus = await sh.compileClasses('obj/');
        if (!compilationStatus) return console.log(colors.red('Please correct the above code errors and retry android build.'));
        await sh.outputClassesDex('obj/');
        await sh.addDexToApk('classes.dex');
        await sh.alignApk();
        await sh.checkOrCreateKeyStore(keyStoreFile);
        await sh.jarsigner(sh.APK_NAME, keyStoreFile, storepass);
        await sh.checkApk();
        console.log('Built within ' + Math.ceil(new Date().getTime() - buildStart) / 1000 + ' seconds ' + String.fromCodePoint(0x1F44F));
        await sh.checkAdbInstall();
    } catch (e) {
        console.error(e);
    }
}
function getSourceFiles(dir, filter = /\.java$/) {
    const files = [];
    for (const entry of Deno.readDirSync(dir)){
        if (entry.isDirectory) files.push(...getSourceFiles(join3(dir, entry.name), filter));
        else if (entry.isFile) filter.test(entry.name) && files.push(join3(dir, entry.name));
        else console.log('Ignoring:', entry.name, entry);
    }
    return files;
}
class AndroidBuildShell {
    ANDROID_SDK;
    BUILD_TOOLS_VERSION = '30.0.3';
    PLATFORM_VERSION = 'android-32';
    BUILD_TOOLS = '';
    PLATFORM_PATH = '';
    PLATFORM_TOOLS = '';
    TOOLS = '';
    TOOLS_BIN = '';
    srcDir = '';
    buildDir = '';
    BUILD_PATH = '';
    D8 = 'd8';
    ANDROID_JAR = '';
    UNALIGNED_NAME = 'unaligned.apk';
    APK_NAME = '';
    isWindows = Deno.build.os == 'windows';
    config;
    constructor(buildConfig){
        this.config = buildConfig;
        this.srcDir = buildConfig.src_dir;
        this.buildDir = buildConfig.build_dir;
        this.APK_NAME = (buildConfig.apk_name || 'signed') + '.apk';
        this.ANDROID_SDK = Deno.env.get("ANDROID_SDK") || '';
        if (!this.ANDROID_SDK) throw 'Please set ANDROID_SDK in path and retry build';
        Deno.env.get('PATH') || '';
        const JAVA_HOME = Deno.env.get('JAVA_HOME') || '';
        if (this.isWindows) this.D8 = 'd8.bat';
        this.BUILD_TOOLS = join3(this.ANDROID_SDK, 'build-tools', this.BUILD_TOOLS_VERSION);
        this.BUILD_PATH = this.BUILD_TOOLS + delimiter2 + join3(JAVA_HOME, 'bin');
        this.PLATFORM_PATH = join3(this.ANDROID_SDK, 'platforms', this.PLATFORM_VERSION);
        this.PLATFORM_TOOLS = join3(this.ANDROID_SDK, 'platforms-tools');
        this.ANDROID_JAR = join3(this.PLATFORM_PATH, 'android.jar');
        console.log(colors.gray('ANDROID_SDK=' + this.ANDROID_SDK));
        console.log(`BUILD_TOOLS_VERSION: ${colors.yellow(this.BUILD_TOOLS_VERSION)}, PLATFORM_VERSION: ${colors.yellow(this.PLATFORM_VERSION)}`);
    }
    ensuredir(dir) {
        try {
            ensureDirSync(join3(this.buildDir, dir));
        } catch (e) {
            if (e.code != "EEXIST") {
                throw e;
            }
        }
        return dir;
    }
    async generateResources() {
        const generated = 'gen/';
        const genPath = join3(this.buildDir, generated);
        if (existsSync(genPath)) Deno.removeSync(genPath, {
            recursive: true
        });
        this.ensuredir(generated);
        const relativePath = relative2(this.buildDir, this.srcDir);
        const unalignedFilePath = join3(this.buildDir, this.UNALIGNED_NAME);
        if (existsSync(unalignedFilePath)) Deno.removeSync(unalignedFilePath, {
            recursive: true
        });
        var p = [];
        p.push('package');
        p.push('-m');
        p.push('-J', generated);
        p.push('-M', join3(relativePath, 'AndroidManifest.xml'));
        p.push('-S', join3(relativePath, 'res/'));
        p.push('-I', this.ANDROID_JAR);
        p.push('-F', this.UNALIGNED_NAME);
        await this.aapt(p);
    }
    async addDexToApk(dexFile) {
        const dexFilePath = join3(this.buildDir, dexFile);
        const dexCwd = dirname2(dexFilePath);
        const unalignedFilePath = join3(this.buildDir, this.UNALIGNED_NAME);
        const unalignedFile = relative2(dexCwd, unalignedFilePath);
        await this.aapt([
            'add',
            unalignedFile,
            basename2(dexFile)
        ], '');
    }
    async isOnline() {
        try {
            return (await fetch('https://captive.apple.com')).ok;
        } catch (e) {}
        return false;
    }
    cacheDir = '.cache/';
    async downloadDeps() {
        const depsList = this.config.deps || [];
        if (!depsList.length) return;
        const cacheDir = join3(this.buildDir, this.cacheDir);
        ensureDirSync(cacheDir);
        let isOnline = await this.isOnline();
        for (const dep of depsList){
            if (!dep || !/\w+\:/.test(dep)) continue;
            const [lib, name, version] = dep.replace(/ /g, ':').split(':');
            if (existsSync(join3(cacheDir, `${name}-${version}.aar`)) || existsSync(join3(cacheDir, `${name}-${version}.jar`))) continue;
            console.log(colors.magenta(`Downloading ${name}-${version} from package ${lib}`));
            if (isOnline) {
                try {
                    await this.downloadFromRepos(lib, name, version, cacheDir);
                } catch (e) {
                    isOnline = false;
                }
            } else {
                if (!this.locaLibPath) this.locaLibPath = this.resolveLocalLib();
                const file = join3(this.locaLibPath, `${name}-${version}`);
                if (existsSync(file + '.jar')) {
                    Deno.copyFileSync(file + '.jar', join3(cacheDir, `${name}-${version}.jar`));
                    console.log('Copied from local lib: ', `${name}-${version}.jar`, this.locaLibPath);
                } else if (existsSync(file + '.aar')) {
                    Deno.copyFileSync(file + '.aar', join3(cacheDir, `${name}-${version}.aar`));
                    console.log('Copied from local lib: ', `${name}-${version}.jar`, this.locaLibPath);
                } else {
                    console.error(colors.red('Could not download and could not find in local lib: ' + `${name}-${version}`), this.locaLibPath);
                }
            }
        }
    }
    locaLibPath = '';
    resolveLocalLib() {
        if (this.config.local_lib) {
            if (this.config.local_lib.startsWith('.')) return resolve2(this.config.local_lib);
            else return this.config.local_lib;
        }
        const homeDir = (this.isWindows ? Deno.env.get('USERPROFILE') : Deno.env.get('HOME')) || '';
        return join3(homeDir, 'lib');
    }
    googleRepoUrl = "https://dl.google.com/dl/android/maven2";
    mavenRepoUrl = "https://maven.google.com";
    github = "https://raw.githubusercontent.com/scriptmaster/cdn/packages";
    async downloadFromRepos(lib, name, version, toDir) {
        const pkg = lib.replace(/\./g, '/');
        var urlPrefix = `${this.googleRepoUrl}/${pkg}/${name}/${version}/${name}-${version}`;
        if (await this.downloadFile(urlPrefix + '.aar', toDir)) return true;
        if (await this.downloadFile(urlPrefix + '.jar', toDir)) return true;
        urlPrefix = `${this.mavenRepoUrl}/${pkg}/${name}/${version}/${name}-${version}`;
        if (await this.downloadFile(urlPrefix + '.aar', toDir)) return true;
        if (await this.downloadFile(urlPrefix + '.jar', toDir)) return true;
        urlPrefix = `${this.github}/${lib}/${name}-${version}`;
        if (await this.downloadFile(urlPrefix + '.aar', toDir)) return true;
        if (await this.downloadFile(urlPrefix + '.jar', toDir)) return true;
        console.error(colors.red(`Could not download ${urlPrefix}.aar or .jar`));
        return false;
    }
    async downloadFile(url, dir) {
        try {
            const name = basename2(url);
            const filePath = join3(dir, name);
            const res = await fetch(url);
            if (res.status != 200) return false;
            const file = await Deno.open(filePath, {
                create: true,
                write: true
            });
            await res.body?.pipeTo(file.writable);
            try {
                file.close();
            } catch (e) {}
        } catch (e1) {
            console.error('downloadFileToCache: ', e1);
            return false;
        }
        return true;
    }
    async extractDeps() {
        try {
            const cacheDir = join3(this.buildDir, this.cacheDir);
            const clsDir = 'cls';
            const aarDir = 'aar';
            ensureDirSync(join3(cacheDir, clsDir));
            ensureDirSync(join3(cacheDir, aarDir));
            const files = Deno.readDirSync(cacheDir);
            for (const f of files){
                if (!f.isFile) continue;
                if (f.name.endsWith('.jar')) {
                    if (existsSync(join3(cacheDir, clsDir + '/' + f.name))) continue;
                    await this.unzip(cacheDir, f.name, [
                        '*'
                    ], clsDir + '/' + f.name);
                } else if (f.name.endsWith('.aar')) {
                    if (existsSync(join3(cacheDir, aarDir + '/' + f.name))) continue;
                    await this.unzip(cacheDir, f.name, "'res/**/*' classes.jar R.txt AndroidManifest.xml".split(' '), aarDir + '/' + f.name);
                }
            }
        } catch (e) {}
    }
    async checkOrCreateKeyStore(keyStoreFile) {
        const keyStoreDir = dirname2(keyStoreFile);
        if (!existsSync(keyStoreDir)) ensureDirSync(keyStoreDir);
        if (!existsSync(keyStoreFile)) {
            const name = basename2(keyStoreFile);
            const cmd = [
                'keytool',
                '-genkey',
                '-v',
                '-keystore',
                name,
                '-alias',
                name,
                '-keyalg',
                'RSA',
                '-keysize',
                '2048',
                '-validity',
                '10000', 
            ];
            console.log(cmd.join(' '));
            throw new Error('Ensure the keystore password and common name prompts are checked and created by you with above command');
            console.log(this.run(cmd, {
                cwd: keyStoreDir
            }));
        }
    }
    async alignApk() {
        await this.zipalign(this.UNALIGNED_NAME, this.APK_NAME);
    }
    async checkAdbInstall() {
        const devices = await this.adb('devices');
        if (devices.output) {
            const [header, firstDevice] = devices.output.split('\n');
            if (firstDevice) {
                console.log(`adb device found: ${firstDevice}`);
                const [match, device] = firstDevice.match(/^(\S+)\s/);
                console.log(colors.blue((await this.adb(`-s ${device} install ${this.APK_NAME}`)).output));
            }
        }
    }
    async checkApk() {
        const apk = join3(this.buildDir, this.APK_NAME);
        if (existsSync(apk)) {
            const stat = await Deno.stat(apk);
            const party = String.fromCodePoint(0x1f389);
            const gift = String.fromCodePoint(0x1f381);
            console.log(party, colors.green("APK BUILT: " + this.APK_NAME), gift, Math.round(stat.size / 1024) + 'KB');
        } else {
            console.error(colors.red(apk));
        }
    }
    async jarsigner(file, keyStoreFile, storepass) {
        const keyStoreDir = dirname2(keyStoreFile);
        const name = basename2(keyStoreFile);
        if (!storepass) storepass = Deno.env.get('storepass') || prompt("Enter storepass:") || '';
        const cmd = [
            'jarsigner',
            '-keystore',
            name,
            '-storepass',
            storepass,
            relative2(keyStoreDir, join3(this.buildDir, file)),
            name
        ];
        await this.run(cmd, {
            cwd: keyStoreDir
        });
    }
    async compileClasses(output) {
        this.ensuredir(output);
        const sourceFiles = getSourceFiles(this.srcDir, /\.java$/).map((f)=>relative2(this.buildDir, f));
        const jars = [
            this.ANDROID_JAR
        ];
        const compilation = await this.javac([
            '-classpath',
            jars.join(this.isWindows ? ';' : ':'),
            '-d',
            output,
            ...sourceFiles
        ]);
        return compilation.status;
    }
    async outputClassesDex(input) {
        const classFiles = getSourceFiles(join3(this.buildDir, input), /\.class$/).map((f)=>relative2(this.buildDir, f));
        await this.d8([
            '--output',
            '.',
            ...classFiles
        ]);
    }
    async jar_dex_move(input, name) {
        await this.jar(`--create --file ${name}.jar -C ${input} .`.split(' '));
        await this.d8(`--intermediate ${name}.jar --classpath ${this.ANDROID_JAR} --output .`.split(' '));
        this.rename('classes.dex', name + '.dex');
    }
    rename(oldir, newdir) {
        return Deno.renameSync(join3(this.buildDir, oldir), join3(this.buildDir, newdir));
    }
    devices() {
        return this.adb('devices');
    }
    async aapt(commands, cwd = '') {
        return `aapt ${commands[0]}:\n` + (await this.run([
            'aapt',
            ...commands
        ], {
            PATH: this.BUILD_PATH,
            cwd
        })).output;
    }
    async javac(commands) {
        return await this.run([
            'javac',
            ...commands
        ], {
            PATH: this.BUILD_PATH
        });
    }
    async jar(commands) {
        return 'jar: ' + (await this.run([
            'jar',
            ...commands
        ], {
            PATH: this.BUILD_PATH
        })).output;
    }
    async d8(commands) {
        return 'd8: ' + (await this.run([
            'java',
            '-Xmx124M',
            '-Xss1m',
            '-cp',
            `${this.BUILD_TOOLS}/lib/d8.jar`,
            'com.android.tools.r8.D8',
            ...commands
        ], {
            PATH: this.BUILD_PATH
        })).output;
    }
    async zipalign(unaligned, aligned) {
        return '' + (await this.run([
            'zipalign',
            '-f',
            '4',
            unaligned,
            aligned
        ], {
            PATH: this.BUILD_PATH
        })).output;
    }
    async unzip(curDir, zipfile, files = [], outdir = '') {
        return (await this.run([
            'unzip',
            zipfile,
            ...files,
            '-d',
            outdir
        ], {
            PATH: this.BUILD_PATH,
            cwd: curDir
        })).output;
    }
    async adb(commands) {
        return await this.run([
            'adb',
            ...commands.split(' ')
        ], {
            PATH: this.PLATFORM_TOOLS
        });
    }
    async android(commands) {
        return 'android: ' + await this.run([
            'android',
            ...commands
        ], {
            PATH: this.TOOLS
        });
    }
    async sdkmanager(commands) {
        return 'sdkmanager: ' + await this.run([
            'sdkmanager',
            ...commands
        ], {
            PATH: this.TOOLS_BIN
        });
    }
    async avdmanager(commands) {
        return 'avdmanager: ' + await this.run([
            'avdmanager',
            ...commands
        ], {
            PATH: this.TOOLS_BIN
        });
    }
    async run(cmd, env) {
        try {
            console.log('run:', colors.yellow(cmd[0]));
            const p = Deno.run({
                cmd: cmd,
                env: env,
                cwd: env?.cwd || this.buildDir,
                stdout: "piped",
                stderr: "piped"
            });
            const { code  } = await p.status();
            const rawOutput = await p.output();
            const rawError = await p.stderrOutput();
            const td = new TextDecoder();
            if (code === 0) {
                return {
                    status: true,
                    output: td.decode(rawOutput),
                    code
                };
            } else {
                const errorString = td.decode(rawError) + td.decode(rawOutput);
                console.log(colors.red(cmd[0]), errorString);
                return {
                    status: false,
                    output: errorString,
                    code
                };
            }
        } catch (e) {
            if (e.code == 'ENOENT') console.error(colors.red(cmd.join(' ')), env?.PATH || '', e);
            else console.error(colors.red(e.code), e);
            return {
                status: false,
                output: e,
                code: e.code
            };
        }
    }
    async aapt2(cmd, env) {
        const file = await Deno.open("./aapt2.log", {
            read: true,
            write: true,
            create: true
        });
        const fileWriter = await writableStreamFromWriter(file);
        const process = Deno.run({
            cmd: cmd,
            env: env,
            cwd: env?.cwd || this.buildDir,
            stdout: "piped",
            stderr: "piped"
        });
        const stdout = readableStreamFromReader(process.stdout);
        const stderr = readableStreamFromReader(process.stderr);
        const joined = mergeReadableStreams(stdout, stderr);
        joined.pipeTo(fileWriter).then(()=>console.log("pipe join done"));
    }
}
function distance(a, b) {
    if (a.length == 0) {
        return b.length;
    }
    if (b.length == 0) {
        return a.length;
    }
    const matrix = [];
    for(let i = 0; i <= b.length; i++){
        matrix[i] = [
            i
        ];
    }
    for(let j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }
    for(let i1 = 1; i1 <= b.length; i1++){
        for(let j1 = 1; j1 <= a.length; j1++){
            if (b.charAt(i1 - 1) == a.charAt(j1 - 1)) {
                matrix[i1][j1] = matrix[i1 - 1][j1 - 1];
            } else {
                matrix[i1][j1] = Math.min(matrix[i1 - 1][j1 - 1] + 1, Math.min(matrix[i1][j1 - 1] + 1, matrix[i1 - 1][j1] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}
function paramCaseToCamelCase(str) {
    return str.replace(/-([a-z])/g, (g)=>g[1].toUpperCase());
}
function underscoreToCamelCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase().replace(/_([a-z])/g, (g)=>g[1].toUpperCase());
}
function getOption(flags, name) {
    while(name[0] === "-"){
        name = name.slice(1);
    }
    for (const flag of flags){
        if (isOption(flag, name)) {
            return flag;
        }
    }
    return;
}
function didYouMeanOption(option, options) {
    const optionNames = options.map((option)=>[
            option.name,
            ...option.aliases ?? []
        ]).flat().map((option)=>getFlag(option));
    return didYouMean(" Did you mean option", getFlag(option), optionNames);
}
function didYouMeanType(type, types) {
    return didYouMean(" Did you mean type", type, types);
}
function didYouMean(message, type, types) {
    const match = closest(type, types);
    return match ? `${message} "${match}"?` : "";
}
function getFlag(name) {
    if (name.startsWith("-")) {
        return name;
    }
    if (name.length > 1) {
        return `--${name}`;
    }
    return `-${name}`;
}
function isOption(option, name) {
    return option.name === name || option.aliases && option.aliases.indexOf(name) !== -1;
}
function matchWildCardOptions(name, flags) {
    for (const option of flags){
        if (option.name.indexOf("*") === -1) {
            continue;
        }
        let matched = matchWildCardOption(name, option);
        if (matched) {
            matched = {
                ...matched,
                name
            };
            flags.push(matched);
            return matched;
        }
    }
}
function matchWildCardOption(name, option) {
    const parts = option.name.split(".");
    const parts2 = name.split(".");
    if (parts.length !== parts2.length) {
        return false;
    }
    const count = Math.max(parts.length, parts2.length);
    for(let i = 0; i < count; i++){
        if (parts[i] !== parts2[i] && parts[i] !== "*") {
            return false;
        }
    }
    return option;
}
function closest(str, arr) {
    let minDistance = Infinity;
    let minIndex = 0;
    for(let i = 0; i < arr.length; i++){
        const dist = distance(str, arr[i]);
        if (dist < minDistance) {
            minDistance = dist;
            minIndex = i;
        }
    }
    return arr[minIndex];
}
function getDefaultValue(option) {
    return typeof option.default === "function" ? option.default() : option.default;
}
class FlagsError extends Error {
    constructor(message){
        super(message);
        Object.setPrototypeOf(this, FlagsError.prototype);
    }
}
class UnknownRequiredOption extends FlagsError {
    constructor(option, options){
        super(`Unknown required option "${getFlag(option)}".${didYouMeanOption(option, options)}`);
        Object.setPrototypeOf(this, UnknownRequiredOption.prototype);
    }
}
class UnknownConflictingOption extends FlagsError {
    constructor(option, options){
        super(`Unknown conflicting option "${getFlag(option)}".${didYouMeanOption(option, options)}`);
        Object.setPrototypeOf(this, UnknownConflictingOption.prototype);
    }
}
class UnknownType extends FlagsError {
    constructor(type, types){
        super(`Unknown type "${type}".${didYouMeanType(type, types)}`);
        Object.setPrototypeOf(this, UnknownType.prototype);
    }
}
class ValidationError extends FlagsError {
    constructor(message){
        super(message);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
class DuplicateOption extends ValidationError {
    constructor(name){
        super(`Option "${getFlag(name).replace(/^--no-/, "--")}" can only occur once, but was found several times.`);
        Object.setPrototypeOf(this, DuplicateOption.prototype);
    }
}
class InvalidOption extends ValidationError {
    constructor(option, options){
        super(`Invalid option "${getFlag(option)}".${didYouMeanOption(option, options)}`);
        Object.setPrototypeOf(this, InvalidOption.prototype);
    }
}
class UnknownOption extends ValidationError {
    constructor(option, options){
        super(`Unknown option "${getFlag(option)}".${didYouMeanOption(option, options)}`);
        Object.setPrototypeOf(this, UnknownOption.prototype);
    }
}
class MissingOptionValue extends ValidationError {
    constructor(option){
        super(`Missing value for option "${getFlag(option)}".`);
        Object.setPrototypeOf(this, MissingOptionValue.prototype);
    }
}
class InvalidOptionValue extends ValidationError {
    constructor(option, expected, value){
        super(`Option "${getFlag(option)}" must be of type "${expected}", but got "${value}".`);
        Object.setPrototypeOf(this, InvalidOptionValue.prototype);
    }
}
class OptionNotCombinable extends ValidationError {
    constructor(option){
        super(`Option "${getFlag(option)}" cannot be combined with other options.`);
        Object.setPrototypeOf(this, OptionNotCombinable.prototype);
    }
}
class ConflictingOption extends ValidationError {
    constructor(option, conflictingOption){
        super(`Option "${getFlag(option)}" conflicts with option "${getFlag(conflictingOption)}".`);
        Object.setPrototypeOf(this, ConflictingOption.prototype);
    }
}
class DependingOption extends ValidationError {
    constructor(option, dependingOption){
        super(`Option "${getFlag(option)}" depends on option "${getFlag(dependingOption)}".`);
        Object.setPrototypeOf(this, DependingOption.prototype);
    }
}
class MissingRequiredOption extends ValidationError {
    constructor(option){
        super(`Missing required option "${getFlag(option)}".`);
        Object.setPrototypeOf(this, MissingRequiredOption.prototype);
    }
}
class RequiredArgumentFollowsOptionalArgument extends ValidationError {
    constructor(arg){
        super(`An required argument cannot follow an optional argument, but "${arg}"  is defined as required.`);
        Object.setPrototypeOf(this, RequiredArgumentFollowsOptionalArgument.prototype);
    }
}
class ArgumentFollowsVariadicArgument extends ValidationError {
    constructor(arg){
        super(`An argument cannot follow an variadic argument, but got "${arg}".`);
        Object.setPrototypeOf(this, ArgumentFollowsVariadicArgument.prototype);
    }
}
class NoArguments extends ValidationError {
    constructor(){
        super(`No arguments.`);
        Object.setPrototypeOf(this, NoArguments.prototype);
    }
}
class InvalidTypeError extends ValidationError {
    constructor({ label , name , value , type  }, expected){
        super(`${label} "${name}" must be of type "${type}", but got "${value}".` + (expected ? ` Expected values: ${expected.map((value)=>`"${value}"`).join(", ")}` : ""));
        Object.setPrototypeOf(this, MissingOptionValue.prototype);
    }
}
var OptionType;
(function(OptionType) {
    OptionType["STRING"] = "string";
    OptionType["NUMBER"] = "number";
    OptionType["INTEGER"] = "integer";
    OptionType["BOOLEAN"] = "boolean";
})(OptionType || (OptionType = {}));
function didYouMeanCommand(command, commands, excludes = []) {
    const commandNames = commands.map((command)=>command.getName()).filter((command)=>!excludes.includes(command));
    return didYouMean(" Did you mean command", command, commandNames);
}
const ARGUMENT_REGEX = /^[<\[].+[\]>]$/;
const ARGUMENT_DETAILS_REGEX = /[<\[:>\]]/;
function splitArguments(args) {
    const parts = args.trim().split(/[, =] */g);
    const typeParts = [];
    while(parts[parts.length - 1] && ARGUMENT_REGEX.test(parts[parts.length - 1])){
        typeParts.unshift(parts.pop());
    }
    const typeDefinition = typeParts.join(" ");
    return {
        flags: parts,
        typeDefinition,
        equalsSign: args.includes("=")
    };
}
function parseArgumentsDefinition(argsDefinition, validate = true, all) {
    const argumentDetails = [];
    let hasOptional = false;
    let hasVariadic = false;
    const parts = argsDefinition.split(/ +/);
    for (const arg of parts){
        if (validate && hasVariadic) {
            throw new ArgumentFollowsVariadicArgument(arg);
        }
        const parts1 = arg.split(ARGUMENT_DETAILS_REGEX);
        if (!parts1[1]) {
            if (all) {
                argumentDetails.push(parts1[0]);
            }
            continue;
        }
        const type = parts1[2] || OptionType.STRING;
        const details = {
            optionalValue: arg[0] === "[",
            requiredValue: arg[0] === "<",
            name: parts1[1],
            action: parts1[3] || type,
            variadic: false,
            list: type ? arg.indexOf(type + "[]") !== -1 : false,
            type
        };
        if (validate && !details.optionalValue && hasOptional) {
            throw new RequiredArgumentFollowsOptionalArgument(details.name);
        }
        if (arg[0] === "[") {
            hasOptional = true;
        }
        if (details.name.length > 3) {
            const istVariadicLeft = details.name.slice(0, 3) === "...";
            const istVariadicRight = details.name.slice(-3) === "...";
            hasVariadic = details.variadic = istVariadicLeft || istVariadicRight;
            if (istVariadicLeft) {
                details.name = details.name.slice(3);
            } else if (istVariadicRight) {
                details.name = details.name.slice(0, -3);
            }
        }
        argumentDetails.push(details);
    }
    return argumentDetails;
}
function dedent(str) {
    const lines = str.split(/\r?\n|\r/g);
    let text = "";
    let indent = 0;
    for (const line of lines){
        if (text || line.trim()) {
            if (!text) {
                text = line.trimStart();
                indent = line.length - text.length;
            } else {
                text += line.slice(indent);
            }
            text += "\n";
        }
    }
    return text.trimEnd();
}
function getDescription(description, __short) {
    return __short ? description.trim().split("\n", 1)[0] : dedent(description);
}
class CommandError extends Error {
    constructor(message){
        super(message);
        Object.setPrototypeOf(this, CommandError.prototype);
    }
}
class ValidationError1 extends CommandError {
    exitCode;
    constructor(message, { exitCode  } = {}){
        super(message);
        Object.setPrototypeOf(this, ValidationError1.prototype);
        this.exitCode = exitCode ?? 1;
    }
}
class DuplicateOptionName extends CommandError {
    constructor(name){
        super(`Option with name "${getFlag(name)}" already exists.`);
        Object.setPrototypeOf(this, DuplicateOptionName.prototype);
    }
}
class MissingCommandName extends CommandError {
    constructor(){
        super("Missing command name.");
        Object.setPrototypeOf(this, MissingCommandName.prototype);
    }
}
class DuplicateCommandName extends CommandError {
    constructor(name){
        super(`Duplicate command name "${name}".`);
        Object.setPrototypeOf(this, DuplicateCommandName.prototype);
    }
}
class DuplicateCommandAlias extends CommandError {
    constructor(alias){
        super(`Duplicate command alias "${alias}".`);
        Object.setPrototypeOf(this, DuplicateCommandAlias.prototype);
    }
}
class CommandNotFound extends CommandError {
    constructor(name, commands, excluded){
        super(`Unknown command "${name}".${didYouMeanCommand(name, commands, excluded)}`);
        Object.setPrototypeOf(this, UnknownCommand.prototype);
    }
}
class DuplicateType extends CommandError {
    constructor(name){
        super(`Type with name "${name}" already exists.`);
        Object.setPrototypeOf(this, DuplicateType.prototype);
    }
}
class DuplicateCompletion extends CommandError {
    constructor(name){
        super(`Completion with name "${name}" already exists.`);
        Object.setPrototypeOf(this, DuplicateCompletion.prototype);
    }
}
class DuplicateExample extends CommandError {
    constructor(name){
        super(`Example with name "${name}" already exists.`);
        Object.setPrototypeOf(this, DuplicateExample.prototype);
    }
}
class DuplicateEnvironmentVariable extends CommandError {
    constructor(name){
        super(`Environment variable with name "${name}" already exists.`);
        Object.setPrototypeOf(this, DuplicateEnvironmentVariable.prototype);
    }
}
class MissingRequiredEnvVar extends ValidationError1 {
    constructor(envVar){
        super(`Missing required environment variable "${envVar.names[0]}".`);
        Object.setPrototypeOf(this, MissingRequiredEnvVar.prototype);
    }
}
class EnvironmentVariableSingleValue extends CommandError {
    constructor(name){
        super(`An environment variable can only have one value, but "${name}" has more than one.`);
        Object.setPrototypeOf(this, EnvironmentVariableSingleValue.prototype);
    }
}
class EnvironmentVariableOptionalValue extends CommandError {
    constructor(name){
        super(`An environment variable cannot have an optional value, but "${name}" is defined as optional.`);
        Object.setPrototypeOf(this, EnvironmentVariableOptionalValue.prototype);
    }
}
class EnvironmentVariableVariadicValue extends CommandError {
    constructor(name){
        super(`An environment variable cannot have an variadic value, but "${name}" is defined as variadic.`);
        Object.setPrototypeOf(this, EnvironmentVariableVariadicValue.prototype);
    }
}
class DefaultCommandNotFound extends CommandError {
    constructor(name, commands){
        super(`Default command "${name}" not found.${didYouMeanCommand(name, commands)}`);
        Object.setPrototypeOf(this, DefaultCommandNotFound.prototype);
    }
}
class CommandExecutableNotFound extends CommandError {
    constructor(name){
        super(`Command executable not found: ${name}`);
        Object.setPrototypeOf(this, CommandExecutableNotFound.prototype);
    }
}
class UnknownCompletionCommand extends CommandError {
    constructor(name, commands){
        super(`Auto-completion failed. Unknown command "${name}".${didYouMeanCommand(name, commands)}`);
        Object.setPrototypeOf(this, UnknownCompletionCommand.prototype);
    }
}
class UnknownCommand extends ValidationError1 {
    constructor(name, commands, excluded){
        super(`Unknown command "${name}".${didYouMeanCommand(name, commands, excluded)}`);
        Object.setPrototypeOf(this, UnknownCommand.prototype);
    }
}
class NoArgumentsAllowed extends ValidationError1 {
    constructor(name){
        super(`No arguments allowed for command "${name}".`);
        Object.setPrototypeOf(this, NoArgumentsAllowed.prototype);
    }
}
class MissingArguments extends ValidationError1 {
    constructor(args){
        super("Missing argument(s): " + args.join(", "));
        Object.setPrototypeOf(this, MissingArguments.prototype);
    }
}
class MissingArgument extends ValidationError1 {
    constructor(arg){
        super(`Missing argument "${arg}".`);
        Object.setPrototypeOf(this, MissingArgument.prototype);
    }
}
class TooManyArguments extends ValidationError1 {
    constructor(args){
        super(`Too many arguments: ${args.join(" ")}`);
        Object.setPrototypeOf(this, TooManyArguments.prototype);
    }
}
const __boolean = (type)=>{
    if (~[
        "1",
        "true"
    ].indexOf(type.value)) {
        return true;
    }
    if (~[
        "0",
        "false"
    ].indexOf(type.value)) {
        return false;
    }
    throw new InvalidTypeError(type);
};
const number = (type)=>{
    const value = Number(type.value);
    if (Number.isFinite(value)) {
        return value;
    }
    throw new InvalidTypeError(type);
};
const string = ({ value  })=>{
    return value;
};
function validateFlags(opts, values, optionNameMap = {}) {
    if (!opts.flags?.length) {
        return;
    }
    const defaultValues = setDefaultValues(opts, values, optionNameMap);
    const optionNames = Object.keys(values);
    if (!optionNames.length && opts.allowEmpty) {
        return;
    }
    const options = optionNames.map((name)=>({
            name,
            option: getOption(opts.flags, optionNameMap[name])
        }));
    for (const { name , option  } of options){
        if (!option) {
            throw new UnknownOption(name, opts.flags);
        }
        if (validateStandaloneOption(option, options, optionNames, defaultValues)) {
            return;
        }
        validateConflictingOptions(option, values);
        validateDependingOptions(option, values, defaultValues);
        validateRequiredValues(option, values, name);
    }
    validateRequiredOptions(options, values, opts);
}
function setDefaultValues(opts, values, optionNameMap = {}) {
    const defaultValues = {};
    if (!opts.flags?.length) {
        return defaultValues;
    }
    for (const option of opts.flags){
        let name;
        let defaultValue = undefined;
        if (option.name.startsWith("no-")) {
            const propName = option.name.replace(/^no-/, "");
            if (propName in values) {
                continue;
            }
            const positiveOption = getOption(opts.flags, propName);
            if (positiveOption) {
                continue;
            }
            name = paramCaseToCamelCase(propName);
            defaultValue = true;
        }
        if (!name) {
            name = paramCaseToCamelCase(option.name);
        }
        if (!(name in optionNameMap)) {
            optionNameMap[name] = option.name;
        }
        const hasDefaultValue = (!opts.ignoreDefaults || typeof opts.ignoreDefaults[name] === "undefined") && typeof values[name] === "undefined" && (typeof option.default !== "undefined" || typeof defaultValue !== "undefined");
        if (hasDefaultValue) {
            values[name] = getDefaultValue(option) ?? defaultValue;
            defaultValues[option.name] = true;
            if (typeof option.value === "function") {
                values[name] = option.value(values[name]);
            }
        }
    }
    return defaultValues;
}
function validateStandaloneOption(option, options, optionNames, defaultValues) {
    if (!option.standalone) {
        return false;
    }
    if (optionNames.length === 1) {
        return true;
    }
    if (options.every((opt)=>opt.option && (option === opt.option || defaultValues[opt.option.name]))) {
        return true;
    }
    throw new OptionNotCombinable(option.name);
}
function validateConflictingOptions(option, values) {
    option.conflicts?.forEach((flag)=>{
        if (isset(flag, values)) {
            throw new ConflictingOption(option.name, flag);
        }
    });
}
function validateDependingOptions(option, values, defaultValues) {
    option.depends?.forEach((flag)=>{
        if (!isset(flag, values) && !defaultValues[option.name]) {
            throw new DependingOption(option.name, flag);
        }
    });
}
function validateRequiredValues(option, values, name) {
    const isArray = (option.args?.length || 0) > 1;
    option.args?.forEach((arg, i)=>{
        if (arg.requiredValue && (typeof values[name] === "undefined" || isArray && typeof values[name][i] === "undefined")) {
            throw new MissingOptionValue(option.name);
        }
    });
}
function validateRequiredOptions(options, values, opts) {
    if (!opts.flags?.length) {
        return;
    }
    for (const option of opts.flags){
        if (option.required && !(paramCaseToCamelCase(option.name) in values)) {
            if ((!option.conflicts || !option.conflicts.find((flag)=>!!values[flag])) && !options.find((opt)=>opt.option?.conflicts?.find((flag)=>flag === option.name))) {
                throw new MissingRequiredOption(option.name);
            }
        }
    }
}
function isset(flag, values) {
    const name = paramCaseToCamelCase(flag);
    return typeof values[name] !== "undefined";
}
const integer = (type)=>{
    const value = Number(type.value);
    if (Number.isInteger(value)) {
        return value;
    }
    throw new InvalidTypeError(type);
};
const Types = {
    [OptionType.STRING]: string,
    [OptionType.NUMBER]: number,
    [OptionType.INTEGER]: integer,
    [OptionType.BOOLEAN]: __boolean
};
function parseFlags(args, opts = {}) {
    args = args.slice();
    !opts.flags && (opts.flags = []);
    let inLiteral = false;
    let negate = false;
    const flags = {};
    const optionNameMap = {};
    let literal = [];
    let unknown = [];
    let stopEarly = null;
    opts.flags.forEach((opt)=>{
        opt.depends?.forEach((flag)=>{
            if (!opts.flags || !getOption(opts.flags, flag)) {
                throw new UnknownRequiredOption(flag, opts.flags ?? []);
            }
        });
        opt.conflicts?.forEach((flag)=>{
            if (!opts.flags || !getOption(opts.flags, flag)) {
                throw new UnknownConflictingOption(flag, opts.flags ?? []);
            }
        });
    });
    for(let argsIndex = 0; argsIndex < args.length; argsIndex++){
        let option;
        let optionArgs;
        let current = args[argsIndex];
        let currentValue;
        if (inLiteral) {
            literal.push(current);
            continue;
        }
        if (current === "--") {
            inLiteral = true;
            continue;
        }
        const isFlag = current.length > 1 && current[0] === "-";
        const next = ()=>currentValue ?? args[argsIndex + 1];
        if (isFlag) {
            const isShort = current[1] !== "-";
            const isLong = isShort ? false : current.length > 3 && current[2] !== "-";
            if (!isShort && !isLong) {
                throw new InvalidOption(current, opts.flags);
            }
            const equalSignIndex = current.indexOf("=");
            if (equalSignIndex > -1) {
                currentValue = current.slice(equalSignIndex + 1) || undefined;
                current = current.slice(0, equalSignIndex);
            }
            if (isShort && current.length > 2 && current[2] !== ".") {
                args.splice(argsIndex, 1, ...splitFlags(current));
                current = args[argsIndex];
            } else if (isLong && current.startsWith("--no-")) {
                negate = true;
            }
            option = getOption(opts.flags, current);
            if (!option) {
                if (opts.flags.length) {
                    const name = current.replace(/^-+/g, "");
                    option = matchWildCardOptions(name, opts.flags);
                    if (!option) {
                        throw new UnknownOption(current, opts.flags);
                    }
                }
                if (!option) {
                    option = {
                        name: current.replace(/^-+/, ""),
                        optionalValue: true,
                        type: OptionType.STRING
                    };
                }
            }
            const positiveName = negate ? option.name.replace(/^no-?/, "") : option.name;
            const propName = paramCaseToCamelCase(positiveName);
            if (typeof flags[propName] !== "undefined") {
                if (!opts.flags.length) {
                    option.collect = true;
                } else if (!option.collect) {
                    throw new DuplicateOption(current);
                }
            }
            optionArgs = option.args?.length ? option.args : [
                {
                    type: option.type,
                    requiredValue: option.requiredValue,
                    optionalValue: option.optionalValue,
                    variadic: option.variadic,
                    list: option.list,
                    separator: option.separator
                }
            ];
            let optionArgsIndex = 0;
            let inOptionalArg = false;
            const previous = flags[propName];
            parseNext(option, optionArgs);
            if (typeof flags[propName] === "undefined") {
                if (optionArgs[optionArgsIndex].requiredValue) {
                    throw new MissingOptionValue(option.name);
                } else if (typeof option.default !== "undefined") {
                    flags[propName] = getDefaultValue(option);
                } else {
                    flags[propName] = true;
                }
            }
            if (option.value) {
                flags[propName] = option.value(flags[propName], previous);
            } else if (option.collect) {
                const value = typeof previous !== "undefined" ? Array.isArray(previous) ? previous : [
                    previous
                ] : [];
                value.push(flags[propName]);
                flags[propName] = value;
            }
            optionNameMap[propName] = option.name;
            opts.option?.(option, flags[propName]);
            function parseNext(option, optionArgs) {
                const arg = optionArgs[optionArgsIndex];
                if (!arg) {
                    const flag = next();
                    throw new UnknownOption(flag, opts.flags ?? []);
                }
                if (!arg.type) {
                    arg.type = OptionType.BOOLEAN;
                }
                if (option.args?.length) {
                    if ((typeof arg.optionalValue === "undefined" || arg.optionalValue === false) && typeof arg.requiredValue === "undefined") {
                        arg.requiredValue = true;
                    }
                } else {
                    if (arg.type !== OptionType.BOOLEAN && (typeof arg.optionalValue === "undefined" || arg.optionalValue === false) && typeof arg.requiredValue === "undefined") {
                        arg.requiredValue = true;
                    }
                }
                if (arg.requiredValue) {
                    if (inOptionalArg) {
                        throw new RequiredArgumentFollowsOptionalArgument(option.name);
                    }
                } else {
                    inOptionalArg = true;
                }
                if (negate) {
                    flags[propName] = false;
                    return;
                }
                let result;
                let increase = false;
                if (arg.list && hasNext(arg)) {
                    const parsed = next().split(arg.separator || ",").map((nextValue)=>{
                        const value = parseValue(option, arg, nextValue);
                        if (typeof value === "undefined") {
                            throw new InvalidOptionValue(option.name, arg.type ?? "?", nextValue);
                        }
                        return value;
                    });
                    if (parsed?.length) {
                        result = parsed;
                    }
                } else {
                    if (hasNext(arg)) {
                        result = parseValue(option, arg, next());
                    } else if (arg.optionalValue && arg.type === OptionType.BOOLEAN) {
                        result = true;
                    }
                }
                if (increase && typeof currentValue === "undefined") {
                    argsIndex++;
                    if (!arg.variadic) {
                        optionArgsIndex++;
                    } else if (optionArgs[optionArgsIndex + 1]) {
                        throw new ArgumentFollowsVariadicArgument(next());
                    }
                }
                if (typeof result !== "undefined" && (optionArgs.length > 1 || arg.variadic)) {
                    if (!flags[propName]) {
                        flags[propName] = [];
                    }
                    flags[propName].push(result);
                    if (hasNext(arg)) {
                        parseNext(option, optionArgs);
                    }
                } else {
                    flags[propName] = result;
                }
                function hasNext(arg) {
                    const nextValue = currentValue ?? args[argsIndex + 1];
                    if (!nextValue) {
                        return false;
                    }
                    if (optionArgs.length > 1 && optionArgsIndex >= optionArgs.length) {
                        return false;
                    }
                    if (arg.requiredValue) {
                        return true;
                    }
                    if (option.equalsSign && arg.optionalValue && !arg.variadic && typeof currentValue === "undefined") {
                        return false;
                    }
                    if (arg.optionalValue || arg.variadic) {
                        return nextValue[0] !== "-" || arg.type === OptionType.NUMBER && !isNaN(Number(nextValue));
                    }
                    return false;
                }
                function parseValue(option, arg, value) {
                    const type = arg.type || OptionType.STRING;
                    const result = opts.parse ? opts.parse({
                        label: "Option",
                        type,
                        name: `--${option.name}`,
                        value
                    }) : parseFlagValue(option, arg, value);
                    if (typeof result !== "undefined") {
                        increase = true;
                    }
                    return result;
                }
            }
        } else {
            if (opts.stopEarly) {
                stopEarly = current;
                break;
            }
            unknown.push(current);
        }
    }
    if (stopEarly) {
        const stopEarlyArgIndex = args.indexOf(stopEarly);
        if (stopEarlyArgIndex !== -1) {
            const doubleDashIndex = args.indexOf("--");
            unknown = args.slice(stopEarlyArgIndex, doubleDashIndex === -1 ? undefined : doubleDashIndex);
            if (doubleDashIndex !== -1) {
                literal = args.slice(doubleDashIndex + 1);
            }
        }
    }
    validateFlags(opts, flags, optionNameMap);
    const result = Object.keys(flags).reduce((result, key)=>{
        if (~key.indexOf(".")) {
            key.split(".").reduce((result, subKey, index, parts)=>{
                if (index === parts.length - 1) {
                    result[subKey] = flags[key];
                } else {
                    result[subKey] = result[subKey] ?? {};
                }
                return result[subKey];
            }, result);
        } else {
            result[key] = flags[key];
        }
        return result;
    }, {});
    return {
        flags: result,
        unknown,
        literal
    };
}
function splitFlags(flag) {
    const normalized = [];
    const flags = flag.slice(1).split("");
    if (isNaN(Number(flag[flag.length - 1]))) {
        flags.forEach((val)=>normalized.push(`-${val}`));
    } else {
        normalized.push(`-${flags.shift()}`);
        if (flags.length) {
            normalized.push(flags.join(""));
        }
    }
    return normalized;
}
function parseFlagValue(option, arg, value) {
    const type = arg.type || OptionType.STRING;
    const parseType = Types[type];
    if (!parseType) {
        throw new UnknownType(type, Object.keys(Types));
    }
    return parseType({
        label: "Option",
        type,
        name: `--${option.name}`,
        value
    });
}
class Type1 {
}
class BooleanType extends Type1 {
    parse(type) {
        return __boolean(type);
    }
    complete() {
        return [
            "true",
            "false"
        ];
    }
}
class StringType extends Type1 {
    parse(type) {
        return string(type);
    }
}
class FileType extends StringType {
    constructor(){
        super();
    }
}
class NumberType extends Type1 {
    parse(type) {
        return number(type);
    }
}
const border = {
    top: "─",
    topMid: "┬",
    topLeft: "┌",
    topRight: "┐",
    bottom: "─",
    bottomMid: "┴",
    bottomLeft: "└",
    bottomRight: "┘",
    left: "│",
    leftMid: "├",
    mid: "─",
    midMid: "┼",
    right: "│",
    rightMid: "┤",
    middle: "│"
};
class Cell {
    options;
    get length() {
        return this.toString().length;
    }
    static from(value) {
        const cell = new this(value);
        if (value instanceof Cell) {
            cell.options = {
                ...value.options
            };
        }
        return cell;
    }
    constructor(value){
        this.value = value;
        this.options = {};
    }
    toString() {
        return this.value.toString();
    }
    setValue(value) {
        this.value = value;
        return this;
    }
    clone(value) {
        const cell = new Cell(value ?? this);
        cell.options = {
            ...this.options
        };
        return cell;
    }
    border(enable, override = true) {
        if (override || typeof this.options.border === "undefined") {
            this.options.border = enable;
        }
        return this;
    }
    colSpan(span, override = true) {
        if (override || typeof this.options.colSpan === "undefined") {
            this.options.colSpan = span;
        }
        return this;
    }
    rowSpan(span, override = true) {
        if (override || typeof this.options.rowSpan === "undefined") {
            this.options.rowSpan = span;
        }
        return this;
    }
    align(direction, override = true) {
        if (override || typeof this.options.align === "undefined") {
            this.options.align = direction;
        }
        return this;
    }
    getBorder() {
        return this.options.border === true;
    }
    getColSpan() {
        return typeof this.options.colSpan === "number" && this.options.colSpan > 0 ? this.options.colSpan : 1;
    }
    getRowSpan() {
        return typeof this.options.rowSpan === "number" && this.options.rowSpan > 0 ? this.options.rowSpan : 1;
    }
    getAlign() {
        return this.options.align ?? "left";
    }
    value;
}
class Row extends Array {
    options = {};
    static from(cells) {
        const row = new this(...cells);
        if (cells instanceof Row) {
            row.options = {
                ...cells.options
            };
        }
        return row;
    }
    clone() {
        const row = new Row(...this.map((cell)=>cell instanceof Cell ? cell.clone() : cell));
        row.options = {
            ...this.options
        };
        return row;
    }
    border(enable, override = true) {
        if (override || typeof this.options.border === "undefined") {
            this.options.border = enable;
        }
        return this;
    }
    align(direction, override = true) {
        if (override || typeof this.options.align === "undefined") {
            this.options.align = direction;
        }
        return this;
    }
    getBorder() {
        return this.options.border === true;
    }
    hasBorder() {
        return this.getBorder() || this.some((cell)=>cell instanceof Cell && cell.getBorder());
    }
    getAlign() {
        return this.options.align ?? "left";
    }
}
function consumeWords(length, content) {
    let consumed = "";
    const words = content.split("\n")[0]?.split(/ /g);
    for(let i = 0; i < words.length; i++){
        const word = words[i];
        if (consumed) {
            const nextLength = strLength(word);
            const consumedLength = strLength(consumed);
            if (consumedLength + nextLength >= length) {
                break;
            }
        }
        consumed += (i > 0 ? " " : "") + word;
    }
    return consumed;
}
function longest(index, rows, maxWidth) {
    const cellLengths = rows.map((row)=>{
        const cell = row[index];
        const cellValue = cell instanceof Cell && cell.getColSpan() > 1 ? "" : cell?.toString() || "";
        return cellValue.split("\n").map((line)=>{
            const str = typeof maxWidth === "undefined" ? line : consumeWords(maxWidth, line);
            return strLength(str) || 0;
        });
    }).flat();
    return Math.max(...cellLengths);
}
const strLength = (str)=>{
    str = stripColor(str);
    let length = 0;
    for(let i = 0; i < str.length; i++){
        const charCode = str.charCodeAt(i);
        if (charCode >= 19968 && charCode <= 40869) {
            length += 2;
        } else {
            length += 1;
        }
    }
    return length;
};
class TableLayout {
    constructor(table, options){
        this.table = table;
        this.options = options;
    }
    toString() {
        const opts = this.createLayout();
        return opts.rows.length ? this.renderRows(opts) : "";
    }
    createLayout() {
        Object.keys(this.options.chars).forEach((key)=>{
            if (typeof this.options.chars[key] !== "string") {
                this.options.chars[key] = "";
            }
        });
        const hasBodyBorder = this.table.getBorder() || this.table.hasBodyBorder();
        const hasHeaderBorder = this.table.hasHeaderBorder();
        const hasBorder = hasHeaderBorder || hasBodyBorder;
        const rows = this.#getRows();
        const columns = Math.max(...rows.map((row)=>row.length));
        for (const row of rows){
            const length = row.length;
            if (length < columns) {
                const diff = columns - length;
                for(let i = 0; i < diff; i++){
                    row.push(this.createCell(null, row));
                }
            }
        }
        const padding = [];
        const width = [];
        for(let colIndex = 0; colIndex < columns; colIndex++){
            const minColWidth = Array.isArray(this.options.minColWidth) ? this.options.minColWidth[colIndex] : this.options.minColWidth;
            const maxColWidth = Array.isArray(this.options.maxColWidth) ? this.options.maxColWidth[colIndex] : this.options.maxColWidth;
            const colWidth = longest(colIndex, rows, maxColWidth);
            width[colIndex] = Math.min(maxColWidth, Math.max(minColWidth, colWidth));
            padding[colIndex] = Array.isArray(this.options.padding) ? this.options.padding[colIndex] : this.options.padding;
        }
        return {
            padding,
            width,
            rows,
            columns,
            hasBorder,
            hasBodyBorder,
            hasHeaderBorder
        };
    }
     #getRows() {
        const header = this.table.getHeader();
        const rows = header ? [
            header,
            ...this.table
        ] : this.table.slice();
        const hasSpan = rows.some((row)=>row.some((cell)=>cell instanceof Cell && (cell.getColSpan() > 1 || cell.getRowSpan() > 1)));
        if (hasSpan) {
            return this.spanRows(rows);
        }
        return rows.map((row)=>{
            const newRow = this.createRow(row);
            return newRow.map((cell)=>this.createCell(cell, newRow));
        });
    }
    spanRows(_rows, rowIndex = 0, colIndex = 0, rowSpan = [], colSpan = 1) {
        const rows = _rows;
        if (rowIndex >= rows.length && rowSpan.every((span)=>span === 1)) {
            return rows;
        } else if (rows[rowIndex] && colIndex >= rows[rowIndex].length && colIndex >= rowSpan.length && colSpan === 1) {
            return this.spanRows(rows, ++rowIndex, 0, rowSpan, 1);
        }
        if (colSpan > 1) {
            colSpan--;
            rowSpan[colIndex] = rowSpan[colIndex - 1];
            rows[rowIndex].splice(colIndex - 1, 0, rows[rowIndex][colIndex - 1]);
            return this.spanRows(rows, rowIndex, ++colIndex, rowSpan, colSpan);
        }
        if (colIndex === 0) {
            rows[rowIndex] = this.createRow(rows[rowIndex] || []);
        }
        if (rowSpan[colIndex] > 1) {
            rowSpan[colIndex]--;
            rows[rowIndex].splice(colIndex, 0, rows[rowIndex - 1][colIndex]);
            return this.spanRows(rows, rowIndex, ++colIndex, rowSpan, colSpan);
        }
        rows[rowIndex][colIndex] = this.createCell(rows[rowIndex][colIndex] || null, rows[rowIndex]);
        colSpan = rows[rowIndex][colIndex].getColSpan();
        rowSpan[colIndex] = rows[rowIndex][colIndex].getRowSpan();
        return this.spanRows(rows, rowIndex, ++colIndex, rowSpan, colSpan);
    }
    createRow(row) {
        return Row.from(row).border(this.table.getBorder(), false).align(this.table.getAlign(), false);
    }
    createCell(cell, row) {
        return Cell.from(cell ?? "").border(row.getBorder(), false).align(row.getAlign(), false);
    }
    renderRows(opts) {
        let result = "";
        const rowSpan = new Array(opts.columns).fill(1);
        for(let rowIndex = 0; rowIndex < opts.rows.length; rowIndex++){
            result += this.renderRow(rowSpan, rowIndex, opts);
        }
        return result.slice(0, -1);
    }
    renderRow(rowSpan, rowIndex, opts, isMultiline) {
        const row = opts.rows[rowIndex];
        const prevRow = opts.rows[rowIndex - 1];
        const nextRow = opts.rows[rowIndex + 1];
        let result = "";
        let colSpan = 1;
        if (!isMultiline && rowIndex === 0 && row.hasBorder()) {
            result += this.renderBorderRow(undefined, row, rowSpan, opts);
        }
        let isMultilineRow = false;
        result += " ".repeat(this.options.indent || 0);
        for(let colIndex = 0; colIndex < opts.columns; colIndex++){
            if (colSpan > 1) {
                colSpan--;
                rowSpan[colIndex] = rowSpan[colIndex - 1];
                continue;
            }
            result += this.renderCell(colIndex, row, opts);
            if (rowSpan[colIndex] > 1) {
                if (!isMultiline) {
                    rowSpan[colIndex]--;
                }
            } else if (!prevRow || prevRow[colIndex] !== row[colIndex]) {
                rowSpan[colIndex] = row[colIndex].getRowSpan();
            }
            colSpan = row[colIndex].getColSpan();
            if (rowSpan[colIndex] === 1 && row[colIndex].length) {
                isMultilineRow = true;
            }
        }
        if (opts.columns > 0) {
            if (row[opts.columns - 1].getBorder()) {
                result += this.options.chars.right;
            } else if (opts.hasBorder) {
                result += " ";
            }
        }
        result += "\n";
        if (isMultilineRow) {
            return result + this.renderRow(rowSpan, rowIndex, opts, isMultilineRow);
        }
        if (rowIndex === 0 && opts.hasHeaderBorder || rowIndex < opts.rows.length - 1 && opts.hasBodyBorder) {
            result += this.renderBorderRow(row, nextRow, rowSpan, opts);
        }
        if (rowIndex === opts.rows.length - 1 && row.hasBorder()) {
            result += this.renderBorderRow(row, undefined, rowSpan, opts);
        }
        return result;
    }
    renderCell(colIndex, row, opts, noBorder) {
        let result = "";
        const prevCell = row[colIndex - 1];
        const cell = row[colIndex];
        if (!noBorder) {
            if (colIndex === 0) {
                if (cell.getBorder()) {
                    result += this.options.chars.left;
                } else if (opts.hasBorder) {
                    result += " ";
                }
            } else {
                if (cell.getBorder() || prevCell?.getBorder()) {
                    result += this.options.chars.middle;
                } else if (opts.hasBorder) {
                    result += " ";
                }
            }
        }
        let maxLength = opts.width[colIndex];
        const colSpan = cell.getColSpan();
        if (colSpan > 1) {
            for(let o = 1; o < colSpan; o++){
                maxLength += opts.width[colIndex + o] + opts.padding[colIndex + o];
                if (opts.hasBorder) {
                    maxLength += opts.padding[colIndex + o] + 1;
                }
            }
        }
        const { current , next  } = this.renderCellValue(cell, maxLength);
        row[colIndex].setValue(next);
        if (opts.hasBorder) {
            result += " ".repeat(opts.padding[colIndex]);
        }
        result += current;
        if (opts.hasBorder || colIndex < opts.columns - 1) {
            result += " ".repeat(opts.padding[colIndex]);
        }
        return result;
    }
    renderCellValue(cell, maxLength) {
        const length = Math.min(maxLength, strLength(cell.toString()));
        let words = consumeWords(length, cell.toString());
        const breakWord = strLength(words) > length;
        if (breakWord) {
            words = words.slice(0, length);
        }
        const next = cell.toString().slice(words.length + (breakWord ? 0 : 1));
        const fillLength = maxLength - strLength(words);
        const align = cell.getAlign();
        let current;
        if (fillLength === 0) {
            current = words;
        } else if (align === "left") {
            current = words + " ".repeat(fillLength);
        } else if (align === "center") {
            current = " ".repeat(Math.floor(fillLength / 2)) + words + " ".repeat(Math.ceil(fillLength / 2));
        } else if (align === "right") {
            current = " ".repeat(fillLength) + words;
        } else {
            throw new Error("Unknown direction: " + align);
        }
        return {
            current,
            next: cell.clone(next)
        };
    }
    renderBorderRow(prevRow, nextRow, rowSpan, opts) {
        let result = "";
        let colSpan = 1;
        for(let colIndex = 0; colIndex < opts.columns; colIndex++){
            if (rowSpan[colIndex] > 1) {
                if (!nextRow) {
                    throw new Error("invalid layout");
                }
                if (colSpan > 1) {
                    colSpan--;
                    continue;
                }
            }
            result += this.renderBorderCell(colIndex, prevRow, nextRow, rowSpan, opts);
            colSpan = nextRow?.[colIndex].getColSpan() ?? 1;
        }
        return result.length ? " ".repeat(this.options.indent) + result + "\n" : "";
    }
    renderBorderCell(colIndex, prevRow, nextRow, rowSpan, opts) {
        const a1 = prevRow?.[colIndex - 1];
        const a2 = nextRow?.[colIndex - 1];
        const b1 = prevRow?.[colIndex];
        const b2 = nextRow?.[colIndex];
        const a1Border = !!a1?.getBorder();
        const a2Border = !!a2?.getBorder();
        const b1Border = !!b1?.getBorder();
        const b2Border = !!b2?.getBorder();
        const hasColSpan = (cell)=>(cell?.getColSpan() ?? 1) > 1;
        const hasRowSpan = (cell)=>(cell?.getRowSpan() ?? 1) > 1;
        let result = "";
        if (colIndex === 0) {
            if (rowSpan[colIndex] > 1) {
                if (b1Border) {
                    result += this.options.chars.left;
                } else {
                    result += " ";
                }
            } else if (b1Border && b2Border) {
                result += this.options.chars.leftMid;
            } else if (b1Border) {
                result += this.options.chars.bottomLeft;
            } else if (b2Border) {
                result += this.options.chars.topLeft;
            } else {
                result += " ";
            }
        } else if (colIndex < opts.columns) {
            if (a1Border && b2Border || b1Border && a2Border) {
                const a1ColSpan = hasColSpan(a1);
                const a2ColSpan = hasColSpan(a2);
                const b1ColSpan = hasColSpan(b1);
                const b2ColSpan = hasColSpan(b2);
                const a1RowSpan = hasRowSpan(a1);
                const a2RowSpan = hasRowSpan(a2);
                const b1RowSpan = hasRowSpan(b1);
                const b2RowSpan = hasRowSpan(b2);
                const hasAllBorder = a1Border && b2Border && b1Border && a2Border;
                const hasAllRowSpan = a1RowSpan && b1RowSpan && a2RowSpan && b2RowSpan;
                const hasAllColSpan = a1ColSpan && b1ColSpan && a2ColSpan && b2ColSpan;
                if (hasAllRowSpan && hasAllBorder) {
                    result += this.options.chars.middle;
                } else if (hasAllColSpan && hasAllBorder && a1 === b1 && a2 === b2) {
                    result += this.options.chars.mid;
                } else if (a1ColSpan && b1ColSpan && a1 === b1) {
                    result += this.options.chars.topMid;
                } else if (a2ColSpan && b2ColSpan && a2 === b2) {
                    result += this.options.chars.bottomMid;
                } else if (a1RowSpan && a2RowSpan && a1 === a2) {
                    result += this.options.chars.leftMid;
                } else if (b1RowSpan && b2RowSpan && b1 === b2) {
                    result += this.options.chars.rightMid;
                } else {
                    result += this.options.chars.midMid;
                }
            } else if (a1Border && b1Border) {
                if (hasColSpan(a1) && hasColSpan(b1) && a1 === b1) {
                    result += this.options.chars.bottom;
                } else {
                    result += this.options.chars.bottomMid;
                }
            } else if (b1Border && b2Border) {
                if (rowSpan[colIndex] > 1) {
                    result += this.options.chars.left;
                } else {
                    result += this.options.chars.leftMid;
                }
            } else if (b2Border && a2Border) {
                if (hasColSpan(a2) && hasColSpan(b2) && a2 === b2) {
                    result += this.options.chars.top;
                } else {
                    result += this.options.chars.topMid;
                }
            } else if (a1Border && a2Border) {
                if (hasRowSpan(a1) && a1 === a2) {
                    result += this.options.chars.right;
                } else {
                    result += this.options.chars.rightMid;
                }
            } else if (a1Border) {
                result += this.options.chars.bottomRight;
            } else if (b1Border) {
                result += this.options.chars.bottomLeft;
            } else if (a2Border) {
                result += this.options.chars.topRight;
            } else if (b2Border) {
                result += this.options.chars.topLeft;
            } else {
                result += " ";
            }
        }
        const length = opts.padding[colIndex] + opts.width[colIndex] + opts.padding[colIndex];
        if (rowSpan[colIndex] > 1 && nextRow) {
            result += this.renderCell(colIndex, nextRow, opts, true);
            if (nextRow[colIndex] === nextRow[nextRow.length - 1]) {
                if (b1Border) {
                    result += this.options.chars.right;
                } else {
                    result += " ";
                }
                return result;
            }
        } else if (b1Border && b2Border) {
            result += this.options.chars.mid.repeat(length);
        } else if (b1Border) {
            result += this.options.chars.bottom.repeat(length);
        } else if (b2Border) {
            result += this.options.chars.top.repeat(length);
        } else {
            result += " ".repeat(length);
        }
        if (colIndex === opts.columns - 1) {
            if (b1Border && b2Border) {
                result += this.options.chars.rightMid;
            } else if (b1Border) {
                result += this.options.chars.bottomRight;
            } else if (b2Border) {
                result += this.options.chars.topRight;
            } else {
                result += " ";
            }
        }
        return result;
    }
    table;
    options;
}
class Table extends Array {
    static _chars = {
        ...border
    };
    options = {
        indent: 0,
        border: false,
        maxColWidth: Infinity,
        minColWidth: 0,
        padding: 1,
        chars: {
            ...Table._chars
        }
    };
    headerRow;
    static from(rows) {
        const table = new this(...rows);
        if (rows instanceof Table) {
            table.options = {
                ...rows.options
            };
            table.headerRow = rows.headerRow ? Row.from(rows.headerRow) : undefined;
        }
        return table;
    }
    static fromJson(rows) {
        return new this().fromJson(rows);
    }
    static chars(chars) {
        Object.assign(this._chars, chars);
        return this;
    }
    static render(rows) {
        Table.from(rows).render();
    }
    fromJson(rows) {
        this.header(Object.keys(rows[0]));
        this.body(rows.map((row)=>Object.values(row)));
        return this;
    }
    header(header) {
        this.headerRow = header instanceof Row ? header : Row.from(header);
        return this;
    }
    body(rows) {
        this.length = 0;
        this.push(...rows);
        return this;
    }
    clone() {
        const table = new Table(...this.map((row)=>row instanceof Row ? row.clone() : Row.from(row).clone()));
        table.options = {
            ...this.options
        };
        table.headerRow = this.headerRow?.clone();
        return table;
    }
    toString() {
        return new TableLayout(this, this.options).toString();
    }
    render() {
        console.log(this.toString());
        return this;
    }
    maxColWidth(width, override = true) {
        if (override || typeof this.options.maxColWidth === "undefined") {
            this.options.maxColWidth = width;
        }
        return this;
    }
    minColWidth(width, override = true) {
        if (override || typeof this.options.minColWidth === "undefined") {
            this.options.minColWidth = width;
        }
        return this;
    }
    indent(width, override = true) {
        if (override || typeof this.options.indent === "undefined") {
            this.options.indent = width;
        }
        return this;
    }
    padding(padding, override = true) {
        if (override || typeof this.options.padding === "undefined") {
            this.options.padding = padding;
        }
        return this;
    }
    border(enable, override = true) {
        if (override || typeof this.options.border === "undefined") {
            this.options.border = enable;
        }
        return this;
    }
    align(direction, override = true) {
        if (override || typeof this.options.align === "undefined") {
            this.options.align = direction;
        }
        return this;
    }
    chars(chars) {
        Object.assign(this.options.chars, chars);
        return this;
    }
    getHeader() {
        return this.headerRow;
    }
    getBody() {
        return [
            ...this
        ];
    }
    getMaxColWidth() {
        return this.options.maxColWidth;
    }
    getMinColWidth() {
        return this.options.minColWidth;
    }
    getIndent() {
        return this.options.indent;
    }
    getPadding() {
        return this.options.padding;
    }
    getBorder() {
        return this.options.border === true;
    }
    hasHeaderBorder() {
        const hasBorder = this.headerRow?.hasBorder();
        return hasBorder === true || this.getBorder() && hasBorder !== false;
    }
    hasBodyBorder() {
        return this.getBorder() || this.some((row)=>row instanceof Row ? row.hasBorder() : row.some((cell)=>cell instanceof Cell ? cell.getBorder : false));
    }
    hasBorder() {
        return this.hasHeaderBorder() || this.hasBodyBorder();
    }
    getAlign() {
        return this.options.align ?? "left";
    }
}
class HelpGenerator {
    indent;
    options;
    static generate(cmd, options) {
        return new HelpGenerator(cmd, options).generate();
    }
    constructor(cmd, options = {}){
        this.cmd = cmd;
        this.indent = 2;
        this.options = {
            types: false,
            hints: true,
            colors: true,
            long: false,
            ...options
        };
    }
    generate() {
        const areColorsEnabled = getColorEnabled();
        setColorEnabled(this.options.colors);
        const result = this.generateHeader() + this.generateMeta() + this.generateDescription() + this.generateOptions() + this.generateCommands() + this.generateEnvironmentVariables() + this.generateExamples();
        setColorEnabled(areColorsEnabled);
        return result;
    }
    generateHeader() {
        const usage = this.cmd.getUsage();
        const rows = [
            [
                bold("Usage:"),
                magenta(this.cmd.getPath() + (usage ? " " + highlightArguments(usage, this.options.types) : "")), 
            ], 
        ];
        const version = this.cmd.getVersion();
        if (version) {
            rows.push([
                bold("Version:"),
                yellow(`${this.cmd.getVersion()}`)
            ]);
        }
        return "\n" + Table.from(rows).indent(this.indent).padding(1).toString() + "\n";
    }
    generateMeta() {
        const meta = Object.entries(this.cmd.getMeta());
        if (!meta.length) {
            return "";
        }
        const rows = [];
        for (const [name, value] of meta){
            rows.push([
                bold(`${name}: `) + value
            ]);
        }
        return "\n" + Table.from(rows).indent(this.indent).padding(1).toString() + "\n";
    }
    generateDescription() {
        if (!this.cmd.getDescription()) {
            return "";
        }
        return this.label("Description") + Table.from([
            [
                dedent(this.cmd.getDescription())
            ], 
        ]).indent(this.indent * 2).maxColWidth(140).padding(1).toString() + "\n";
    }
    generateOptions() {
        const options = this.cmd.getOptions(false);
        if (!options.length) {
            return "";
        }
        let groups = [];
        const hasGroups = options.some((option)=>option.groupName);
        if (hasGroups) {
            for (const option of options){
                let group = groups.find((group)=>group.name === option.groupName);
                if (!group) {
                    group = {
                        name: option.groupName,
                        options: []
                    };
                    groups.push(group);
                }
                group.options.push(option);
            }
        } else {
            groups = [
                {
                    name: "Options",
                    options
                }
            ];
        }
        let result = "";
        for (const group1 of groups){
            result += this.generateOptionGroup(group1);
        }
        return result;
    }
    generateOptionGroup(group) {
        if (!group.options.length) {
            return "";
        }
        const hasTypeDefinitions = !!group.options.find((option)=>!!option.typeDefinition);
        if (hasTypeDefinitions) {
            return this.label(group.name ?? "Options") + Table.from([
                ...group.options.map((option)=>[
                        option.flags.map((flag)=>blue(flag)).join(", "),
                        highlightArguments(option.typeDefinition || "", this.options.types),
                        red(bold("-")),
                        getDescription(option.description, !this.options.long),
                        this.generateHints(option), 
                    ]), 
            ]).padding([
                2,
                2,
                1,
                2
            ]).indent(this.indent * 2).maxColWidth([
                60,
                60,
                1,
                80,
                60
            ]).toString() + "\n";
        }
        return this.label(group.name ?? "Options") + Table.from([
            ...group.options.map((option)=>[
                    option.flags.map((flag)=>blue(flag)).join(", "),
                    red(bold("-")),
                    getDescription(option.description, !this.options.long),
                    this.generateHints(option), 
                ]), 
        ]).indent(this.indent * 2).maxColWidth([
            60,
            1,
            80,
            60
        ]).padding([
            2,
            1,
            2
        ]).toString() + "\n";
    }
    generateCommands() {
        const commands = this.cmd.getCommands(false);
        if (!commands.length) {
            return "";
        }
        const hasTypeDefinitions = !!commands.find((command)=>!!command.getArgsDefinition());
        if (hasTypeDefinitions) {
            return this.label("Commands") + Table.from([
                ...commands.map((command)=>[
                        [
                            command.getName(),
                            ...command.getAliases()
                        ].map((name)=>blue(name)).join(", "),
                        highlightArguments(command.getArgsDefinition() || "", this.options.types),
                        red(bold("-")),
                        command.getShortDescription(), 
                    ]), 
            ]).indent(this.indent * 2).maxColWidth([
                60,
                60,
                1,
                80
            ]).padding([
                2,
                2,
                1,
                2
            ]).toString() + "\n";
        }
        return this.label("Commands") + Table.from([
            ...commands.map((command)=>[
                    [
                        command.getName(),
                        ...command.getAliases()
                    ].map((name)=>blue(name)).join(", "),
                    red(bold("-")),
                    command.getShortDescription(), 
                ]), 
        ]).maxColWidth([
            60,
            1,
            80
        ]).padding([
            2,
            1,
            2
        ]).indent(this.indent * 2).toString() + "\n";
    }
    generateEnvironmentVariables() {
        const envVars = this.cmd.getEnvVars(false);
        if (!envVars.length) {
            return "";
        }
        return this.label("Environment variables") + Table.from([
            ...envVars.map((envVar)=>[
                    envVar.names.map((name)=>blue(name)).join(", "),
                    highlightArgumentDetails(envVar.details, this.options.types),
                    red(bold("-")),
                    this.options.long ? dedent(envVar.description) : envVar.description.trim().split("\n", 1)[0], 
                ]), 
        ]).padding([
            2,
            2,
            1
        ]).indent(this.indent * 2).maxColWidth([
            60,
            60,
            1,
            80
        ]).toString() + "\n";
    }
    generateExamples() {
        const examples = this.cmd.getExamples();
        if (!examples.length) {
            return "";
        }
        return this.label("Examples") + Table.from(examples.map((example)=>[
                dim(bold(`${capitalize(example.name)}:`)),
                dedent(example.description), 
            ])).padding(1).indent(this.indent * 2).maxColWidth(150).toString() + "\n";
    }
    generateHints(option) {
        if (!this.options.hints) {
            return "";
        }
        const hints = [];
        option.required && hints.push(yellow(`required`));
        typeof option.default !== "undefined" && hints.push(bold(`Default: `) + inspect(option.default, this.options.colors));
        option.depends?.length && hints.push(yellow(bold(`Depends: `)) + italic(option.depends.map(getFlag).join(", ")));
        option.conflicts?.length && hints.push(red(bold(`Conflicts: `)) + italic(option.conflicts.map(getFlag).join(", ")));
        const type = this.cmd.getType(option.args[0]?.type)?.handler;
        if (type instanceof Type1) {
            const possibleValues = type.values?.(this.cmd, this.cmd.getParent());
            if (possibleValues?.length) {
                hints.push(bold(`Values: `) + possibleValues.map((value)=>inspect(value, this.options.colors)).join(", "));
            }
        }
        if (hints.length) {
            return `(${hints.join(", ")})`;
        }
        return "";
    }
    label(label) {
        return "\n" + " ".repeat(this.indent) + bold(`${label}:`) + "\n\n";
    }
    cmd;
}
function capitalize(string) {
    return (string?.charAt(0).toUpperCase() + string.slice(1)) ?? "";
}
function inspect(value, colors) {
    return Deno.inspect(value, {
        depth: 1,
        colors,
        trailingComma: false
    });
}
function highlightArguments(argsDefinition, types = true) {
    if (!argsDefinition) {
        return "";
    }
    return parseArgumentsDefinition(argsDefinition, false, true).map((arg)=>typeof arg === "string" ? arg : highlightArgumentDetails(arg, types)).join(" ");
}
function highlightArgumentDetails(arg, types = true) {
    let str = "";
    str += yellow(arg.optionalValue ? "[" : "<");
    let name = "";
    name += arg.name;
    if (arg.variadic) {
        name += "...";
    }
    name = magenta(name);
    str += name;
    if (types) {
        str += yellow(":");
        str += red(arg.type);
        if (arg.list) {
            str += green("[]");
        }
    }
    str += yellow(arg.optionalValue ? "]" : ">");
    return str;
}
class IntegerType extends Type1 {
    parse(type) {
        return integer(type);
    }
}
class Command {
    types = new Map();
    rawArgs = [];
    literalArgs = [];
    _name = "COMMAND";
    _parent;
    _globalParent;
    ver;
    desc = "";
    _usage;
    fn;
    options = [];
    commands = new Map();
    examples = [];
    envVars = [];
    aliases = [];
    completions = new Map();
    cmd = this;
    argsDefinition;
    isExecutable = false;
    throwOnError = false;
    _allowEmpty = false;
    _stopEarly = false;
    defaultCommand;
    _useRawArgs = false;
    args = [];
    isHidden = false;
    isGlobal = false;
    hasDefaults = false;
    _versionOption;
    _helpOption;
    _help;
    _shouldExit;
    _meta = {};
    _groupName;
    versionOption(flags, desc, opts) {
        this._versionOption = flags === false ? flags : {
            flags,
            desc,
            opts: typeof opts === "function" ? {
                action: opts
            } : opts
        };
        return this;
    }
    helpOption(flags, desc, opts) {
        this._helpOption = flags === false ? flags : {
            flags,
            desc,
            opts: typeof opts === "function" ? {
                action: opts
            } : opts
        };
        return this;
    }
    command(nameAndArguments, cmdOrDescription, override) {
        this.reset();
        const result = splitArguments(nameAndArguments);
        const name = result.flags.shift();
        const aliases = result.flags;
        if (!name) {
            throw new MissingCommandName();
        }
        if (this.getBaseCommand(name, true)) {
            if (!override) {
                throw new DuplicateCommandName(name);
            }
            this.removeCommand(name);
        }
        let description;
        let cmd;
        if (typeof cmdOrDescription === "string") {
            description = cmdOrDescription;
        }
        if (cmdOrDescription instanceof Command) {
            cmd = cmdOrDescription.reset();
        } else {
            cmd = new Command();
        }
        cmd._name = name;
        cmd._parent = this;
        if (description) {
            cmd.description(description);
        }
        if (result.typeDefinition) {
            cmd.arguments(result.typeDefinition);
        }
        aliases.forEach((alias)=>cmd.alias(alias));
        this.commands.set(name, cmd);
        this.select(name);
        return this;
    }
    alias(alias) {
        if (this.cmd._name === alias || this.cmd.aliases.includes(alias)) {
            throw new DuplicateCommandAlias(alias);
        }
        this.cmd.aliases.push(alias);
        return this;
    }
    reset() {
        this._groupName = undefined;
        this.cmd = this;
        return this;
    }
    select(name) {
        const cmd = this.getBaseCommand(name, true);
        if (!cmd) {
            throw new CommandNotFound(name, this.getBaseCommands(true));
        }
        this.cmd = cmd;
        return this;
    }
    name(name) {
        this.cmd._name = name;
        return this;
    }
    version(version) {
        if (typeof version === "string") {
            this.cmd.ver = ()=>version;
        } else if (typeof version === "function") {
            this.cmd.ver = version;
        }
        return this;
    }
    meta(name, value) {
        this.cmd._meta[name] = value;
        return this;
    }
    getMeta(name) {
        return typeof name === "undefined" ? this._meta : this._meta[name];
    }
    help(help) {
        if (typeof help === "string") {
            this.cmd._help = ()=>help;
        } else if (typeof help === "function") {
            this.cmd._help = help;
        } else {
            this.cmd._help = (cmd, options)=>HelpGenerator.generate(cmd, {
                    ...help,
                    ...options
                });
        }
        return this;
    }
    description(description) {
        this.cmd.desc = description;
        return this;
    }
    usage(usage) {
        this.cmd._usage = usage;
        return this;
    }
    hidden() {
        this.cmd.isHidden = true;
        return this;
    }
    global() {
        this.cmd.isGlobal = true;
        return this;
    }
    executable() {
        this.cmd.isExecutable = true;
        return this;
    }
    arguments(args) {
        this.cmd.argsDefinition = args;
        return this;
    }
    action(fn) {
        this.cmd.fn = fn;
        return this;
    }
    allowEmpty(allowEmpty = true) {
        this.cmd._allowEmpty = allowEmpty;
        return this;
    }
    stopEarly(stopEarly = true) {
        this.cmd._stopEarly = stopEarly;
        return this;
    }
    useRawArgs(useRawArgs = true) {
        this.cmd._useRawArgs = useRawArgs;
        return this;
    }
    default(name) {
        this.cmd.defaultCommand = name;
        return this;
    }
    globalType(name, handler, options) {
        return this.type(name, handler, {
            ...options,
            global: true
        });
    }
    type(name, handler, options) {
        if (this.cmd.types.get(name) && !options?.override) {
            throw new DuplicateType(name);
        }
        this.cmd.types.set(name, {
            ...options,
            name,
            handler
        });
        if (handler instanceof Type1 && (typeof handler.complete !== "undefined" || typeof handler.values !== "undefined")) {
            const completeHandler = (cmd, parent)=>handler.complete?.(cmd, parent) || [];
            this.complete(name, completeHandler, options);
        }
        return this;
    }
    globalComplete(name, complete, options) {
        return this.complete(name, complete, {
            ...options,
            global: true
        });
    }
    complete(name, complete, options) {
        if (this.cmd.completions.has(name) && !options?.override) {
            throw new DuplicateCompletion(name);
        }
        this.cmd.completions.set(name, {
            name,
            complete,
            ...options
        });
        return this;
    }
    throwErrors() {
        this.cmd.throwOnError = true;
        return this;
    }
    noExit() {
        this.cmd._shouldExit = false;
        this.throwErrors();
        return this;
    }
    shouldThrowErrors() {
        return this.cmd.throwOnError || !!this.cmd._parent?.shouldThrowErrors();
    }
    shouldExit() {
        return (this.cmd._shouldExit ?? this.cmd._parent?.shouldExit()) ?? true;
    }
    globalOption(flags, desc, opts) {
        if (typeof opts === "function") {
            return this.option(flags, desc, {
                value: opts,
                global: true
            });
        }
        return this.option(flags, desc, {
            ...opts,
            global: true
        });
    }
    group(name) {
        this.cmd._groupName = name;
        return this;
    }
    option(flags, desc, opts) {
        if (typeof opts === "function") {
            return this.option(flags, desc, {
                value: opts
            });
        }
        const result = splitArguments(flags);
        const args = result.typeDefinition ? parseArgumentsDefinition(result.typeDefinition) : [];
        const option = {
            ...opts,
            name: "",
            description: desc,
            args,
            flags: result.flags,
            equalsSign: result.equalsSign,
            typeDefinition: result.typeDefinition,
            groupName: this._groupName
        };
        if (option.separator) {
            for (const arg of args){
                if (arg.list) {
                    arg.separator = option.separator;
                }
            }
        }
        for (const part of option.flags){
            const arg1 = part.trim();
            const isLong = /^--/.test(arg1);
            const name = isLong ? arg1.slice(2) : arg1.slice(1);
            if (this.cmd.getBaseOption(name, true)) {
                if (opts?.override) {
                    this.removeOption(name);
                } else {
                    throw new DuplicateOptionName(name);
                }
            }
            if (!option.name && isLong) {
                option.name = name;
            } else if (!option.aliases) {
                option.aliases = [
                    name
                ];
            } else {
                option.aliases.push(name);
            }
        }
        if (option.prepend) {
            this.cmd.options.unshift(option);
        } else {
            this.cmd.options.push(option);
        }
        return this;
    }
    example(name, description) {
        if (this.cmd.hasExample(name)) {
            throw new DuplicateExample(name);
        }
        this.cmd.examples.push({
            name,
            description
        });
        return this;
    }
    globalEnv(name, description, options) {
        return this.env(name, description, {
            ...options,
            global: true
        });
    }
    env(name, description, options) {
        const result = splitArguments(name);
        if (!result.typeDefinition) {
            result.typeDefinition = "<value:boolean>";
        }
        if (result.flags.some((envName)=>this.cmd.getBaseEnvVar(envName, true))) {
            throw new DuplicateEnvironmentVariable(name);
        }
        const details = parseArgumentsDefinition(result.typeDefinition);
        if (details.length > 1) {
            throw new EnvironmentVariableSingleValue(name);
        } else if (details.length && details[0].optionalValue) {
            throw new EnvironmentVariableOptionalValue(name);
        } else if (details.length && details[0].variadic) {
            throw new EnvironmentVariableVariadicValue(name);
        }
        this.cmd.envVars.push({
            name: result.flags[0],
            names: result.flags,
            description,
            type: details[0].type,
            details: details.shift(),
            ...options
        });
        return this;
    }
    async parse(args = Deno.args) {
        try {
            this.reset();
            this.registerDefaults();
            this.rawArgs = args;
            if (args.length > 0) {
                const subCommand = this.getCommand(args[0], true);
                if (subCommand) {
                    subCommand._globalParent = this;
                    return subCommand.parse(this.rawArgs.slice(1));
                }
            }
            if (this.isExecutable) {
                await this.executeExecutable(this.rawArgs);
                return {
                    options: {},
                    args: [],
                    cmd: this,
                    literal: []
                };
            } else if (this._useRawArgs) {
                const env = await this.parseEnvVars();
                return this.execute(env, ...this.rawArgs);
            } else {
                const env1 = await this.parseEnvVars();
                const { actionOption , flags , unknown , literal  } = this.parseFlags(this.rawArgs, env1);
                this.literalArgs = literal;
                const options = {
                    ...env1,
                    ...flags
                };
                const params = this.parseArguments(unknown, options);
                if (actionOption) {
                    await actionOption.action.call(this, options, ...params);
                    if (actionOption.standalone) {
                        return {
                            options,
                            args: params,
                            cmd: this,
                            literal: this.literalArgs
                        };
                    }
                }
                return this.execute(options, ...params);
            }
        } catch (error) {
            if (error instanceof Error) {
                throw this.error(error);
            } else {
                throw this.error(new Error(`[non-error-thrown] ${error}`));
            }
        }
    }
    registerDefaults() {
        if (this.hasDefaults || this.getParent()) {
            return this;
        }
        this.hasDefaults = true;
        this.reset();
        !this.types.has("string") && this.type("string", new StringType(), {
            global: true
        });
        !this.types.has("number") && this.type("number", new NumberType(), {
            global: true
        });
        !this.types.has("integer") && this.type("integer", new IntegerType(), {
            global: true
        });
        !this.types.has("boolean") && this.type("boolean", new BooleanType(), {
            global: true
        });
        !this.types.has("file") && this.type("file", new FileType(), {
            global: true
        });
        if (!this._help) {
            this.help({
                hints: true,
                types: false
            });
        }
        if (this._versionOption !== false && (this._versionOption || this.ver)) {
            this.option(this._versionOption?.flags || "-V, --version", this._versionOption?.desc || "Show the version number for this program.", {
                standalone: true,
                prepend: true,
                action: async function() {
                    const __long = this.getRawArgs().includes(`--${versionOption.name}`);
                    if (__long) {
                        await this.checkVersion();
                        this.showLongVersion();
                    } else {
                        this.showVersion();
                    }
                    this.exit();
                },
                ...this._versionOption?.opts ?? {}
            });
            const versionOption = this.options[0];
        }
        if (this._helpOption !== false) {
            this.option(this._helpOption?.flags || "-h, --help", this._helpOption?.desc || "Show this help.", {
                standalone: true,
                global: true,
                prepend: true,
                action: async function() {
                    const __long = this.getRawArgs().includes(`--${helpOption.name}`);
                    await this.checkVersion();
                    this.showHelp({
                        long: __long
                    });
                    this.exit();
                },
                ...this._helpOption?.opts ?? {}
            });
            const helpOption = this.options[0];
        }
        return this;
    }
    async execute(options, ...args) {
        if (this.fn) {
            await this.fn(options, ...args);
        } else if (this.defaultCommand) {
            const cmd = this.getCommand(this.defaultCommand, true);
            if (!cmd) {
                throw new DefaultCommandNotFound(this.defaultCommand, this.getCommands());
            }
            cmd._globalParent = this;
            await cmd.execute(options, ...args);
        }
        return {
            options,
            args,
            cmd: this,
            literal: this.literalArgs
        };
    }
    async executeExecutable(args) {
        const command = this.getPath().replace(/\s+/g, "-");
        await Deno.permissions.request({
            name: "run",
            command
        });
        try {
            const process = Deno.run({
                cmd: [
                    command,
                    ...args
                ]
            });
            const status = await process.status();
            if (!status.success) {
                Deno.exit(status.code);
            }
        } catch (error) {
            if (error instanceof Deno.errors.NotFound) {
                throw new CommandExecutableNotFound(command);
            }
            throw error;
        }
    }
    parseFlags(args, env) {
        try {
            let actionOption;
            const result = parseFlags(args, {
                stopEarly: this._stopEarly,
                allowEmpty: this._allowEmpty,
                flags: this.getOptions(true),
                ignoreDefaults: env,
                parse: (type)=>this.parseType(type),
                option: (option)=>{
                    if (!actionOption && option.action) {
                        actionOption = option;
                    }
                }
            });
            return {
                ...result,
                actionOption
            };
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new ValidationError1(error.message);
            }
            throw error;
        }
    }
    parseType(type) {
        const typeSettings = this.getType(type.type);
        if (!typeSettings) {
            throw new UnknownType(type.type, this.getTypes().map((type)=>type.name));
        }
        return typeSettings.handler instanceof Type1 ? typeSettings.handler.parse(type) : typeSettings.handler(type);
    }
    async parseEnvVars() {
        const envVars = this.getEnvVars(true);
        const result = {};
        if (!envVars.length) {
            return result;
        }
        const hasEnvPermissions = (await Deno.permissions.query({
            name: "env"
        })).state === "granted";
        for (const env of envVars){
            const name = hasEnvPermissions && env.names.find((name)=>!!Deno.env.get(name));
            if (name) {
                const propertyName = underscoreToCamelCase(env.prefix ? env.names[0].replace(new RegExp(`^${env.prefix}`), "") : env.names[0]);
                if (env.details.list) {
                    const values = Deno.env.get(name)?.split(env.details.separator ?? ",") ?? [
                        ""
                    ];
                    result[propertyName] = values.map((value)=>this.parseType({
                            label: "Environment variable",
                            type: env.type,
                            name,
                            value
                        }));
                } else {
                    result[propertyName] = this.parseType({
                        label: "Environment variable",
                        type: env.type,
                        name,
                        value: Deno.env.get(name) ?? ""
                    });
                }
                if (env.value && typeof result[propertyName] !== "undefined") {
                    result[propertyName] = env.value(result[propertyName]);
                }
            } else if (env.required) {
                throw new MissingRequiredEnvVar(env);
            }
        }
        return result;
    }
    parseArguments(args, flags) {
        const params = [];
        args = args.slice(0);
        if (!this.hasArguments()) {
            if (args.length) {
                if (this.hasCommands(true)) {
                    throw new UnknownCommand(args[0], this.getCommands());
                } else {
                    throw new NoArgumentsAllowed(this.getPath());
                }
            }
        } else {
            if (!args.length) {
                const required = this.getArguments().filter((expectedArg)=>!expectedArg.optionalValue).map((expectedArg)=>expectedArg.name);
                if (required.length) {
                    const flagNames = Object.keys(flags);
                    const hasStandaloneOption = !!flagNames.find((name)=>this.getOption(name, true)?.standalone);
                    if (!hasStandaloneOption) {
                        throw new MissingArguments(required);
                    }
                }
            } else {
                for (const expectedArg of this.getArguments()){
                    if (!args.length) {
                        if (expectedArg.optionalValue) {
                            break;
                        }
                        throw new MissingArgument(`Missing argument: ${expectedArg.name}`);
                    }
                    let arg;
                    if (expectedArg.variadic) {
                        arg = args.splice(0, args.length).map((value)=>this.parseType({
                                label: "Argument",
                                type: expectedArg.type,
                                name: expectedArg.name,
                                value
                            }));
                    } else {
                        arg = this.parseType({
                            label: "Argument",
                            type: expectedArg.type,
                            name: expectedArg.name,
                            value: args.shift()
                        });
                    }
                    if (typeof arg !== "undefined") {
                        params.push(arg);
                    }
                }
                if (args.length) {
                    throw new TooManyArguments(args);
                }
            }
        }
        return params;
    }
    error(error) {
        if (this.shouldThrowErrors() || !(error instanceof ValidationError1)) {
            return error;
        }
        this.showHelp();
        console.error(red(`  ${bold("error")}: ${error.message}\n`));
        Deno.exit(error instanceof ValidationError1 ? error.exitCode : 1);
    }
    getName() {
        return this._name;
    }
    getParent() {
        return this._parent;
    }
    getGlobalParent() {
        return this._globalParent;
    }
    getMainCommand() {
        return this._parent?.getMainCommand() ?? this;
    }
    getAliases() {
        return this.aliases;
    }
    getPath() {
        return this._parent ? this._parent.getPath() + " " + this._name : this._name;
    }
    getArgsDefinition() {
        return this.argsDefinition;
    }
    getArgument(name) {
        return this.getArguments().find((arg)=>arg.name === name);
    }
    getArguments() {
        if (!this.args.length && this.argsDefinition) {
            this.args = parseArgumentsDefinition(this.argsDefinition);
        }
        return this.args;
    }
    hasArguments() {
        return !!this.argsDefinition;
    }
    getVersion() {
        return this.getVersionHandler()?.call(this, this);
    }
    getVersionHandler() {
        return this.ver ?? this._parent?.getVersionHandler();
    }
    getDescription() {
        return typeof this.desc === "function" ? this.desc = this.desc() : this.desc;
    }
    getUsage() {
        return this._usage ?? this.getArgsDefinition();
    }
    getShortDescription() {
        return getDescription(this.getDescription(), true);
    }
    getRawArgs() {
        return this.rawArgs;
    }
    getLiteralArgs() {
        return this.literalArgs;
    }
    showVersion() {
        console.log(this.getVersion());
    }
    getLongVersion() {
        return `${bold(this.getMainCommand().getName())} ${blue(this.getVersion() ?? "")}` + Object.entries(this.getMeta()).map(([k, v])=>`\n${bold(k)} ${blue(v)}`).join("");
    }
    showLongVersion() {
        console.log(this.getLongVersion());
    }
    showHelp(options) {
        console.log(this.getHelp(options));
    }
    getHelp(options) {
        this.registerDefaults();
        return this.getHelpHandler().call(this, this, options ?? {});
    }
    getHelpHandler() {
        return this._help ?? this._parent?.getHelpHandler();
    }
    exit(code = 0) {
        if (this.shouldExit()) {
            Deno.exit(code);
        }
    }
    async checkVersion() {
        const mainCommand = this.getMainCommand();
        const upgradeCommand = mainCommand.getCommand("upgrade");
        if (isUpgradeCommand(upgradeCommand)) {
            const latestVersion = await upgradeCommand.getLatestVersion();
            const currentVersion = mainCommand.getVersion();
            if (currentVersion !== latestVersion) {
                mainCommand.version(`${currentVersion}  ${bold(yellow(`(New version available: ${latestVersion}. Run '${mainCommand.getName()} upgrade' to upgrade to the latest version!)`))}`);
            }
        }
    }
    hasOptions(hidden) {
        return this.getOptions(hidden).length > 0;
    }
    getOptions(hidden) {
        return this.getGlobalOptions(hidden).concat(this.getBaseOptions(hidden));
    }
    getBaseOptions(hidden) {
        if (!this.options.length) {
            return [];
        }
        return hidden ? this.options.slice(0) : this.options.filter((opt)=>!opt.hidden);
    }
    getGlobalOptions(hidden) {
        const getOptions = (cmd, options = [], names = [])=>{
            if (cmd) {
                if (cmd.options.length) {
                    cmd.options.forEach((option)=>{
                        if (option.global && !this.options.find((opt)=>opt.name === option.name) && names.indexOf(option.name) === -1 && (hidden || !option.hidden)) {
                            names.push(option.name);
                            options.push(option);
                        }
                    });
                }
                return getOptions(cmd._parent, options, names);
            }
            return options;
        };
        return getOptions(this._parent);
    }
    hasOption(name, hidden) {
        return !!this.getOption(name, hidden);
    }
    getOption(name, hidden) {
        return this.getBaseOption(name, hidden) ?? this.getGlobalOption(name, hidden);
    }
    getBaseOption(name, hidden) {
        const option = this.options.find((option)=>option.name === name);
        return option && (hidden || !option.hidden) ? option : undefined;
    }
    getGlobalOption(name, hidden) {
        if (!this._parent) {
            return;
        }
        const option = this._parent.getBaseOption(name, hidden);
        if (!option || !option.global) {
            return this._parent.getGlobalOption(name, hidden);
        }
        return option;
    }
    removeOption(name) {
        const index = this.options.findIndex((option)=>option.name === name);
        if (index === -1) {
            return;
        }
        return this.options.splice(index, 1)[0];
    }
    hasCommands(hidden) {
        return this.getCommands(hidden).length > 0;
    }
    getCommands(hidden) {
        return this.getGlobalCommands(hidden).concat(this.getBaseCommands(hidden));
    }
    getBaseCommands(hidden) {
        const commands = Array.from(this.commands.values());
        return hidden ? commands : commands.filter((cmd)=>!cmd.isHidden);
    }
    getGlobalCommands(hidden) {
        const getCommands = (cmd, commands = [], names = [])=>{
            if (cmd) {
                if (cmd.commands.size) {
                    cmd.commands.forEach((cmd)=>{
                        if (cmd.isGlobal && this !== cmd && !this.commands.has(cmd._name) && names.indexOf(cmd._name) === -1 && (hidden || !cmd.isHidden)) {
                            names.push(cmd._name);
                            commands.push(cmd);
                        }
                    });
                }
                return getCommands(cmd._parent, commands, names);
            }
            return commands;
        };
        return getCommands(this._parent);
    }
    hasCommand(name, hidden) {
        return !!this.getCommand(name, hidden);
    }
    getCommand(name, hidden) {
        return this.getBaseCommand(name, hidden) ?? this.getGlobalCommand(name, hidden);
    }
    getBaseCommand(name, hidden) {
        for (const cmd of this.commands.values()){
            if (cmd._name === name || cmd.aliases.includes(name)) {
                return cmd && (hidden || !cmd.isHidden) ? cmd : undefined;
            }
        }
    }
    getGlobalCommand(name, hidden) {
        if (!this._parent) {
            return;
        }
        const cmd = this._parent.getBaseCommand(name, hidden);
        if (!cmd?.isGlobal) {
            return this._parent.getGlobalCommand(name, hidden);
        }
        return cmd;
    }
    removeCommand(name) {
        const command = this.getBaseCommand(name, true);
        if (command) {
            this.commands.delete(command._name);
        }
        return command;
    }
    getTypes() {
        return this.getGlobalTypes().concat(this.getBaseTypes());
    }
    getBaseTypes() {
        return Array.from(this.types.values());
    }
    getGlobalTypes() {
        const getTypes = (cmd, types = [], names = [])=>{
            if (cmd) {
                if (cmd.types.size) {
                    cmd.types.forEach((type)=>{
                        if (type.global && !this.types.has(type.name) && names.indexOf(type.name) === -1) {
                            names.push(type.name);
                            types.push(type);
                        }
                    });
                }
                return getTypes(cmd._parent, types, names);
            }
            return types;
        };
        return getTypes(this._parent);
    }
    getType(name) {
        return this.getBaseType(name) ?? this.getGlobalType(name);
    }
    getBaseType(name) {
        return this.types.get(name);
    }
    getGlobalType(name) {
        if (!this._parent) {
            return;
        }
        const cmd = this._parent.getBaseType(name);
        if (!cmd?.global) {
            return this._parent.getGlobalType(name);
        }
        return cmd;
    }
    getCompletions() {
        return this.getGlobalCompletions().concat(this.getBaseCompletions());
    }
    getBaseCompletions() {
        return Array.from(this.completions.values());
    }
    getGlobalCompletions() {
        const getCompletions = (cmd, completions = [], names = [])=>{
            if (cmd) {
                if (cmd.completions.size) {
                    cmd.completions.forEach((completion)=>{
                        if (completion.global && !this.completions.has(completion.name) && names.indexOf(completion.name) === -1) {
                            names.push(completion.name);
                            completions.push(completion);
                        }
                    });
                }
                return getCompletions(cmd._parent, completions, names);
            }
            return completions;
        };
        return getCompletions(this._parent);
    }
    getCompletion(name) {
        return this.getBaseCompletion(name) ?? this.getGlobalCompletion(name);
    }
    getBaseCompletion(name) {
        return this.completions.get(name);
    }
    getGlobalCompletion(name) {
        if (!this._parent) {
            return;
        }
        const completion = this._parent.getBaseCompletion(name);
        if (!completion?.global) {
            return this._parent.getGlobalCompletion(name);
        }
        return completion;
    }
    hasEnvVars(hidden) {
        return this.getEnvVars(hidden).length > 0;
    }
    getEnvVars(hidden) {
        return this.getGlobalEnvVars(hidden).concat(this.getBaseEnvVars(hidden));
    }
    getBaseEnvVars(hidden) {
        if (!this.envVars.length) {
            return [];
        }
        return hidden ? this.envVars.slice(0) : this.envVars.filter((env)=>!env.hidden);
    }
    getGlobalEnvVars(hidden) {
        const getEnvVars = (cmd, envVars = [], names = [])=>{
            if (cmd) {
                if (cmd.envVars.length) {
                    cmd.envVars.forEach((envVar)=>{
                        if (envVar.global && !this.envVars.find((env)=>env.names[0] === envVar.names[0]) && names.indexOf(envVar.names[0]) === -1 && (hidden || !envVar.hidden)) {
                            names.push(envVar.names[0]);
                            envVars.push(envVar);
                        }
                    });
                }
                return getEnvVars(cmd._parent, envVars, names);
            }
            return envVars;
        };
        return getEnvVars(this._parent);
    }
    hasEnvVar(name, hidden) {
        return !!this.getEnvVar(name, hidden);
    }
    getEnvVar(name, hidden) {
        return this.getBaseEnvVar(name, hidden) ?? this.getGlobalEnvVar(name, hidden);
    }
    getBaseEnvVar(name, hidden) {
        const envVar = this.envVars.find((env)=>env.names.indexOf(name) !== -1);
        return envVar && (hidden || !envVar.hidden) ? envVar : undefined;
    }
    getGlobalEnvVar(name, hidden) {
        if (!this._parent) {
            return;
        }
        const envVar = this._parent.getBaseEnvVar(name, hidden);
        if (!envVar?.global) {
            return this._parent.getGlobalEnvVar(name, hidden);
        }
        return envVar;
    }
    hasExamples() {
        return this.examples.length > 0;
    }
    getExamples() {
        return this.examples;
    }
    hasExample(name) {
        return !!this.getExample(name);
    }
    getExample(name) {
        return this.examples.find((example)=>example.name === name);
    }
}
function isUpgradeCommand(command) {
    return command instanceof Command && "getLatestVersion" in command;
}
class BashCompletionsGenerator {
    static generate(cmd) {
        return new BashCompletionsGenerator(cmd).generate();
    }
    constructor(cmd){
        this.cmd = cmd;
    }
    generate() {
        const path = this.cmd.getPath();
        const version = this.cmd.getVersion() ? ` v${this.cmd.getVersion()}` : "";
        return `#!/usr/bin/env bash
# bash completion support for ${path}${version}

_${replaceSpecialChars(path)}() {
  local word cur prev listFiles
  local -a opts
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"
  cmd="_"
  opts=()
  listFiles=0

  _${replaceSpecialChars(this.cmd.getName())}_complete() {
    local action="$1"; shift
    mapfile -t values < <( ${this.cmd.getName()} completions complete "\${action}" "\${@}" )
    for i in "\${values[@]}"; do
      opts+=("$i")
    done
  }

  _${replaceSpecialChars(this.cmd.getName())}_expand() {
    [ "$cur" != "\${cur%\\\\}" ] && cur="$cur\\\\"
  
    # expand ~username type directory specifications
    if [[ "$cur" == \\~*/* ]]; then
      eval cur=$cur
      
    elif [[ "$cur" == \\~* ]]; then
      cur=\${cur#\\~}
      COMPREPLY=( $( compgen -P '~' -u $cur ) )
      return \${#COMPREPLY[@]}
    fi
  }

  _${replaceSpecialChars(this.cmd.getName())}_file_dir() {
    listFiles=1
    local IFS=$'\\t\\n' xspec #glob
    _${replaceSpecialChars(this.cmd.getName())}_expand || return 0
  
    if [ "\${1:-}" = -d ]; then
      COMPREPLY=( \${COMPREPLY[@]:-} $( compgen -d -- $cur ) )
      #eval "$glob"    # restore glob setting.
      return 0
    fi
  
    xspec=\${1:+"!*.$1"}	# set only if glob passed in as $1
    COMPREPLY=( \${COMPREPLY[@]:-} $( compgen -f -X "$xspec" -- "$cur" ) \
          $( compgen -d -- "$cur" ) )
  }

  ${this.generateCompletions(this.cmd).trim()}

  for word in "\${COMP_WORDS[@]}"; do
    case "\${word}" in
      -*) ;;
      *)
        cmd_tmp="\${cmd}_\${word//[^[:alnum:]]/_}"
        if type "\${cmd_tmp}" &>/dev/null; then
          cmd="\${cmd_tmp}"
        fi
    esac
  done

  \${cmd}

  if [[ listFiles -eq 1 ]]; then
    return 0
  fi

  if [[ \${#opts[@]} -eq 0 ]]; then
    # shellcheck disable=SC2207
    COMPREPLY=($(compgen -f "\${cur}"))
    return 0
  fi

  local values
  values="$( printf "\\n%s" "\${opts[@]}" )"
  local IFS=$'\\n'
  # shellcheck disable=SC2207
  local result=($(compgen -W "\${values[@]}" -- "\${cur}"))
  if [[ \${#result[@]} -eq 0 ]]; then
    # shellcheck disable=SC2207
    COMPREPLY=($(compgen -f "\${cur}"))
  else
    # shellcheck disable=SC2207
    COMPREPLY=($(printf '%q\\n' "\${result[@]}"))
  fi

  return 0
}

complete -F _${replaceSpecialChars(path)} -o bashdefault -o default ${path}`;
    }
    generateCompletions(command, path = "", index = 1) {
        path = (path ? path + " " : "") + command.getName();
        const commandCompletions = this.generateCommandCompletions(command, path, index);
        const childCommandCompletions = command.getCommands(false).filter((subCommand)=>subCommand !== command).map((subCommand)=>this.generateCompletions(subCommand, path, index + 1)).join("");
        return `${commandCompletions}

${childCommandCompletions}`;
    }
    generateCommandCompletions(command, path, index) {
        const flags = this.getFlags(command);
        const childCommandNames = command.getCommands(false).map((childCommand)=>childCommand.getName());
        const completionsPath = ~path.indexOf(" ") ? " " + path.split(" ").slice(1).join(" ") : "";
        const optionArguments = this.generateOptionArguments(command, completionsPath);
        const completionsCmd = this.generateCommandCompletionsCommand(command, completionsPath);
        return `  __${replaceSpecialChars(path)}() {
    opts=(${[
            ...flags,
            ...childCommandNames
        ].join(" ")})
    ${completionsCmd}
    if [[ \${cur} == -* || \${COMP_CWORD} -eq ${index} ]] ; then
      return 0
    fi
    ${optionArguments}
  }`;
    }
    getFlags(command) {
        return command.getOptions(false).map((option)=>option.flags).flat();
    }
    generateOptionArguments(command, completionsPath) {
        let opts = "";
        const options = command.getOptions(false);
        if (options.length) {
            opts += 'case "${prev}" in';
            for (const option of options){
                const flags = option.flags.map((flag)=>flag.trim()).join("|");
                const completionsCmd = this.generateOptionCompletionsCommand(command, option.args, completionsPath, {
                    standalone: option.standalone
                });
                opts += `\n      ${flags}) ${completionsCmd} ;;`;
            }
            opts += "\n    esac";
        }
        return opts;
    }
    generateCommandCompletionsCommand(command, path) {
        const args = command.getArguments();
        if (args.length) {
            const type = command.getType(args[0].type);
            if (type && type.handler instanceof FileType) {
                return `_${replaceSpecialChars(this.cmd.getName())}_file_dir`;
            }
            return `_${replaceSpecialChars(this.cmd.getName())}_complete ${args[0].action}${path}`;
        }
        return "";
    }
    generateOptionCompletionsCommand(command, args, path, opts) {
        if (args.length) {
            const type = command.getType(args[0].type);
            if (type && type.handler instanceof FileType) {
                return `opts=(); _${replaceSpecialChars(this.cmd.getName())}_file_dir`;
            }
            return `opts=(); _${replaceSpecialChars(this.cmd.getName())}_complete ${args[0].action}${path}`;
        }
        if (opts?.standalone) {
            return "opts=()";
        }
        return "";
    }
    cmd;
}
function replaceSpecialChars(str) {
    return str.replace(/[^a-zA-Z0-9]/g, "_");
}
class BashCompletionsCommand extends Command {
    #cmd;
    constructor(cmd){
        super();
        this.#cmd = cmd;
        return this.description(()=>{
            const baseCmd = this.#cmd || this.getMainCommand();
            return `Generate shell completions for bash.

To enable bash completions for this program add following line to your ${dim(italic("~/.bashrc"))}:

    ${dim(italic(`source <(${baseCmd.getPath()} completions bash)`))}`;
        }).action(()=>{
            const baseCmd = this.#cmd || this.getMainCommand();
            console.log(BashCompletionsGenerator.generate(baseCmd));
        });
    }
}
class CompleteCommand extends Command {
    constructor(cmd){
        super();
        return this.description("Get completions for given action from given command.").arguments("<action:string> [command...:string]").action(async (_, action, commandNames)=>{
            let parent;
            const completeCommand = commandNames?.reduce((cmd, name)=>{
                parent = cmd;
                const childCmd = cmd.getCommand(name, false);
                if (!childCmd) {
                    throw new UnknownCompletionCommand(name, cmd.getCommands());
                }
                return childCmd;
            }, cmd || this.getMainCommand()) ?? (cmd || this.getMainCommand());
            const completion = completeCommand.getCompletion(action);
            const result = await completion?.complete(completeCommand, parent) ?? [];
            if (result?.length) {
                Deno.stdout.writeSync(new TextEncoder().encode(result.join("\n")));
            }
        }).reset();
    }
}
class FishCompletionsGenerator {
    static generate(cmd) {
        return new FishCompletionsGenerator(cmd).generate();
    }
    constructor(cmd){
        this.cmd = cmd;
    }
    generate() {
        const path = this.cmd.getPath();
        const version = this.cmd.getVersion() ? ` v${this.cmd.getVersion()}` : "";
        return `#!/usr/bin/env fish
# fish completion support for ${path}${version}

function __fish_${replaceSpecialChars1(this.cmd.getName())}_using_command
  set cmds ${getCommandFnNames(this.cmd).join(" ")}
  set words (commandline -opc)
  set cmd "_"
  for word in $words
    switch $word
      case '-*'
        continue
      case '*'
        set word (string replace -r -a '\\W' '_' $word)
        set cmd_tmp $cmd"_$word"
        if contains $cmd_tmp $cmds
          set cmd $cmd_tmp
        end
    end
  end
  if [ "$cmd" = "$argv[1]" ]
    return 0
  end
  return 1
end

${this.generateCompletions(this.cmd).trim()}`;
    }
    generateCompletions(command) {
        const parent = command.getParent();
        let result = ``;
        if (parent) {
            result += "\n" + this.complete(parent, {
                description: command.getShortDescription(),
                arguments: command.getName()
            });
        }
        const commandArgs = command.getArguments();
        if (commandArgs.length) {
            result += "\n" + this.complete(command, {
                arguments: commandArgs.length ? this.getCompletionCommand(command, commandArgs[0]) : undefined
            });
        }
        for (const option of command.getOptions(false)){
            result += "\n" + this.completeOption(command, option);
        }
        for (const subCommand of command.getCommands(false)){
            result += this.generateCompletions(subCommand);
        }
        return result;
    }
    completeOption(command, option) {
        const shortOption = option.flags.find((flag)=>flag.length === 2)?.replace(/^(-)+/, "");
        const longOption = option.flags.find((flag)=>flag.length > 2)?.replace(/^(-)+/, "");
        return this.complete(command, {
            description: getDescription(option.description),
            shortOption: shortOption,
            longOption: longOption,
            required: true,
            standalone: option.standalone,
            arguments: option.args.length ? this.getCompletionCommand(command, option.args[0]) : undefined
        });
    }
    complete(command, options) {
        const cmd = [
            "complete"
        ];
        cmd.push("-c", this.cmd.getName());
        cmd.push("-n", `'__fish_${replaceSpecialChars1(this.cmd.getName())}_using_command __${replaceSpecialChars1(command.getPath())}'`);
        options.shortOption && cmd.push("-s", options.shortOption);
        options.longOption && cmd.push("-l", options.longOption);
        options.standalone && cmd.push("-x");
        cmd.push("-k");
        cmd.push("-f");
        if (options.arguments) {
            options.required && cmd.push("-r");
            cmd.push("-a", options.arguments);
        }
        options.description && cmd.push("-d", `'${getDescription(options.description, true)}'`);
        return cmd.join(" ");
    }
    getCompletionCommand(cmd, arg) {
        const type = cmd.getType(arg.type);
        if (type && type.handler instanceof FileType) {
            return `'(__fish_complete_path)'`;
        }
        return `'(${this.cmd.getName()} completions complete ${arg.action + " " + getCompletionsPath(cmd)})'`;
    }
    cmd;
}
function getCommandFnNames(cmd, cmds = []) {
    cmds.push(`__${replaceSpecialChars1(cmd.getPath())}`);
    cmd.getCommands(false).forEach((command)=>{
        getCommandFnNames(command, cmds);
    });
    return cmds;
}
function getCompletionsPath(command) {
    return command.getPath().split(" ").slice(1).join(" ");
}
function replaceSpecialChars1(str) {
    return str.replace(/[^a-zA-Z0-9]/g, "_");
}
class FishCompletionsCommand extends Command {
    #cmd;
    constructor(cmd){
        super();
        this.#cmd = cmd;
        return this.description(()=>{
            const baseCmd = this.#cmd || this.getMainCommand();
            return `Generate shell completions for fish.

To enable fish completions for this program add following line to your ${dim(italic("~/.config/fish/config.fish"))}:

    ${dim(italic(`source (${baseCmd.getPath()} completions fish | psub)`))}`;
        }).action(()=>{
            const baseCmd = this.#cmd || this.getMainCommand();
            console.log(FishCompletionsGenerator.generate(baseCmd));
        });
    }
}
class ZshCompletionsGenerator {
    actions;
    static generate(cmd) {
        return new ZshCompletionsGenerator(cmd).generate();
    }
    constructor(cmd){
        this.cmd = cmd;
        this.actions = new Map();
    }
    generate() {
        const path = this.cmd.getPath();
        const name = this.cmd.getName();
        const version = this.cmd.getVersion() ? ` v${this.cmd.getVersion()}` : "";
        return `#!/usr/bin/env zsh
# zsh completion support for ${path}${version}

autoload -U is-at-least

# shellcheck disable=SC2154
(( $+functions[__${replaceSpecialChars2(name)}_complete] )) ||
function __${replaceSpecialChars2(name)}_complete {
  local name="$1"; shift
  local action="$1"; shift
  integer ret=1
  local -a values
  local expl lines
  _tags "$name"
  while _tags; do
    if _requested "$name"; then
      # shellcheck disable=SC2034
      lines="$(${name} completions complete "\${action}" "\${@}")"
      values=("\${(ps:\\n:)lines}")
      if (( \${#values[@]} )); then
        while _next_label "$name" expl "$action"; do
          compadd -S '' "\${expl[@]}" "\${values[@]}"
        done
      fi
    fi
  done
}

${this.generateCompletions(this.cmd).trim()}

# _${replaceSpecialChars2(path)} "\${@}"

compdef _${replaceSpecialChars2(path)} ${path}`;
    }
    generateCompletions(command, path = "") {
        if (!command.hasCommands(false) && !command.hasOptions(false) && !command.hasArguments()) {
            return "";
        }
        path = (path ? path + " " : "") + command.getName();
        return `# shellcheck disable=SC2154
(( $+functions[_${replaceSpecialChars2(path)}] )) ||
function _${replaceSpecialChars2(path)}() {` + (!command.getParent() ? `
  local state` : "") + this.generateCommandCompletions(command, path) + this.generateSubCommandCompletions(command, path) + this.generateArgumentCompletions(command, path) + this.generateActions(command) + `\n}\n\n` + command.getCommands(false).filter((subCommand)=>subCommand !== command).map((subCommand)=>this.generateCompletions(subCommand, path)).join("");
    }
    generateCommandCompletions(command, path) {
        const commands = command.getCommands(false);
        let completions = commands.map((subCommand)=>`'${subCommand.getName()}:${subCommand.getShortDescription()}'`).join("\n      ");
        if (completions) {
            completions = `
    local -a commands
    # shellcheck disable=SC2034
    commands=(
      ${completions}
    )
    _describe 'command' commands`;
        }
        if (command.hasArguments()) {
            const completionsPath = path.split(" ").slice(1).join(" ");
            const arg = command.getArguments()[0];
            const action = this.addAction(arg, completionsPath);
            if (action && command.getCompletion(arg.action)) {
                completions += `\n    __${replaceSpecialChars2(this.cmd.getName())}_complete ${action.arg.name} ${action.arg.action} ${action.cmd}`;
            }
        }
        if (completions) {
            completions = `\n\n  function _commands() {${completions}\n  }`;
        }
        return completions;
    }
    generateSubCommandCompletions(command, path) {
        if (command.hasCommands(false)) {
            const actions = command.getCommands(false).map((command)=>`${command.getName()}) _${replaceSpecialChars2(path + " " + command.getName())} ;;`).join("\n      ");
            return `\n
  function _command_args() {
    case "\${words[1]}" in\n      ${actions}\n    esac
  }`;
        }
        return "";
    }
    generateArgumentCompletions(command, path) {
        this.actions.clear();
        const options = this.generateOptions(command, path);
        let argIndex = 0;
        let argsCommand = "\n\n  _arguments -w -s -S -C";
        if (command.hasOptions()) {
            argsCommand += ` \\\n    ${options.join(" \\\n    ")}`;
        }
        if (command.hasCommands(false) || command.getArguments().filter((arg)=>command.getCompletion(arg.action)).length) {
            argsCommand += ` \\\n    '${++argIndex}:command:_commands'`;
        }
        if (command.hasArguments() || command.hasCommands(false)) {
            const args = [];
            for (const arg of command.getArguments().slice(1)){
                const type = command.getType(arg.type);
                if (type && type.handler instanceof FileType) {
                    const fileCompletions = this.getFileCompletions(type);
                    if (arg.variadic) {
                        argIndex++;
                        for(let i = 0; i < 5; i++){
                            args.push(`${argIndex + i}${arg.optionalValue ? "::" : ":"}${arg.name}:${fileCompletions}`);
                        }
                    } else {
                        args.push(`${++argIndex}${arg.optionalValue ? "::" : ":"}${arg.name}:${fileCompletions}`);
                    }
                } else {
                    const completionsPath = path.split(" ").slice(1).join(" ");
                    const action = this.addAction(arg, completionsPath);
                    args.push(`${++argIndex}${arg.optionalValue ? "::" : ":"}${arg.name}:->${action.name}`);
                }
            }
            argsCommand += args.map((arg)=>`\\\n    '${arg}'`).join("");
            if (command.hasCommands(false)) {
                argsCommand += ` \\\n    '*::sub command:->command_args'`;
            }
        }
        return argsCommand;
    }
    generateOptions(command, path) {
        const options = [];
        const cmdArgs = path.split(" ");
        cmdArgs.shift();
        const completionsPath = cmdArgs.join(" ");
        const excludedFlags = command.getOptions(false).map((option)=>option.standalone ? option.flags : false).flat().filter((flag)=>typeof flag === "string");
        for (const option of command.getOptions(false)){
            options.push(this.generateOption(command, option, completionsPath, excludedFlags));
        }
        return options;
    }
    generateOption(command, option, completionsPath, excludedOptions) {
        let excludedFlags = option.conflicts?.length ? [
            ...excludedOptions,
            ...option.conflicts.map((opt)=>"--" + opt.replace(/^--/, "")), 
        ] : excludedOptions;
        excludedFlags = option.collect ? excludedFlags : [
            ...excludedFlags,
            ...option.flags, 
        ];
        let args = "";
        for (const arg of option.args){
            const type = command.getType(arg.type);
            if (type && type.handler instanceof FileType) {
                const fileCompletions = this.getFileCompletions(type);
                args += `${arg.optionalValue ? "::" : ":"}${arg.name}:${fileCompletions}`;
            } else {
                const action = this.addAction(arg, completionsPath);
                args += `${arg.optionalValue ? "::" : ":"}${arg.name}:->${action.name}`;
            }
        }
        const description = getDescription(option.description, true).replace(/\[/g, "\\[").replace(/]/g, "\\]").replace(/"/g, '\\"').replace(/'/g, "'\"'\"'");
        const collect = option.collect ? "*" : "";
        const equalsSign = option.equalsSign ? "=" : "";
        const flags = option.flags.map((flag)=>`${flag}${equalsSign}`).join(",");
        if (option.standalone) {
            return `'(- *)'{${collect}${flags}}'[${description}]${args}'`;
        } else {
            const excluded = excludedFlags.length ? `'(${excludedFlags.join(" ")})'` : "";
            if (collect || flags.length > 1) {
                return `${excluded}{${collect}${flags}}'[${description}]${args}'`;
            } else {
                return `${excluded}${flags}'[${description}]${args}'`;
            }
        }
    }
    getFileCompletions(type) {
        if (!(type.handler instanceof FileType)) {
            return "";
        }
        return "_files";
    }
    addAction(arg, cmd) {
        const action = `${arg.name}-${arg.action}`;
        if (!this.actions.has(action)) {
            this.actions.set(action, {
                arg: arg,
                label: `${arg.name}: ${arg.action}`,
                name: action,
                cmd
            });
        }
        return this.actions.get(action);
    }
    generateActions(command) {
        let actions = [];
        if (this.actions.size) {
            actions = Array.from(this.actions).map(([name, action])=>`${name}) __${replaceSpecialChars2(this.cmd.getName())}_complete ${action.arg.name} ${action.arg.action} ${action.cmd} ;;`);
        }
        if (command.hasCommands(false)) {
            actions.unshift(`command_args) _command_args ;;`);
        }
        if (actions.length) {
            return `\n\n  case "$state" in\n    ${actions.join("\n    ")}\n  esac`;
        }
        return "";
    }
    cmd;
}
function replaceSpecialChars2(str) {
    return str.replace(/[^a-zA-Z0-9]/g, "_");
}
class ZshCompletionsCommand extends Command {
    #cmd;
    constructor(cmd){
        super();
        this.#cmd = cmd;
        return this.description(()=>{
            const baseCmd = this.#cmd || this.getMainCommand();
            return `Generate shell completions for zsh.

To enable zsh completions for this program add following line to your ${dim(italic("~/.zshrc"))}:

    ${dim(italic(`source <(${baseCmd.getPath()} completions zsh)`))}`;
        }).action(()=>{
            const baseCmd = this.#cmd || this.getMainCommand();
            console.log(ZshCompletionsGenerator.generate(baseCmd));
        });
    }
}
class CompletionsCommand extends Command {
    #cmd;
    constructor(cmd){
        super();
        this.#cmd = cmd;
        return this.description(()=>{
            const baseCmd = this.#cmd || this.getMainCommand();
            return `Generate shell completions.

To enable shell completions for this program add the following line to your ${dim(italic("~/.bashrc"))} or similar:

    ${dim(italic(`source <(${baseCmd.getPath()} completions [shell])`))}

    For more information run ${dim(italic(`${baseCmd.getPath()} completions [shell] --help`))}
`;
        }).action(()=>this.showHelp()).command("bash", new BashCompletionsCommand(this.#cmd)).command("fish", new FishCompletionsCommand(this.#cmd)).command("zsh", new ZshCompletionsCommand(this.#cmd)).command("complete", new CompleteCommand(this.#cmd).hidden()).reset();
    }
}
class CommandType extends StringType {
    complete(_cmd, parent) {
        return parent?.getCommands(false).map((cmd)=>cmd.getName()) || [];
    }
}
class HelpCommand extends Command {
    constructor(cmd){
        super();
        return this.type("command", new CommandType()).arguments("[command:command]").description("Show this help or the help of a sub-command.").action(async (_, name)=>{
            if (!cmd) {
                cmd = name ? this.getGlobalParent()?.getBaseCommand(name) : this.getGlobalParent();
            }
            if (!cmd) {
                const cmds = this.getGlobalParent()?.getCommands();
                throw new UnknownCommand(name ?? "", cmds ?? [], [
                    this.getName(),
                    ...this.getAliases(), 
                ]);
            }
            await cmd.checkVersion();
            cmd.showHelp();
            Deno.exit(0);
        });
    }
}
const cwd = Deno.cwd();
function writeNewConfig() {
    paddleYml = join3(cwd, 'paddle.yml');
    Deno.writeTextFileSync(paddleYml, `type: app
apk_name: app.apk
deps:
 - androidx.appcompat:appcompat:1.4.1
 - com.google.android.material:material:1.6.0
 # - libproject1
`);
}
var paddleYml = '';
function readConfig(opts, dep = '') {
    paddleYml = join3(cwd, (opts.config || '').toString() || 'paddle.yml');
    if (existsSync(join3(cwd, 'butter_paddle.yml'))) {
        paddleYml = join3(cwd, 'butter_paddle.yml');
    }
    if (!existsSync(paddleYml) || dep) {
        const create = dep || confirm('Create paddle.yml?');
        if (!create) {
            console.error('Need paddle.yml or butter_paddle.yml see: http://github.com/scriptmaster/butter_paddle');
            Deno.exit();
        }
        writeNewConfig();
    }
    const yaml = Deno.readTextFileSync(paddleYml);
    return parse3(yaml);
}
function installDeps(deps) {}
function installBuildDeps(deps) {}
function startBuild(ymlFile, paddle) {
    buildAndroid(dirname2(ymlFile), paddle.keystore || '', paddle.storepass || '');
}
await new Command().name("butter_paddle").description("A modern and fast build tool for android projects without gradle[w]/bazel/buck/ant").version("v1.1.0").option("-c, --config [paddle.yml]", "Alternative: butter_paddle.yml", {
    default: 'paddle.yml'
}).action(async (opts)=>{
    const paddle = readConfig(opts);
    if (!paddle) return console.log("Couldn't read config");
    if (/builds$/.test(paddle.type)) {
        console.log('Multi builds paddle: ', paddleYml);
        if (paddle.builds) {
            for (const b of paddle.builds){
                if (paddle.main && b == paddle.main) continue;
                const projectYml = join3(cwd, b, 'paddle.yml');
                if (existsSync(projectYml)) {
                    startBuild(projectYml, paddle);
                }
            }
        } else {
            for (const d of Deno.readDirSync(cwd)){
                if (d.isDirectory && d.name[0] != '.') {
                    if (paddle.main && d.name == paddle.main) continue;
                    const projectYml1 = join3(cwd, d.name, 'paddle.yml');
                    if (existsSync(projectYml1)) {
                        startBuild(projectYml1, paddle);
                    }
                }
            }
        }
        if (paddle.main) {
            const main = join3(cwd, paddle.main);
            if (existsSync(main)) {
                buildAndroid(main, paddle.keystore || '', paddle.storepass || '');
            } else console.log('Could not locate the main build: ' + paddle.main);
        }
    } else {
        console.log('Single build paddle: ', paddleYml);
        startBuild(paddleYml, paddle);
    }
}).command('i,install,ci [dep]', 'Only install all deps or the new dep, to .build/').action(async (opts, dep)=>{
    const paddle = readConfig(opts, dep);
    if (!paddle) return console.log("Couldn't read config");
    if (dep) return installDeps([
        dep
    ]);
    if (paddle.deps || paddle.build_deps) {
        if (paddle.deps) return installDeps(paddle.deps);
        if (paddle.build_deps) return installBuildDeps(paddle.build_deps);
    }
    console.log('No dependencies installed.');
}).command('n,new [dir] [android_template]', 'Create new android app with the template to dir').action(async (opts, dir, template)=>{
    if (!dir || dir == '.') dir = '';
}).command("help", new HelpCommand().global()).command("completions", new CompletionsCommand()).parse(Deno.args);

import * as os from 'os';
import * as glob from 'glob';
import * as path from 'path';


export function isMac() {
    return os.platform() === 'darwin';
}

export function isLinux() {
    return os.platform() === 'linux';
}

export function isWindows() {
    return os.platform() === 'win32';
}

export function loadModules(folder: string, extension = 'js') {
    try {
        let dir = path.join(folder, `*.${extension}`);
        let files = glob.sync(dir);
        files.forEach(function (file) {
            require(file);
        });
    } catch (error) {
        console.log(error);
    }
}


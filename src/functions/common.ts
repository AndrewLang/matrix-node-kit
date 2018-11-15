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

/**
 * Delay give ms
 * @param elapse length of time
 */
export const Delay = function (elapse: number): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, elapse);
    });
};


export const TryDo = async function (
    action: () => Promise<any>,
    catchAction: (error) => Promise<any>,
    finalAction: () => Promise<any>,
    count = 5) {

    let index = 0;
    try {
        do {
            try {
                console.log(`Do action ${index}`);
                await action();

                index = 5;
                break;
            } catch (error) {
                console.log('catch action');
                await catchAction(error);
                await Delay(1000);
            }

            index++;
        } while (index < count);
    } finally {
        console.log('final action');
        await finalAction();
    }
};


export const GenerateId = function (length = 5): string {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};
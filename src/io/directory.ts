
import * as fs from 'fs';
import * as path from 'path';
import { ConsoleLogger } from '../logging/index';

export class Directory {
    private static logger = new ConsoleLogger('Directory ');

    private static Log(message: any) {
        Directory.logger.Debug(message);
    }
    private static Error(message: any) {
        Directory.logger.Error(message);
    }


    static GetFiles(folder: string): string[] {
        return Directory.EnumerateFiles(folder);
    }
    static GetDirectories(folder: string): string[] {
        return Directory.EnumerateDirectories(folder);
    }
    static Exists(value: string): boolean {
        try {
            fs.accessSync(value, fs.constants.F_OK);
            return true;
        } catch (e) {
            Directory.Error(e);
            return false;
        }
    }
    static Create(folder: string) {
        try {
            fs.mkdirSync(folder);
        } catch (error) {
            Directory.Error(error);
        }
    }
    static Delete(folder: string) {
        try {
            fs.rmdirSync(folder);
        } catch (error) {
            Directory.Error(error);
        }
    }
    static Move( sourceDir: string, destDir ) {
        try {
            fs.renameSync(sourceDir, destDir);
        } catch (error) {
            Directory.Error(error);
        }
    }
    static EnumerateDirectories(folder: string): string[] {
        return fs.readdirSync(folder).map(name => path.join(folder, name)).filter(name => fs.lstatSync(name).isDirectory());
    }
    static EnumerateFiles(folder: string): string[] {
        return fs.readdirSync(folder).map(name => path.join(folder, name)).filter(name => fs.lstatSync(name).isFile());
    }
    static Enumerate(folder: string): string[] {
        return fs.readdirSync(folder).map(name => path.join(folder, name));
    }
    static EnsureFolderExist(value: string): void {
        if (!Directory.Exists(value)) {
            try {
                fs.mkdirSync(value);
            } catch (error) {
                console.log(error);
            }
        }
    }
    static Combine(...paths: string[]): string {
        return path.join(...paths);
    }
}
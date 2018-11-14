
import * as path from 'path';
import * as fs from 'fs';

export class Directory {
  
    
    static Exist(value: string): boolean {
        try {
            fs.accessSync(value, fs.constants.F_OK);
            return true;
        } catch (e) {
            return false;
        }
    }
    static EnsureFolderExist(value: string): void {
        if (!Directory.Exist(value)) {
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
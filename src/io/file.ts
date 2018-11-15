
import * as EventStream from 'event-stream';
import * as fs from 'fs';
// import * as Mime from 'mime';
import * as path from 'path';
import { ConsoleLogger } from '../logging/index';
import { FileSizeCalculator } from './filesize';


export class File {
    private static logger = new ConsoleLogger('File: ');
    /**
     * Check whether given file is exist.
     * @param filename full file name with path
     */
    static Exists(filename: string): boolean {
        let existed: boolean;
        try {
            existed = fs.existsSync(filename);
        } catch (error) {
            File.logger.Error(error);
            existed = false;
        }
        return existed;
    }
    /**
     * Write given content to file in sync mode
     * @param filename filename to write
     * @param content file content to write
     */
    static Create(filename: string, content: string): void {
        try {
            fs.writeFileSync(filename, content);
        } catch (error) {
            File.logger.Error(error);
            throw error;
        }
    }
    /**
     * Remove a file from file system
     * @param filename the full name of file
     */
    static Delete(filename: string): void {
        try {
            fs.unlinkSync(filename);
        } catch (error) {
            File.logger.Error(error);
        }
    }
    /**
     * Read file content in sync mode
     * @param filename filename to read
     * @param encoding encoding use to read file
     */
    static ReadAllText(filename: string, encoding: string): string {
        let content = '';
        try {
            content = fs.readFileSync(filename, encoding);
        } catch (error) {
            File.logger.Error(error);
            content = '';
        }
        return content;
    }
    /**
     * Copy file
     * @param source source file to read
     * @param destination destination file to write
     * @param overwrite whether overwrite give file
     */
    static Copy(source: string, destination: string, overwrite: boolean): void {
        try {
            let goodToWrite = false;
            let sourceStream = fs.createReadStream(source);
            if (File.Exists(destination)) {
                if (overwrite) {
                    fs.unlinkSync(destination);
                    goodToWrite = true;
                }
            } else {
                goodToWrite = true;
            }

            if (goodToWrite) {
                sourceStream.pipe(fs.createWriteStream(destination));
            }
        } catch (error) {
            File.logger.Error(error);
        }
    }
    static Move(source: string, destination: string, overwrite: boolean = true) {
        try {
            File.Copy(source, destination, overwrite);
            File.Delete(source);
        } catch (error) {
            File.logger.Error(error);
        }
    }

    /**
     * 
     * @param filename 
     */
    static FindFolder(filename: string): string {
        let folder = '';
        if (filename && File.Exists(filename)) {
            folder = filename.substr(0, filename.lastIndexOf('/'));
        }
        return folder;
    }
   
    /**
     * Whether given file exist
     * @param path file path
     */
    static Exist(path: string): boolean {
        try {
            fs.accessSync(path, fs.constants.F_OK);
            return true;
        } catch (e) {
            return false;
        }
    }
    /**
     * Normalize given path
     * @param path 
     */
    static NormalizePath(path: string): string {
        return path.normalize(path);
    }
    /**
     * Read file in async mode
     * @param file 
     */
    static ReadFileAsync(file: string): Promise<any> {
        let self = File;
        return new Promise(function (resolve, reject) {
            if (!self.Exist(file))
                reject(new Error(`File doesn't exist.`));

            fs.readFile(file, 'utf8', (error: any, data: any) => {
                if (error)
                    reject(error);

                resolve(data);
            });
        });
    }
    /**
     * Read file line by line in async mode
     * @param file 
     */
    static ReadFileLineByLine(file: string): Promise<string> {
        let self = File;
        return new Promise(function (resolve, reject) {
            let lines: string[] = [];
            let stream = fs.createReadStream(file)
                .pipe(EventStream.split())
                .pipe(EventStream.mapSync(
                    function (line: string) {
                        stream.pause();

                        lines.push(line);

                        stream.resume();
                    })
                    .on('error', function () {
                        reject('Read file error.');
                    })
                    .on('end', function () {
                        resolve(lines.join(''));
                    })
                );
        });
    }
    /**
     * Read file content as base65 encoded string in async mode
     * @param file file path
     */
    static ReadFileAsBase64Async(file: string): Promise<string> {
        let self = File;
        let fullPath = File.NormalizePath(file.toString());
        File.logger.Error('Full path: ' + fullPath);
        return new Promise(function (resolve, reject) {
            if (!self.Exist(fullPath))
                reject(new Error(`File doesn't exist.' + fullPath`));

            File.logger.Error('File to open ' + fullPath);

            let data = fs.readFileSync(fullPath, 'base64');
            let buffer = new Buffer(data, 'base64');
            let base64Data = buffer.toString('base64');
            resolve(base64Data);
        });
    }
    /**
     * Read file content as base65 encoded string in sync mode
     * @param file file path
     */
    static ReadFileAsBase64(file: string): string {
        let self = File;
        let fullPath = File.NormalizePath(file.toString());
        if (!self.Exist(fullPath))
            throw Error(`File doesn't exist.${fullPath}`);

        let data = fs.readFileSync(fullPath, 'base64');
        let buffer = new Buffer(data, 'base64');
        let base64Data = buffer.toString('base64');
        return base64Data;

    }
    /**
     * Read file as node js  stream
     * @param file 
     */
    static ReadFileStream(file: string): any {
        return fs.createReadStream(file);
    }
    /**
     * Write file in async mode
     * @param file 
     * @param data 
     */
    static WriteFileAsync(file: string, data: any): Promise<any> {
        let self = File;
        return new Promise(function (resolve, reject) {
            fs.writeFile(file, data, (error: any) => {
                if (error)
                    reject(error);

                resolve(true);
            });
        });
    }
    
    /**
     * Get file name  with extension
     * @param file 
     */
    static GetFilename(file: string): string {
        try {
            return path.basename(file);
        } catch (error) {
            File.logger.Error('Get file name error: ' + error);
            return '';
        }
    }
    /**
     * Get file name without extension
     * @param file 
     */
    static GetFilenameWithoutExtension(file: string): string {
        let filename = File.GetFilename(file);
        return path.parse(filename).name;
    }
    /**
     * Get file size in number
     * @param file 
     */
    static GetFileSize(file: string): number {
        let stats = fs.statSync(file);
        return stats['size'];
    }
    /**
     * Get formated file size string
     * @param file 
     */
    static GetFileSizeString(file: string): string {
        try {
            let size = File.GetFileSize(file);
            let sizeString = FileSizeCalculator.Calculate(size);
            return sizeString;
        } catch (error) {
            File.logger.Error('Get file name error: ' + error);
            return '';
        }
    }
    /**
     * Convert give file size to readable file size string
     * @param size 
     */
    static ConverToFileSizeString(size: number): string {
        return FileSizeCalculator.Calculate(size);
    }
}
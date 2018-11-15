import shell from 'shelljs';
import chalk from 'chalk';

/** Utilities */

export function getTime() {

    let date = new Date();
    return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
}
export function log(message) {
    shell.echo(chalk.gray(`${getTime()} ${message}`));
}
export function success(message) {
    shell.echo(chalk.green(`${getTime()} ${message}`));
}
export function error(message) {
    shell.echo(chalk.red(`${getTime()} ${message}`));
}
export function findFile(folder, pattern) {
    let files = fs.readdirSync(folder);
    for (let file of files) {
        log(file);
        if (file.startsWith(pattern)) {
            return file;
        }
    }
}

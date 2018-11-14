import gulp from 'gulp';
import shell from 'shelljs';
import chalk from 'chalk';
import bump from 'gulp-bump';
import * as path from 'path';
import * as fs from 'fs';
import gulpShell from 'gulp-shell';
import * as ts from 'gulp-typescript';

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

const appConfig = {   
    Src: 'src/**/*.ts',
    Output: './dist'
}
gulp.task('build:ts', () => {
    const tsProject = ts.createProject('./tsconfig.json');
    return gulp.src(appConfig.Src)
        .pipe(tsProject())
        .pipe(gulp.dest(appConfig.Output));
});


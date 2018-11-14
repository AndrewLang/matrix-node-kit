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
    Package: './package.json',
    Config: './tsconfig.json',
    Src: 'src/**/*.ts',
    Output: './dist'
}

gulp.task('build:clean', (done) => {
    log('Start cleaning dist folder...');
    shell.rm('-rf', appConfig.Output);
    success(`Output folder is clean.`);

    done();
});

gulp.task('build:ts', () => {
    const tsProject = ts.createProject(appConfig.Config);

    return gulp.src(appConfig.Src)
        .pipe(tsProject())
        .pipe(gulp.dest(appConfig.Output));
});
gulp.task('copy:package', (done) => {
    let pack = require(appConfig.Package);
    pack.scripts = {};

    let filename = path.join(appConfig.Output, appConfig.Package);
    fs.writeFileSync(`${filename}`, JSON.stringify(pack, null, 2));

    done();
});
gulp.task('build', gulp.series('build:clean', 'build:ts', 'copy:package', (done) => {
    done();
}));

gulp.task('publish', (done) => {
    log('Start publish package...');
    shell.exec(`npm publish dist --access=public`);
    success(`Package is published.`);

    done();
});
gulp.task('release', gulp.series('build', 'publish', (done) => {
    done();
}));
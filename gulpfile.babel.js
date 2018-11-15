import gulp from 'gulp';
import shell from 'shelljs';
import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'gulp-typescript';
import * as Common from './dev/index';

const appConfig = {
    Package: './package.json',
    Config: './tsconfig.json',
    Src: 'src/**/*.ts',
    Output: './dist'
}

gulp.task('build:clean', (done) => {
    Common.log('Start cleaning dist folder...');
    shell.rm('-rf', appConfig.Output);
    Common.success(`Output folder is clean.`);

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
    Common.log('Start publish package...');
    shell.exec(`npm publish dist --access=public`);
    Common.success(`Package is published.`);

    done();
});
gulp.task('release', gulp.series('build', 'publish', (done) => {
    done();
}));
import gulp from 'gulp';
import shell from 'shelljs';
import chalk from 'chalk';
import bump from 'gulp-bump';
import * as path from 'path';
import * as fs from 'fs';
import gulpShell from 'gulp-shell';
// import sequence from 'run-sequence';
// import packager from 'electron-packager';
import * as ts from 'gulp-typescript';
import * as proc from 'child_process';

const outFolder = "pack-result";
const ignoreFilter = [
    ".vscode",
    "resources",
    outFolder,
    "e2e",
    /^\/\bsrc\//i,
    ".angular-cli.json|.editorconfig|.gitignore|.gulpfile.js|karma.conf.js|protractor.conf.js|README.md|tsconfig.json|tslint.json"
];
const copyright = '(C) Matrix Republic 2017-2019';
const name = 'MatrixWriter';
const source = '.';
const version = '1.5.0';


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
/** build matrix writer */
const appName = 'matrix-writer';
const appConfig = {
    name: 'matrix-writer',
    dist: './dist/matrix-writer',
    entry: 'main.js',
    desktopSrc: 'src/**/*.ts',
    desktopOut: './dist'
}
gulp.task('clean', () => {
    return new Promise((resolve, reject) => {
        log('Clean dist folder');
        shell.rm('-rf', appConfig.dist);
        success(`dist folder is cleaned. `);
        resolve();
    });
});
gulp.task('start:electron', (done) => {
    // return gulp.src('/').pipe(gulpShell(`electron ${appConfig.dist}/desktop/main.js`));
    log(`Start application...`);
    let binPath = path.join(`./node_modules/electron/dist/electron.exe`);
    log(`Electron path: ${binPath}`);
    let electron = require('electron');
    console.log(electron);
    shell.exec(`${electron} ${appConfig.desktopOut}/${appConfig.entry}`);
    // let child = proc.spawn(electron);
    done();
});
gulp.task('build:cli', (done) => {
    // return gulp.src('/').pipe(gulpShell('ng build --base-href .'));
    shell.exec('ng build --base-href .');
    done();
});
gulp.task('build:assets', () => {
    return gulp.src(['./resources/files/default.json'])
        .pipe(gulp.dest(appConfig.dist));
});
gulp.task('build:electron', () => {
    const tsProject = ts.createProject('./tsconfig.json');
    return gulp.src(appConfig.desktopSrc)
        .pipe(tsProject())
        .pipe(gulp.dest(appConfig.desktopOut));
});
gulp.task('build', gulp.series('clean', 'build:cli', 'build:electron', 'build:assets', (done) => {
    done();
}));
gulp.task('release', gulp.series('clean', 'build:cli', 'build:electron', 'build:assets', (done) => {
    done();
}));
gulp.task('start', gulp.series('clean', 'build:cli', 'build:electron', 'build:assets', 'start:electron', (done) => {
    done();
}));
gulp.task('run', gulp.series('build:electron', (done) => {
    log(`Start application...`);
    shell.exec(`electron ${appConfig.desktopOut}/${appConfig.entry}`);
    done();
}));

/** package for windows */
gulp.task('win-pack', () => {
    var options = {
        dir: source,
        name: name,
        arch: 'all',
        platform: 'win32',
        packageManager: "npm",
        overwrite: true,
        asar: true,
        prune: true,
        out: './' + outFolder + '/win',
        appCopyright: copyright,
        appVersion: version,
        buildVersion: version,
        icon: './src/assets/app-icon/win/app.ico',

        win32metadata: {
            CompanyName: "Matrix Republic",
            FileDescription: "Matrix Writer",
            OriginalFilename: "MatrixWriter.exe",
            ProductName: "Matrix Writer",
            LegalCopyright: "(C) Matrix Republic 2017-2018"
        },
        ignore: ignoreFilter
    };

    return packager(options, (error, appPath) => {
        if (error) {
            console.log("Pack error:");
            console.log(error);
        }

        console.log(appPath);
        // callback();
    });
});

gulp.task('win-installer', () => {
    return gulp.src('/')
        .pipe(gulpShell('node ./resources/scripts/installer.js'));
});

gulp.task('win-appstore', () => {
    return gulp.src('/')
        .pipe(gulpShell('node ./resources/scripts/windows-store.js'));
});

gulp.task('win-publish', () => {
    return sequence('release', 'win-pack', 'win-installer', 'win-appstore', function (message) {
        console.log(message);
    });
});

/** package for MacOS */
gulp.task('mac-pack', () => {
    var options = {
        dir: source,
        name: name,
        arch: 'x64',
        platform: 'darwin',
        packageManager: "npm",
        overwrite: true,
        asar: false,
        prune: true,
        out: './' + outFolder + '/mac',
        appCopyright: copyright,
        appVersion: version,
        buildVersion: version,
        icon: './src/assets/app-icon/mac/app.icns',
        // appBundleId:'',
        // appCategoryType:'',
        // extendInfo:'',
        // extraResource:'',
        // helperBundleId:'',
        ignore: ignoreFilter
    };

    console.log(options);
    console.log(packager);

    return packager(options, (error, appPath) => {
        if (error) {
            console.log("Pack error:");
            console.log(error);
        }

        console.log(appPath);
    });
});

gulp.task('mac-store', () => {
    return gulp.src('/')
        .pipe(gulpShell('bash ./resources/scripts/mas.sh'));
});

gulp.task('mac-publish', () => {
    return sequence('release', 'mac-pack', 'mac-store', function (message) {
        console.log(message);
    });
});


/** Package for Linux */
gulp.task('linux-pack', () => {
    var options = {
        dir: source,
        name: name,
        arch: 'all',
        platform: 'linux',
        packageManager: "npm",
        overwrite: true,
        asar: true,
        prune: true,
        out: './' + outFolder + '/linux',
        appCopyright: copyright,
        appVersion: version,
        buildVersion: version,
        icon: './src/assets/app-icon/png/logo-64.png',

        win32metadata: {
            CompanyName: "Matrix Republic",
            FileDescription: "Matrix Writer",
            OriginalFilename: "MatrixWriter.exe",
            ProductName: "Matrix Writer",
            LegalCopyright: "(C) Matrix Republic 2017-2018"
        },
        ignore: ignoreFilter
    };

    return packager(options, (error, appPath) => {
        if (error) {
            console.log("Pack error:");
            console.log(error);
        }

        console.log(appPath);
    });
});

/**  writer core */

const coreProj = 'matrix-writer-core';
const coreProjPath = `./projects/${coreProj}`;

const coreConfig = {
    name: coreProj,
    installName: '@matrix/writer-core',
    path: coreProjPath,
    package: `${coreProjPath}/package.json`,
    outputPath: '../libs/',
    outputFullPath: '',
    root: ''
}

/* Writer Core */
gulp.task('core:increaseversion', () => {
    return gulp.src(coreConfig.package)
        .pipe(bump({ type: 'patch' }))
        .pipe(gulp.dest(coreProjPath))
        .on('end', () => {
            let pack = require(coreConfig.package);
            log(`Version is updated to ${pack.version}`);
        });
});
gulp.task('core:build', (done) => {
    let prod = false;
    let name = coreConfig.name;
    let currentFolder = process.cwd();
    let folder = coreConfig.outputPath;
    coreConfig.root = currentFolder;

    try {
        let full = path.join(currentFolder, folder);
        coreConfig.outputFullPath = full;
        log(`Current working folder: ${currentFolder}`)
        log(`Removing old Core builds from '${full}'...`);
        shell.rm('-rf', `${full}${coreConfig.name}-*.*`);
        success(`Remove old Core builds in ${full} successed.`);
    } catch (err) {
        error(`Remove old build files failed: ${err}.`);
    }

    log(`Clean output folder: ./dist/${name}`);
    shell.rm('-rf', `./dist/${name}`);

    success(`Output folder is cleaned.`);
    log(`Start to build project "${name}", production: ${prod}...`);

    if (prod) {
        shell.exec(`ng build --prod ${name}`);
    } else {
        shell.exec(`ng build ${name}`);
    }

    success(`${name} is built successfully.`);

    done();
});
gulp.task('core:pack', (done) => {
    let pack = require(coreConfig.package);

    log(`Start pack up Core ${pack.version}`);
    shell.cd(`./dist/${coreConfig.name}`);
    shell.exec(`npm pack`);
    success(`Matrix Writer Core version ${pack.version} is packed up.`);

    try {
        let file = `matrix-writer-core-${pack.version}.tgz`;
        let folder = coreConfig.outputFullPath;
        try {
            log(`Copy package file '${file}' to folder '${folder}'.`);
            shell.cp('-f', file, folder);
            success(`File '${file} has been copied to folder '${folder}'. `);
        } catch (err) {
            error(`Copy file '${file}' failed: ${err}.`);
        }


    } catch (err) {
        error(`Copy Core package failed, ${err}.`);
    }
    finally {
        shell.cd('..');
    }
    done();
});

let coreTasks = gulp.series(
    'core:increaseversion',
    'core:build',
    'core:pack',
    function (done) {
        success('Build Matrix Writer Core finished. ');
        done();
    });

gulp.task('build:core', coreTasks);

gulp.task('install:core', (done) => {
    try {
        log(`Start update Matrix Writer Core`);

        let libsFolder = coreConfig.outputFullPath; // path.join(process.cwd(), coreConfig.outputPath);
        log(`Library folder: ${libsFolder}`);

        let packagePath = findFile(libsFolder, coreConfig.name);
        log(`Writer Core package: ${packagePath}`);
        if (packagePath) {
            /** Write version changes back to package.json */
            let packageFile = path.join(coreConfig.root, './package.json');
            let pack = require(packageFile);
            console.log('Core project');
            console.log(pack.dependencies[coreConfig.installName]);

            let packPath = `file:${coreConfig.outputPath}${packagePath}`;
            console.log(packPath);
            if (packPath !== pack.dependencies[coreConfig.installName]) {
                log('Start update package.json file.');
                pack.dependencies[coreConfig.installName] = packPath;

                fs.writeFileSync(packageFile, JSON.stringify(pack, null, 4));

                success(`Update Matrix Writer Core to package.json successed.`);

                log(`Installing Matrix Writer Core ${packagePath}...`);

                shell.exec('npm i');

                success(`Matrix Writer Core is updated to ${packagePath}`);
            }
        }
    } catch (err) {
        error(`Update Matrix Writer Core failed: ${err}`);
    } finally {
        done();
    }
});
gulp.task('update:core', gulp.series('build:core', 'install:core', (done) => {
    done();
}));
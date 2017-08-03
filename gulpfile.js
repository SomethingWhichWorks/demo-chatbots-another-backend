var path = require('path');
var runSequence = require('run-sequence');
var del = require('del');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat')
var rename = require('gulp-rename');
const tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');

var fileConfigs = {
    'bundle': {
        'outputDirectory': 'dist',
        'mainIndexFile': 'index.html'
    },
    'server': {
        sourceTsFiles: ['server/src/**/*.ts'],
        ignoreTsFiles: ['server/typings/index.d.ts'],
        mockDataFiles: ['server/src/**/*.json'],
        tsConfigFile: 'server/tsconfig.json',
        additionConfigs: 'server/config.json'
    }
};

// SERVER
gulp.task('clean', function () {
    return del(fileConfigs.outputDirectory)
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', function (tsFiles) {
    return gulp.src(tsFiles)
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

gulp.task('build:server', function () {
    var tsProject = ts.createProject(fileConfigs.server.tsConfigFile);

    var tsResult = gulp.src(fileConfigs.server.sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(fileConfigs.bundle.outputDirectory));

});

gulp.task('build:server:copyConfigFiles', function () {
    return gulp.src(fileConfigs.server.additionConfigs)
        .pipe(gulp.dest(fileConfigs.bundle.outputDirectory));
});

// Copy all mockdatafiles
gulp.task('build:server:copyMockDataFiles', function () {
    return gulp.src(fileConfigs.server.mockDataFiles)
        .pipe(gulp.dest(fileConfigs.bundle.outputDirectory));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("build:resources", () => {
    return gulp.src(["client/**/*", "!**/*.ts"])
        .pipe(gulp.dest(fileConfigs.bundle.outputDirectory));
});

gulp.task("copy:packagejson", () => {
    return gulp.src(["package.json"])
        .pipe(gulp.dest(fileConfigs.bundle.outputDirectory));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch:all', function () {
    gulp.watch(fileConfigs.server.sourceTsFiles, ['build:server:all']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + 'in server module has been changed. Compiling.');
    });

    gulp.watch(fileConfigs.server.mockDataFiles, ['build:server:copyMockDataFiles']).on('change', function (e) {
        console.log('Mock data files have changed, copying over');
    });
});

//Copy mock data files 
gulp.task('build:server:all', ['build:server', 'build:server:copyConfigFiles', 'build:server:copyMockDataFiles']);

// Main Build -> Development mode
gulp.task('build', function (callback) {
    runSequence('clean', 'build:server:all', 'watch:all', callback);
});

gulp.task('default', ['build']);

// Release task, to be used with CI

gulp.task('build-release', function (callback) {
    runSequence('build:server:all', callback);
});

gulp.task('gulp-release', function (callback) {
    runSequence('clean', 'build-release',  'copy:packagejson', callback);
});
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const ts = require('gulp-typescript');
const del = require('del');
const run = require('run-sequence')
const project = ts.createProject('./tsconfig.json');

gulp.task('default', ['all'], () =>
    gulp.watch('src/**/**', ['all'])
);

gulp.task('all', (callback) => {
    run('ts', 'tests', callback);
});

gulp.task('ts', ['del'], () =>
    gulp.src('src/**/*.ts')
        .pipe(ts(project))
        .pipe(gulp.dest('build'))
);

gulp.task('tests', () =>
    gulp.src('build/**/*-spec.js')
        .pipe(mocha({
            reporter: 'nyan'
        }))
);

gulp.task('del', () =>
    del('build/**/**')
);

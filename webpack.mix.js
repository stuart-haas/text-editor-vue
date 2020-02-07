let mix = require('laravel-mix')

mix.setPublicPath('./dist')
  .js('src/js/app.js', 'js')
  .sass('src/scss/app.scss', 'css')
  .sourceMaps()
  .browserSync({
      files: [
          './dist/**/*.html',
          './dist/css/**/*.css',
          './dist/js/**/*.js',
      ],
  })
  .version()
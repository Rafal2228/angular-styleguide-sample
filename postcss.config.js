module.exports = {
  parser: false,
  exec: false,
  sourceMap: true,
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      warnForDuplicates: false
    },
    'cssnano': {}
  }
}

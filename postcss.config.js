const variables = require('./postcss/vars.js');

module.exports = {
  plugins: [
    require('postcss-mixins')({
      mixinsDir: './postcss/mixins'
    }),
    require('postcss-nesting'),
    require('postcss-simple-vars')({ variables })
  ]
}

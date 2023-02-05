const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    },
    configure: webpackConfig => {
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf)
      if (oneOfRule) {
        oneOfRule.oneOf.splice(0, 0, {
          test: /\.svg$/,
          use: [{
            loader: 'svg-sprite-loader',
            options: {
              extract: false,
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  name: 'removeAttrs',
                  params: {
                    attrs: 'fill'
                  }
                }
              ]
            }
          }
          ]
        })
      }
      return webpackConfig
    }
  },
  plugins: []
}
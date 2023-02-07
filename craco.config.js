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
      webpackConfig.module.rules.push({
        test: /\.md$/,
        use: [
          {
            loader: path.resolve(__dirname, 'src/loader/md-loader.js'),
            options: {
              gfm: true,
              tables: true,
              breaks: false,
              pedantic: false,
              sanitize: false,
              smartLists: true,
              smartypants: false
            }
          }
        ],
      },)
      return webpackConfig
    }
  },
  plugins: []
}
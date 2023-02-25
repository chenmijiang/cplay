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
            loader: 'md-loader',
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
      webpackConfig.resolveLoader = {
        modules: ['node_modules', './src/loader'],
      }
      if (process.env.NODE_ENV === "production") {
        webpackConfig.optimization.splitChunks = {
          ...webpackConfig.optimization.splitChunks,
          cacheGroups: {
            base: {
              // 基本框架
              chunks: 'all',
              test: /(react|react-dom|react-dom-router)/,
              name: 'base',
              priority: 100,
            },
            framer: {
              chunks: 'all',
              test: /(framer-motion)/,
              name: 'framer',
              priority: 100,
            },
            commons: {
              chunks: 'all',
              // 将两个以上的chunk所共享的模块打包至commons组。
              minChunks: 2,
              name: 'commons',
              priority: 80,
            },
          },
        }
      }
      return webpackConfig
    }
  },
  plugins: []
}
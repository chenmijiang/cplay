const { marked } = require('marked')

function mdLoader(markdown) {
  var options = this.getOptions()
  marked.setOptions(options)
  var html = marked.parse(markdown)

  return html
}

module.exports = mdLoader
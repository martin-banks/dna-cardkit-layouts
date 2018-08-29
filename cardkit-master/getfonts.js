const googlefontcssmerge = require('googlefontcssmerge')
const googlefontcss64 = require('googlefontcss64')
const css = require('css')

const url = `https://fonts.googleapis.com/css?family=Roboto:900`

googlefontcssmerge(url, function(error, style) {
  if (error) throw error

  googlefontcss64(style, function(error, style) {
    if (error) throw error

    console.log(css.stringify(style))
  })
})

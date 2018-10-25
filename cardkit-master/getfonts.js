const googlefontcssmerge = require('googlefontcssmerge')
const googlefontcss64 = require('googlefontcss64')
const css = require('css')
const fs = require('fs')

// const url = `https://fonts.googleapis.com/css?family=Roboto:900`
// const url = `https://fonts.googleapis.com/css?family=Roboto:300`
// const url = `https://fonts.googleapis.com/css?family=Roboto:400`
// const url = `https://fonts.googleapis.com/css?family=Roboto+Condensed:400`

const urls = {
  roboto900: `https://fonts.googleapis.com/css?family=Roboto:900`,
  roboto300: `https://fonts.googleapis.com/css?family=Roboto:300`,
  roboto400: `https://fonts.googleapis.com/css?family=Roboto:400`,
  robotoCond400: `https://fonts.googleapis.com/css?family=Roboto+Condensed:400`,
}

for (const font in urls) {
  console.log(font)
  googlefontcssmerge(urls[font], async function(error, style) {
    if (error) throw error
    await googlefontcss64(style, async function(error, style) {
      return new Promise(async (resolve, reject) => {
        if (error) return reject(error)
        await fs.writeFileSync(`${__dirname}/font_b64/${font}`, css.stringify(style))
        console.log(`${font} written to file`)
        resolve(`${font} written to file`)
        // console.log(css.stringify(style))
      })
    })
  })
}

const b64 = require('base64-img')
const fs = require('fs')
const path = require('path')

function getFiles () {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(__dirname, 'thumbnails'), (err, files) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      resolve(files)
    })
  })
}

function readFile (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, `thumbnails/${filename}`), (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function writeFile ({ filename, content}) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, `thumbnails/${filename}`), content, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

async function processFiles () {
  try {
    const files = await getFiles()
    files.forEach(async f => {
      b64.base64(path.join(__dirname, `thumbnails/${f}`), (err, content) => {
        writeFile({ filename: f.replace('jpg', 'txt'), content })
      })
    })
  } catch (err) {
    console.log(err)
  }
}

processFiles()

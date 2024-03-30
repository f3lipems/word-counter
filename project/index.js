const path = require('path')
const fn = require('./functions')

const dataPath = path.join(__dirname, '..', 'data', 'legendas')

const files = fn.readFolder(dataPath)
console.log(files);
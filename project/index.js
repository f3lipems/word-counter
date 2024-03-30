const path = require('path')
const fn = require('./functions')

const dataPath = path.join(__dirname, '..', 'data', 'legendas')

fn.readFolder(dataPath)
    .then(files => fn.fileEndsWith(files, '.srt'))
    .then(console.log)
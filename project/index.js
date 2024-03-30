const path = require('path')
const fn = require('./functions')

const dataPath = path.join(__dirname, '..', 'data', 'legendas')

fn.readFolder(dataPath)
    .then(fn.fileEndsWith('.srt'))
    .then(fn.readContentFiles)
    .then(contents => contents.join('\n'))
    .then(fullContent => fullContent.split('\n'))
    .then(fn.removeEmptSpace)
    .then(fn.removeIfFound('-->'))
    .then(fn.removeNumbers)
    .then(console.log)
const path = require('path')
const fn = require('./functions')

const dataPath = path.join(__dirname, '..', 'data', 'legendas')

fn.readFolder(dataPath)
    .then(files => fn.fileEndsWith(files, '.srt'))
    .then(filesStr => fn.readContentFiles(filesStr))
    .then(contents => contents.join('\n'))
    .then(fullContent => fullContent.split('\n'))
    .then(allLines => fn.removeEmptSpace(allLines))
    .then(allLines => fn.removeIfFound(allLines, '-->'))
    .then(allLines => fn.removeNumbers(allLines))
    .then(console.log)
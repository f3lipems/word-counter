const path = require('path')
const fn = require('./functions')

const dataPath = path.join(__dirname, '..', 'data', 'legendas')

const symbols = [
    '.', '?', '-', ',', '"', '♪', '_', '<i>', '</i>', '\r', '[', ']', '(', ')'
]

function groupWords(words) {
    return words.reduce((acc, word) => {
        const w = word.toLowerCase()
        if(acc[word]) {
            acc[word] += 1
        } else {
            acc[word] = 1
        }
        return acc
    }, {})
}

fn.readFolder(dataPath)
    .then(fn.fileEndsWith('.srt'))
    .then(fn.readContentFiles)
    .then(fn.joinContent)
    .then(fn.splitText('\n'))
    .then(fn.removeEmptSpace)
    .then(fn.removeIfFound('-->'))
    .then(fn.removeNumbers)
    .then(fn.removeSymbols(symbols))
    .then(fn.joinContent)
    .then(fn.splitText(' '))
    .then(fn.removeEmptSpace)
    .then(fn.removeNumbers)
    .then(groupWords)
    .then(console.log)
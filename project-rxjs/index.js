const path = require('path')
const fn = require('./functions')
const { map, filter } = require('rxjs/operators')

const dataPath = path.join(__dirname, '..', 'data', 'legendas')

const symbols = [
    '.', '?', '-', ',', '"', '♪', '_', '<i>', '</i>', '\r', '[', ']', '(', ')'
]

fn.readFolder(dataPath)
    .pipe(
        fn.fileEndsWith('.srt'),
        fn.readContentFile(),
        fn.splitText('\n'),
        fn.removeEmptSpace(),
        fn.removeNumbers()
    )
    .subscribe(console.log)

// fn.readFolder(dataPath)
//     .then(fn.fileEndsWith('.srt'))
//     .then(fn.readContentFiles)
//     .then(fn.joinContent)
//     .then(fn.splitText('\n'))
//     .then(fn.removeEmptSpace)
//     .then(fn.removeIfFound('-->'))
//     .then(fn.removeNumbers)
//     .then(fn.removeSymbols(symbols))
//     .then(fn.joinContent)
//     .then(fn.splitText(' '))
//     .then(fn.removeEmptSpace)
//     .then(fn.removeNumbers)
//     .then(fn.groupWords)
//     .then(fn.sortByAttr('qtt', 'desc'))
//     .then(console.log)
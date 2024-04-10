const path = require('path')
const fn = require('./functions')
const { map, filter } = require('rxjs/operators')

const dataPath = path.join(__dirname, '..', 'data', 'legendas')

const symbols = [
    '.', '?', '-', ',', '"', '♪', '_', '<i>', '</i>', '\r', '[', ']', '(', ')', '!'
]

fn.readFolder(dataPath)
    .pipe(
        fn.fileEndsWith('.srt'),
        fn.readContentFile(),
        fn.splitText('\n'),
        fn.removeEmptSpace(),
        fn.removeNumbers(),
        fn.removeSymbols(symbols),
        fn.splitText(' '),
        fn.removeEmptSpace(),
        fn.removeNumbers(),
    )
    .subscribe(console.log)

// fn.readFolder(dataPath)

//     .then(fn.joinContent)

//     .then(fn.groupWords)
//     .then(fn.sortByAttr('qtt', 'desc'))
//     .then(console.log)
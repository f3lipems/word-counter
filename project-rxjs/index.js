const path = require('path')
const fn = require('./functions')
const _ = require('lodash')
const { map } = require('rxjs/operators')

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
        fn.groupWords(),
        map(array => _.sortBy(array, el => - el.qtt))
    )
    .subscribe(console.log)
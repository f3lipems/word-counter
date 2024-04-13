const path = require('path')
const fn = require('./functions')
const _ = require('lodash')
const { map, groupBy, mergeMap, toArray } = require('rxjs/operators')

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
        groupBy(el => el),
        mergeMap(group => group.pipe(toArray())),
        map(words => ({element: words[0], qtt: words.length})),
        toArray(),
        map(array => _.sortBy(array, el => - el.qtt))
    )
    .subscribe(console.log)
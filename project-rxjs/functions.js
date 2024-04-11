const fs = require('fs')
const path = require('path')
const { Observable } = require('rxjs')

function readFolder(folderPath) {
    return new Observable(subscriber => {
        try {
            fs.readdirSync(folderPath).forEach(file => {
                subscriber.next(path.join(folderPath, file))
            })
            subscriber.complete()
        } catch (error) {
            subscriber.error(error)
        }
    })
}

function fileEndsWith(def) {
    return createPipeableOperator(subscriber => ({
        next(text) {
            if (text.endsWith(def)) {
                subscriber.next(text)
            }
        }
    }))
}

function readContentFile() {
    return createPipeableOperator(subscriber => ({
        next(filePath) {
            try {
                const content = fs.readFileSync(filePath, { encoding: 'utf-8' })
                subscriber.next(content.toString())
            } catch (error) {
                subscriber.error(error)
            }
        }
    }))
}

function removeEmptSpace(lines) {
    return createPipeableOperator(subscriber => ({
        next(text) {
            if (text.trim()) {
                subscriber.next(text)
            }
        }
    }))
}

function removeNumbers() {
    return createPipeableOperator(subscriber => ({
        next(line) {
            const num = parseInt(line.trim())
            if (num !== num) {
                subscriber.next(line)
            }
        }
    }))
}

function removeSymbols(symbols) {
    return createPipeableOperator(subscriber => ({
        next(text) {
            const newText = symbols.reduce((acc, symbol) => {
                return acc.split(symbol).join('')
            }, text)
            subscriber.next(newText)
        }
    }))
}


function removeIfFound(textDefault) {
    return function (lines) {
        return lines.filter(line => !line.includes(textDefault))
    }
}

function joinContent(contents) {
    return contents.join(' ')
}

function splitText(symbol) {
    return createPipeableOperator(subscriber => ({
        next(content) {
            content.split(symbol).forEach(el => {
                subscriber.next(el)
            })
        }
    }))
}


function groupWords() {
    words = {}
    return createPipeableOperator(subscriber => ({
        next(word) {
            const w = word.toLowerCase()
            const qtt = words[word] ? words[word].qtt + 1 : 1
            words[word] = { word: w, qtt }
        },
        complete() {
            Object.values(words).forEach((el) => {
                subscriber.next(el)
            })
        }
    }))
}

function sortByAttr(attr, order = 'asc') {
    return function (list) {
        const asc = (el1, el2) => el1[attr] - el2[attr]
        const desc = (el1, el2) => el2[attr] - el1[attr]
        return list.sort(order === 'asc' ? asc : desc)
    }
}

function createPipeableOperator(operatorFn) {
    return function (source) {
        return new Observable(subscriber => {
            const newSub = operatorFn(subscriber)
            source.subscribe({
                next: newSub.next,
                error: newSub.error || (e => subscriber.error(e)),
                complete: newSub.complete || (e => subscriber.complete(e)),
            })
        })
    }
}

module.exports = {
    readFolder,
    fileEndsWith,
    readContentFile,
    removeEmptSpace,
    removeIfFound,
    removeNumbers,
    removeSymbols,
    joinContent,
    splitText,
    groupWords,
    sortByAttr
}
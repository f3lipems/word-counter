const fs = require('fs')
const path = require('path')

function readFolder(folderPath) {
    return new Promise((resolve, reject) => {
        try {
            let files = fs.readdirSync(folderPath)
            files = files.map(file => path.join(folderPath, file))
            resolve(files)
        } catch (error) {
            reject(error)
        }
    })
}

function fileEndsWith(def) {
    return function (files) {
        return files.filter(el => el.endsWith(def))
    }
}

function readContentFile(filePath) {
    return new Promise((resolve, reject) => {
        try {
            const content = fs.readFileSync(filePath, { encoding: 'utf-8' })
            resolve(content.toString())
        } catch (error) {
            reject(error)
        }

    })
}

function readContentFiles(files) {
    return Promise.all(
        files.map(file => readContentFile(file))
    )
}

function removeEmptSpace(lines) {
    return lines.filter(line => line.trim())
}

function removeIfFound(textDefault) {
    return function (lines) {
        return lines.filter(line => !line.includes(textDefault))
    }
}

function removeNumbers(lines) {
    return lines.filter(line => {
        const num = parseInt(line.trim())
        return num !== num
    })
}

function removeSymbols(symbols) {
    return function (elements) {
        return elements.map(el => {
            let text = el
            symbols.forEach(symbol => {
                text = text.split(symbol).join()
            })
            return text
        })
    }

}

module.exports = {
    readFolder,
    fileEndsWith,
    readContentFiles,
    removeEmptSpace,
    removeIfFound,
    removeNumbers,
    removeSymbols
}
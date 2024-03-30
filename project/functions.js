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

function fileEndsWith(array, def) {
    return array.filter(el => el.endsWith(def))
}

module.exports = {
    readFolder,
    fileEndsWith
}
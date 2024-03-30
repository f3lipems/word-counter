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

module.exports = {
    readFolder
}
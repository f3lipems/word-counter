const fs = require('fs')
const path = require('path')

function readFolder(folderPath) {
    let files = fs.readdirSync(folderPath)
    return files.map(file => path.join(folderPath, file))
}

module.exports = {
    readFolder
}
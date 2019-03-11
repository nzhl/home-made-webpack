const fsPromises = require('fs').promises
const path = require('path')

const filesAlreadyVisited = {}
const filesNeedToVisited = ['./index.js']
// 默认从 src/index.js 开始分析依赖

function next () {
  if (filesNeedToVisited.length === 0) return
  const file = filesNeedToVisited.pop()
  if (filesAlreadyVisited[file]) return next()

  return fsPromises.readFile(path.resolve('./src', file), { encoding: 'utf-8' })
    .then(content => {
      const lines = content.split('\n')
      const newContent = lines.map(line => {
        const importRe = /\s*import\s+([a-z_A-Z][a-z_A-Z0-9]+)\s+from\s+'(.*)'/
        const exportRe = /\s*export\s+default\s+([a-z_A-Z][a-z_A-Z0-9]+)/
        let result
        if ((result = importRe.exec(line))) {
          filesNeedToVisited.push(result[2])
          return `let ${result[1]} = helpMeImport(${result[2]})`
        } else if ((result = exportRe.exec(line))) {
          return `helpMeExport(${result[1]})`
        } else {
          return line
        }
      }).join('\n')
      console.log(newContent)
      filesAlreadyVisited[file] = newContent
    }).then(next)
}

next().then(() => {
  console.log(filesAlreadyVisited)
})

(function(modules){
  // cache imported modules
  const importedModules = {}

  function _import (file) {
    if (!importedModules[file]) {
      modules[file].call(null, _import, (module) => {
        importedModules[file] = module
      })
    }
    return importedModules[file]
  }

  _import('./index.js')
  })({
'./index.js': function (_import, _export) {
          let math = _import('./lib.js')

const tests = [
  'math.floor(4 / 3) === ' + math.floor(4 / 3),
  'math.ceil(4 / 3) === ' + math.ceil(4 / 3),
  'math.pow(2, 3) === ' + math.pow(2, 3)
]
const body = document.getElementsByTagName('body')[0]
body.innerHTML = tests.map((test) => {
  return `<div>${test}</div>`
}).join('\n')

        },
'./lib.js': function (_import, _export) {
          const math = {
  floor: Math.floor,
  ceil: Math.ceil,
  pow: Math.pow
}

_export(math)

        },

})
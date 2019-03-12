# home-made-webpack
自制一个简单的打包工具来验证我对Webpack的理解


## 限制
1. 入口文件必须为src/index.js
2. 同时所有要引入文件必须放在src目录下
3. 只支持export default

## 使用
符合限制地完成各个模块之后, 在项目根目录输入`node app.js`进行打包, 打包输出文件为`main.js`


## 打包完成的main.js示例（已格式化）
```js
(function (modules) {
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
  }
})
```

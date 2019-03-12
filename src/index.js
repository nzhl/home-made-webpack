import math from './lib.js'

const tests = [
  'math.floor(4 / 3) === ' + math.floor(4 / 3),
  'math.ceil(4 / 3) === ' + math.ceil(4 / 3),
  'math.pow(2, 3) === ' + math.pow(2, 3)
]
const body = document.getElementsByTagName('body')[0]
body.innerHTML = tests.map((test) => {
  return `<div>${test}</div>`
}).join('\n')

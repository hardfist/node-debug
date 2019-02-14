const gencore = require('gencore')
console.log('pid:', process.pid)
gencore.createCore((err, result) => {
  console.log('result',result)
})
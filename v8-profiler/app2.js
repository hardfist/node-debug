var fs = require('fs');
var profiler = require('v8-profiler-node8');
var snapshot1 = profiler.takeSnapshot();
var snapshot2 = profiler.takeSnapshot();

console.log(snapshot1.getHeader(), snapshot2.getHeader());

console.log(snapshot1.compare(snapshot2));

// Export snapshot to file file
snapshot1.export(function(error, result) {
  fs.writeFileSync('snapshot1.json', result);
  snapshot1.delete();
});

// Export snapshot to file stream
snapshot2.export()
  .pipe(fs.createWriteStream('snapshot2.json'))
  .on('finish', snapshot2.delete);
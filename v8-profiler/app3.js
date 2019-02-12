var fs = require('fs');
var profiler = require('v8-profiler');
profiler.startProfiling('1', true);
var profile1 = profiler.stopProfiling();
profiler.startProfiling('2', true);
var profile2 = profiler.stopProfiling();

console.log(snapshot1.getHeader(), snapshot2.getHeader());

profile1.export(function(error, result) {
  fs.writeFileSync('profile1.json', result);
  profile1.delete();
});

profile2.export()
  .pipe(fs.createWriteStream('profile2.json'))
  .on('finish', function() {
    profile2.delete();
  });
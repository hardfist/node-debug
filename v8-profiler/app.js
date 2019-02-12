require('heapdump')
class Record {
  constructor(){
    this.name = Math.random.toString(36);
  }
}
const list = [];
setInterval(() => {
  for(let i=0;i<1000;i++){
    list.push(new Record())
  }
},100)
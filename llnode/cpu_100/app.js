const Koa = require("koa");
const app = new Koa();
class MyRecord {
  constructor() {
    this.name = "foo";
    this.id = 128;
    this.account = 98454324;
  }
}
app.use(async (ctx, next) => {
  if (ctx.path !== "/loop") {
    ctx.body = 'ok'
    return;
  }
  const list = [];
  for (let i = 0; i < 10000000000; i++) {
    for (const j = 0; i < 1000; i++) {
      list.push(new MyRecord());
    }
    for (const j = 0; i < 1000; i++) {
      list[j].id += 1;
      list[j].account += 2;
    }
    for (const j = 0; i < 1000; i++) {
      list.pop();
    }
  }
});
app.listen(3000, () => {
  console.log('listen at http://localhost:3000')
})

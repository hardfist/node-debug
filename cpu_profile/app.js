const fs = require("fs");
const crypto = require("crypto");
const inspector = require("inspector");
const app = require("express")();
const Bluebird = require('bluebird');
app.get("/encrypt", (req, res, next) => {
  const { password, salt } = req.query;
  const encryptedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  res.end(encryptedPassword);
});
app.get("/cpu_profile", (req, res, next) => {
  const session = new inspector.Session();
  session.connect();

  session.post("Profiler.enable", () => {
    session.post("Profiler.start", async () => {
      await Bluebird.delay(10000);
      session.post("Profiler.stop", (err, { profile }) => {
        // write profile to disk, upload, etc.
        if (!err) {
          fs.writeFileSync(`./${Date.now()}-profile.cpuprofile`, JSON.stringify(profile));
        }
        res.end('ok')
      });
    });
  });
});

app.listen(3000);

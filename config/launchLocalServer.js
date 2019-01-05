const exec = require("child_process").execFile;

// Launch the local mongoDB server
exec("C:/Program Files/MongoDB/Server/3.6/bin/mongod.exe", (err, data) => {
  if (err) {
    console.log(err);
  }
});

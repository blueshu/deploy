var express = require("express");
var app = express();
var childProcess = require('child_process');


app.post("/webhooks/github", function (req, res) {
    var sender = req.body.sender;
    var branch = req.body.ref;

    if(branch.indexOf('master') > -1){
        deploy(res);
    }
})

function deploy(res){
  childProcess.exec('cd /home/www/deploy/ && ./deploy.sh', function(err, stdout, stderr){
      if (err) {
        console.error(err);
        return res.send(500);
      }
      res.send(200);
    });
}

app.listen(80, () => console.log(`Example app listening on port ${port}!`))

var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var childProcess = require('child_process');

app.use(bodyParser.urlencoded({extended: true}));
app.post("/deploy/webhooks", function (req, res) {
  if(req.body && req.body.payload) {
    var payload = null
    try {
      payload = JSON.parse(req.body.payload);
    }
    catch(err) {
      res.sendStatus(400);
    }
    if(payload && payload.ref && payload.ref.indexOf('master')>=0) {
      deploy(res);
    }
  }
  else {
    res.sendStatus(200);
  }
})

function deploy(res){
  childProcess.exec('cd /home/www/deploy/ && ./deploy.sh',{uid:1000}, function(err, stdout, stderr){
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
        console.log(stdout,stderr);
      res.sendStatus(200);
    });
}

app.listen(8010, () => console.log(`Example app listening on port 8010!`))
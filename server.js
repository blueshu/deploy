var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var childProcess = require('child_process');

app.use(bodyParser.urlencoded({extended: true}));
app.post("/webhooks/github", function (req, res) {
  console.log(req.body.payload.ref);
  if(req.body && req.body.payload) {
    var payload = null 
    try {
      payload = JSON.parse(req.body.payload);
    }
    catch(err) {
      res.send(400);
    }
    if(payload.ref.indexOf('master')>=0) {
      deploy(res);
    }
  }
  else {
    res.send(200);
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

app.listen(80, () => console.log(`Example app listening on port 80!`))
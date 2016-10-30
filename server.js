var Flint = require('node-flint');
var webhook = require('node-flint/webhook');
var express = require('express');
var bodyParser = require('body-parser');
var schedule = require('node-schedule');
var rss = require('./action/rss.js')

var Spark = require('csco-spark');


var app = express();
app.use(bodyParser.json());

// flint options
var config = {
  webhookUrl: 'https://'+ process.env.BOT_URL +'/flint',
  token: process.env.SPARK_ACCESS_TOKEN,
  port: process.env.PORT
};

//csco-spark options
var spark = Spark({
  uri: 'https://api.ciscospark.com/v1',
  token: process.env.SPARK_ACCESS_TOKEN
});

// check RSS feed
var j = schedule.scheduleJob('0 * * * *', function(){
  rss.checkrss(spark)
});

// init flint
var flint = new Flint(config);
flint.start();
// say hello
flint.hears('/hello', function(bot, trigger) {
  bot.say('Hello %s!', trigger.personDisplayName);
});

// define express path for incoming webhooks
app.post('/flint', webhook(flint));

// document root
app.get('/', function (req, res) {
  res.send('Hello Express World!' + config.webhookUrl);
});

//var j = schedule.scheduleJob('*/1 * * * *', function(){
//  Flint.Bot(flint).say('hello');
//});

// start express server
var server = app.listen(config.port, function () {
  flint.debug('Flint listening on port %s', config.port);
});

// gracefully shutdown (ctrl-c)
process.on('SIGINT', function() {
  flint.debug('stoppping...');
  server.close();
  flint.stop().then(function() {
    process.exit();
  });
});

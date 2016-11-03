exports.schedule = function(spark) {
  var schedule = require('node-schedule');

  var sendMessage = function(message){
    spark.sendMessage({
      roomId:'Y2lzY29zcGFyazovL3VzL1JPT00vMTlmZDgyYTAtOTc2ZS0xMWU2LTljOTItMGRiNDgyYmZlNTJi',
      text: message
    }).then(function(res){
      /*Store the res data?*/
    });
  };

  var j1 = schedule.scheduleJob('55 2 * * 1-5', function(){
    sendMessage("そろそろお昼休みですよ。息抜きしましょ。")
  });

  var j2 = schedule.scheduleJob('00 8 * * 1-5', function(){
    sendMessage("定時が近づいてきました。残業しなきゃいけない人は残業申請！")
  });

  var j3 = schedule.scheduleJob('30 8 * * 1-5', function(){
    sendMessage("定時になりました。工数を入力して帰りましょう。")
  });

}

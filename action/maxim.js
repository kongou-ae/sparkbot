exports.mada = function(spark,trigger) {

  spark.sendMessage({
    roomId:trigger.roomId,
    files:['https://'+ process.env.BOT_URL+'/images/mada.jpg']
  }).then(function(res){
    /*Store the res data?*/
  });

}

exports.moudou = function(spark,trigger) {

  spark.sendMessage({
    roomId:trigger.roomId,
    files:['https://'+ process.env.BOT_URL+'/images/moudou.jpg']
  }).then(function(res){
    /*Store the res data?*/
  });

}

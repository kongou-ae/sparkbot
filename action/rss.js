exports.checkrss = function(spark) {

  var FeedParser = require('feedparser');
  var request = require('request');
  var moment = require("moment");
  var async = require('async')

  var sendMessage = function(message){
    spark.sendMessage({
      roomId:'Y2lzY29zcGFyazovL3VzL1JPT00vMTlmZDgyYTAtOTc2ZS0xMWU2LTljOTItMGRiNDgyYmZlNTJi',
      text: message
    }).then(function(res){
      /*Store the res data?*/
    });
  };


  var feeds = [
    'http://feeds.feedburner.com/AmazonWebServicesBlog',
    'http://aws.amazon.com/new/feed/',
    'http://feeds.feedburner.com/AmazonWebServicesBlogJp',
    'http://qiita.com/tags/AWS/feed'
  ];

  async.eachSeries(feeds, function(feed, callback){
    var req = request(feed);
    var feedparser = new FeedParser({});


    req.on('error', function (error) {
        // リクエストエラー処理
    });
    req.on('response', function (res) {
        var stream = this;
        if (res.statusCode != 200) {
            return this.emit('error', new Error('Bad status code'));
        }
        stream.pipe(feedparser);
    });

    feedparser.on('readable', function() {
        // 処理ロジックを書く
        // metaプロパティはfeedeparserインスタンスのコンテキストに常に置き換える
        var stream = this
            , meta = this.meta
            , item;
        while (item = stream.read()) {
            var botMessage = meta.title + '\n' + item.title +'\n' + item.link;
            var updateHour = moment(item.date).endOf('hour').fromNow();
            if (updateHour === 'an hour ago'){
              sendMessage(botMessage)
            }
        }
    });
    callback(null)
  })
}

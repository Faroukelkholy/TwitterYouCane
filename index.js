/* jshint node: true */
var express      = require('express');
var app          = express();
var port         = process.env.PORT || 8080;
var twitter = require('twitter');
var bodyParser = require('body-parser');
var parseurlencoded = bodyParser.urlencoded({ extended: true });

var client = new twitter({
    consumer_key: 'q9qiKlCTfeLlIiBrIg11PX1qH',
    consumer_secret: 'y1hLIMtLVAYeCPtpZFQCasUfgO2Bv2vPulabrqhrRh1wLiZuig',
    access_token_key: '4871744871-dXaHX8kNOMXKi8KmCUv9T90TizaHK12O1YsoUzs',
    access_token_secret: 'JTtBYignu9UK7Nj7LJBg82DoilzCiYMNXnwydCgIz0UeA'
});

app.get('/', function(request, response){
    response.render('index.ejs');
});

app.get('/:username', function(request, response){
    var params = {screen_name: request.params.username};
    client.get('statuses/user_timeline', params, function(err, tweets, res){
        if(err) console.log(err);
        console.log(tweets);
        response.send(tweets);
    });
});

app.post('/', parseurlencoded, function(request, response){
    var body = request.body;
    var username = body.username;
    var params = {screen_name: username};
    client.get('statuses/user_timeline', params, function(err, tweets, res){
        if(err) console.log(err);
        console.log(tweets);
        response.send(tweets);
    });
});

app.post('/status', parseurlencoded, function(request, response){
    var body = request.body;
    var message = body.message;
    console.log('Message received ' + message);
    client.post('statuses/update', {status: message}, function(err, tweet, res){
        if(err) throw err;
        console.log("Posted tweet: " + tweet);
        response.send("Success");
    });
});

app.listen(port, function(){
    console.log('Music mix server is up and running at port:' + port);
});

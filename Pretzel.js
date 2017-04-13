/*
  PretzelBot production.
*/

const TeleBot = require('telebot');
const unirest = require('unirest');
const request = require('request');
const bot = new TeleBot('336356993:AAHTZmk2m-F7sb1FfJeZhiVgDXwOQxdlnq4');


// Great API for this bot
const KITTYCAT = 'https://thecatapi.com/api/images/get?format=src&type=';
const NASA = 'https://api.nasa.gov/planetary/apod?api_key=2rSHWsf3M3HOPf0qp3XHEzKaa5u47A1AB3peH9Ap';


// Command keyboard
const markup = bot.keyboard([
  ['/kittygif', '/space', '/grrrl', '/porn']
], { resize: true, once: false });

// Log every text message
bot.on('text', function(msg) {
  console.log(`[text] ${ msg.chat.id } ${ msg.text } ${ msg.from.id } ${ msg.from.first_name } ${ msg.message_id }`);
});

// SendeRMAN
bot.on('text', function(msg) { 
    
    let promise;
    let id = msg.chat.id;
    let Userid = msg.from.id;
    let YourName = msg.from.first_name;
    let Message = msg.text;
    
    if (Message == 'dimme cojo uno') { 
        return [
           promise = bot.sendMessage(id, `mannaggia la madonna!`)]};
    if (Message == 'sei online?') { 
        return [
           promise = bot.sendMessage(id, `si ${ YourName }, sono online sul Raspberry Pi di Pi Dutz!`)]};
});

// On command "start" or "help"
bot.on(['/start', '/help'], function(msg) {

  return bot.sendMessage(msg.chat.id,
     '😺 Use commands: /kitty, /kittygif, /space, /grrrl and /porn (work in progress)', { markup }
  );

});

// On command "about"
bot.on('/about', function(msg) {

  let text = '😽 This bot is powered by TeleBot library ' +
      '😺 This bot is running on Raspberry Pi 2 with Node/Forever, hosted by Pi Dutz ' +
    'https://github.com/kosmodrey/telebot Go check the source code!';

  return bot.sendMessage(msg.chat.id, text);

});

// On command "nasa"
bot.on('/space', function(msg) {

  let promise;
  let id = msg.chat.id;
    
  
	request(NASA, function (error, response, body) {
				console.log(NASA+ ", " + response.statusCode);
				if (!error && response.statusCode == 200) {
					APOD = JSON.parse(body)
          return [
           promise = bot.sendPhoto(id, APOD.hdurl),
           promise = bot.sendMessage(id, `Eccoti la foto del giorno della NASA! day ${ APOD.date }, ${ APOD.title }, ${ APOD.copyright }.`),
      ]
				}
				else {
					console.log("Server error getting flybys.");
				}
        
  // Send "uploading photo" action
  bot.sendAction(id, 'upload_photo');
        
	});
});


// On command "grrrl"
bot.on('/grrrl', function(msg) {

  let promise;
  let id = msg.chat.id;
  let q = msg.text.split(' ')[0];
  const HOTTY = `http://api.giphy.com/v1/gifs/search?q=${ q }&limit=100&api_key=dc6zaTOxFJmzC`;
    
    
    request(HOTTY, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        GRRRL = JSON.parse(body);
        let i = Math.floor((Math.random() * GRRRL.data.length) + 1);
     //   var i = 0; i < GRRRL.data.length; i++
        let url = GRRRL.data[i].images.downsized.url;
  return [
      //  promise = bot.sendMessage(id, `Ecco una figa!`),
        promise = bot.sendDocument(id, url),
      console.log(q),
      ]}
    else {
					console.log("Server error.");
				}
  // Send "uploading photo" action
        bot.sendAction(id, 'upload_document');
    });
    
});

// On command "porn"
bot.on('/porn', function(msg) {

  let promise;
  let id = msg.chat.id;

        // These code snippets use an open-source library. http://unirest.io/nodejs
        unirest.get("https://steppschuh-json-porn-v1.p.mashape.com/porn/")
        .header("X-Mashape-Key", "bwqiJakJ5cmshUMgNJ9HkcriTpzpp1DJlYEjsnFFfW8xm59dmY")
        .header("Accept", "application/json")
        .end(function (result) {
            let i = Math.floor((Math.random() * result.body.content.length) + 1);
            let n = Math.floor((Math.random() * result.body.content[i].imageKeyIds.length) + 1);
            let videopic = 'http://json-porn.com/image/' + result.body.content[i].imageKeyIds[n] + '/800.jpg';
            let videoname = result.body.content[i].name;
     //       let videourl = result.body.content[i].downloads.url;
            return [
     //   promise = bot.sendMessage(id, `Ecco un porno!`),
       
       console.log(videopic, videoname),
       promise = bot.sendMessage(id, videoname),
       promise = bot.sendPhoto(id, videopic),
                
                
        ]
        
        // Send "uploading photo" action
  bot.sendAction(id, 'upload_photo');
        
        });
    });

// On command "kitty" or "kittygif"
bot.on(['/kitty', '/kittygif'], function(msg) {
  
  let promise;
  let id = msg.chat.id;
  let cmd = msg.text.split(' ')[0];

  // Photo or gif?
  if (cmd == '/kitty') {
   // promise = bot.sendMessage(id, `😽 Eccoti un bel gatto!`);
    promise = bot.sendPhoto(id, KITTYCAT + 'jpg', { fileName: 'kitty.jpg' });
  } else {
   // promise = bot.sendMessage(id, `😽 Eccoti un bel gatto!`);
    promise = bot.sendDocument(id, KITTYCAT + 'gif', { fileName: 'kitty.gif' });
  }
  
  // Send "uploading photo" action
  bot.sendAction(id, 'upload_photo');
  
  return promise.catch(error => {
    console.log('[error]', error);
    // Send an error
    bot.sendMessage(id, `😿 An error ${ error } occurred, try again.`);
  });

});

// Start getting updates
bot.connect();
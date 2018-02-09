/*
  PretzelBot production.
*/

const TeleBot = require('telebot');
const request = require('request');
const bot = new TeleBot('');


// Great API for this bot
const KITTYCAT = 'https://thecatapi.com/api/images/get?format=src&type=';
const NASA = 'https://api.nasa.gov/planetary/apod?api_key=2rSHWsf3M3HOPf0qp3XHEzKaa5u47A1AB3peH9Ap';
const CHUCK = 'https://api.chucknorris.io/jokes/random';
const CRYPTO = 'https://www.bitstamp.net/api/v2/ticker/btceur/';


// Command keyboard
const markup = bot.keyboard([
  ['/kittygif', '/space', '/chuck', '/grrrl boobs', '/crypto']
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
     '😺 Use commands: /kitty, /kittygif, /space, /grrrl or /g (add text), /chuck, /crypto', { markup }
  );

});

// On command "about"
bot.on('/about', function(msg) {

  let text = '😽 This bot is powered by TeleBot library ' +
      '😺 This bot is running on Raspberry Pi 2 with Node/Forever, hosted by Pi Dutz ' +
    'https://github.com/zebheone/Pretzelbot Go check the source code!';

  return bot.sendMessage(msg.chat.id, text);

});

// On command "jojo"
bot.on('/jojo', function(msg) {

  let text = 'jojo mojo orologio dinghidinghi!';
  let voicefile = '/home/pi/Pretzelbot/files/jojomojoorologiodinghidinghi.ogg';

  return [
        bot.sendMessage(msg.chat.id, text),
        bot.sendVoice(msg.chat.id, voicefile)];
    
  // Send "user is writing" action
  bot.sendAction(id, 'send_voice');


});

// On command "nasa"
bot.on('/space', function(msg) {

  let promise;
  let id = msg.chat.id;
    
  
	request(NASA, function (error, response, body) {
				console.log(NASA+ ", " + response.statusCode);
				if (!error && response.statusCode == 200) {
					APOD = JSON.parse(body);
                    
           promise = bot.sendPhoto(id, APOD.hdurl);
           promise = bot.sendMessage(id, `Ecco la foto del giorno della NASA! day ${ APOD.date }, ${ APOD.title }, ${ APOD.copyright }.`);
				
                }
				else {
					console.log("Server error getting flybys.");
				}
        
  // Send "uploading photo" action
  bot.sendAction(id, 'upload_photo');
  
  return promise.catch(error => {
    console.log('[error]', error);
    // Send an error
    bot.sendMessage(id, `😿 An error ${ error } occurred, try again.`);
  });
        
	});
});

  // Jojo's magic code
function createParametersString(botquery)
{
    let params = '';
    let q = botquery.split(' ');
    for(var i =1; i < q.length; i++)
      {
          params += q[i];
          
          if(i < q.length -1)
              params += "+";
      }
    
    return params;
}


// On command "grrrl"
bot.on(['/grrrl', '/g'], function(msg) {

  let promise;
  let id = msg.chat.id;
    
    let params = createParametersString(msg.text);
    let search = 'search?q=girl+'+params;
    let HOTTY = 'http://api.giphy.com/v1/gifs/'+search+'&limit=100&api_key=dc6zaTOxFJmzC&rating=r';
    
    request(HOTTY, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        GRRRL = JSON.parse(body);
        let i = Math.floor((Math.random() * GRRRL.data.length) + 0);
        let url = GRRRL.data[i].images.downsized.url;
        promise = bot.sendDocument(id, url);
      }
    else {
					console.log("Server error.");
				}
        
  // Send "uploading photo" action
  bot.sendAction(id, 'upload_photo');
  
  return promise.catch(error => {
    console.log('[error]', error);
    // Send an error
    bot.sendMessage(id, `😿 An error ${ error } occurred, try again.`);
  });
    
});
    
    });


// On command "Chuck"
bot.on(['/chuck', '/norris'], function(msg) {

  let promise;
  let id = msg.chat.id;
    
  // Send "user is writing" action
  bot.sendAction(id, 'typing');
  
	request(CHUCK, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					chuckdata = JSON.parse(body);
       //    promise = bot.sendPhoto(id, chuckdata.icon_url);
           promise = bot.sendMessage(id, `${ chuckdata.value }`);
				
                }
				else {
					console.log("Chuck Norris is never offline.");
				}
        
  return promise.catch(error => {
    console.log('[error]', error);
    // Send an error
    bot.sendMessage(id, `😿 An error ${ error } occurred, try again.`);
  });
        
	});
    
});

// On command "Crypto"
bot.on(['/crypto', '/coin'], function(msg) {

  let promise;
  let id = msg.chat.id;
    
  // Send "user is writing" action
  bot.sendAction(id, 'typing');
  
	request(CRYPTO, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					btceur = JSON.parse(body);
           promise = bot.sendMessage(id, `1 BTC = ${ btceur.last }€, high ${ btceur.high }€, low ${ btceur.low }€` );
				
                }
				else {
					console.log("offline.");
				}
        
  return promise.catch(error => {
    console.log('[error]', error);
    // Send an error
    bot.sendMessage(id, `😿 An error ${ error } occurred, try again.`);
  });
        
	});
    
});

// On command "kitty" or "kittygif"
bot.on(['/kitty', '/kittygif'], function(msg) {
  
  let promise;
  let id = msg.chat.id;
  let cmd = msg.text.split(' ')[0];

  // Photo or gif?
  if (cmd == '/kitty') {
    promise = bot.sendPhoto(id, KITTYCAT + 'jpg', { fileName: 'kitty.jpg' });
  } else {
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
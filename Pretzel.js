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
const CRYPTO = 'https://www.bitstamp.net/api/v2/ticker/';


// Command keyboard
const markup = bot.keyboard([
  ['/kittygif', '/space', '/chuck', '/g', '/crypto']
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
     '😺 Use commands: /kitty, /kittygif, /space, /g (search gif), /chuck, /crypto', { markup }
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

// On command "g"
bot.on('/g', function(msg) {

  let promise;
  let id = msg.chat.id;
  let text = msg.text;
  let clearspaces = text.replace(/\s/g,"+");
  let clearcommand = clearspaces.replace(/\/g/,"boobs");
  let search = 'search?q='+clearcommand;
  console.log(search);
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

 var promise;
 var id = msg.chat.id;
 var text = msg.text;
 var coinsmb = text.replace(/\/crypto|\/coin/,"");      //remove the command from the inserted text (both /crypto and /coin)
 var nospaces = coinsmb.replace(/\s/g,"");              //remove any spaces
 var userInput = nospaces.split("-");                   //split user input using "-" as separator and store into an array
 var validPair01 = "btc bch eth ltc xrp";
 var validPair02 = "eur usd btc";
 var chk01 = new RegExp(userInput[0],"g");
 var chk02 = new RegExp(userInput[1],"g");
 var ticker = userInput[0].concat(userInput[1]);        //create a valid CoinPair string for Bitstamp API

// Building header with coin name

        if (userInput[0] == "btc") {
         header = "Bitcoin";
        }
        else if (userInput[0] == "bch") {
         header = "Bitcoin Cash";
        }
        else if (userInput[0] == "eth") {
         header = "Ethereum";
        }
        else if (userInput[0] == "ltc") {
         header = "Litecoin";
        }
        else if (userInput[0] == "xrp") {
         header = "Ripple";
        }

// Check command and valid parameters

        if (coinsmb  == "" || coinsmb == " help") {
         return bot.sendMessage(id, `Usage: /crypto or /coin pair\n\nList of valid pairs:\nbtc-eur|usd\nbch-eur|usd|btc\neth-eur|usd|btc\nltc-eur|usd|btc\nxrp-eur|usd|btc\n\nEXAMPLE: /crypto btc-eur`);
        }
        else if  (userInput[0] == "btc" && userInput[1] == "btc") {
         return bot.sendMessage(id, `Invalid request...Try again...`);
        }
        else if (validPair01.match(chk01) && validPair02.match(chk02)) {
         ticker =  userInput[0].concat(userInput[1]);
                if (userInput[1] == "eur"){
                 smb = "EUR";
                }
                else if (userInput[1] == "usd") {
                 smb = "USD";
                }
                else if (userInput[1] == "btc") {
                 smb = "BTC";
                }
        }
        else {
         return bot.sendMessage(id, `Invalid request...Try again...`);
        }

// Send "user is writing" action

 bot.sendAction(id, 'typing');

// Getting data from exchange

 let CRYPTO = 'https://www.bitstamp.net/api/v2/ticker/'+ticker+'/';
        request(CRYPTO, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                 apiresp = JSON.parse(body);
                 promise = bot.sendMessage(id, `${ header }\nLast price:  ${ apiresp.last } ${ smb }\nHigh price: ${ apiresp.high } ${ smb }\nLow price:  ${ apiresp.low } ${ smb }` );
                }
                else {
                 console.log("offline.");
                }
        return promise.catch(error => {
         console.log('[error]', error);
// Send an error
         bot.sendMessage(id, `An error ${ error } occurred, try again.`);
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

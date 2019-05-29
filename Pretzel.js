/*
  PretzelBot production. ^.^
*/

const fs = require("fs");
const readline = require('readline');
const TeleBot = require('telebot');
const request = require('request');
const schedule = require('node-schedule');
const key_file = fs.readFileSync("Pretzelbot/files/keys.json")
const key = JSON.parse(key_file);
const bot = new TeleBot(key.PROD);

// Free API for this bot
const KITTYCAT = key.KITTYCAT;
const NASA = key.NASA;
const CHUCK = key.CHUCK;
const CRYPTO = key.CRYPTO;


// Command keyboard
const markup = bot.keyboard([
  ['/kittygif', '/g'], ['/chuck', '/space'], ['/weather', '/crypto']
], { resize: true, once: false });


// Scheduler
//var j = schedule.scheduleJob('*/5 * * * *', function(){
//
//    let text_capture = 'Coming Soon!';
//    let text_message = '📢 Pretzelbot News 📢';
//    let text_link = '<a href="http://www.example.com/">inline URL</a>';
//const rl = readline.createInterface({
//  input: fs.createReadStream("Pretzelbot/files/subs.txt"),
//        crlfDelay: Infinity
//        });
//        rl.on('line', (ID) => {
//            bot.sendVideo(ID, pleasestandby, { caption: text});
//            bot.sendMessage(ID, `This is a <b>${ text_message }</b> message and a link: ${ text_link } `, { parse });
//            });
//});


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
    
    // Online check
    if (Message == 'sei online?') { 
        return [
           promise = bot.sendMessage(id, `si ${ YourName }, sono online sul Raspberry Pi di Pi Dutz!`)]};
    
});

// On command "start" or "help"
bot.on(['/start', '/help'], function(msg) {

  return bot.sendMessage(msg.chat.id,
     'Commands: /kitty, /kittygif, /space, /g (+text), /chuck, /weather, /crypto ', { markup }
  );

});

// On command "about"
bot.on('/about', function(msg) {

  let text = 'This bot is powered by TeleBot library ' +
      'This bot is running on Raspberry Pi 2 with Node/Forever, hosted by Pi Dutz ' +
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
  let parse = 'html';
  let id = msg.chat.id;
    
	request(NASA, function (error, response, body) {
                console.log(NASA+ ", " + response.statusCode);
                        if (!error && response.statusCode == 200) {
                                APOD = JSON.parse(body);
                                var DateTime = new Date(APOD.date);
                                var NewDate = DateTime.getTime();
                                var Data = new Date(NewDate);
                                        if (APOD.media_type == "image") {
                                                promise = bot.sendMessage(id, `Ecco la <i>foto del giorno</i> della <b>NASA</b> - ${ Data.getDate() }/${ Data.getMonth()+1 }/${ Data.getFullYear() }\n\n<a href="${ APOD.url }">${ APOD.title }</a>`, { parse });
                                        }
                                        else if (APOD.media_type == "video") {
                                                var url = APOD.url.replace(/http:/,"");
                                                var url_ok = url.replace(/\/\/www/,"http://www");
                                                promise = bot.sendMessage(id, `Ecco il <i>video del giorno</i> della <b>NASA</b> - ${ Data.getDate() }/${ Data.getMonth()+1 }/${ Data.getFullYear() }\n${ APOD.title }, ${ url_ok }`, { parse });
                                        }
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

// On command "g" Gif search
bot.on('/g', function(msg) {

  let promise;
  let id = msg.chat.id;
  let text = msg.text;
  let clearspaces = text.replace(/\s/g,"+");
  let clearcommand = clearspaces.replace(/\/g/,"boobs");
  let search = 'search?q='+clearcommand;
    let HOTTY = 'http://api.giphy.com/v1/gifs/'+search+'&limit=100&api_key=' + key.HOTTY + '&rating=r';
    console.log(HOTTY);
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

// On command "kitty" or "kittygif" and function "kittybot"
  const kittybot = function(msg) {
  
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

}

bot.on(['/kitty', '/kittygif'], kittybot);

// On command "weather"
bot.on('/weather', function(msg) {

    const WEATHER = 'https://api.darksky.net/forecast/089c221608e8b732b087e6fcc3fe1a26/45.46427, 9.18951?lang=it&units=si';
    let promise;
    let id = msg.chat.id;
    let parse = 'html';
  // Send "user is writing" action
  bot.sendAction(id, 'typing');
    
    request(WEATHER, function (error, response, body) {
		console.log(WEATHER+ ", " + response.statusCode);
			if (!error && response.statusCode == 200) {
				WTH = JSON.parse(body);
				var fTemp = WTH.currently.temperature;
				var fToCel = Math.round(10*((fTemp - 32)/1.8))/10 + "°C";
				var DateTime = new Date((WTH.currently.time)*1000);
				var dd = DateTime.getDate();
				var m = (DateTime.getMonth()+1);
				var yyyy = DateTime.getFullYear();
				var hh = DateTime.getHours();
				var mm = DateTime.getMinutes();
					if (WTH.currently.icon == "rain" || WTH.currently.icon == "sleet") {
						var emoji = " \uD83C\uDF27"
					}
					else if (WTH.currently.icon == "clear-day") {
						var emoji = " \uD83C\uDF1E"
					}
					else if (WTH.currently.icon == "clear-night") {
						var emoji = " \uD83C\uDF1D"
					}
					else if (WTH.currently.icon == "snow") {
						var emoji = " \u2744\uFE0F"
					}
					else if (WTH.currently.icon == "wind") {
						var emoji = " \uD83C\uDF2C"
					}
					else if (WTH.currently.icon == "fog") {
						var emoji = " \ud83d\udc19"
					}
					else if (WTH.currently.icon == "cloudy") {
						var emoji = " \u2601\uFE0F"
					}
					else if (WTH.currently.icon == "partly-cloudy-day" || WTH.currently.icon == "partly-cloudy-night") {
						var emoji = " \u26C5\uFE0F"
					}
				promise = bot.sendMessage(id, `<b>Milano</b> - <i>${ dd }/${ m }/${ yyyy } ${ hh }:${ mm }</i>\n\n<b>Condizioni attuali:</b> ${ WTH.currently.temperature } C°, ${ WTH.currently.summary }` + emoji + `\n<b>Previsioni:</b> ${ WTH.hourly.summary }`, { parse });
			}
			else {
				console.log("Server error getting flybys.");
			}
		return promise.catch(error => {
		console.log('[error]', error);
// Send an error
		bot.sendMessage(id, `  An error ${ error } occurred, try again.`);
		});
	});
});

// Start getting updates
bot.connect();

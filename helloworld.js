//'use strict';

const TeleBot = require('telebot');
const request = require('request');
const bot = new TeleBot('336356993:AAHTZmk2m-F7sb1FfJeZhiVgDXwOQxdlnq4');

// const CRYPTO = 'https://www.bitstamp.net/api/v2/ticker/'+ticker+'/';

// Command keyboard
const markup = bot.keyboard([
  ['/crypto']
], { resize: true, once: false });

// On command "Crypto"
// bot.on(['/crypto', '/coin'], function(msg) {

//  let promise;
//  let id = msg.chat.id;
//  let ticker = msg.text;
//  let CRYPTO = 'https://www.bitstamp.net/api/v2/ticker//';

// Send "user is writing" action
//  bot.sendAction(id, 'typing');

//       request(CRYPTO, function (error, response, body) {
//                                if (!error && response.statusCode == 200) {
//                                        btceur = JSON.parse(body);
//           promise = bot.sendMessage(id, `1 BTC = ${ btceur.last }€, high ${ btceur.high }€, low ${ btceur.low }€` );
//	   promise = bot.sendMessage(id, ticker);
//                }
//                                else {
//                                        console.log("offline.");
//                                }

//  return promise.catch(error => {
//    console.log('[error', error);
    // Send an error
//    bot.sendMessage(id, `😿 An error ${ error } occurred, try again.`);
//  });

//        });

//});

// On every text message
bot.on('text', msg => {
  let id = msg.from.id;
//  let text = msg.text;
//  return bot.sendMessage(id, `You said: ${ text }`);
  let ticker = msg.text;
  let CRYPTO = 'https://www.bitstamp.net/api/v2/ticker/'+ticker+'/';
  console.log('[text]', ticker);
//  let fiat = ticker.replace(btc, );

// Send "user is writing" action
  bot.sendAction(id, 'typing');

        request(CRYPTO, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                        btceur = JSON.parse(body);

           promise = bot.sendMessage(id, `1 BTC = ${ btceur.last }€, high ${ btceur.high }€, low ${ btceur.low }€` );
           promise = bot.sendMessage(id, ticker);
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

});

bot.connect();
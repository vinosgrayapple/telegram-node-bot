const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const fs = require('fs');
// const usersArray = require('./db').;
// console.log( fs.readFileSync('./db.json'));
var usersArray = JSON.parse(fs.readFileSync('./db.json')).json;
// console.log(usersArray)
const token = '388795002:AAE1UCy5COY_cOFeLSo0dFFJIlkU7mgkr4w';
const whiteList = [122410782];
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


bot.onText(/\/audio/, function onAudioText(msg) {
	const stream = fs.createReadStream(`${__dirname}/audio/Kat.mp3`);
	bot.sendAudio(msg.chat.id, stream);
});


bot.onText(/(.+)/, (msg, match) => { //\/in 
	
  const chatId = msg.chat.id;
  // console.log("chatId", chatId);
  if (whiteList.indexOf(chatId) == -1 ) return;
  // console.log('chatId', chatId);
  const resp = match[1].replace(/ /g,'');

  	filteredUser = usersArray.filter(user => user.lastName.toUpperCase().includes(resp.toUpperCase()));

	filteredUser.map(
	(user) => {
		const msgForSend = `_ ${user.lastName.toUpperCase()} ${user.firstName.toUpperCase()} _ :  
								 📱 *${user.mobileNumber}*   (☎️ *${user.innerNumber}*)`;
		const photo = fs.existsSync(`${__dirname}/img/${user.photo}`) ? `${__dirname}/img/${user.photo}` : "https://telegram.org/img/t_logo.png";
		
		bot.sendMessage(chatId, msgForSend,{"parse_mode": "Markdown" });
	}

	);

});

// Get all User
bot.onText(/\/inall/, (msg, match) => {
  const chatId = msg.chat.id;
  if (whiteList.indexOf(chatId) == -1 ) return;
	msgForSend = usersArray.reduce(	(concat, user) =>  concat + `_ ${user.lastName.toUpperCase()} ${user.firstName.toUpperCase()} _ : ☎️ *${user.innerNumber}*  📱 *${user.mobileNumber}* \n\n` ,
	``);
	bot.sendMessage(chatId, msgForSend,{"parse_mode": "Markdown" });
});

// Get HELP
bot.onText(/\/help/, (msg, match) => {
  const chatId = msg.chat.id;
  if (whiteList.indexOf(chatId) == -1 ) return;
	msgForSend = `
	/help    - Помощь по командам бота
	/inall   - Получить всех пользователей одним списком
	/in XXX  - Где XXX фамилия или ее часть

	`;
	bot.sendMessage(chatId, msgForSend,{"parse_mode": "Markdown" });
});






console.log('Bot starting....')


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
 // bot.sendMessage(chatId, 'Received your message');
});
const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const fs = require('fs');
const token = '388795002:AAE1UCy5COY_cOFeLSo0dFFJIlkU7mgkr4w';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const usersArray = [
{
	"firstName": "Сергей",
	"lastName": "Комаричев",
	"photo": "komarichev.png",
	"innerNumber": "6-33",
	"mobileNumber": "+38(067) 625-18-58"
},
{
	"firstName": "Сергей",
	"lastName": "Сапига",
	"photo": "sapiga.gif",
	"innerNumber": "622",
	"mobileNumber": "+38(067) 624-42-60"
},
{
	"firstName": "Дмитрий",
	"lastName": "Рево",
	"photo": "revo.gif",
	"innerNumber": "5678",
	"mobileNumber": "+38(067) 625-93-05"
},
{
	"firstName": "Виктор",
	"lastName": "Тюленев",
	"photo": "tulenev.gif",
	"innerNumber": "688",
	"mobileNumber": "+38(067) 625-18-47"
},
{
	"firstName": "Людмила Павловна",
	"lastName": "Артёменко",
	"photo": ".gif",
	"innerNumber": "",
	"mobileNumber": "+38(095) 685-83-84"
},
{
	"firstName": "Людмила Анатольевна",
	"lastName": "Поваляева",
	"photo": ".gif",
	"innerNumber": "5-09",
	"mobileNumber": "+38(067) 620-10-51"
},
{
	"firstName": "Юлия",
	"lastName": "Комаричева",
	"photo": ".gif",
	"innerNumber": "5-25",
	"mobileNumber": "+38(067) 620-10-51"
},
{
	"firstName": "Олег",
	"lastName": "Качур",
	"photo": ".gif",
	"innerNumber": "6-43",
	"mobileNumber": ""
},
{
	"firstName": "Виктория Владимировна",
	"lastName": "Малеванная",
	"photo": ".gif",
	"innerNumber": "6-10",
	"mobileNumber": ""
},
{
	"firstName": "Елена Николаевна",
	"lastName": "Нечаева",
	"photo": ".gif",
	"innerNumber": "6-27",
	"mobileNumber": ""
},
{
	"firstName": "Максим",
	"lastName": "Куличенко",
	"photo": ".gif",
	"innerNumber": "5-73",
	"mobileNumber": ""
},
{
	"firstName": "Алексей Юрьевич",
	"lastName": "Гаркуша",
	"photo": ".gif",
	"innerNumber": "6-54",
	"mobileNumber": ""
},
{
	"firstName": "АртВайнери",
	"lastName": "Коммутатор",
	"photo": ".gif",
	"innerNumber": "+38(062) 340-19-55",
	"mobileNumber": ""
},
];

bot.onText(/\/audio/, function onAudioText(msg) {
	const stream = fs.createReadStream(`${__dirname}/audio/Kat.mp3`);
	bot.sendAudio(msg.chat.id, stream);
});


bot.onText(/\/in (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1];

  	filteredUser = usersArray.filter(user => user.lastName.toUpperCase().includes(resp.toUpperCase()));

	filteredUser.map(
	(user) => {
		const msgForSend = `_ ${user.lastName.toUpperCase()} ${user.firstName.toUpperCase()} _ :  
								 📱 *${user.mobileNumber}*   (☎️ *${user.innerNumber}*)`;
		//const photo = `${__dirname}/img/${user.photo}` ;
		const photo = fs.existsSync(`${__dirname}/img/${user.photo}`) ? `${__dirname}/img/${user.photo}` : "https://telegram.org/img/t_logo.png";
		
		// bot.sendPhoto(chatId, photo); /*,{caption: "photo"}*/
		bot.sendMessage(chatId, msgForSend,{"parse_mode": "Markdown" });
	}

	);

});

// Get all User
bot.onText(/\/inall/, (msg, match) => {
  const chatId = msg.chat.id;
	msgForSend = usersArray.reduce(	(concat, user) =>  concat + `_ ${user.lastName.toUpperCase()} ${user.firstName.toUpperCase()} _ : ☎️ *${user.innerNumber}*  📱 *${user.mobileNumber}* \n\n` ,
	``);
	bot.sendMessage(chatId, msgForSend,{"parse_mode": "Markdown" });
});

// Get HELP
bot.onText(/\/help___/, (msg, match) => {
  const chatId = msg.chat.id;
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
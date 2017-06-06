const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const fs = require('fs');

const usersArray = JSON.parse(fs.readFileSync('./db.json')).json;
const idTXT = fs.readFileSync('./id.json', 'utf-8');
const whiteList = JSON.parse(idTXT);
const password = 'parabellum';
const token = '388795002:AAE1UCy5COY_cOFeLSo0dFFJIlkU7mgkr4w';

const bot = new TelegramBot(token, { polling: true });

// Get password
bot.onText(/\/pass (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    if (resp === password) {
        const dataToWrite = idTXT.slice(0, idTXT.length - 1) + ',' + chatId + ']';
        fs.writeFile('./id.json', dataToWrite, () => bot.sendMessage(chatId, "Вы в системе"));
    } else {
        bot.sendMessage(chatId, "Не пиши сюда больше!!!");
        return;
    }
});

// Search for lastName
bot.onText(/(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    if (whiteList.indexOf(chatId) == -1) return;

    console.log("chatId", chatId, "  ", (new Date()).toString().split(' ')[4]);
 
    const resp = match[1].replace(/\s/g, '');

    filteredUser = usersArray.filter(user => user.lastName.toUpperCase().includes(resp.toUpperCase()));
    // console.log(filteredUser.length);
	if (!filteredUser.length) {bot.sendMessage(chatId,"_По данному запросу записи в_ *базе отсутствуют*!", { "parse_mode": "Markdown" })}
    filteredUser.map(
        (user) => {
            const msgForSend = `_ ${user.lastName.toUpperCase()} ${user.firstName.toUpperCase()} _ :  
								 📱 *${user.mobileNumber}*   (☎️ *${user.innerNumber}*)`;
            bot.sendMessage(chatId, msgForSend, { "parse_mode": "Markdown" });
        }

    );

});

// Get all User
bot.onText(/\/inall/, (msg, match) => {
    const chatId = msg.chat.id;
    if (whiteList.indexOf(chatId) == -1) return;

    msgForSend = usersArray.reduce((concat, user) => concat + `_ ${user.lastName.toUpperCase()} ${user.firstName.toUpperCase()} _ : ☎️ *${user.innerNumber}*  📱 *${user.mobileNumber}* \n\n`,
        ``);
    bot.sendMessage(chatId, msgForSend, { "parse_mode": "Markdown" });
});

// Get HELP
bot.onText(/\/help/, (msg, match) => {

    const chatId = msg.chat.id;
    if (whiteList.indexOf(chatId) == -1) return;

    msgForSend = `
	/help    - Помощь по командам бота
	/inall   - Получить всех пользователей одним списком
	/in XXX  - Где XXX фамилия или ее часть

	`;
    bot.sendMessage(chatId, msgForSend, { "parse_mode": "Markdown" });
});

console.log('Bot starting....')

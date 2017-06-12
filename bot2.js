const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const fs = require('fs');

let usersArray = JSON.parse(fs.readFileSync('./db.json')).json;
    usersArray = usersArray.slice().sort(compareLastName);
const idTXT = fs.readFileSync('./id.json', 'utf-8');
const whiteList = JSON.parse(idTXT);
const password = 'parabellum';
const token = '388795002:AAE1UCy5COY_cOFeLSo0dFFJIlkU7mgkr4w';

const bot = new TelegramBot(token, { polling: true });

// function compareLastName
function compareLastName (a,b)  {
    const aln = a.lastName.toLowerCase(); const bln = b.lastName.toLowerCase();
    if (aln > bln) return  1;
    if (aln < bln) return -1;
    return 0
}


// Get password
bot.onText(/^\/pass (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    if (whiteList.indexOf(chatId) !== -1) {
     bot.sendMessage(chatId, "Вы уже зарегестрированы!")
    return;
    }
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
bot.onText(/^([^\/].+)/, (msg, match) => {
    const chatId = msg.chat.id;
    if (whiteList.indexOf(chatId) == -1) return;

    console.log("chatId", chatId, "  ", (new Date()).toString().split(' ')[4]);
 
    const resp = match[1].replace(/\s/g, '');

    filteredUser = usersArray.filter(user => user.lastName.toUpperCase().includes(resp.toUpperCase()));
    // console.log(filteredUser.length);
	if (!filteredUser.length) {bot.sendMessage(chatId,"_По вашему запросу ничего не найдено_!", { "parse_mode": "Markdown" })}
    filteredUser.map(
        (user) => {
            const mobileNumbers = user.mobileNumber.reduce((a,b)=>a + ` 📱 *${b}* `,'');
            const msgForSend = `_ ${user.lastName.toUpperCase()} ${user.firstName.toUpperCase()} _ :  
								 ${mobileNumbers}   (☎️ *${user.innerNumber}*)`;
            bot.sendMessage(chatId, msgForSend, { "parse_mode": "Markdown" });
        }

    );

});

// Get all User
// bot.onText(/\/inall/, (msg, match) => {
//     const chatId = msg.chat.id;
//     if (whiteList.indexOf(chatId) == -1) return;

//     msgForSend = usersArray.reduce((concat, user, index, array) => {
//         const mobileNumbers = user.mobileNumber.reduce((a,b)=>a + ` 📱 *${b}* `,'');
//         if (!(index+1)%10) {
//         bot.sendMessage(chatId, concat, { "parse_mode": "Markdown" });    
//         }
//       return  concat + `_ ${user.lastName.toUpperCase()} ${user.firstName.toUpperCase()} _ : ☎️ *${user.innerNumber}*  ${mobileNumbers} \n\n`
    
//     }, ``);
//     // bot.sendMessage(chatId, msgForSend, { "parse_mode": "Markdown" });
// });

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

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (whiteList.indexOf(chatId) == -1) {
  	bot.sendMessage(chatId, 'Обратитесь к Администратору!');
  }
});

console.log('Bot starting....')

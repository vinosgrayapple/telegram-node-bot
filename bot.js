'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('388795002:AAE1UCy5COY_cOFeLSo0dFFJIlkU7mgkr4w')

class PingController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    pingHandler($) {
        $.sendMessage('Комаричев внутренний номер 633')
    }

    get routes() {
        return {
            'pingCommand': 'pingHandler'
        }
    }
}
class StartContoller extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    start($) {
        $.sendMessage('Комаричев внутренний номер 633')
    }

    get routes() {
        return {
            'startCommand': 'start'
        }
    }
}

class OtherwiseController extends TelegramBaseController {
    handle($) {
        $.sendMessage(`http://archakov.im/post/telegram-bot-on-nodejs.html`)
    }
}

tg.router
    .when(
        new TextCommand('Комаричев', 'pingCommand'),
        new PingController()
    )
    .when(
        new TextCommand('/start', 'startCommand'), 
        new StartContoller()
    )
    // .when(new TextCommand('/stop', 'stopCommand'), new StopController())
    // .when(new TextCommand('/restart', 'restartCommand'), new RestartController())
    .otherwise(new OtherwiseController())
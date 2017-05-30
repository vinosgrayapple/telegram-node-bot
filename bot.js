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
        $.sendMessage('pong')
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
        $.sendMessage('Hello!')
    }

    get routes() {
        return {
            'startCommand': 'start'
        }
    }
}

class OtherwiseController extends TelegramBaseController {
    handle($) {
        $.sendMessage(`Комаричев Сергей:      тел. 523`)
    }
}

tg.router
    .when(
        new TextCommand('ping', 'pingCommand'),
        new PingController()
    )
    .when(
        new TextCommand('/start', 'startCommand'), 
        new StartContoller()
    )
    // .when(new TextCommand('/stop', 'stopCommand'), new StopController())
    // .when(new TextCommand('/restart', 'restartCommand'), new RestartController())
    .otherwise(new OtherwiseController())
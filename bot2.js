const token = process.env.TOKEN

const Bot = require('node-telegram-bot-api')
let telegramBot

if (process.env.NODE_ENV === 'production') {
    telegramBot = new Bot(token)
    telegramBot.setWebHook(`${process.env.HEROKU_URL}${telegramBot.token}`)
} else {
    telegramBot = new Bot(token, { polling: true })
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode')

// telegramBot.onText(/^/, function (msg) {
//     console.log('simple_message')
//     console.log(msg)
// })

telegramBot.on('new_chat_participant', function (msg) {
    console.log('new_chat_participant')
    console.log(msg.new_chat_participant.username)
})

telegramBot.on('inline_query', function (msg) {
    console.log('inline_query')
    console.log(msg)
})

telegramBot.on('callback_query', function teste (callbackQuery) {
    console.log(callbackQuery.data)
    const msg = callbackQuery.message
    telegramBot.answerCallbackQuery(callbackQuery.id)
        .then(() => telegramBot.sendMessage(msg.chat.id, 'You clicked!'))
})

telegramBot.onText(/\/categorias/, msg => {
    const opts = {
        // reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {
                        text: 'Misogenia',
                        callback_data: 'misogenia'
                    }
                ],
                [
                    {
                        text: 'Homofobia',
                        callback_data: 'homofobia'
                    }
                ],
                [
                    {
                        text: 'Bullying',
                        callback_data: 'bullying'
                    }
                ],
                [
                    {
                        text: 'Machismo',
                        callback_data: 'machismo'
                    }
                ],
                [
                    {
                        text: 'Sexismo',
                        callback_data: 'sexismo'
                    }
                ],
                [
                    {
                        text: 'Discurso de ódio',
                        callback_data: 'discurso de ódio'
                    }
                ],
                [
                    {
                        text: 'Racismo',
                        callback_data: 'racismo'
                    }
                ],
                [
                    {
                        text: 'Exclusão social',
                        callback_data: 'exclusão social'
                    }
                ],
                [
                    {
                        text: 'Discriminação sexual',
                        callback_data: 'discriminação sexual'
                    }
                ],
                [
                    {
                        text: 'Ameaça',
                        callback_data: 'ameaça'
                    }
                ],
                [
                    {
                        text: 'Incitação e/ou apologia ao crime',
                        callback_data: 'incitação e/ou apologia ao crime'
                    }
                ]
            ],
            one_time_keyboard: true,
            selective: true
        })
    }
    telegramBot.sendMessage(msg.chat.id, 'Vamos lá, qual categoria de denúncia você gostaria de ver?', opts)
})

telegramBot.onText(/\/periodos/, msg => {
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: [
                ['As 10 últimas'],
                ['As de hoje'],
                ['As deste mês'],
                ['As deste ano']
            ],
            one_time_keyboard: true,
            selective: true
        })
    }
    telegramBot.sendMessage(msg.chat.id, 'Defina um perído para de amostragem para as denúncias', opts)
})

module.exports = telegramBot

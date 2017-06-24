const token = process.env.TOKEN

const Bot = require('bot-brother')
let telegramBot

if (process.env.NODE_ENV === 'production') {
    telegramBot = Bot({
        key: token,
        webHook: process.env.HEROKU_URL + token
    })
} else {
    telegramBot = Bot({
        key: token,
        polling: { interval: 100, timeout: 1 }
    })
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode')

// Let's create command '/start'.
telegramBot.command('start')
.invoke(function (ctx) {
    // Setting data, data is used in text message templates.
    ctx.data.user = ctx.meta.user
    // Invoke callback must return promise.
    return ctx.sendMessage('Hello <%=user.first_name%>. How are you?')
})
.answer(function (ctx) {
    ctx.data.answer = ctx.answer
    // Returns promise.
    return ctx.sendMessage('OK. I understood. You feel <%=answer%>')
})

// Creating command '/upload_photo'.
telegramBot.command('upload_photo')
.invoke(function (ctx) {
    return ctx.sendMessage('Drop me a photo, please')
})
.answer(function (ctx) {
    // ctx.message is an object that represents Message.
    // See https://core.telegram.org/bots/api#message
    return ctx.sendPhoto(ctx.message.photo[0].file_id, {caption: 'I got your photo!'})
})

// Creating command '/categorias'.
telegramBot.command('categorias')
.invoke(function (ctx) {
    return ctx.sendMessage('Vamos lá, qual categoria de denúncia você gostaria de ver?')
})
.keyboard([
    [
        {
            'Misogenia': { go: 'misogenia' }
        }
    ],
    [
        {
            'Homofobia': { go: 'homofobia' }
        }
    ],
    [
        {
            'Bullying': { go: 'bullying' }
        }
    ],
    [
        {
            'Machismo': { go: 'machismo' }
        }
    ],
    [
        {
            'Sexismo': { go: 'sexismo' }
        }
    ],
    [
        {
            'Discurso de ódio': { go: 'discurso_de_odio' }
        }
    ],
    [
        {
            'Racismo': { go: 'racismo' }
        }
    ],
    [
        {
            'Exclusão social': { go: 'exclusao_social' }
        }
    ],
    [
        {
            'Discriminação sexual': { go: 'discriminacao_sexual' }
        }
    ],
    [
        {
            'Ameaça': { go: 'ameaca' }
        }
    ],
    [
        {
            'Incitação e/ou apologia ao crime': { go: 'incitacao_e_ou_apologia_ao_crime' }
        }
    ]
])

telegramBot.command('misogenia').invoke(function (ctx) {
    return ctx.sendMessage('Você selecionou Misogenia')
})

// const opts = {
//     reply_to_message_id: msg.message_id,
//     reply_markup: JSON.stringify({
//         keyboard: [
//             ['As 10 últimas'],
//             ['As de hoje'],
//             ['As deste mês'],
//             ['As deste ano']
//         ],
//         one_time_keyboard: true,
//         selective: true
//     })
// }

module.exports = telegramBot

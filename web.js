const express = require('express')
const packageInfo = require('./package.json')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.json({ version: packageInfo.version })
})

const server = app.listen(process.env.PORT, '0.0.0.0', function () {
    const host = server.address().address
    const port = server.address().port
    console.log('Web server started at http://%s:%s', host, port)

    if (process.env.NODE_ENV === 'production') {
        console.log(`Web server running on Heroku using this URL ${process.env.HEROKU_URL}`)
    }
})

module.exports = function (bot) {
    app.post('/' + bot.token, function (req, res) {
        bot.processUpdate(req.body)
        res.sendStatus(200)
    })
}

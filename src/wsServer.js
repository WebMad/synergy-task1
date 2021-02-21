const webSocket = require('ws')
const port = 8090

module.exports = function wsServer() {
    const server = new webSocket.Server({
        port: port
    }, () => {
        console.log(`Websocket server started on port ${port}`)
    })

    server.on('connection', ws => {
        ws.on('message', message => {
            message = JSON.parse(message)
            console.log(`Новое сообщение: ${message.name}`)
            ws.send(JSON.stringify({
                name: message.name,
                hash: message.hash,
                data: {
                    msg: "есс, работает"
                }
            }))
        })
    })
}
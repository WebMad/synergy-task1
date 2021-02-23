const webSocket = require('ws')
const studentController = require('./controllers/student.controller.js')
const Student = require("./models").students
const wsConfig = require('../server.config').wsServer

module.exports = function wsServer() {
    const server = new webSocket.Server({
        port: wsConfig.port,
        host: wsConfig.host
    }, () => {
        console.log(`Websocket server started on port ${wsConfig.port}`)
    })

    server.on('connection', ws => {
        ws.on('message', async message => {
            message = JSON.parse(message)

            let data = {}

            // импровизированный роутер, не лучшее решение
            switch (message.name) {
                case 'login':
                    data = await studentController.login(message.data)
                    break
                case 'reg':
                    data = await studentController.register(message.data)
                    break
                case 'edit':
                    if (message.token) {
                        let student = await Student.findOne({
                            where: {
                                token: message.token
                            }
                        })
                        if (student) {
                            data = await studentController.edit(message.data, student)
                        } else {
                            data = {
                                result: false,
                                msg: 'Неверный токен'
                            }
                        }
                    }
                    break
            }
            ws.send(JSON.stringify({
                name: message.name,
                hash: message.hash,
                data: data
            }))
        })
    })
}
const httpConfig = require('../server.config').httpServer

module.exports = function httpServer () {
    const express = require('express')
    const app = express()

    app.use(express.static(__dirname + "/../frontend/dist"))

    app.get('/', (req, res) => {
        res.sendFile(__dirname + "/../frontend/dist/index.html")
    })

    app.listen(httpConfig.port, () => {
        console.log(`Http server started on port ${httpConfig.port}`)
    })
}
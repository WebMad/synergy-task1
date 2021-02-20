const express = require('express')
const app = express()
const port = 8080

app.use(express.static(__dirname + "/frontend/dist"))

app.get('/*', (req, res) => {
    res.sendFile(__dirname + "/frontend/dist/index.html")
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
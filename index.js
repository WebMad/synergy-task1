const httpServer = require("./src/httpServer");
const wsServer = require("./src/wsServer");

const db = require('./src/models')
db.sequelize.sync();
httpServer()
wsServer()
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("student", {
        login: {
            type: Sequelize.STRING
        },
        serialPassport: {
            type: Sequelize.INTEGER
        },
        numberPassport: {
            type: Sequelize.INTEGER
        },
        password: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING
        },
        secondName: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },
        expiresAt: {
            type: Sequelize.DATE
        }
    })
}
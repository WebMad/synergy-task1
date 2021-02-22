const db = require("../models")
const Student = db.students
const helpers = require("../helpers.js")
const bcrypt = require("bcrypt")

exports.register = async (data) => {
    let password = Math.random().toString(36).slice(-8)
    let passwordHash = bcrypt.hashSync(password, 10)

    let check = await Student.findOne({
        where: {
            login: data.login
        }
    });

    if (!check) {
        await Student.create({
            login: data.login,
            password: passwordHash,
            serialPassport: data.serialPassport,
            numberPassport: data.numberPassport,
            firstName: data.firstName,
            secondName: data.secondName,
            lastName: data.lastName,
            token: helpers.generateToken(),
            expiresAt: (new Date()).getTime() + 5000
        })
        return {
            result: true,
            password: password,
        }
    }
    return {
        result: false,
        msg: "Пользователь с таким логином уже зарегистрирован",
    }
}

exports.login = async (data) => {
    let student = await Student.findOne({
        where: {
            login: data.login
        }
    })

    if (student && bcrypt.compareSync(data.password, student.password)) {
        student.token = helpers.generateToken()
        student.expiresAt = (new Date()).getTime() + 5000

        await student.save()

        delete student.toJSON().password
        return {
            result: true,
            student: student
        }
    }

    return {
        result: false,
    }
}

exports.edit = async (data, student) => {
    if (student.login !== data.login) {
        let check = await Student.findOne({
            where: {
                login: data.login
            }
        })

        if (!check) {
            student.login = data.login
        } else {
            return {
                result: false,
                msg: 'Пользователь с таким логином уже существует'
            }
        }
    }

    if (data.lastPassword && data.newPassword) {
        if (bcrypt.compareSync(data.lastPassword, student.password)) {
            console.log(data.newPassword)
            student.password = bcrypt.hashSync(data.newPassword, 10)
        } else {
            return {
                result: false,
                msg: 'Пароли не совпадают'
            }
        }
    }

    student.lastName = data.lastName
    student.firstName = data.firstName
    student.secondName = data.secondName
    student.numberPassport = data.numberPassport
    student.serialPassport = data.serialPassport
    await student.save()
    let resData = student.toJSON()
    delete resData.password
    return {
        result: true,
        student: resData
    }
}
const db = require("../database");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {secret} = require('../config');
const {validationResult} = require('express-validator');

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async auth(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(200).json({message: "Пользователь не авторизирован"});
            }
            const decodedData = jwt.verify(token, secret);
            const user = await db.one(`select id, name, surname, middlename, login, email, avatar, position from users where id = ${decodedData.id}`);
            return res.json(user);
        } catch (e) {
            console.log(e);
            return res.status(200).json({message: "Пользователь не авторизирован"});
        }
    }

    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(200).json({resultCode: 2, message: errors.errors[0].msg});
            }

            const {login, password, email, name, surname, middlename, position} = req.body
            const candidateLogin = await db.oneOrNone(`select * from users where login = '${login}'`);
            if (candidateLogin) {
                return res.status(200).json({resultCode: 1, message: 'Пользователь с таким именем уже существует'});
            }
            const candidateEmail = await db.oneOrNone(`select * from users where email = '${email}'`);
            if (candidateEmail) {
                return res.status(200).json({resultCode: 1, message: 'Пользователь с таким адресом электронной почты уже существует'});
            }
            const hashedPassword = bcrypt.hashSync(password, 7);
            await db.query(`insert into users (name, surname, middlename, login, email, password, avatar, position) values ('${name}', '${surname}', '${middlename}', '${login}', '${email}', '${hashedPassword}', '${req.file ? req.protocol + '://' + req.get('host') + '/uploads/avatars/' + req.file.filename : ''}', '${position}')`);
            return res.json({resultCode: 0, message: "Пользователь успешно зарегистрирован"});
        } catch (e) {
            console.log(e);
            res.status(400).json({resultCode: 2, message: "Ошибка регистрации"});
        }
    }

    async login(req, res) {
        try {
            const {login, password} = req.body
            const user = await db.oneOrNone(`select * from users where login = '${login}'`);
            if (!user) {
                return res.status(200).json({message: `Пользователя с логином ${login} не существует`});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(200).json({message: `Введён неверный пароль`});
            }
            const token = generateAccessToken(user.id);
            return res.json({token});
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController();
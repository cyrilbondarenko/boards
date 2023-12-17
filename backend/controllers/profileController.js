const db = require("../database");
const bcrypt = require("bcryptjs");
const {unlink} = require("node:fs");
const {validationResult} = require("express-validator");

class profileController {
    async updateProfile(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(200).json({resultCode: 2, message: errors.errors[0].msg});
            }

            const {name, surname, middlename, email, position, password} = req.body
            const user = await db.one(`select * from users where id = ${req.user.id}`);

            const candidateEmail = await db.oneOrNone(`select * from users where email = '${email}' and id != ${req.user.id}`);
            if (candidateEmail) {
                return res.json({resultCode: 1, message: 'Пользователь с таким адресом электронной почты уже существует'});
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (validPassword) {
                db.query(`update users set name = '${name}', surname = '${surname}', middlename = '${middlename}', email = '${email}', position = '${position}' where id = ${req.user.id}`);
                return res.json({resultCode: 0, message: "Данные были изменены"});
            }
            return res.json({resultCode: 1, message: "Был введён неправильный пароль"});
        } catch (e) {
            console.log(e);
            res.status(400).json({resultCode: 2, message: "Ошибка при изменении данных"});
        }
    }

    async updateAvatar(req, res) {
        try {
            const userId = req.user.id;
            const avatar = await db.oneOrNone(`select avatar from users where id = ${userId}`);
            if (req.file && avatar) {
                let fileNameArray = avatar.avatar.split("/");
                let fileName = fileNameArray[fileNameArray.length - 1];
                await unlink(`public/uploads/avatars/${fileName}`, (err) => {
                    if (err) throw err;
                });
            }
            if (req.file) {
                db.query(`update users set avatar = '${req.protocol + '://' + req.get('host') + '/uploads/avatars/' + req.file.filename}' where id = ${userId}`);
                return res.json({resultCode: 0, message: "Фото было изменено"});
            }
            return res.json({resultCode: 1, message: "Выберите фото для изменения"});
        } catch (e) {
            console.log(e);
            res.status(400).json({resultCode: 2, message: "Ошибка при изменении фото"});
        }
    }

    async updatePassword(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(200).json({resultCode: 2, message: errors.errors[0].msg});
            }

            const {currentPassword, newPassword} = req.body
            const user = await db.one(`select * from users where id = ${req.user.id}`);
            const validPassword = bcrypt.compareSync(currentPassword, user.password);
            const hashedPassword = bcrypt.hashSync(newPassword, 7);
            if (validPassword) {
                db.query(`update users set password = '${hashedPassword}' where id = ${req.user.id}`);
                return res.json({resultCode: 0, message: "Пароль был изменён"});
            }
            return res.json({resultCode: 1, message: "Был введён неправильный пароль"});
        } catch (e) {
            console.log(e);
            res.status(400).json({resultCode: 2, message: "Ошибка при изменении пароля"});
        }
    }
}

module.exports = new profileController();
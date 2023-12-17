const db = require("../database");

class invitesController {
    async getInvites(req, res) {
        try {
            const boards = await db.query(`select invites.id, users.login, boards.title from invites
            join users on users.id = invites.inviting_id
            join boards on boards.id = invites.board_id
            where invited_id = ${req.user.id}`);
            return res.json(boards);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при получении приглашений"});
        }
    }

    async newInvite(req, res) {
        try {
            const {invitedLogin, boardId} = req.body
            let user = await db.oneOrNone(`select * from users where login = '${invitedLogin}'`);
            if (user) {
                let invite = await db.oneOrNone(`select * from invites where board_id = '${boardId}' and invited_id = '${user.id}'`);
                if (invite) {
                    return res.json({resultCode: 0, message: "Пользователь уже приглашён в эту доску"});
                }
                let invited = await db.oneOrNone(`select * from relationships_boards_users where board_id = '${boardId}' and user_id = '${user.id}'`);
                if (invited) {
                    return res.json({resultCode: 0, message: "Пользователь уже состоит в этой доске"});
                }
                await db.query(`insert into invites (inviting_id, invited_id, board_id) values (${req.user.id}, ${user.id}, ${boardId})`);
                return res.json({resultCode: 0, message: "Новое приглашение было создано"});
            } else {
                return res.json({resultCode: 1, message: "Пользователя с таким логином не существует"});
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при создании приглашения"});
        }
    }

    async acceptInvite(req, res) {
        try {
            const {id} = req.body
            let invite = await db.oneOrNone(`select * from invites where id = ${id}`);
            if (invite) {
                await db.query(`insert into relationships_boards_users (board_id, user_id, role_id) values (${invite['board_id']}, ${invite['invited_id']}, 3)`);
                await db.query(`delete from invites where id = ${id}`);
            }
            return res.json({message: "Приглашение принято"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при принятии приглашения"});
        }
    }

    async declineInvite(req, res) {
        try {
            const {id} = req.body
            await db.query(`delete from invites where id = ${id}`);
            return res.json({message: "Приглашение отклонено"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при отклонении приглашения"});
        }
    }
}

module.exports = new invitesController();
const db = require("../database");
const {unlink} = require("node:fs");

class boardsController {
    async getBoards(req, res) {
        try {
            const boards = await db.query(`select boards.* from relationships_boards_users
            join users on relationships_boards_users.user_id = users.id
            join boards on relationships_boards_users.board_id = boards.id
            where users.id = ${req.user.id}`);
            return res.json(boards);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при получении досок"});
        }
    }

    async getBoard(req, res) {
        try {
            const boardId = req.params.boardId;
            const board = await db.oneOrNone(`select * from boards where id = ${boardId}`);
            if (board) {
                board.blocks = await db.query(`select * from blocks where board_id = ${boardId}`);
                const role = await db.one(`select role_id from relationships_boards_users where user_id = ${req.user.id} and board_id = ${boardId}`);
                for (const block of board.blocks) {
                    block.tasks = await db.query(`select * from tasks where block_id = ${block.id}`);
                }
                return res.json({resultCode: 0, board: {...board, role: role.role_id}});
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({resultCode: 2, message: "Ошибка при получении доски"});
        }
    }

    async getMembers(req, res) {
        try {
            const boardId = req.params.boardId;
            const members = await db.query(`select users.name, users.surname, users.middlename, users.avatar, users.id, users.position, roles.id as "roleId" from relationships_boards_users 
            join users on relationships_boards_users.user_id = users.id
            join roles on relationships_boards_users.role_id = roles.id
            where relationships_boards_users.board_id = ${boardId}`);
            return res.json(members);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при получении участников"});
        }
    }

    async getRoles(req, res) {
        try {
            const roles = await db.query(`select * from roles`);
            return res.json(roles);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при получении ролей"});
        }
    }

    async newBoard(req, res) {
        try {
            const {title} = req.body
            const user = req.user
            let board = await db.one(`insert into boards (title) values ('${title}') returning *`);
            await db.query(`insert into relationships_boards_users (board_id, user_id, role_id) values ('${board.id}', '${user.id}', 1)`);
            return res.json({message: "Новая доска была создана"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при создании новой доски"});
        }
    }

    async updateTitle(req, res) {
        try {
            const boardId = req.params.boardId;
            const {title} = req.body
            db.query(`update boards set title = '${title}' where id = ${boardId}`);
            return res.json({message: "Название было изменено"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при изменении названия"});
        }
    }

    async updateDescription(req, res) {
        try {
            const boardId = req.params.boardId;
            const {description} = req.body
            db.query(`update boards set description = '${description}' where id = ${boardId}`);
            return res.json({message: "Описание было изменено"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при изменении описания"});
        }
    }

    async updateImage(req, res) {
        try {
            const boardId = req.params.boardId;
            const boardImage = await db.oneOrNone(`select image from boards where id = ${boardId}`);
            if (req.file && boardImage.image) {
                let fileNameArray = boardImage.image.split("/");
                let fileName = fileNameArray[fileNameArray.length - 1];
                await unlink(`public/uploads/boards/${fileName}`, (err) => {
                    if (err) throw err;
                });
            }
            if (req.file) {
                db.query(`update boards set image = '${req.protocol + '://' + req.get('host') + '/uploads/boards/' + req.file.filename}' where id = ${boardId}`);
                return res.json({message: "Фото было изменено"});
            }
            return res.json({message: "Выберите фото для замены"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при изменении фото"});
        }
    }

    async updateRole(req, res) {
        try {
            const {boardId, userId, roleId} = req.body
            db.query(`update relationships_boards_users set role_id = ${roleId} where board_id = ${boardId} and user_id = ${userId}`);
            return res.json({message: "Роль была изменена"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при изменении роли"});
        }
    }

    async kick(req, res) {
        try {
            const {boardId, userId} = req.body
            db.query(`delete from relationships_boards_users where board_id = ${boardId} and user_id = ${userId}`);
            return res.json({message: "Пользователь был удален из доски"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при удалении пользователя из доски"});
        }
    }

    async leave(req, res) {
        try {
            const boardId = req.params.boardId;
            let userId = req.user.id;
            let admins = await db.query(`select * from relationships_boards_users where board_id = ${boardId} and role_id = 1`);
            let isUserAdmin = await db.query(`select * from relationships_boards_users where user_id = ${userId} and role_id = 1`);
            if (admins.length == 1 && isUserAdmin.length) {
                return res.json({resultCode: 1, message: "Единственный администратор не может покинуть доску, только удалить"});
            }
            await db.query(`delete from relationships_boards_users where board_id = ${boardId} and user_id = ${userId}`);
            return res.json({resultCode: 0, message: "Вы успешно покинули доску"});
        } catch (e) {
            console.log(e);
            res.status(400).json({resultCode: 2, message: "Ошибка при выходе из доски"});
        }
    }

    async delete(req, res) {
        try {
            const boardId = req.params.boardId;
            let board = await db.one(`select * from boards where id = ${boardId}`);
            let blocks = await db.query(`select * from blocks where board_id = ${boardId}`);

            if (board.image) {
                let fileNameArray = board.image.split("/");
                let fileName = fileNameArray[fileNameArray.length - 1];
                await unlink(`public/uploads/boards/${fileName}`, (err) => {
                    if (err) throw err;
                });
            }

            let deleteAttachment = async (attachment) => {
                let fileNameArray = attachment.path.split("/");
                let fileName = fileNameArray[fileNameArray.length - 1];
                await unlink(`public/uploads/attachments/${fileName}`, (err) => {
                    if (err) throw err;
                });
            };

            let deleteBlock = async (blockId) => {
                let attachments = await db.query(`select * from attachments
            join tasks on tasks.id = attachments.task_id
            join blocks on blocks.id = tasks.block_id
            where blocks.id = ${blockId}`);

                attachments && attachments.map(async (a) => {
                    await deleteAttachment(a);
                });

                await db.query(`delete from attachments
            using tasks, blocks
            where tasks.id = attachments.task_id and blocks.id = tasks.block_id and blocks.id = ${blockId}`);
                await db.query(`delete from tasks where block_id = ${blockId}`);
                await db.query(`delete from blocks where id = ${blockId}`);
            }

            blocks && blocks.map(async (b) => {
                await deleteBlock(b.id);
            });

            await db.query(`delete from relationships_boards_users where board_id = ${boardId}`);
            await db.query(`delete from boards where id = ${boardId}`);

            return res.json({resultCode: 0, message: "Вы успешно удалили доску"});
        } catch (e) {
            console.log(e);
            res.status(400).json({resultCode: 1, message: "Ошибка при удалении доски"});
        }
    }
}

module.exports = new boardsController();
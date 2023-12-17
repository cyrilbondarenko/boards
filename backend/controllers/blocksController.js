const db = require("../database");
const {unlink} = require("node:fs");

class blocksController {
    async newBlock(req, res) {
        try {
            const {title, boardId} = req.body
            await db.query(`insert into blocks (title, board_id) values ('${title}', '${boardId}')`);
            return res.json({message: "Новый блок был создан"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при создании нового блока"});
        }
    }

    async updateTitle(req, res) {
        try {
            const blockId = req.params.blockId;
            const {title} = req.body
            db.query(`update blocks set title = '${title}' where id = ${blockId}`);
            return res.json({message: "Название было изменено"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при изменении названия"});
        }
    }

    async deleteBlock(req, res) {
        try {
            const blockId = req.params.blockId;

            const attachments = await db.query(`select * from attachments
            join tasks on tasks.id = attachments.task_id
            join blocks on blocks.id = tasks.block_id
            where blocks.id = ${blockId}`);
            const deleteAttachment = async (attachment) => {
                let fileNameArray = attachment.path.split("/");
                let fileName = fileNameArray[fileNameArray.length - 1];
                await unlink(`public/uploads/attachments/${fileName}`, (err) => {
                    if (err) throw err;
                });
            };
            attachments && attachments.forEach(a => {
                deleteAttachment(a);
            });

            db.query(`delete from attachments
            using tasks, blocks
            where tasks.id = attachments.task_id and blocks.id = tasks.block_id and blocks.id = ${blockId}`);
            db.query(`delete from tasks where block_id = ${blockId}`);
            db.query(`delete from blocks where id = ${blockId}`);

            return res.json({message: "Блок был удален"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при удалении блока"});
        }
    }
}

module.exports = new blocksController();
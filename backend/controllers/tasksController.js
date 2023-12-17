const db = require("../database");
const bcrypt = require("bcryptjs");
const {unlink} = require("node:fs");

class tasksController {
    async getTask(req, res) {
        try {
            const taskId = req.params.taskId;
            const task = await db.one(`select * from tasks where id = ${taskId}`);
            task.attachments = await db.query(`select * from attachments where task_id = ${taskId}`);
            return res.json(task);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при получении задачи"});
        }
    }

    async newTask(req, res) {
        try {
            const {title, blockId} = req.body
            await db.query(`insert into tasks (title, block_id) values ('${title}', '${blockId}')`);
            return res.json({message: "Новая задача была создана"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при создании новой задачи"});
        }
    }

    async newAttachments(req, res) {
        try {
            const {taskId} = req.body
            const files = req.files
            const fileUpload = async (file) => {
                const filenameArray = file.originalname.split('.');
                await db.query(`insert into attachments (title, path, type, date, task_id) values ('${Buffer.from(file.originalname, 'latin1').toString('utf8')}', '${req.protocol + '://' + req.get('host') + '/uploads/attachments/' + file.filename}', '${filenameArray[filenameArray.length-1]}', CURRENT_TIMESTAMP, '${taskId}')`);
            }
            await Promise.all(files.map(fileUpload));
            return res.json({message: "Новые вложения были добавлены"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка добавления вложений"});
        }
    }

    async deleteTask(req, res) {
        try {
            const taskId = req.params.taskId;
            const attachments = await db.query(`select * from attachments where task_id = ${taskId}`);

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

            await db.query(`delete from attachments where task_id = ${taskId}`);
            await db.query(`delete from tasks where id = ${taskId}`);
            return res.json({message: "Задача была удалена"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при удалении задачи"});
        }
    }

    async deleteAttachment(req, res) {
        try {
            const {attachmentId} = req.body
            const attachment = await db.one(`select * from attachments where id = ${attachmentId}`);
            const fileNameArray = attachment.path.split("/");
            const fileName = fileNameArray[fileNameArray.length - 1];
            await unlink(`public/uploads/attachments/${fileName}`, (err) => {
                if (err) throw err;
            });
            db.query(`delete from attachments where id = ${attachmentId}`);
            return res.json({message: "Вложение было удалено"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при удалении вложения"});
        }
    }

    async updateTitle(req, res) {
        try {
            const taskId = req.params.taskId;
            const {title} = req.body
            db.query(`update tasks set title = '${title}' where id = ${taskId}`);
            return res.json({message: "Заголовок был изменен"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при изменении заголовка"});
        }
    }

    async updateDescription(req, res) {
        try {
            const taskId = req.params.taskId;
            const {description} = req.body
            db.query(`update tasks set description = '${description}' where id = ${taskId}`);
            return res.json({message: "Описание было изменено"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при изменении описания"});
        }
    }

    async updateImage(req, res) {
        try {
            const taskId = req.params.taskId;
            db.query(`update tasks set image = '${req.protocol + '://' + req.get('host') + '/uploads/tasks/' + req.file.filename}' where id = ${taskId}`);
            return res.json({message: "Изображение было изменено"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при изменении изображения"});
        }
    }

    async moveTask(req, res) {
        try {
            const taskId = req.params.taskId;
            const {blockId} = req.body
            db.query(`update tasks set block_id = ${blockId} where id = ${taskId}`);
            return res.json({message: "Задача была перемещена"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Ошибка при перемещении задачи"});
        }
    }
}

module.exports = new tasksController();
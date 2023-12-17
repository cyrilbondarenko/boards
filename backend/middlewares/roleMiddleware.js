const jwt = require('jsonwebtoken')
const {secret} = require('./../config');
const db = require("../database");

module.exports = function(...roleIds) {
    return async function(req, res, next) {
        if (req.method == "OPTIONS") {
            next();
        }

        try {
            const userId = req.user.id;
            const boardId = req.params.boardId || req.body.boardId;
            const blockId = req.params.blockId || req.body.blockId;
            const taskId = req.params.taskId || req.body.taskId;
            const attachmentId = req.params.attachmentId || req.body.attachmentId;

            if (boardId) {
                let candidateRole = await db.one(`select * from relationships_boards_users where board_id = ${boardId} and user_id = ${userId} and role_id in (${roleIds.join(', ')})`);
                if (!candidateRole) {
                    return res.status(403).json({message: "У вас нет прав для выполнения этого действия"});
                }
            }

            if (blockId) {
                let candidateRole = await db.one(`select * from relationships_boards_users
                join blocks on blocks.board_id = relationships_boards_users.board_id
                where blocks.id = ${blockId} and relationships_boards_users.user_id = ${userId} and relationships_boards_users.role_id in (${roleIds.join(', ')})`);
                if (!candidateRole) {
                    return res.status(403).json({message: "У вас нет прав для выполнения этого действия"});
                }
            }

            if (taskId) {
                let candidateRole = await db.one(`select * from relationships_boards_users
                join blocks on blocks.board_id = relationships_boards_users.board_id
                join tasks on tasks.block_id = blocks.id
                where tasks.id = ${taskId} and relationships_boards_users.user_id = ${userId} and relationships_boards_users.role_id in (${roleIds.join(', ')})`);
                if (!candidateRole) {
                    return res.status(403).json({message: "У вас нет прав для выполнения этого действия"});
                }
            }

            if (attachmentId) {
                let candidateRole = await db.one(`select * from relationships_boards_users
                join blocks on blocks.board_id = relationships_boards_users.board_id
                join tasks on tasks.block_id = blocks.id
                join attachments on attachments.task_id = tasks.id
                where attachments.id = ${attachmentId} and relationships_boards_users.user_id = ${userId} and relationships_boards_users.role_id in (${roleIds.join(', ')})`);
                if (!candidateRole) {
                    return res.status(403).json({message: "У вас нет прав для выполнения этого действия"});
                }
            }

            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({message: "У вас нет прав для выполнения этого действия"});
        }
    }
}
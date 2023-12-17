const db = require("./../database");

module.exports = async function(req, res, next) {
    if (req.method == "OPTIONS") {
        next();
    }

    try {
        const userId = req.user.id;
        const attachmentId = req.params.attachmentId || req.body.attachmentId;

        const attachment = await db.oneOrNone(`select * from attachments
        join tasks on tasks.id = attachments.task_id
        join blocks on blocks.id = tasks.block_id
        join boards on boards.id = blocks.board_id
        join relationships_boards_users on relationships_boards_users.board_id = boards.id
        where relationships_boards_users.user_id = ${userId} and attachments.id = ${attachmentId}`);

        if (!attachment) {
            return res.status(403).json({message: "У вас нет доступа к этому вложению"});
        }

        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({message: "У вас нет доступа к этому вложению"});
    }
}
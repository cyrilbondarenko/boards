const db = require("./../database");

module.exports = async function(req, res, next) {
    if (req.method == "OPTIONS") {
        next();
    }

    try {
        const userId = req.user.id;
        const taskId = req.params.taskId | req.body.taskId;

        const task = await db.oneOrNone(`select * from tasks
        join blocks on blocks.id = tasks.block_id
        join boards on boards.id = blocks.board_id
        join relationships_boards_users on relationships_boards_users.board_id = boards.id
        where relationships_boards_users.user_id = ${userId} and tasks.id = ${taskId}`);

        if (!task) {
            return res.status(403).json({message: "У вас нет доступа к этой задаче"});
        }

        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({message: "У вас нет доступа к этой задаче"});
    }
}
const db = require("./../database");

module.exports = async function(req, res, next) {
    if (req.method == "OPTIONS") {
        next();
    }

    try {
        const userId = req.user.id;
        const boardId = req.params.boardId || req.body.boardId;
        const blockId = req.params.blockId || req.body.blockId;

        if (boardId) {
            let board = await db.oneOrNone(`select * from relationships_boards_users where board_id = ${boardId} and user_id = ${userId}`);
            if (!board) {
                return res.status(403).json({message: "У вас нет доступа к этой доске"});
            }
        }

        if (blockId) {
            let board = await db.query(`select * from blocks join boards on boards.id = blocks.board_id where blocks.id = ${blockId}`);
            if (!board) {
                return res.status(403).json({message: "У вас нет доступа к этой доске"});
            }
        }

        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({message: "У вас нет доступа к этой доске"});
    }
}
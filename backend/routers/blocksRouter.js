const Router = require('express')
const router = new Router()
const blocksController = require('../controllers/blocksController')
const authMiddleware = require('../middlewares/authMiddleware')
const boardMiddleware = require('../middlewares/boardMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.post('/blocks', authMiddleware, boardMiddleware, roleMiddleware(1, 2), blocksController.newBlock)

router.put('/blocks/:blockId/title', authMiddleware, boardMiddleware, roleMiddleware(1, 2), blocksController.updateTitle)

router.post('/blocks/:blockId/delete', authMiddleware, boardMiddleware, roleMiddleware(1), blocksController.deleteBlock)

module.exports = router;
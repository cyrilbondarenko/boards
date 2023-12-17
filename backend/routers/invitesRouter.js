const Router = require('express')
const router = new Router()
const invitesController = require('../controllers/invitesController')
const authMiddleware = require('../middlewares/authMiddleware')
const boardMiddleware = require('../middlewares/boardMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/invites', authMiddleware, invitesController.getInvites)

router.post('/sendInvite', authMiddleware, boardMiddleware, roleMiddleware(1, 2), invitesController.newInvite)
router.post('/acceptInvite', authMiddleware, boardMiddleware, invitesController.acceptInvite)
router.post('/declineInvite', authMiddleware, boardMiddleware, invitesController.declineInvite)

module.exports = router;
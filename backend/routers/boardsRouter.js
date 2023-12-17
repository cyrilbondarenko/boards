const Router = require('express')
const router = new Router()
const boardsController = require('../controllers/boardsController')
const authMiddleware = require('../middlewares/authMiddleware')
const boardMiddleware = require('../middlewares/boardMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

const multer = require('multer')

const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/boards')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + Buffer.from(file.originalname, 'latin1').toString('utf8'));
    }
})
const uploadImage = multer({storage: storageImage,
    fileFilter: function(req, file, cb){
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const extname = filetypes.test(file.originalname.toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if(mimetype && extname){
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    }});

router.get('/boards', authMiddleware, boardsController.getBoards)
router.get('/boards/:boardId', authMiddleware, boardMiddleware, boardsController.getBoard)
router.get('/boards/:boardId/members', authMiddleware, boardMiddleware, boardsController.getMembers)
router.get('/roles', authMiddleware, boardsController.getRoles)

router.post('/boards', authMiddleware, boardsController.newBoard)

router.put('/boards/:boardId/title', authMiddleware, boardMiddleware, roleMiddleware(1, 2), boardsController.updateTitle)
router.put('/boards/:boardId/description', authMiddleware, boardMiddleware, roleMiddleware(1, 2), boardsController.updateDescription)
router.put('/boards/:boardId/image', uploadImage.single('image'), authMiddleware, boardMiddleware, roleMiddleware(1, 2), boardsController.updateImage)
router.put('/updateRole', authMiddleware, boardMiddleware, roleMiddleware(1), boardsController.updateRole)

router.post('/boards/:boardId/leave', authMiddleware, boardMiddleware, boardsController.leave)
router.post('/boards/:boardId/delete', authMiddleware, boardMiddleware, roleMiddleware(1), boardsController.delete)
router.post('/kick', authMiddleware, boardMiddleware, roleMiddleware(1), boardsController.kick)

module.exports = router;
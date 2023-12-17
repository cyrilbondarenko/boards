const Router = require('express')
const router = new Router()
const tasksController = require('../controllers/tasksController')
const authMiddleware = require('../middlewares/authMiddleware')
const boardMiddleware = require('../middlewares/boardMiddleware')
const taskMiddleware = require('../middlewares/taskMiddleware')
const attachmentMiddleware = require('../middlewares/attachmentMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

const multer = require('multer')

const storageAttachments = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/attachments')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + Buffer.from(file.originalname, 'latin1').toString('utf8'));
    }
})
const uploadAttachments = multer({storage: storageAttachments});

const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/tasks')
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

router.get('/tasks/:taskId', authMiddleware, taskMiddleware, tasksController.getTask)

router.post('/tasks', authMiddleware, boardMiddleware, roleMiddleware(1, 2), tasksController.newTask)
router.post('/attachments', authMiddleware, uploadAttachments.array('attachments', 10), taskMiddleware, roleMiddleware(1, 2), tasksController.newAttachments)

router.put('/tasks/:taskId/title', authMiddleware, taskMiddleware, roleMiddleware(1, 2), tasksController.updateTitle)
router.put('/tasks/:taskId/description', authMiddleware, taskMiddleware, roleMiddleware(1, 2), tasksController.updateDescription)
router.put('/tasks/:taskId/image', uploadImage.single('image'), authMiddleware, taskMiddleware, roleMiddleware(1, 2), tasksController.updateImage)
router.put('/tasks/:taskId/move', authMiddleware, taskMiddleware, boardMiddleware, roleMiddleware(1, 2), tasksController.moveTask)

router.post('/attachments/delete', authMiddleware, attachmentMiddleware, roleMiddleware(1, 2), tasksController.deleteAttachment)
router.post('/tasks/:taskId/delete', authMiddleware, taskMiddleware, roleMiddleware(1, 2), tasksController.deleteTask)

module.exports = router;
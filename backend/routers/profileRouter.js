const Router = require('express')
const router = new Router()
const profileController = require('../controllers/profileController')
const authMiddleware = require('../middlewares/authMiddleware')
const {check} = require('express-validator');

const multer = require('multer')

const storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/avatars')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + Buffer.from(file.originalname, 'latin1').toString('utf8'));
    }
})

const uploadAvatar = multer({
    storage: storageAvatar,
    fileFilter: function(req, file, cb){
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const extname = filetypes.test(file.originalname.toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if(mimetype && extname){
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    }
});

router.put('/profile/update', authMiddleware, [
    check('email', 'Почта обязательна к заполнению в правильном формате').isEmail().notEmpty(),
    check('name', 'Имя обязательно к вводу и не должно быть длиннее 255 символов').isLength({max: 255}).notEmpty(),
    check('surname', 'Фамилия обязательна к вводу и не должна быть длиннее 255 символов').isLength({max: 255}).notEmpty(),
    check('password', 'Пароль обязателен к вводу и должен быть длиной минимум в 8 символов').isLength({min: 8}).notEmpty(),
], profileController.updateProfile)
router.put('/profile/password', authMiddleware, [
    check('newPassword', 'Пароль обязателен к вводу и должен быть длиной минимум в 8 символов').isLength({min: 8}).notEmpty(),
], profileController.updatePassword)
router.put('/profile/avatar', uploadAvatar.single('avatar'), authMiddleware, profileController.updateAvatar)

module.exports = router;
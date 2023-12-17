const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require('express-validator');

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/avatars')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + Buffer.from(file.originalname, 'latin1').toString('utf8'));
    }
})

const upload = multer({storage,
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

router.post('/', controller.auth)
router.post('/login', controller.login)
router.post('/registration', upload.single('avatar'), [
    check('login', 'Длина логина должна быть в диапазоне от 6 до 255 символов').isLength({min: 6, max: 255}).notEmpty(),
    check('email', 'Почта обязательна к заполнению в правильном формате').isEmail().notEmpty(),
    check('name', 'Имя обязательно к вводу и не должно быть длиннее 255 символов').isLength({max: 255}).notEmpty(),
    check('surname', 'Фамилия обязательна к вводу и не должна быть длиннее 255 символов').isLength({max: 255}).notEmpty(),
    check('password', 'Пароль обязателен к вводу и должен быть длиной минимум в 8 символов').isLength({min: 8}).notEmpty(),
], controller.registration)

module.exports = router;
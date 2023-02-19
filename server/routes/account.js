const express = require('express');
const router = express.Router()
const controller = require('../controllers/accountController')
const auth = require('../middlewares/auth')

const path = require('path')
const multer = require('multer')
//create the image storage
const storage = multer.diskStorage({
    destination: 'public/uploads',
    fileneme: (req,file,cb)=>{
        cd(null, Date.now() 
        + path.extname(file.originalname))
    }
})
//image upload function 
const upload = multer({
    limits : { fieldSize: 1024 * 1024 },
    storage: storage,
    fileFilter: (req, file ,cd) =>{
        let fileTypes = /jgeg|jpg|png/;
        let mimeType = fileTypes.test(file.mimetype)
        let extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
        if(mimeType && extname) return cd(null, true);
        cd(new Error('لا بمكن رفع هذا الملف'))
    }
})

router.post('/', [auth.authenticated, upload.single('avatar')], controller.profile)
router.post('/password', auth.authenticated, controller.password)

module.exports = router
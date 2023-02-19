const User = require('../models/user')
const cerateError = require('http-errors')
exports.login = (req,res,next) => {
    const {username, password} = req.body
    User.findOne({username}).then((user) => {
        if(!user || !user.checkPassword(password)) {
            console.log('error')
            throw new cerateError(401, 'الرجاء التحقق من كلمة المرور أو اسم المستخدم')
            
        }
        res.json(user.signJwt())
    }).catch(next)
}
exports.register = (req,res,next)=>{
    let data = {name,username,password} = req.body

   
        User.create(data)
        .then(usr => {
            res.json(usr.signJwt())
            sendNewUser(usr)
        })
        .catch(next);

    
}
const sendNewUser= user =>{
    let data ={name,username,avatar}=user
    io.emit('new_user', data) 
}
const User = require('../models/user')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')

exports.socket= (socket, next)=>{
    if(!socket.handshake.query || !socket.handshake.query.token){
        return next(createError(401,'auth_error'))
    }
    //verify the token 
    jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET,(err,decoded)=>{
        
        if(err){
            console.log(err.message)
           // socket.emit('error', createError(401,'auth_error'))
            return next(createError(401,'auth_error'))
        };
        //find the user on database
        User.findById(decoded.id).then((user)=>{
            if(!user) return next(createError(401,'auth_error'));
            socket.user = user
            next()
        }).catch(next)
    })
}
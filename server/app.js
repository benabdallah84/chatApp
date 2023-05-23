require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const createError= require('http-errors');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const cors =require('cors');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin: "https://chatapp-frontend-i8ib8hm33-benabdallah84.vercel.app"}))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/account', require('./routes/account'));

require('./socket-handler')

//Error Middelwares
app.use((err, req, res, next) => {
    if(err.name === 'MongoError' || err.name === 'ValidationError' || err.name === 'CastError'){
        err.status = 422;
    }
    if(req.get('accept').includes('json')){
        res.status(err.status || 500).json({message: err.message || 'some error eccured.'});
    } else {
        res.status(err.status || 500).sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});
// app.use((err,req,res,next)=>{
//     if(!err) return next();
//     if(err.name === 'MongoError' || err.name === 'validationError' || err.name === 'CastError'){
//         err.status = 422;
//     }
//     res.status(err.status || 500).json({message: err.massage || 'some error eccured!'})
// })

// app.use((err,req,res,next)=>{
//     if(req.get('accept').includes('json')){
//         return next(createError(404));
//     }
//     res.status(404).sendFile(pat.join(_diename,'public','index.html'))
// })
mongoose.connect(process.env.DB_URL,  err => {
    if(err) throw err;
    console.log('Connected successfully');
});

module.exports = app;

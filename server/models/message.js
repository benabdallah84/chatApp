const mongoose = require('mongoose')

const ModelSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Types.ObjectId,
        ref: 'UserChat',
        required: true
    },
    receiver:{
        type: mongoose.Types.ObjectId,
        ref: 'UserChat',
        required: true
    },
    content:{
        type: String,
        required: true
    },
    seen:{
        type: Boolean,
        default: false
    },
    date:{
        type: Date,
        default: Date.now
    },


})

const Model = mongoose.model('Message',ModelSchema);
module.exports = Model;
io = require('socket.io')()
const auth = require('./middlewares/auth')
const Message = require('./models/message')
const User = require('./models/user')

const users={}

//this middleware ansure the authentication by verifying the token
io.use(auth.socket)
io.on('connection', socket=>{
    onSocketConnected(socket)
    socket.on('message', data => onMessage(socket,data))
    initialData(socket)
    socket.on('typing',(receiver)=> onTyping(socket, receiver))
    socket.on('seen',(sender)=> onSeen(socket, sender))
    socket.on('disconnect',()=>onSocketDisconnected(socket))

})
const onSeen = (socket, sender) =>{
    let receiver = socket.user.id
    Message.updateMany({sender,receiver,seen:false},{seen:true},{multi:true}).exec()
}
const onSocketConnected = socket =>{
    console.log('New Client connected' + socket.id)
    socket.join(socket.user.id)
    users[socket.user.id] = true
    let room = io.sockets.adapter.rooms[socket.user.id]
    if(room.lenght === 1){
        io.emit('user_status',{
            [socket.user.id]: true
        })
    }
}
const onSocketDisconnected = socket =>{
    let room = io.sockets.adapter.rooms[socket.user.id]
    if(!room || room.lenght < 1){
        let lastSeen = new Date().getTime()
        users[socket.user.id]=lastSeen
        io.emit('user_status',{
            [socket.user.id]: lastSeen 
        })
    }
    console.log('Client disconnected: ' + socket.user.username)
}
//find messages that either the sender or the receiver matches the userId
const getMessages = (userId)=>{
    let where = [
        {sender:userId},{receiver:userId}
    ]
   
    return Message.find().or(where)
}
//return all user except the given user
const getUsers = (userId)=>{
    console.log(userId)
    let where = {
        _id: {$ne: userId}
    }
     
    
    return User.find(where).select('-password')
}
//collect  and getreive relevant data asked by the client
const initialData = (socket)=>{
    //console.log(socket)
    let user = socket.user
    let messages = []
    getMessages(user.id)
    .then(data =>{
        messages = data
        return getUsers(user.id)
    })
    .then(contacts => {
        socket.emit('data', user, contacts,messages, users)
    })
    .catch(() => socket.disconnnect())
}
//create message and store it in the database
const onMessage = (socket,data) => {
    let sender = socket.user.id
    let receiver = data.receiver
    let message ={
        sender: sender,
        receiver:receiver,
        content:data.content,
        date: new Date().getTime()

    }
    console.log(receiver)
    Message.create(message)
    socket.to(receiver).to(sender).emit('message',message) 
}

const onTyping =(socket,receiver)=>{
    let sender = socket.user.id
    socket.to(receiver).emit('typing', sender)

}
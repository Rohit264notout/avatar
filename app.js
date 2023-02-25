// node server to handel socket.io connection
const io = require('socket.io')(8000,{
    cors:{
        origin: "*"
    }
});

const users = {};

io.on('connection', socket=>{
    socket.on('newuserjoined', nam =>{
        users[socket.id]= nam;
        socket.broadcast.emit('userjoined', nam);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, nam: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('leave', {nam: users[socket.id]});
        delete {nam: users[socket.id]}.nam;
    });
})
// Node server which will handle socket io connections
// let cors = require("cors");
// app.use(cors());

const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    // console.log("heyyyy")
       socket.on('new-user-joined', name =>{
       console.log("New user",name);
       users [socket.id] = name;
       socket.broadcast.emit('user-joined',name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit ('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit ('left', users[socket.id])
        delete users[socket.id];
    });
})


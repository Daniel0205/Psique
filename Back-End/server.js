const http = require('http');
const express = require('express');
const socketio = require('socket.io');
//const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInTest } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ type, test }, callback) => {
    
    const { error, user } = addUser({ id: socket.id, type, test });

    if(error) return callback(error);

    socket.join(user.test);

    socket.emit('message', { text: `Ingresaste exitosamente al test de wada`});
    socket.broadcast.to(user.test).emit('message', {text: `El usuario ${user.type} se ha unido!` });

    if(getUsersInTest(user.test).length<2){      
      socket.emit('state', {text: `waiting` });      
    }
    else{
      if(type=="paciente"){
        socket.emit('state', { text: 'waiting start'});
        socket.broadcast.to(user.test).emit('state', {text: `select` });
      }
      else {
        socket.emit('state', { text: 'select'});
        socket.broadcast.to(user.test).emit('state', {text: `waiting start` });
      }
    } 

    callback();
  });

  socket.on('setTestWada', (test,callback) => {
    const user = getUser(socket.id);

    if(test==="waiting start"){
      socket.emit('state', { text: 'start'});
      socket.broadcast.to(user.test).emit('state', { text: test });
      
    }
    else if(test==="fin"){
      socket.emit('state', { text: 'results'});
      socket.broadcast.to(user.test).emit('state', { text: test });
    }
    else{

      io.to(user.test).emit('state', { text: test });
    }

    if(callback!==undefined)callback()

  });

  socket.on('setStimuliWada', (stimuli) => {
    const user = getUser(socket.id);

    socket.broadcast.to(user.test).emit('stimuli', { text: stimuli });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.test).emit('message', { user: 'Admin', text: `${user.type} has left.` });
      io.to(user.test).emit('roomData', { test: user.test, users: getUsersInTest(user.test)});
    }
  })
});

server.listen( 5000, () => console.log(`Server has started.`));
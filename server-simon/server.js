var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

function restartGame() {
    // from all the connected users, pick one to be playerA
    const players = Object.keys(io.sockets.sockets)

    let playerAIndex = Math.floor(Math.random() * (players.length - 0) + 0);
    console.log(playerAIndex, players, players[playerAIndex])
    
    const playerA = players[playerAIndex]

    const playerBIndex = (playerAIndex === 0) ? 1 : 0
    const playerB = players[playerBIndex]
    // tell playerA to start
    io.to(`${playerA}`).emit('start', 'START!');

    // tell other players to wait
    io.to(`${playerB}`).emit('wait', 'WAIT!');

}

io.on('connection', function(socket){
  console.log('a user connected');
  restartGame()
  socket.on('newPattern', function (message, fn) {
    console.log('newPattern', message)
    });


});

  

http.listen(4000, function(){
  console.log('listening on *:3000');
});

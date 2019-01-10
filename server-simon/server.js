var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var playerA
var playerB

function restartGame() {
    // from all the connected users, pick one to be playerA
    const players = Object.keys(io.sockets.sockets)

    let playerAIndex = Math.floor(Math.random() * (players.length - 0) + 0);
    console.log(playerAIndex, players, players[playerAIndex])
    
    playerA = players[playerAIndex]

    const playerBIndex = (playerAIndex === 0) ? 1 : 0
    playerB = players[playerBIndex]
    
    // tell playerA to start
    io.to(playerA).emit('start', 'START!');

    // tell other players to wait
    io.to(playerB).emit('wait', 'WAIT!');

}

function playPattern(pattern) {
  io.to(playerB).emit('pattern', pattern)
}

io.on('connection', function(socket){
  console.log('a user connected');
  restartGame()
  socket.on('newPattern', function (message, fn) {
    console.log('newPattern', message)
    playPattern(message)
  });


});

  

http.listen(4000, function(){
  console.log('listening on *:3000');
});

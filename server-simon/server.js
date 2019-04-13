var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var playerA
var playerB
var pattern

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
    pattern = message.pattern
    playPattern(message)
  });

  socket.on('donePlayback', function (message, fn) {
    console.log('donePlayback', message)
  });

  socket.on('newPatternAttempt', function (message, fn) {
    console.log('Pattern attempt:', message.pattern)
    console.log('Original pattern:', pattern)
    let correct = arraysEqual(message.pattern, pattern)
    if (correct) {
      console.log('GREAT JOB!')
    } else {
      console.log('GET THE HECK OUTTA HERE')
    }
  })

});

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

http.listen(4000, function(){
  console.log('listening on *:4000');
});

module.exports = function(io) {
  var crypto = require('crypto')
    , sockets = io.sockets;

  sockets.on('connection', function(client) {
    var session = client.handshake.session
      , user = session.user;

    client.on('join', function(room) {
      if (!room) {
        var timestamp = new Date().toString()
          , md5 = crypto.createHash('md5');

        room = md5.update(timestamp).digest('hex');
      }

      session.room = room;
      client.join(room);
    });

    client.on('disconnect', function() {
      client.leave(session.room);
    });

    client.on('send-server', function(msg) {
      var room = session.room
        , data = {email: user.email, room: room};

      msg = '<p><b>' + user.nome + ': </b>' + msg + '</p>';

      client.broadcast.emit('new-message', data);
      sockets.in(room).emit('send-client', msg);
    });
  });
}

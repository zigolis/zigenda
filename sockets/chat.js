module.exports = function(io) {
  var crypto = require('crypto')
    , sockets = io.sockets
    , onlines = {};

  sockets.on('connection', function(client) {
    var session = client.handshake.session
      , user = session.user;

    onlines[user.email] = user.email;

    for (var email in onlines) {
      client.emit('notify-onlines', email);
      client.broadcast.emit('notify-onlines', email);
    }

    client.on('join', function(room) {
      if (!room) {
        var timestamp = new Date().toString()
          , md5 = crypto.createHash('md5');

        room = md5.update(timestamp).digest('hex');
      }

      session.room = room;
      client.join(room);
    });

    client.on('send-server', function(msg) {
      var room = session.room
        , data = {email: user.email, room: room};

      msg = '<p><b>' + user.nome + ': </b>' + msg + '</p>';

      client.broadcast.emit('new-message', data);
      sockets.in(room).emit('send-client', msg);
    });

    client.on('disconnect', function() {
      var room = session.room
        , msg = '<p><b>' + user.nome + ': </b> saiu.</p>';

      client.broadcast.emit('notify-offlines', user.email);
      client.leave(session.room);

      sockets.in(room).emit('send-client', msg);
      delete onlines[user.email];
    });
  });
}

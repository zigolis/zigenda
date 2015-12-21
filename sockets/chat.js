module.exports = function(io) {
  var sockets = io.sockets;

  sockets.on('connection', function(client) {
    var session = client.handshake.session
      , user = session.user;

    client.on('send-server', function(msg) {
      var msg = '<p><b>' + user.nome + ': </b>' + msg + '</p>';

      client.emit('send-client', msg);
      client.broadcast.emit('send-client', msg);
    });
  });
}

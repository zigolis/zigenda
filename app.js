const KEY = 'zigenda.sid'
  , SECRET = 'ZiGenda';

var express = require('express')
  , load = require('express-load')
  , serveStatic = require('serve-static')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , expressSession = require('express-session')
  , methodOverride = require('method-override')
  , error = require('./middlewares/error')
  , app = express()
  , server = require('http').Server(app)
  , io = require('socket.io')(server)
  , cookie = cookieParser(SECRET)
  , store = new expressSession.MemoryStore()
  , mongoose = require('mongoose');

// global.db = mongoose.connect('mongodb://localhost:27017/zigenda')
global.db = mongoose.connect('mongodb://zigolis:zigolis123@ds035385.mongolab.com:35385/heroku_h40rh00s')

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookie);
app.use(expressSession({
  secret: SECRET,
  name: KEY,
  resave: true,
  saveUninitialized: true,
  store: store
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(serveStatic(__dirname + '/public'));

io.use(function(socket, next) {
  var data = socket.request;

  cookie(data, {}, function(err) {
    var sessionID = data.signedCookies[KEY];

    store.get(sessionID, function(err, session) {
      if (err || !session) {
        return next(new Error('Not authorized'));
      } else {
        socket.handshake.session = session;
        return next();
      }
    });
  });
});

load('models')
  .then('controllers')
  .then('routes')
  .into(app)

load('sockets')
  .into(io);

app.use(error.notFound);
app.use(error.serverError);

server.listen(app.get('port'), function() {
  console.log('Running on port', app.get('port'));
});

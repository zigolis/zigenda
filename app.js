var express = require('express')
  , load = require('express-load')
  , serveStatic = require('serve-static')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , expressSession = require('express-session')
  , methodOverride = require('method-override')
  , app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser('ZiGenda'));
app.use(expressSession({
  secret: 'ZiGenda',
  name: 'zigenda.sid',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(serveStatic(__dirname + '/public'));

load('models')
  .then('controllers')
  .then('routes')
  .into(app)

app.listen(app.get('port'), function() {
  console.log('Running on port', app.get('port'));
});

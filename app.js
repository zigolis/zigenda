var express = require('express')
  , load = require('express-load')
  , serveStatic = require('serve-static')
  , app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(serveStatic(__dirname + '/public'));

load('models')
  .then('controllers')
  .then('routes')
  .into(app)

app.listen(app.get('port'), function() {
  console.log('Running on port', app.get('port'));
});

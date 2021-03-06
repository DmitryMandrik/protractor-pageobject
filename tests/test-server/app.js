/*jshint es3:false*/
'use strict';

var express = require('express'),
  _ = require('lodash'),
  path = require('path'),
  exphbs = require('express-handlebars'),
  multer = require('multer');


var app = express();

app.use(multer({
  inMemory: true
}))

var viewsDir = path.join(__dirname, 'views');

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(viewsDir, 'layouts')
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');


app.get('/form-fields', function(req, res) {
  res.render('form-fields', {
    title: 'Test - Form Fields'
  });
});

app.route('/form-fields-results')
  .get(function(req, res) {
    // console.log(req.query);
    res.render('form-fields-results', {
      values: req.query,
      title: 'Test - Form Fields - Results'
    });
  })
  .post(function(req, res) {
    var fileContent;
    if (req.files['file-field']) {
      fileContent = req.files['file-field'].buffer.toString('utf8');
    }
    res.render('form-fields-results', {
      values: {
        'file-field': fileContent
      },
      title: 'Test - Form Fields - Results'
    });
  });

app.get('/list', function(req, res) {
  // console.log(req.query);
  res.render('list', {
    values: req.query,
    // from 1 to 10
    items: _.range(1, 11).map(function(val) {
      return {
        title: 'Title #' + val,
        description: 'This is the description of item #' + val
      };
    }),
    title: 'Test - ItemList'
  });
});

// module.exports = function(cb) {
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
  // cb(server);

});

module.exports = server;
// }
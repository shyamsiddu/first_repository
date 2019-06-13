

	var http = require("http");
	var express = require('express');
	var app = express();
	var mysql      = require('mysql');
    var bodyParser = require('body-parser');
var connection = mysql.createConnection({
    host: '',

 user: '',

 password: '',

 database: ''
  });
  
  
  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
  })
  app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var server = app.listen(3000, "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
app.get('/shyam', function (req, res) {
  connection.query('select * from shyam', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

3
4
5
6
7
//rest api to get a single customer data
app.get('/shyam/:id', function (req, res) {
   connection.query('select * from shyam where Id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
//rest api to create a new customer record into mysql database
app.post('/shyam', function (req, res) {
  var params  = req.body;
  console.log(params);
  connection.query('INSERT INTO shyam SET ?', params, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
//rest api to update record into mysql database
app.put('/shyam', function (req, res) {
  connection.query('update shyam set  name=? where id=?', [req.body.name, req.body.id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});
//rest api to delete record from mysql database
app.delete('/shyam', function (req, res) {
  console.log(req.body);
  connection.query('delete from shyam where id=?', [req.body.id], function (error, results, fields) {
   if (error) throw error;
   res.end('Record has been deleted!');
 });

});

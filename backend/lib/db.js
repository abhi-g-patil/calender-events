var mysql = require('mysql');
var connection = mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'root123',
 database:'event'
});
connection.connect(function(error){
 if(!!error) {
  console.log(error.message);
 } else {
  console.log('Database Connected Successfully..!!');
 }
});

module.exports = connection;
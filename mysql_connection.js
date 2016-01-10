var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'transferwise',
  password : 'johansson',
  database : 'gt'
});

connection.connect();

connection.query('SELECT * from transferwise;', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();
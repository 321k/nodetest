var express   =		require("express");
var mysql     =		require('mysql');
var plotly 	  =		require('plotly')("321k", "4nyfiabpvs")
var path = require('path');
var app       =		express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d'
}));
app.use(express.static(path.join(__dirname, 'views'), {
    maxAge: '1d'
}));

var pool	=		mysql.createPool({
     connectionLimit : 100, //important
     host     : 'localhost',
     user     : 'root',
     password : 'oodixach',
     database : 'gt',
     debug    :  false
 });
 
 function handle_database(req,res) {
     
     pool.getConnection(function(err,connection){
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }   
 
         console.log('connected as id ' + connection.threadId);
         
         connection.query("select Date, SVI from transferwise",function(err,rows){
             connection.release();
             console.log(rows);
             if(!err) {
                res.render('pages/index.ejs', {
                rows: rows,
                format_date: format_date
       });
				
             }           
         });

         connection.on('error', function(err) {      
               res.json({"code" : 100, "status" : "Error in connection database"});
               return;     
         });
   });
 }
 

 app.get("/",function(req,res){-
         handle_database(req,res);
 });

  app.get('/data', function (req, res) {
      
   });

function format_date(date){
  return date.toISOString();
}
 
 
 app.listen(3000);
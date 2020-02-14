// import mysql from 'mysql';
var express = require('express');
var app = express();
var mysql = require('mysql');
var  connection = mysql.createConnection({
           host: 'localhost',
           user: 'root',
           password: '',
           database: 'resourcedb'
        });
       connection.connect(function (error) {
           if(!!error){
console.log('Error');
           }
    else {console.log('Connected')}
       }); 

       
app.get('/',function(req,resp){
connection.query("SELECT * FROM resourcedb",function(error,rows,fields) {
if(!!error){ console.log("error in the query");}
});
 })
app.listen(1000);
    
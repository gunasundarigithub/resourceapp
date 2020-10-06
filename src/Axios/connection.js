'use strict';
 var express = require("express")

 const util = require('util')

 var app = express();
 const cors = require('cors');

 const bodyparser = require('body-parser');

 app.use(bodyparser.json());

var handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Setting up the cors config
app.use(cors());


const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=Shift_Scheduler.mdb;');
 
// connection
//   .execute('INSERT INTO Team(Team_id, Team_name) VALUES (8,"Anna")')
//   .then(data => {
//     console.log(JSON.stringify(data, null, 2));
//   })
//   .catch(error => {
//     console.error(error);
//   });

// app.get('/', (req, res) => {
//   res.send('Hello World, from express');
// });

app.get('/getteam',(req,res)=>{

console.log(req.query.test)

const query = 'Select * FROM  team';  

 //res.send('Hello World, from sadsadsadsexpress');
  connection
  .query(query)
  .then(data => {
   // console.log(JSON.stringify(data));
    const result = JSON.stringify(data);
    console.log(data)
    res.send(data)
  })
  .catch(error => {
    console.error(error);
  });

});


//To get shift schedule of selected team with respect to month

app.get('/getcurrentshift',(req,res)=>{

console.log(req.query.team_id)
console.log(req.query.month_number)

const Shift_query = `SELECT * FROM Calender WHERE Team_id = '${req.query.team_id}' AND Month = '${req.query.month_number}' `;

  connection.query(Shift_query).then(data => {
   // console.log(JSON.stringify(data));
    const result = JSON.stringify(data);
    console.log(data)
    res.send(data)
  })
  .catch(error => {
    console.error(error);
  });

});

//To update the shift after clicking on submit
app.put('/updateshift',(req,res)=>{

console.log(req.query)
const update_query = `Update Calender set ${req.query.Day} = '${req.query.shift}' WHERE Employee_name ='${req.query.Employee_name}' AND Team_id =${req.query.team_id} AND Month_number =${req.query.Month_number}`;
//const update_query = `Update Calender set Day10 = 'V' WHERE Employee_name ='Divya' AND Team_id =1`;
connection.query(update_query) 
console.log(update_query)
res.send('updated successfully')

.catch(error => {
  console.error(error);
});

 });



//To get the shift after clicking on the previous month list, it will get details from 2 tables (schedule and shift)

 app.get('/getshift',(req,res)=>{

  console.log(req.query.team_id)
  console.log(req.query.month_number)
  
 // const Shift_query = `SELECT * FROM SCHEDULE WHERE Team_id = '${req.query.team_id}' AND Month = '${req.query.month_number}' `;
 const shift_query = `SELECT * FROM Calender WHERE Team_id = ${req.query.team_id} AND Month_number = ${req.query.Month_number}`;
  

    connection.query(shift_query).then(data => {
     // console.log(JSON.stringify(data));
      const result = JSON.stringify(data);
      console.log(data)                                             
      res.send(data)
    })
    .catch(error => {
      console.error(error);
    });
    
  });

// To get the employee name list 

app.get('/getemployee',(req,res)=>{

  console.log(req.query.team_id)

  
  const Shift_query =`SELECT * FROM Employee where Team_id=${req.query.team_id}`;
  
    connection.query(Shift_query).then(data => {
     // console.log(JSON.stringify(data));
      const result = JSON.stringify(data);
      console.log(data)
      res.send(data)
    })
    .catch(error => {
      console.error(error);
    });
  
  });

// To insert in to the schedule table if it is first time shift update

  app.post('/postschedule',(req,res)=>{

  // console.log(req.body)
  // const query = `INSERT INTO Calender VALUES (${req.body.Month},${req.body.Month_number},${req.body.year},${req.body.team_id},${req.body.Employee_name},${req.body.Day1},${req.body.Day2},${req.body.Day3},${req.body.Day4},${req.body.Day5},
  //   ${req.body.Day6},${req.body.Day7},${req.body.Day8},${req.body.Day9},${req.body.Day10},${req.body.Day11},${req.body.Day12},${req.body.Day13},${req.body.Day14},${req.body.Day15},${req.body.Day16},${req.body.Day17},${req.body.Day18},${req.body.Day19}
  //   ,${req.body.Day20},${req.body.Day21},${req.body.Day22},${req.body.Day23},${req.body.Day24},${req.body.Day25},${req.body.Day26},${req.body.Day27},${req.body.Day28},${req.body.Day29},${req.body.Day30},${req.body.Day31})`

  //   console.log(query)

  //   const q = `INSERT INTO Calender VALUES ("July",7,2020,2,"Ddddddd","S","S","S","M","G","S","S","S","S","M","G","M","S","L","S","M","G","S","S","S","S","M","G","M","S","G","S","M","G","S","S")`

  //INSERT INTO Calender VALUES (${req.body.Month},${req.body.Month_number},${req.body.year},${req.body.team_id},${req.body.Employee_name})
  //INSERT INTO Calender VALUES('August',2020,1,'Divya',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31)
    connection.execute(`INSERT INTO Calender VALUES ("${req.body.Month}",${req.body.Month_number},${req.body.year},${req.body.team_id},"${req.body.Employee_name}","${req.body.Day1}","${req.body.Day2}","${req.body.Day3}","${req.body.Day4}","${req.body.Day5}","${req.body.Day6}","${req.body.Day7}","${req.body.Day8}","${req.body.Day9}","${req.body.Day10}","${req.body.Day11}","${req.body.Day12}","${req.body.Day13}","${req.body.Day14}","${req.body.Day15}","${req.body.Day16}","${req.body.Day17}","${req.body.Day18}","${req.body.Day19}","${req.body.Day20}","${req.body.Day21}","${req.body.Day22}","${req.body.Day23}","${req.body.Day24}","${req.body.Day25}","${req.body.Day26}","${req.body.Day27}","${req.body.Day28}","${req.body.Day29}","${req.body.Day30}","${req.body.Day31}")`)
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
    res.send("data inserted sucessfully")
  })
  .catch(error => {
    console.error(error);
  });
    
    var new_schedule = {
      Month_name:req.query.Month,
      Year_num:req.query.year,
      Team_id:req.query.team_id,
      Employee_name:req.query.Employee_name,
      Day1:req.query.shift1

     };

 });


var port = 3260;

app.listen(port, function(){
	console.log("CORS-enabled web server is now running on port : " + port);
});


 
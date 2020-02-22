import _ from 'lodash';
import React from 'react';
import Datasheet from './Datasheet'
import './react_datasheet.css'


export default class Table extends React.Component {

  constructor (props) {
  super(props)
  const monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
  let  Monthnumber=(new Date().getMonth())
  let monthName = monthNames[Monthnumber];
  let Year=(new Date().getFullYear())
  console.log(Year)
  
  function daysInThisMonth() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
}
console.log("daysinmonth",daysInThisMonth());
 const gridtemporary = [];
 //console.log("need to give number of employee in teh loop ");
for(let i=0;i<=5;i++){
       const arrayofarray=[];
for(let j=0;j<=(daysInThisMonth()+3);j++)
  {
    if (j==0 && i==0)
      {arrayofarray.push({readOnly: true, value:monthName})
      console.log("first if")
      }
    else if((j!=0 && j<=(daysInThisMonth())) && i==0)
      {arrayofarray.push({readOnly: true, value:j})
      console.log("second if")
      }
    else if(j==0 && i!=0 ){
        arrayofarray.push({readOnly: true, value: 'Employee_name'})
        console.log("third if")
      }
      
    else 
    arrayofarray.push({value:null});
  } 
   gridtemporary[i]=arrayofarray;
   console.log("arrayofrray",arrayofarray);
}
console.log("grid",gridtemporary);
this.state = { grid:gridtemporary };
  } 
  
  render () {
    return (
      <Datasheet 
       data={this.state.grid} 
  valueRenderer={(cell) => cell.value}
      onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
        onCellsChanged={changes => { 
          const grid = this.state.grid.map(row => [...row])
          changes.forEach(({cell, row, col, value}) => {
            grid[row][col] = {...grid[row][col], value}
          })
          this.setState({grid})
        }}
      />
    ) 
  }
}
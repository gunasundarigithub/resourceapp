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
  var getDaysInMonth = function(Monthnumber,Year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
 return new Date(Year, Monthnumber, 0).getDate();
// Here January is 0 based
// return new Date(year, month+1, 0).getDate();
for (let  i=1; i<=getDaysInMonth;i++){
const days=[];
days.push(i);
console.log(days);
}
};
  
  let gridfunc=()=>{
     const grid = [];

    for (let i = 0; i <= 5; i++) {
      const element = grid[i]; 
      for (let j = 0; j <= getDaysInMonth+1 ; j++) {
         grid[i[j]]={value:j}
        
      }
      
    }
  }
  this.state = {

// const grid: [ 
//         [],]
}

// const contentStyles = { background: 'silver', border: '1px solid black' };

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
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
};
  this.state = {
  grid: [
        [
          {readOnly: true, value:monthName,Year},
          // getDaysInMonth.map(day=>{
          //   return {value:}
          // })
          {value: null},
          {value: null},
          {value: null},
          {value: null},
          {value: null},

           ],
        [{readOnly: true, value: 'Employee-1'}, {value: null}, {value: null},{value: null},{value: null},{value: null}],
        [{readOnly: true, value: 'Employee-2'}, {value: null},{value: null},{value: null},{value: null},{value: null},],
        [{readOnly: true, value: 'Employee-3'}, {value: null},{value: null},{value: null},{value: null},{value: null}],
        [{readOnly: true, value: 'Employee-4'}, {value: null},{value: null},{value: null},{value: null},{value: null}]
      ]
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
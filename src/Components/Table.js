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
  this.state = {
  grid: [
        [
          {readOnly: true, value:monthName},
          {value: '1'},
          {value: '2'},
          {value: '3'},
          {value: '4'},
          {value: '5'},
          
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
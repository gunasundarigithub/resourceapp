import _ from 'lodash';
import React from 'react';
import Datasheet from './Datasheet'
export default class Table extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      grid: [
        [
          {readOnly: true, value: 'Resourse_List'},
          {value: 'B', readOnly: true},
          {value: 'C', readOnly: true},
          {value: 'D', readOnly: true},
          {value: 'E', readOnly: true},
          {value: 'F', readOnly: true},
          {value: 'G', readOnly: true},
          {value: 'H', readOnly: true},
          {value: 'I', readOnly: true},
          {value: 'J', readOnly: true},
          {value: 'K', readOnly: true},
          {value: 'L', readOnly: true},
          {value: 'M', readOnly: true},
          {value: 'N', readOnly: true},
          {value: 'O', readOnly: true},
          {value: 'P', readOnly: true},
          {value: 'Q', readOnly: true},
          {value: 'R', readOnly: true},
          {value: 'S', readOnly: true},
        ],
        [{readOnly: true, value: 'Employee-1'}, {value: null}, {value: null},{value: null},{value: null},{value: null}],
        [{readOnly: true, value: 'Employee-2'}, {value: null},{value: null},{value: null},{value: null},{value: null},],
        [{readOnly: true, value: 'Employee-3'}, {value: null},{value: null},{value: null},{value: null},{value: null}],
        [{readOnly: true, value: 'Employee-4'}, {value: null},{value: null},{value: null},{value: null},{value: null}]
      ]
    }
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
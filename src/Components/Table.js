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
          {value: 'E', readOnly: true}
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
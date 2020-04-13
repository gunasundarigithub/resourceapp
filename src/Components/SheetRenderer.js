import React, { PureComponent } from 'react'
import { DragDropContextProvider } from 'react-dnd'
//import HTML5Backend from 'react-dnd-html5-backend'
//import Select from 'react-select'

import Datasheet from './Datasheet';
import {ENTER_KEY, TAB_KEY} from './keys'

import {
  colDragSource, colDropTarget,
  rowDragSource, rowDropTarget
} from './drag-drop.js'

export default class SheetRenderer extends PureComponent {
  render () {
    const { className, columns, onColumnDrop } = this.props
    return (
      <table className={className}>
        <thead>
          <tr>
            <th className='cell read-only row-handle' key='$$actionCell' />
            {
              columns.map((col, index) => (
                <Header key={col.label} col={col} columnIndex={index} onColumnDrop={onColumnDrop} />
              ))
            }
          </tr>
        </thead>
        <tbody>
          {this.props.children}
        </tbody>
      </table>
    )
  }
}

const Header = colDropTarget(colDragSource((props) => {
  const { col, connectDragSource, connectDropTarget, isOver } = props
  const className = isOver ? 'cell read-only drop-target' : 'cell read-only'
  return connectDropTarget(
    connectDragSource(
      <th className={className} style={{ width: col.width }}>{col.label}</th>
    ))
}))

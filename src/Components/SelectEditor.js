 import React, { PureComponent } from 'react'
// import { DragDropContextProvider } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Datasheet from './Datasheet';
import {ENTER_KEY, TAB_KEY} from './keys'


class SelectEditor extends PureComponent {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {}

    
const options=[
          {label: '1', value: 1},
          {label: '2', value: 2},
          {label: '3', value: 3},
          {label: '4', value: 4},
          {label: '5', value: 5}
       ]
  }


  handleChange (opt) {
    const {onCommit, onRevert} = this.props
    if (!opt) {
      return onRevert()
    }
    const { e } = this.state
    onCommit(opt.value, e)
    console.log('COMMITTED', opt.value)
  }

  handleKeyDown (e) {
    // record last key pressed so we can handle enter
    if (e.which === ENTER_KEY || e.which === TAB_KEY) {
      e.persist()
      this.setState({ e })
    } else {
      this.setState({ e: null })
    }
  }

  render () {
    return (
      <Select
      options={this.options}
        value={this.props.value}
        onChange={this.handleChange}
        onInputKeyDown={this.handleKeyDown}
        // ref={input => { this._input = input }}
    //  {options.map((option)=>
    //  <MenuItem value={option.label}>{option.value}</MenuItem>
     
    //  )}
      />
    )
  }
}
export default SelectEditor;
 import React, { PureComponent } from 'react'
// import { DragDropContextProvider } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Datasheet from './Datasheet';
import {ENTER_KEY, TAB_KEY} from './keys'


class SelectEditor extends PureComponent {
  
state={
  selectedoption:' '//selected value from drop down
}
    
 handleChange = (event,selectedvalue) => {
  console.log("selectedvalue",event.target.selectedvalue);
  console.log(event)
  console.log(selectedvalue)
    this.setState({ selectedoption: event.target.selectedvalue });
  }

// handleChange (selectedvalue) {
//   console.log("handlechange",selectedvalue);
//   const {onCommit, onRevert} = this.props
//  if (!selectedvalue) {
//    return onRevert()
//   }
//   const { e } = this.state
//  onCommit(selectedvalue.value, e)
// console.log('COMMITTED', selectedvalue.value)
// }

//   handleKeyDown (e) {
//     // record last key pressed so we can handle enter
//     if (e.which === ENTER_KEY || e.which === TAB_KEY) {
//       e.persist()
//       this.setState({ e })
//     } else {
//       this.setState({ e: null })
//     }
//   }

  render () {

const options=[
          {label: "M", key: 1},
          {label: "G", key: 2},
          {label: "S", key: 3},
          {label: "H", key: 4},
          {label: "V", key: 5},
          {label: "N", key: 6},
          {label: "E", key: 7}
       ]

    return (
      <Select
      selectedvalue={this.state.selectedoption}
        onChange={this.handleChange}>
      
{console.log("selecteditor")}
{options.map((array)=>{
const temp=array.label;
const temp1=array.key;
console.log(temp,temp1);
return <MenuItem value={temp1}>{temp}</MenuItem>
})}

      </Select>
    )
  }
}
export default SelectEditor;
import _ from 'lodash';
import React from 'react';
import Datasheet from './Datasheet';
import './react_datasheet.css';
import SelectEditor from './SelectEditor';
import RangeEditor from './RangeEditor';
import SheetRenderer from './SheetRenderer';
import { DragDropContextProvider } from 'react-dnd'
import {ENTER_KEY, TAB_KEY} from './keys'
import FillViewer from './SelectEditor'
import axios from '../Axios/axios'

import {
  colDragSource, colDropTarget,
  rowDragSource, rowDropTarget
} from './drag-drop.js'

 

export default class Table extends React.Component {

  // constructor (props) {
  // super(props)
  // }

  state= {
    //showTable:false, //to show the table after clicking on the button
    showButton:false, //to show the button after clicking on the team from the drop down
    employee_count:0,
    grid:[]
     }

//To call the current month or respective month shift plan from MS access excel

componentDidMount(){
  axios.get('/getemployee',{
    params:{
      team_id:this.props.selectedName,
    }
  }).then(res=>{
    console.log("employee details",res.data)
   this.state.employee_count=res.data.length
   console.log("employee_count",this.state.employee_count)
  })
  } 
  
  componentDidUpdate(prevProps,prevState){
    console.log("cinside compoenent")
    if(prevProps!=this.props.selectedName && prevState!=this.state.grid) {
      axios.get('/getcurrentshift',{
        params:{
          team_id:this.props.selectedName,
          month_number:this.props.Monthnumber+1
        }
      }).then(res=>{
        console.log("current month shift plan",res.data)
      })
    }
  }

 
render () {

  const monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
  let  Monthnumber=(new Date().getMonth())//month number- 0 is jan // 0..11 instead of 1..12
  console.log("monthnumber",Monthnumber);
  let monthName = monthNames[Monthnumber];
  let Year=(new Date().getFullYear())//current year
  console.log("year",Year);

// to get the days in the days rows
  var getDaysArray = function(year, monthIndex) {
  //var monthIndex = month - 1; 
  var names = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
  var date = new Date(year, monthIndex, 1);
  var result = [];
  while (date.getMonth() == monthIndex) {
    result.push(names[date.getDay()]);
    date.setDate(date.getDate() + 1);
  }
  //console.log("dayyyyyyyyyyy",result);
  return result;
}

//Calculating number of days in current  month
function daysInThisMonth() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
}
console.log("daysinmonth",daysInThisMonth());

 //To form the shift table 
 const gridtemporary = [];
 //console.log("need to give number of employee in teh loop ");
for(let i=0;i<=this.state.employee_count+1;i++){
       const arrayofarray=[];
for(let j=0;j<=(daysInThisMonth()+6);j++)
  {
    console.log("arrayofrray after2 nd for loop",arrayofarray);
    if (j==0 && i==0)
      {arrayofarray.push({readOnly: true, value:monthName})
      //console.log("first if")
      }
      else if((j!=0 && j<=(daysInThisMonth()) && i==1)){
        var days=getDaysArray(Year,Monthnumber)[j-1]
        console.log("monthdayssssss",days);
        console.log("j oda value",j)
      {arrayofarray.push({readOnly: true, value:days})
      //console.log("second if",getDaysArray)
      }
      }
    else if((j!=0 && j<=(daysInThisMonth())) && i==0)
      {arrayofarray.push({readOnly: true, value:j})
      //console.log("third if")
      }
      else if (i==0 && j>(daysInThisMonth())){
             if(j==daysInThisMonth()+1) {
           {arrayofarray.push({readOnly: true, value:"G"})}    
             }
            if(j==daysInThisMonth()+2) {
           {arrayofarray.push({readOnly: true, value:"M"})}    
             }    
             if(j==daysInThisMonth()+3) {
           {arrayofarray.push({readOnly: true, value:"L"})}    
             } 
             if(j==daysInThisMonth()+4) {
           {arrayofarray.push({readOnly: true, value:"N"})}    
             }
             if(j==daysInThisMonth()+5) {
           {arrayofarray.push({readOnly: true, value:"E"})}    
             }  
             if(j==daysInThisMonth()+6) {
           {arrayofarray.push({readOnly: true, value:"Total_Hours"})}    
             }     
}
    else if(j==0 && (i!=0 && i!=1)){
        arrayofarray.push({readOnly: true, value: 'Employee_name'})
        console.log("third if")
      }
      else if (j==0 && i==1){
        arrayofarray.push({readOnly: true, value: 'Days'})
      }
      else if (j>daysInThisMonth()) {
      arrayofarray.push({ value:null})
        //console.log("formula")
      }
    else 
    arrayofarray.push({dataEditor: SelectEditor,valueViewer: FillViewer});
} 
   gridtemporary[i]=arrayofarray;
   //console.log("arrayofrray",arrayofarray);
   
}
console.log("grid",gridtemporary);
this.state = { grid:gridtemporary };
// console.log("this.props.selectedTeam",props.selectedName)
// console.log("this.props.Monthnumber",Monthnumber)


return (
<Datasheet 
  data={this.state.grid} 
  
  dataRenderer={(cell,i,j)=>j==31 ? cell.value : cell.value}
  valueRenderer={(cell) => cell.value}
  onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
  onCellsChanged={changes => { 
  const grid = this.state.grid.map(row => [...row])
changes.forEach(({cell, row, col, value}) => {
grid[row][col] = {...grid[row][col], value}
console.log("changed value",row,col,value)
 })
this.setState({grid})
    }}
/>  ) 
  }
} 

 // const RowRenderer = rowDropTarget(rowDragSource((props) => {
//   const { isOver, children, connectDropTarget, connectDragPreview,connectDragSource } = props
//   const className = isOver ? 'drop-target' : ''
//   return connectDropTarget(connectDragPreview(
//     <tr className={className}>
//       { connectDragSource(<td className='cell read-only row-handle' key='$$actionCell' />)}
//       { children }
//     </tr>
//   ))
// }))




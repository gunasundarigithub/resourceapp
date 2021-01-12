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
    employee_name:[],
    grid:[]
     }


     getTable(employee_list){
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
         const Em_count=this.state.employee_count
         console.log("Em_count",Em_count)
        for(let i=0;i<=Em_count+1;i++){
         
               const arrayofarray=[];
        for(let j=0;j<=(daysInThisMonth()+6);j++)
          {
            console.log("arrayofrray after2 nd for loop",arrayofarray,i,j);
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
              //i-row,j-coloumn
              console.log("i value and J value",i,j)
              var Em_name=[]
              console.log("Array value is ",employee_list)
             let em_index=employee_list.length
              Em_name=employee_list[i]
              console.log("employeenamearray",Em_name)
                arrayofarray.push({readOnly:true, value:Em_name})
                //Em_name=[]
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
        this.setState({ grid:gridtemporary });
        // console.log("this.props.selectedTeam",props.selectedName)
        // console.log("this.props.Monthnumber",Monthnumber)
        }

//To call the current month or respective month shift plan from MS access excel

componentDidMount(){
  axios.get('/getemployee',{
    params:{
      team_id:this.props.selectedName,
    }
  }).then(res=>{
    console.log("employee details",res.data)
   this.setState({employee_count:res.data.length})
   var e=[]
   res.data.forEach(Employee=> {
     console.log("employeeedetails",Employee.Employee_name)
     e.push(Employee.Employee_name)
     console.log("printing e array",e)
    //this.setState({employee_name:e})
     });
    let e_new = [0,0,...e]
    console.log("E new",e_new);
     this.getTable(e_new) 
   
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




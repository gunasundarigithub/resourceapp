import _ from 'lodash';
import React from 'react';
import Datasheet from './Datasheet';
import './react_datasheet.css';
import SelectEditor from './SelectEditor';
import RangeEditor from './RangeEditor';

export default class Table extends React.Component {

  constructor (props) {
  super(props)
  const monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
  let  Monthnumber=(new Date().getMonth())
  let monthName = monthNames[Monthnumber];
  let Year=(new Date().getFullYear())
  console.log(Year)
  
  function daysInThisMonth() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
}
console.log("daysinmonth",daysInThisMonth());
 const gridtemporary = [];
 //console.log("need to give number of employee in teh loop ");
for(let i=0;i<=5;i++){
       const arrayofarray=[];
for(let j=0;j<=(daysInThisMonth()+6);j++)
  {
    if (j==0 && i==0)
      {arrayofarray.push({readOnly: true, value:monthName})
      console.log("first if")
      }
    else if((j!=0 && j<=(daysInThisMonth())) && i==0)
      {arrayofarray.push({readOnly: true, value:j})
      console.log("second if")
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
    else if(j==0 && i!=0 ){
        arrayofarray.push({readOnly: true, value: 'Employee_name'})
        console.log("third if")
      }
      
    else 
    arrayofarray.push({dataEditor: SelectEditor});
  } 
   gridtemporary[i]=arrayofarray;
   console.log("arrayofrray",arrayofarray);
}
console.log("grid",gridtemporary);
this.state = { grid:gridtemporary };
  } 
  
  state= {
  //showTable:false, //to show the table after clicking on the button
  showButton:false, //to show the button after clicking on the team from the drop down
   }

   handleColumnDrop (from, to) {
    const columns = [...this.state.columns]
    columns.splice(to, 0, ...columns.splice(from, 1))
    const grid = this.state.grid.map(r => {
      const row = [...r]
      row.splice(to, 0, ...row.splice(from, 1))
      return row
    })
    this.setState({ columns, grid })
  }

  handleRowDrop (from, to) {
    const grid = [ ...this.state.grid ]
    grid.splice(to, 0, ...grid.splice(from, 1))
    this.setState({ grid })
  }

  // renderSheet (props) {
  //   return <SheetRenderer columns={this.state.columns} onColumnDrop={this.handleColumnDrop} {...props} />
  // }

  // renderRow (props) {
  //   const {row, cells, ...rest} = props
  //   return <RowRenderer rowIndex={row} onRowDrop={this.handleRowDrop} {...rest} />
  // }

  

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
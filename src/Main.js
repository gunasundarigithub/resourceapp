import React from 'react';
import './Main.css';
import SearchAppBar from './SearchAppBar.js'
import Button from '@material-ui/core/Button';
import Table from './Components/Table';
import Select from './Components/MaterialUI/Select'; 
import SelectEditor from './Components/SelectEditor';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from './Axios/axios'


class App extends React.Component{

state= {
  showTable:false, //to show the table after clicking on the button
  showButton:false, //to show the button after clicking on the team from the drop down
  selectedTeam: '', //selected value from the drop down
  team_list:[]
   }

handleChange = (event,value) => {
  console.log("selectedTeam",event.target.value);
    this.setState({ selectedTeam: event.target.value,showButton: true });
  }


 componentDidMount(){
   axios.get('/getteam').then(res=>{
     console.log("connected server",res.data);
     this.setState({team_list:res.data})
      })
 } 

 componentDidUpdate(prevProps,prevState){
  console.log("cinside compoenent")
  if(prevState.selectedTeam!==this.state.selectedTeam) {
    console.log("prevstate",prevState,this.state)
      // let temp=this.state;
      this.setState({selectedTeam:this.state.selectedTeam})
      // this.setState({showTable:false})
   }
}
render(){

  console.log("cominggggggggggggggggggg");
// const team_list = [
//  { team_name:'wmma', team_id: 1 },
//  { team_name: 'Auto_Exp', team_id: 2 },
//  { team_name: 'ECT', team_id: 3 },
//  { team_name: 'EFT', team_id: 4 },
// ];

return (
  
  <div className="App">
  <SearchAppBar/> 
   <div style={{width:'950px' }}>
      <div>
      <br/>
      <Select title="Enterprise Teams" change={this.handleChange} items={this.state.team_list} selectedName={this.state.selectedTeam}   />
    { this.state.showButton ? <Button variant="contained"  color="secondary"  className="bStyle" onClick={() => {this.setState({showTable:true})} }>
       Create/edit/view schedule
     </Button> :null }
    </div>
    </div>
{this.state.showTable ? 
 <div style={{display:'inline-block',marginRight: '0em',marginTop: '5em',justify_content:'center', align_items:'center'}}>
 <Table selectedName={this.state.selectedTeam}></Table>
<br/>
<Button variant="contained"  color="secondary">Submit</Button>
       
 </div> : null }


</div>

     );
}
}
export default App;

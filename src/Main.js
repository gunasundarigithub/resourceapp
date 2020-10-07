import React from 'react';
import './Main.css';
import SearchAppBar from './SearchAppBar.js'
import Button from '@material-ui/core/Button';
import Table from './Components/Table';
import Select from './Components/MaterialUI/Select'; 
import SelectEditor from './Components/SelectEditor';
import axios from './Axios/axios'


class App extends React.Component{



state= {
  showTable:false, //to show the table after clicking on the button
  showButton:false, //to show the button after clicking on the team from the drop down
  selectedTeam: '', //selected value from the drop down
  team_list:[]
   }

handleChange = (event,value) => {
  console.log(event.target.value);
  console.log(event)
  console.log(value)
    this.setState({ selectedTeam: event.target.value,showButton: true });
  }


 componentDidMount(){
   axios.get('/getteam').then(res=>{
     //this.setState({selectedTeam:res.data});
     console.log("connected server",res.data.length);
      let team_list=[]
     for(var i=0;i< res.data.length;i++){
     team_list=res.data[i]
     console.log("team_list",team_list)
     this.setState({team_list:team_list})
     }
   })
 } 

render(){

const team_list = [
 { team_name:'wmma', team_id: 1 },
 { team_name: 'Auto_Exp', team_id: 2 },
 { team_name: 'ECT', team_id: 3 },
 { team_name: 'EFT', team_id: 4 },
];
//const [showTable, setShowTable] = useState(false);

return (
  
  <div className="App">
  <SearchAppBar/> 

      <div style={{width:'950px' }}>
      <div>
      <br/>
      <Select title="Enterprise Teams" change={this.handleChange} items={team_list} selectedName={this.state.selectedTeam}   />
    { this.state.showButton ? <Button variant="contained"  color="secondary"  className="bStyle" onClick={() => {this.setState({showTable:true})} }>
       Create/edit/view schedule
     </Button> :null }
    </div>
    </div>
{this.state.showTable ? 
 
 <div style={{display:'inline-block',marginRight: '0em',marginTop: '5em',justify_content:'center', align_items:'center'}}>
 <Table></Table>
<br/>
<Button variant="contained"  color="secondary">Submit</Button>
       
 </div> : null }


</div>

     );
}
}
export default App;

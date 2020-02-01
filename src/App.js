import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchAppBar from './SearchAppBar.js'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Table from './Components/Table';
import Select from './Components/MaterialUI/Select';

class App extends React.Component{

state= {
  showTable:false, //to show the table after clicking on the button
  showButton:false, //to show the button after clicking on the team from the drop down
  selectedTeam: 'Ent_digital', //selected value from the drop down
  

    }

handleChange = (event,value) => {
  console.log(event.target.value);
  console.log(event)
  console.log(value)
    this.setState({ selectedTeam: event.target.value,showButton: true });
  }

render(){

const team_list = [
  { team_name:'Ent_digital', team_id: 1 },
  { team_name: 'Auto_Exp', team_id: 2 },
  { team_name: 'ECT', team_id: 3 },
  { team_name: 'EFT', team_id: 4 },
];
//const [showTable, setShowTable] = useState(false);

return (
  <div className="App">
      <SearchAppBar/> 
      <div style={{  display: 'inline-flex' }}>
      <div>
      <br></br>
      <Select title="Enterprise Teams" change={this.handleChange} items={team_list} selectedName={this.state.selectedTeam}   />
    { this.state.showButton ? <Button variant="contained" display='inline'  color="secondary" onClick={() => {this.setState({showTable:true})} }>
       Create/edit/view schedule
     </Button> :null }
    </div>
    </div>
{this.state.showTable ? <div><Table></Table></div> : null }
</div>
     );
}
}
export default App;

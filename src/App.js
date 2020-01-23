import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchAppBar from './SearchAppBar.js'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';


class App extends React.Component{

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '5px',
    alignItems: 'center',
  },
}));
 
 render(){

const team_list = [
  { team_name:'team-1', team_id: 1 },
  { team_name: 'team-2', team_id: 2 },
  { team_name: 'team-3', team_id: 3 },
  { team_name: 'team-4', team_id: 4 },
];


return (
  
    <div className="App">
      <SearchAppBar/>
      <br/><br/>
      <div className='root'>
      <Autocomplete display="inline"
      style={{ width: 400}}
      options={team_list.map(option => option.team_name)}
        renderInput={params => (
          <TextField {...params} label="Enterprise_teams" color="secondary"  variant='outlined' style={{ width: 300}} />
        )}
  /> <Button variant="contained" display='inline' color="secondary">
  Create/edit/view schedule
</Button>
  </div>
</div>
     );
}
}

export default App;

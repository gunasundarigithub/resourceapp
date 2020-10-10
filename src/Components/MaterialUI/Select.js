import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,
    justifyContent: 'right',
    
  }
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);



  return (
    <div>
     <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          {props.title}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.selectedName}
          onChange={props.change}
          labelWidth={labelWidth}
        >

{console.log("test")}
{props.items.map((arrayvalue)=>{
 
 const tname=arrayvalue.Team_name;
 const tid=arrayvalue.Team_id;
console.log(tname,tid);

return <MenuItem value={tid}>{tname}</MenuItem>

//return (console.log(arrayvalue));})
    })}
        </Select>
      </FormControl>
         </div>
  );
}

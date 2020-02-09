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

export default function Calenderview(props) {
  const classes = useStyles();
  

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);



  return (
    <div>
     
        <InputLabel ref={inputLabel} >
          {props.title}
        </InputLabel>
        <Select
          value={props.selectedName}
          onChange={props.change}
          labelWidth={labelWidth}
        >

{console.log("test")}
{props.items.map((arrayvalue)=>{
 
 const Mname=arrayvalue;
 
console.log(arrayvalue);

return <MenuItem>{arrayvalue}</MenuItem>

//return (console.log(arrayvalue));})
    })}
        </Select>
         </div>
  );
}

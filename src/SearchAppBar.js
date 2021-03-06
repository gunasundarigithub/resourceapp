import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import Select from '@material-ui/core/Select';
import Table from './Components/Table';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 0,
     },

    ExitToAppRoundedIcon: {
    marginLeft: "auto",
    marginRight: 15,
    width: 40,
    height: 40,
  },
 
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(10),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    },
  inputRoot: {
    color: 'inherit',
     },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  
  
}));

export default function SearchAppBar() {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
    left: false,
    
  });
  
  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

const sideList = side => (
    <div className={classes.list}>
      <List >
      <Divider />
       <p align='center'> 2020 - Year </p>
       <Divider />
        {['January','February','March','April','May','June','July','August','September','October','November','December'].map((text, index) => (
          <ListItem button key={text} >
           <ListItemIcon> {<EventNoteIcon />}</ListItemIcon>
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit">
            <MenuIcon onClick={toggleDrawer('left', true)}>></MenuIcon>
          </IconButton>
          <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
          <Typography className={classes.title} variant="h6" noWrap>
            Resource Scheduler
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <ExitToAppRoundedIcon className={classes.ExitToAppRoundedIcon}/>
         </Toolbar>
        </AppBar>
        </div>
  );
}
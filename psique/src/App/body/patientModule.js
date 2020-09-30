import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
/* 
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Category from '../components/category';
import CustomButton from '../components/customButton';
*/

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 500,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  bodypage:{
    textAlign: "-webkit-center",
  },
  space:{
    paddingTop:"4%",
    paddingBottom: "3%"
  },
  buton:{
    backgroundColor: "#017F8D",  
    
  }
}));

function PatientModule(props) {

    const classes = useStyles();
    
    return(
    <div  className={classes.bodypage} >
        <h2>Patient Module</h2>
    </div>
    )

}

export default PatientModule;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
    textAlign: "center",
    width: "100%",
    height: "100%",
    borderRadius: "3%",
    backgroundColor: "#017F8D",   
    "&:hover":{
        backgroundColor: "#7DC545"
    }
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

      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Crear paciente
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
    )

}

export default PatientModule;
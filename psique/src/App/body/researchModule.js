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
    color: "white",
    "&:hover":{
      backgroundColor: "#016570",
    }
  },
  bodypage:{
    textAlign: "-webkit-center",
  },
  space:{
    paddingTop:"30px",
    paddingBottom: "30px"
  },
  buton:{
    backgroundColor: "#017F8D",  
    
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "33% 33% 33%",
    
 },
 cardButton:{
      padding: "5%"
 },
 media: {
    maxHeight:"150px",
    maxInlineSize: "-webkit-fill-available",
  },
  textCardContent: {
    paddingBottom: "5px",
    paddingTop: "5px",
    paddingRight: "0px",
    paddingLeft: "0px",
  },
}));

function ResearchModule(props) {

    const classes = useStyles();
    
    return(


    <div  className={classes.bodypage} >  
        <div className={classes.grid}>

            <div className={classes.cardButton}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardContent className={classes.textCardContent}>          
                            <Typography  variant="h5" component="h2"> 
                                Crear Investigación
                            </Typography>        
                        </CardContent>
                    </CardActionArea>
                </Card> 
            </div> 
             
        </div>
    </div>
    )

}

export default ResearchModule;
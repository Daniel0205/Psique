import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
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
  media: {
    maxHeight:"300px",
  },
});

export default function CardButton(props) {
  const classes = useStyles();

  function imageReturn (){
      if(props.source.length!==0){
        const path = require("../assets/CardLogos/"+props.source+".png")
        return (
            <img 
            className={classes.media}
            alt={props.source}
            src={path}/>
        )
      }

  }

  function emit(){
      props.messageEvent(props.name)
  }


  return (
    <Card className={classes.root}>
      <CardActionArea
      onClick={emit}>
          {imageReturn()}
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
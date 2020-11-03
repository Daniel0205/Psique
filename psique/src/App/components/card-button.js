import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
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
    color: "white",
    "&:hover":{
      backgroundColor: "#016570",
    }
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
        
        <CardContent className={classes.textCardContent}>          
          <Typography  variant="h5" component="h2"> 
            {props.name}
          </Typography>        
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
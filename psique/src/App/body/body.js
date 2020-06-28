import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Category from '../components/category';
import CustomButton from '../components/customButton';



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

const test = ["Pruebas de atención","Pruebas cognitivas",
"Pruebas de inteligencia","Pruebas de aprendizaje",
"Pruebas de memoria","Pruebas de quirófano"]

const sources = ["attentionTest","cognitiveTest",
    "intelligenceTests","learningTests",
    "memoryTest","quirofanoTests"]


const testDev ={
  attentionTest: ["Prueba de Stroop"],
  cognitiveTest : ["Prueba de Zung"],
  intelligenceTests : ["WAIS IV", "WISC IV"],
  learningTests:[],
  memoryTest:["Prueba de Rey"],
  quirofanoTests:[],

}



function Body(props) {
  const [state,setState] = useState("category")
  const [names,setNames]= useState(test)

  const classes = useStyles();

  useEffect(() => {
    if(state==="category"){
      props.callback(false)
    }
    else{
      props.callback(true)
    }
  });


  function buttons(){

    if(state==="category"){
      
      return (
      <Category  
      names={names}
      sources={sources}
      messageEvent={changeState}
      ></Category>)
    }
    else{

      return [<CustomButton
        key={"button back"}
        msj="Volver a las categorias"
        callback={()=>changeState("category")}
      >
      </CustomButton>,
        <Category  
        key={"button category"}
        names={names}
        sources={[]}
        ></Category>]

    }
  
  }



  function changeState(change){
    switch (change) {
      case "Pruebas de atención":
        setNames(testDev.attentionTest)
        break;
      case "Pruebas cognitivas":
        setNames(testDev.cognitiveTest)
        break;
      case "Pruebas de inteligencia":
        setNames(testDev.intelligenceTests)
        break;
      case "Pruebas de aprendizaje":
        setNames(testDev.learningTests)
        break;
      case "Pruebas de memoria":
        setNames(testDev.memoryTest)
        break;
      case "Pruebas de quirófano":
        setNames(testDev.quirofanoTests)
        break;
      case "category":
        setState("category")
        setNames(test)
        break;
      default:
        break;

    }
    setState(change)
  }


  return(

    <div  className={classes.bodypage} >
      <div className={classes.space}>
      <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Buscar Prueba Neuropsicologica"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>


      {buttons()}

    </div>

  ) 
}

export default Body;

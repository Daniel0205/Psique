import React,{useState} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from '../../components/customButton';
import Results from '../../components/results'

const phrases=[
    "Me siento triste y deprimido.",
    "Por las mañanas me siento mejor que por las tardes.",
    "Frecuentemente tengo ganas de llorar y a veces lloro.",
    "Me cuesta mucho dormir o duermo mal por las noches.",
    "Ahora tengo tanto apetito como antes.",
    "Todavía me siento atraído por el sexo opuesto.",
    "Creo que estoy adelgazando.",
    "Estoy estreñido.",
    "Tengo palpitaciones.",
    "Me canso por cualquier cosa.",
    "Mi cabeza está tan despejada como antes.",
    "Hago las cosas con la misma facilidad que antes.",
    "Me siento agitado e intranquilo y no puedo estar quieto.",
    "Tengo esperanza y confío en el futuro.",
    "Me siento más irritable que habitualmente.",
    "Encuentro fácil tomar decisiones.",
    "Me creo útil y necesario para la gente.",
    "Encuentro agradable vivir, mi vida es plena.",
    "Creo que sería mejor para los demás si me muriera.",
    "Me gustan las mismas cosas que solían agradarme.",
]


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '40% 60%',
  },
}));

let answers = new Array(20).fill(0);

let diagnosis = "Ausencia de depresión";

function Zung() {
  const [end,setEnd] = useState(false)
  const [state,setState] = useState("test")

  const classes = useStyles();

  
  function calificar(){
    let sum = 0

    for (let i = 0; i < answers.length; i++) {
      sum+=answers[i]
    }

    if(sum>=0 && sum<=28){
      diagnosis = "Ausencia de depresión";
    }
    else if(sum>28 && sum<=41){
      diagnosis = "Depresión leve";
    }
    else if(sum>42 && sum<=53){
      diagnosis = "Depresión moderada";
    }
    else{
      diagnosis = "Depresión grave";
    }

    return sum
  }


  function update(x,i){
    answers[i]=parseInt(x.target.value,10)

    if(answers.findIndex((element) => element === 0)===-1)setEnd(true)
  }

  
  if(state==='test'){
    return (
      <div>
        <h1>Escala de depresión de autoevaluación de Zung</h1>
        <h3>Para cada elemento a continuación, verifique la columna que mejor describe con qué frecuencia se sintió o se comportó de esta manera durante los últimos días.</h3>
        {phrases.map((x,i)=>
          <div className={classes.root} key={i} onChange={(x)=>update(x,i)}>
          <h3>{x}</h3>
          <FormControl  component="fieldset" >
          <RadioGroup row aria-label="position" name="position" defaultValue="top">
            <FormControlLabel
                value="1"
                control={<Radio color="primary" />}
                label="muy pocas veces"
                labelPlacement="top"
            />
            <FormControlLabel
              value="2"
              control={<Radio color="primary" />}
              label="Algunas veces"
              labelPlacement="top"
            />
            <FormControlLabel
              value="3"
              control={<Radio color="primary" />}
              label="Muchas veces"
              labelPlacement="top"
            />
            <FormControlLabel
              value="4"
              control={<Radio color="primary" />}
              label="Casi siempre"
              labelPlacement="top"
            />
          </RadioGroup>
  
        </FormControl>
        </div>
        )}
  
        <p hidden={end}>Todos los campos deben ser respondidos</p> 
  
        <CustomButton
        disabled={!end}
        callback={()=>setState("results")}
        msj="Terminar"
        ></CustomButton>
        
      </div>
     
    );

  }
  else{
    return (
      <Results
      revision={false}
      name="Zung"
      url="init"
      comment={<h2>{"Tu diagnostico es: "+diagnosis}</h2>}
      result={calificar()}
      ></Results>
    )
  }
  
}

export default Zung;

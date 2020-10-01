import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import Results from '../../../components/results'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  img:{
    width:"45%"
  },
  fields:{
    display: "inline-grid",
    width:"50%"
  },  
  field:{
    display:"flex"
  },
  points:{
    display:"inline-flex",    
  },
  textfield:{
    width:"100%"
  }
}));

const LIMIT_ERROR = 3;

const NUMBER_STIMULI = 23;

const stimuliSource = ["01","02","03","04","05"];
const rightAnswers = ['3','3','10','6','9','2','8','5','5','17','5','3','200','38','140','30 min ó 1/2 hora','186 min ó 3h 6 min','600','47','49½ ó 49.5','51','216','23100'];

let returnDone = false; // Esta variable me ayuda a controlar el uso de la regla del retorno
let returnVar = false; // Esta variable me ayuda a controlar el uso de la regla del retorno
let countRe = 0; //Esta variable me dice cuando se puede salir de la condición de retorno
let flagRe = null;//Esta variable me ayuda a decir en que posicion quedo el paciente antes de entrar al retorno

let badAnswerCount = 0; //Esta variable me dice cuantos ceros consecutivos tuvo el paciente

let answers = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
const consigna = ["Juan tiene 6 pelotas. Pierde 3 ¿Cuantas pelotas le quedan?",
                  "Cuente estas flores con el dedo en voz alta para que o pueda oirlo",
                  "Cuente estas manzanas con el dedo en voz alta para que o pueda oirlo",
                  "¿Cuantas raquetas y pelotas hay en total?",
                  "¿Cuantos pajaros y gatos hay en total?",
                  "¿Cuantas correas quedaran si cada perro lleva una?",
                  "Fernando tiene 4 mantas y compra otras 4 ¿Cuantas mantas tiene Fernando en total?",
                  "Raul tiene 9 lapiceros y regala 4 a Marta ¿Cuantos lapiceros le quedan a Raul?",
                  "En una clase hay 4 niños y 20 juguetes. Si cada niño recibe el mismo numero de juguetes.¿Cuantos juguetes recibira cada niño?",
                  "Susana tiene 35 años. Roberto tiene 18 años ¿Cuantos años es Susana mayor que Roberto?",
                  "Juan tiene 28 libros. Si vende la mitad de ellos a una libreria y regala otros 9 a un amigo ¿Cuantos libros le quedan?",
                  "Jorge tiene 51 discos.Si regala 6 discos a cada uno de sus 8 amigos ¿Cuantos discos le quedan?",
                  "En cada paquete hay 25 chicles ¿Cuantos chicles hay en 8 paquetes?",
                  "Alberto da 4 tarjetas a cada uno de sus 8 amigos. Si todavia le quedan 6 tarjetas para mañana ¿Cuantas tarjetas tenia Alberto en total?",
                  "Un atleta corre 22 minutos cada dia de lunes a viernes. Si corre 30 minutos el sabado ¿Cuantos minutos corre en total por semana?",
                  "Beatriz espera en la cola del cine detras de 160 personas.Como no han llegado sus amigos ella dejar pasar a 20 personas. Si 6 personas llegan a la taquilla cada minutos.¿Cuanto tiempo tardaran Beatriz y sus amigos en llegar a la taquilla?",
                  "Un pastelero puede cocinar 2 pasteles en 31 minutos ¿Cuantos tiempo tardara en cocinar 12 pasteles?",
                  "Alejandro ha vendido los 2/3 del numero de periodicos que ha vendido Miguel. Alejandro ha vendido 400 periodicos ¿Cuantos periodicos a vendido Miguel?",
                  "Un obrero ha trabajado 188 horas en 4 semanas. Si trabaja el mismo numero de horas cada semana ¿Cuantas horas por semana ha trabajado?",
                  "David pesa el doble que Javier.Si David pesa 99 kilos ¿Cuantos kilos pesa Javier?",
                  "Un ciclista da, habitualmente, 60 vueltas alrededor de un circuito. Si hoy recorre un 15% menos ¿Cuantas vueltas ha dado hoy?",
                  "Si 18 maquinas pueden completar el trabajo en 6 dias ¿Cuantas maquinas se necesitarian para finalizar el trabajo en medio dia?",
                  "En una afocina de correos, se clasificaron 20000 cartas en octubre. En noviembre, el número de cartas para clasificar se incremento un 10%. En diciembre, el numero de cartas para clasificar se incremento otro 5% ¿Cuantas cartas se clasificaron en diciembre, despues de los dos incrementos?",
];

let firstItem;

function Aritmetica(props) {
  const classes = useStyles();
  var [state,setState]=useState("instruccion")
  var [results, setResults] = useState(new Array(NUMBER_STIMULI).fill(0));
  var [numberItem,setNumberItem] = useState(0);
  //var [returnDone,setReturnDone] = useState(false);// Esta variable me ayuda a controlar el uso de la regla del retorno
  //var [returnVar, setReturnVar] = useState(false); // Esta variable me ayuda a controlar el uso de la regla del retorno
  //var [countRe, setCountRe] = useState(0); //Esta variable me dice cuando se puede salir de la condición de retorno
  //var [flagRe, setFlagRe] = useState(null);//Esta variable me ayuda a decir en que posicion quedo el paciente antes de entrar al retorno

  //var [badAnswerCount, setBadAnswerCount] = useState(0); //Esta variable me dice cuantos ceros consecutivos tuvo el paciente
  //var [actualStimuli, setActualStimuli] = useState("");

  var [givenAnswer, setGivenAnswer] = useState("");

  function changeStimuli(punt){
    var returnController = firstItem===6 && returnVar && numberItem===1 && countRe!== 2; // Verifica que al hacer el retorno y llegar al estimulo 0 no siga avanzando en la prueba
    if((badAnswerCount < LIMIT_ERROR && numberItem < NUMBER_STIMULI) && !returnController){ // Verifica que no se haya cumplido la condicion de termino
      var nextNumber = numberItem;
      
      //Este verificacion me dice si se cumple la condición para retornar y asi devolverse en caso de ser necesario
      if(((numberItem === 6 || numberItem === 7) && firstItem === 6) && punt === 0 && !returnDone){
        returnVar = true;
        flagRe = numberItem;
        nextNumber = firstItem;
        returnDone = true;
        //setNumberItem(firstItem);
      }

      if(!returnVar){ //En caso de no haber fallado los items 6 0 7 sigue aumentado a partir de ahí
        nextNumber += 1;
        if(nextNumber<6){
          setState('aplicacionImg');
        }else{
          setState('aplicacion');
        }
      }else{ //En caso de que halla fallado los primeros reactivos vuelve al reactivo anterior y empieza a disminuir desde ahí        
        if(countRe === 2){
          returnVar = false;
          nextNumber = flagRe + 1;
          if(nextNumber<6){
            setState('aplicacionImg');
          }else{
            setState('aplicacion');
          }
          
        }else{
          nextNumber -= 1;
          if(nextNumber<6){
            setState('aplicacionImg');
          }else{
            setState('aplicacion');
          }
        }
      }

      setNumberItem(nextNumber);
      if(nextNumber>= NUMBER_STIMULI){
        setState('revision');
      }

    }else{
      setState('revision');
    }    
  }

  function imagenInit(item){
    let arrayAux = results
    for (let i = 0; i < item; i++) {
      arrayAux[i]=1
    }
    setResults(arrayAux)    

    firstItem=item
    setState('ejemplo');
  }

  function next(){
    switch (state) {
      case 'ejemplo':
        answers[numberItem] = givenAnswer;
        setGivenAnswer('');
        setNumberItem(firstItem);

        if(firstItem === 6){
          setState('aplicacion');
        }else{
          setState('aplicacionImg');
        }

        //Reset globals
        returnDone = false;
        returnVar = false;
        countRe = 0;
        flagRe = null;
        badAnswerCount = 0;
        answers = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
      break;

      case 'results':
        setState('revision')
      break;

      case 'instruccion':
        setState('seleccion')
      break;
      
      case 'revision':
        setState('results')
      break;
      
      default:
      break;
    }
  }

  function getResult() {
    var total = 0;
    for(var i=1; i<results.length; i++){
      total = total + results[i];
    }

    if(!props.resWechsler.hasOwnProperty('A')){
      props.setResWechsler('A',total)
    }else{
      if(props.resWechsler['A'] !== total){
        props.setResWechsler('A',total)
      }
    }

    return total;
  }

  function score(punt){    
    answers[numberItem] = givenAnswer;
    setGivenAnswer('');

    if(numberItem !== 15 && numberItem !== 16 && numberItem !== 19){
      if(answers[numberItem] === rightAnswers[numberItem]){
        if(returnVar){        
          countRe +=1;
        }

        if(badAnswerCount > 0){        
          badAnswerCount = 0;
        }
        
        setResults(update(results,{
          [numberItem]: {
            $set: 1
          }}))
        
        changeStimuli(1);
        
      }else{
        setResults(update(results,{
          [numberItem]: {
            $set: 0
        }}))

        badAnswerCount += 1;
        countRe = 0;
        changeStimuli(0);
      }

    }else{ //If stimuli number is 15, 16 or 19
      if(punt === 1){
        if(returnVar){        
          countRe += 1;
        }
    
        badAnswerCount = 0;        
        
        setResults(update(results,{
          [numberItem]: {
            $set: punt
          }}))
        
        changeStimuli(punt);
        
      }else{
        setResults(update(results,{
          [numberItem]: {
            $set: punt
        }}))

        badAnswerCount += 1;
        countRe = 0;
        changeStimuli(0);
      }
    }
  }

  function content(){
    switch (state) {
      case 'instruccion':
       return (
        <div>
          <h1>Aritmetica</h1>
          <b>Intrucciones generales:</b>
          <p>A continuación se mostrará una serie de imágenes (reactivo 1/retorno) o preguntas (reactivo 6)</p>
          <p>según sea el caso, las cuales, en el caso de las imágenes deben ser mostradas al paciente para que</p>
          <p>las visualice, y en el caso de las preguntas deben ser mencionadas al paciente</p>
          <br/>
          <b>Intrucciones para registrar la respuesta de paciente:</b>
          <br/>
          <br/>
          <li>La respuesta dada por el paciente debe ser registrada en la casilla de respuesta</li>
          <p>El sistema calificara automaticamente la respuesta</p>
          <br/>
          <CustomButton
            msj="Iniciar subprueba"
            callback={next}
          ></CustomButton>
        </div>
       );

      case "seleccion":
       return(
        <div>
          <h1>Aritmética</h1>
          <p>En que estimulo desea iniciar la prueba? </p>
          <p>Pacientes con sospechas de discapacidad intelectual:</p>
          <CustomButton msj="Reactivo 1"
          callback={()=>imagenInit(1)}></CustomButton>          
          <br/><br/>
          <p>Pacientes de edad 16-89:</p>
          <CustomButton msj="Reactivo 6"
          callback={()=>imagenInit(6)}></CustomButton>
        </div>
       );

       case "ejemplo":
       return(
         <div>
            <h1>Reactivo Ejemplo. {consigna[numberItem]}</h1>
            <br></br>        
            <TextField
              label = "Respuesta dada"
              value={givenAnswer}
              variant="outlined"
              onChange={(x)=>{setGivenAnswer(x.target.value)}}
            />
            <br/><br/>
            <CustomButton
              msj="Siguiente"
              callback={next}
            ></CustomButton>
          </div>
       );

       case "aplicacionImg":
       return(
         <div>
            <h1>Reactivo {numberItem}. {consigna[numberItem]}</h1>
            <img 
              className={classes.img}
              alt={"Estimulo "+stimuliSource[numberItem]}
              src={require("../../../assets/estimulos/aritmetica/"+stimuliSource[numberItem-1]+".jpg")}
            />
            <br></br><br></br><br></br>
            <TextField
              label = "Respuesta dada"
              value={givenAnswer}
              variant="outlined"
              onChange={(x)=>{setGivenAnswer(x.target.value)}}
            />
            <br/><br/>
            <CustomButton 
              msj="siguiente"
              callback={()=>score(null)}
            ></CustomButton> 
         </div>
       );

       case "aplicacion":
       return(
         <div>
            <h1>Reactivo {numberItem}. {consigna[numberItem]}</h1>           
            <br></br>        
            <TextField
              label = "Respuesta dada"
              value={givenAnswer}
              variant="outlined"
              onChange={(x)=>{setGivenAnswer(x.target.value)}}
            />
            <br/><br/>
            {numberItem !== 15 && numberItem !== 16 && numberItem !== 19 ?
              <CustomButton 
                msj="siguiente"
                callback={()=>score()}
              ></CustomButton>
              :
              <div>
                <p>El programa puede que no califique la respuesta del paciente correctamente para este estimulo</p>
                <p>Por favor seleccioné la puntación correcta para la respuesta del paciente</p>
                <p><b>Respuesta Correcta: </b> {rightAnswers[numberItem]} </p>
                <div className={classes.points}>
                  <CustomButton 
                    msj="0 Puntos"
                    callback={()=>score(0)}
                  ></CustomButton>
                  <CustomButton 
                    msj="1 Punto"
                    callback={()=>score(1)}
                  ></CustomButton>
                </div>
              </div>
            }
         </div>
       );

       case "revision":
        return(
        <div>
          <h1>Aritmética</h1>
          <h3>El puntaje por cada Item fue: </h3>
          <div className={classes.fields}>
            {results.map((result,index)=>
              [<div key={index}>
                <h3>Reactivo {index===0 ? "Ejemplo":index}</h3>
                <div className={classes.field}>
                  {index!== 0? <TextField
                    className={classes.textfield}
                    label={"Calificación"}
                    type="number"
                    defaultValue={result}
                    inputProps={{min:0, max:1}}                  
                    variant="outlined"
                    onChange={(x)=>
                      setResults(update(results,{
                        [index]: {
                          $set: parseInt(x.target.value)
                        }}))}
                  />: <div />}
                  &nbsp;  &nbsp;
                  <TextField
                    className={classes.textfield}
                    label="Respuesta paciente"
                    defaultValue={answers[index]}
                    helperText={index===0 ? "No se cuenta en la puntuación" : ""}
                    variant="outlined"
                    disabled
                  />
                  &nbsp;  &nbsp;
                  <TextField
                    className={classes.textfield}
                    label="Respuesta correcta"
                    defaultValue={rightAnswers[index]}
                    variant="outlined"
                    disabled
                  />
                </div>
              </div>]
              )}
            </div>
            
            <div >
              <CustomButton
                msj="Resumen"
                callback={next}
              ></CustomButton> 
            </div>
        </div>
        )
      case "results":
        return(
          <Results
           name="Aritmética"
           result={getResult()}
           callback={next}
           url="WAIS-selection"
          ></Results>
        )
        
     default:
       break;
    }
  }

  return (
    <div>
    {content()}
    </div>
  );
}

const mapStateToProps = (state) => {
  
  return {
    resWechsler: state.wechslerReducer.resWechsler,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setResWechsler: (pro1, pro2) => dispatch(setResWechsler(pro1,pro2)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Aritmetica);
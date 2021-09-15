import React, { useState } from 'react';
import CustomButton from '../../../components/customButton';
import WaisWiscReturnButton from '../../../components/WaisWiscReturnButton';
import Results from '../../../components/results';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import update from 'react-addons-update';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
//import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import { setBody } from "../../../store/body/action";

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
  textfield:{
    width:"100%"
  },
  buttonStyle: {
    minWidth: "45px",
    margin: theme.spacing(1), 
    backgroundColor: "#017F8D",
    color: "white",
    "&:hover":{
      backgroundColor: "#016570",
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    textTransform: "none",
  },
}));

const LIMIT_ERROR = 4;

const NUMBER_STIMULI = 34;

//const rightExample = [[2,3,0],[1,3,0]]

const stimuliSource = ["01","02","03","04","05"];
const rightAnswers = ['3','5','10','9','2','4','5','3','6','2','7','6','15','14','25','5','7','9','20','32','24','19','7','6','8.50','20','3','60','30','3','34','48','2:00 pm','40 km'];

let returnDone; // Esta variable me ayuda a controlar el uso de la regla del retorno
let returnVar; // Esta variable me ayuda a controlar el uso de la regla del retorno
let countRe; //Esta variable me dice cuando se puede salir de la condición de retorno
let flagRe;//Esta variable me ayuda a decir en que posicion quedo el paciente antes de entrar al retorno 

let badAnswerCount; //Esta variable me dice cuantos ceros consecutivos tuvo el paciente

let answers;
const consigna = ["Cuenta estos pájaros con tu dedo. Cuéntalos en voz alta para que yo pueda escucharte",
                  "Cuenta estos pollitos con tu dedo. Cuéntalos en voz alta para que yo pueda escucharte",
                  "Cuenta estos árboles con tu dedo. Cuéntalos en voz alta para que yo pueda escucharte",
                  "¿Cuántas mariposas y grillos hay en total?",
                  "¿Cuántas nueces quedarán si cada ardilla se come una?",
                  "Roberto tiene 5 libros. Pierde 1 ¿Cuántos libros le quedan?",
                  "¿Cuántas son 2 crayolas más 3 crayolas?",
                  "José tiene 5 galletas. Le da 1 a samuel y 1 a jimena. ¿Cuántas galletas le quedan?",
                  "Juan tenía 4 pesos y su mamá le dio 2 más. ¿Cuántos pesos tiene en total?",
                  "si corto una manzana por la mitad. ¿Cuántos pedazos tendré?",
                  "Si tienes 10 caramelos y te comes 3. ¿Cuántos caramelos te quedan?",
                  "Si tienes 3 lápices en cada mano. ¿Cuántos lápices tienes en total?",
                  "Tres bicicletas llegan a un parque donde ya hay 12 bicicletas. ¿Cuántas bicicletas hay en total en el parque?",
                  "Marcos tenía 8 pelotas y compró 6 más. ¿Cuántas pelotas tiene en total?",
                  "Francisco ganó 10 calcomanías el lunes y 15 calcomanías el martes. ¿Cuántas calcomanías ganó en total?",
                  "En un campo hay tres vacas. Otras cuatro vacas llegan al campo y después se van 2 vacas. ¿Cuántas vacas quedan en el campo?",
                  "Catalina tenía 12 globos y vendió 5. ¿Cuántos globos quedaron?",
                  "Juana compró 4 manzanas en una tienda y 2 manzanas en otra. Su mamá le dio 3 manzanas más. ¿Cuántas manzanas tiene en total?",
                  "Si compras 2 plumas a 40 pesos cada una. ¿Cuánto cambio te regresaran si pagas con 100 pesos?",
                  "Tomás anotó 17 puntos en un juego y 15 en otro juego. ¿Cuántas puntos anotó en total?",
                  "Una feria tiene 8 concursos distintos. Si cada concurso concede 3 premios. ¿Cuántos premios en total se dan en la feria?",
                  "En una clase de karate se inscribieron 30 estudiantes. Después de un mes, 11 estudiantes se van de la clase. ¿Cuántos estudiantes quedan en la clase?",
                  "Rosa compró 3 libros de caricaturas por 2 pesos cada uno y un juguete de 7 pesos. ¿Cuánto cambio le regresarán si paga con un billete de 20 pesos?",
                  "Laura mira a 8 pájaros posados en la barda, 4 de ellos vuelan y otros 2 llegan de visita. ¿Cuántos pájaros observa Laura ahora?",
                  "Juan tiene el doble de dinero que Sergio. Juan tiene 17 pesos. ¿Cuánto dinero tiene Sergio?",
                  "Una escuela tiene 25 alumnos en cada salón de clases. Si en total hay 500 alumnos en toda la escuela. ¿Cuántos salones de clase hay?",
                  "Susana tenía 30 pesos y se gastó la mitad. Unas revistas cuestan 5 pesos cada una. ¿Cuántas revistas puede comprar Susana con el dinero que le queda?",
                  "Una familia manejó un automóvil durante 3 horas, se detuvo a descansar y luego manejó otras 2 horas más. Manejaron un total de 300 kilómetros. ¿Cuál fue la velocidad promedio a la que manejaron?",
                  "Beatriz compró una carpeta usada por 2/3 de lo que costaba nueva. Pagó 20 pesos. ¿Cuánto dinero costaba la carpeta cuando estaba nueva?",
                  "La temperatura se elevó 12 grados entre las 4 y las 8 de la mañana. Luego se elevó 9 grados más entre las 8 y las 11 de la mañana. En promedio, ¿cuántos grados se elevó la temperatura cada hora?",
                  "Un juego que normalmente cuesta 40 pesos se pone en oferta y se le rebaja 15% durante una venta especial. ¿Cuál es el precio del juego durante la venta especial?",
                  "Seis personas pueden lavar 40 automóviles en el curso de 4 días. ¿Cuántas personas se necesitarían para lavar los 40 coches en medio día?",
                  "Carlos viene de camino a casa en un vuelo que dura 2 horas. Jaime vive a 150 kilómetros del aeropuerto. Maneja a 60 kilómetros por hora (kph). Si el vuelo de Carlos sale a las 3 de la tarde, ¿a qué hora necesita salir Jaime de su casa para llegar al aeropuerto 30 minutos antes de que llegue Carlos?",
                  "Diego sale de trabajar 1 hora antes que Victoria. Diego maneja a 40 km/h y Victoria a 60 km/h. Si ambos van en la misma dirección, ¿Qué tan adelantada estará Victoria 5 horas después de que Diego sale?"
];

let firstItem;

function Aritmetica(props) {
  const classes = useStyles();
  var [state,setState]=useState("seleccion")
  var [results, setResults] = useState(new Array(NUMBER_STIMULI).fill(0));
  var [numberItem,setNumberItem] = useState(1)
//  var [actualStimuli, setActualStimuli] = useState("");

  var [givenAnswer, setGivenAnswer] = useState("");

  function changeStimuli(punt){
    var returnController = returnVar && numberItem===0 && countRe!==2; // Verifica que al hacer el retorno y llegar al estimulo 0 no siga avanzando en la prueba
    if((badAnswerCount < LIMIT_ERROR && numberItem < NUMBER_STIMULI) && !returnController){ // Verifica que no se haya cumplido la condicion de termino
      var nextNumber = numberItem;

      //Este verificacion me dice si se cumple la condición para retornar y asi devolverse en caso de ser necesario
      if((
          ((numberItem === 2 || numberItem === 3) && firstItem === 2) ||
          ((numberItem === 8 || numberItem === 9) && firstItem === 8) ||
          ((numberItem === 11 || numberItem === 12) && firstItem === 11)
         )
          && punt===0 && !returnDone){
        returnVar = true;
        flagRe = numberItem;
        nextNumber = firstItem;
        returnDone = true;
      }

      if(!returnVar){ //En caso de no haber fallado los items 6 0 7 sigue aumentado a partir de ahí
        nextNumber += 1;
        if(nextNumber<5){
          setState('aplicacionImg');
        }else{
          setState('aplicacion');
        }

      }else{ //En caso de que halla fallado los primeros reactivos vuelve al reactivo anterior y empieza a disminuir desde ahí        
        if(countRe===2){
          returnVar = false;
          nextNumber = flagRe + 1;
          if(numberItem<5){
            setState('aplicacionImg');
          }else{
            setState('aplicacion');
          }
          
        }else{
          nextNumber -= 1;
          if(nextNumber<5){
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
    setNumberItem(item)

    if(item<5){
      setState('aplicacionImg');
    }else{
      setState('aplicacion');
    }

    //Set Globals
    returnDone = false;
    returnVar = false;
    countRe = 0;
    flagRe = null;
    badAnswerCount = 0;
    answers = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
  }

  function next(){
    switch (state) {
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
    for(var i=0; i<results.length; i++){
      total = total + results[i];
    }

    if(!props.resWechsler.hasOwnProperty('AR')){
      props.setResWechsler('AR',total)
    }else{
      if(props.resWechsler['AR'] !== total){
        props.setResWechsler('AR',total)
      }
    }

    return total;
  }

  function score(){
    answers[numberItem] = givenAnswer;
    setGivenAnswer('');
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

      if(numberItem !== 0){
        badAnswerCount += 1;
      }

      if(countRe>0){
        countRe=0;
      }

      changeStimuli(0);
    }    
  }

  function content(){
    switch (state) {
      case 'instruccion':
       return (
        <div>
          <h1>Aritmética</h1>
          <b>Instrucciones generales:</b>
          <p>A continuación se mostrará una serie de imágenes (reactivo 1 al 5) o preguntas (desde el reactivo 6)</p>
          <li>Las imágenes deben ser mostradas al paciente para aplicar la prueba</li>
          <li>Las preguntas deben ser mencionadas oralmente al paciente sin mostrar la interfaz</li>
          <br/>
          <b>Instrucciones para registrar la respuesta de paciente:</b>
          <br/>
          <p>La respuesta dada por el paciente debe ser registrada en la casilla de respuesta</p>
          <p>El sistema calificara automaticamente la respuesta</p>
          <br/>
          <Grid container justify="center">
            <WaisWiscReturnButton
              msj="Regresar a prueba"
              callback={()=>setState("seleccion")}
            ></WaisWiscReturnButton>          
          </Grid>
        </div>
       );

      case "seleccion":
       return(
        <div>
          <h1>Aritmética</h1>
          <p>¿En qué estímulo desea iniciar la prueba? </p>
          <p>Pacientes de edad 6-7 años o con sospechas de discapacidad intelectual:</p>
          <CustomButton 
            msj="Reactivo 3"
            callback={()=>imagenInit(2)}>
          </CustomButton>          
          <br/>
          <p>Pacientes de edad 8-9:</p>
          <CustomButton
            msj="Reactivo 9"
            callback={()=>imagenInit(8)}>
          </CustomButton>
          <br/>
          <p>Pacientes de edad 10-16:</p>
          <CustomButton
            msj="Reactivo 12"
            callback={()=>imagenInit(11)}>
          </CustomButton>
          <br/>
          <Grid container justify="center">
            <Tooltip title="Regresar al menu de wisc">
              <Button className={classes.buttonStyle} onClick={()=>props.setBody("WISC-selection")}>
                <ArrowBackIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Instrucciones de la prueba">
              <Button className={classes.buttonStyle} onClick={()=>setState("instruccion")}>
                <HelpOutlineIcon />
              </Button>
            </Tooltip>
          </Grid>

          <Grid container justify="center">
            <p><b>Recuerde que barra superior de la aplicación se puede ocultar durante la aplicación de la prueba</b></p>
          </Grid>
          <Grid container justify="center">
            <p><b>Utilize el botón en la parte izquierda de la barra para ocultarla</b></p>
          </Grid>
        </div>
       );

       case "aplicacionImg":
       return(
         <div>
            <h1>Reactivo {numberItem+1}. {consigna[numberItem]}</h1>
            <img 
              className={classes.img}
              alt={"Reactivo "+stimuliSource[numberItem]}
              src={require("../../../assets/estimulos/aritmeticawisc/"+stimuliSource[numberItem]+".jpg")}
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
              callback={()=>score(numberItem)}
            ></CustomButton> 
         </div>
       );

       case "aplicacion":
       return(
         <div>
            <h1>Reactivo {numberItem+1}. {consigna[numberItem]}</h1>           
            <br></br>        
            <TextField
              label = "Respuesta dada"
              value={givenAnswer}
              variant="outlined"
              onChange={(x)=>{setGivenAnswer(x.target.value)}}
            />
            <br/><br/>
            <CustomButton 
              msj="siguiente"
              callback={()=>score()}
            ></CustomButton>
         </div>
       );

       case "revision":
        return(
        <div>
          <h1>Aritmética</h1>
          <h3>El puntaje por cada Item fue: </h3>
          <div className={classes.fields}>
            {results.map((result,index)=>
              [<h3 key={index+1}>Reactivo {index+1}</h3>,
              <div key={index} className={classes.field}>
                <TextField
                  className={classes.textfield}
                  label={"Calificación"}
                  type="number"
                  defaultValue={result}
                  inputProps={{
                    min:0,
                    max:1,
                  }}
                  variant="outlined"
                  onChange={(x)=>
                    setResults(update(results,{
                      [index]: {
                        $set: parseInt(x.target.value)
                      }}))}
                />
                 &nbsp;  &nbsp;
                <TextField
                  className={classes.textfield}
                  label="Respuesta-paciente"
                  defaultValue={answers[index]}
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
              </div>]
              )}
            </div>
            

            <div >
              <CustomButton
                msj="Resumen"
                callback={next}
              />
            </div>
        </div>
        )
      case "results":
        return(
          <Results
            name="Aritmética"
            result={getResult()}
            callback={next}
            url="WISC-selection"
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
    setBody: (item) => dispatch(setBody(item)),
    setResWechsler: (pro1, pro2) => dispatch(setResWechsler(pro1,pro2)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Aritmetica);
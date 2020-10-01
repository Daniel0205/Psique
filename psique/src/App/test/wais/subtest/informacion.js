import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import update from 'react-addons-update';
import { makeStyles } from '@material-ui/core/styles';
import Results from '../../../components/results'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";

const LIMIT_ERROR = 3

const NUMBER_STIMULI = 26

let answers = new Array(NUMBER_STIMULI).fill("");

let clues =["* 1. ¿Qué día viene despues del lunes?",
            "* 2. ¿Qué forma tienen la mayoría de las pelotas?",
            "† 3. ¿Qué es un termómetro?",
            "† 4. ¿Quién fue Salvador Dalí?",
            "5. ¿En qué continente está el desierto del Sáhara?",
            "6. ¿Quién escribio el Quijote?",
            "7. ¿Cuál es la capital de japón?",
            "8. ¿De que está compuesta el agua?",
            "9. ¿En que condinete está egipto?",
            "10. ¿Quién pintó la Capilla Sixtina?",
            "11. ¿En que año se descubrió América?",
            "12. ¿A qué temperatura hierve el agua en condiciones normales?",
            "13. ¿Qué ciudad es considerada como la capital de la Unión Europea?",
            "14. ¿Por qué es famoso Fleming?",
            "15. ¿Quién fue Galileo?",
            "16. ¿A qué nombre de persona se asocia normalmente la teoría de la relatividad?",
            "17. ¿Qué idioma tiene más hablantes nativos?",
            "18. ¿Quién es el autor del libro Cien años de soledad?",
            "19. ¿Quién fue Mahatma Gandhi?",
            "20. ¿Qué cordillera separa Asia de Europa?",
            "* 21. Dígame el nombre de tres tipos de vasos sanguíneos del cuerpo humano",
            "22. ¿Quien fue Catalina la Grande?",
            "23. ¿Cuál es el órgano del cuerpo humano más grande?",
            "* 24. ¿Cuántos minutos tarda la luz del Sol en alcanzar la Tierra?",
            "25. ¿Quién escribió Alicia en el País de las Maravilla?",
            "* 26. ¿Cuál es la circunferencia de la Tierra en el Ecuador?"];


let rightAnswer = ["Martes",
                  "Redonda/Circular/Esférica\nComo una <<O>>\n[Gestos que indican una forma circular o redonda]",
                  "Instrumento (herramienta) para medir la temperatura (grados)\nPara saber el punto de ebullición (congelación)\nPara saber si algo está caliente o frio\nAparato para medir la fiebre",
                  "Pintor/Escultor/Arquitecto/Artista",
                  "África/Africano\nNorte (centro/sur) de África",
                  "Cervantes/Miguel de Cervantes/Miguel de Cervantes Saavedra",
                  "Tokio",
                  "H2O\nOxígeno e hidrógeno\nDos átomos de hidrógeno y uno de oxígeno",
                  "África/Africano\nNorte (centro/sur) de África",
                  "Miguel Ángel\nMichelangelo",
                  "1492",
                  "100 grados Celcius (centrígrados)/100 Celsius (centígrados)\n212 grados Fahrenheit/212 Fahrenheit\nAlrededor de 100 grados Celcius (centígrados)\nAlrededor de 299 grados Fahrenheit\n373 grados Kelvin/[Cualquier cifra entre 300 y 400 Kelvin]\n672 grados Rankine\n[Cualquier cifra entre 600 y 700 Rankine]\n[Si no especifica la escala, preguntar en qué escala]",
                  "Bruselas",
                  "Descubrió la penicilina\nInventor de la penicilina",
                  "Astrónomo/Filósofo/Fisico/Matemático/Científico",
                  "Albert Einstein\nEinstein",
                  "Chino/Mandarín",
                  "Gabriel Garcia Márquez\nGabito\nGabo",
                  "Pacifista\nLíder indio promotor de la resistencia pacífica\nPacifista (activista/filósofo/revolucionario) indio\nLuchador por los derechos de la india\nLíder espiritual indio",
                  "Los Urales",
                  "Tres respuestas de las siguientes:\nArterias/Venas/Capilares/Arteriolas/Vénulas/Vasos linfáticos",
                  "Reina rusa del siglo XVIII/Reina rusa/Zarina rusa/Monarca rusa",
                  "La piel",
                  "8 minutos\n[Cualquier respuesta entre 7 y 9 minutos]\n480 segundos\n[Cualquier respuesta entre 420 y 540 segundos]",
                  "Lewis Carroll/Carroll\nCharles Dodgson/Charles Lutwidge Dodgson",
                  "40075 kilómetros\n[Cualquier respuesta entre 32060 y 48090 kilómetros]\n24901 millas\n[Cualquier respuesta entre 19921 y 29881 millas]"];


let badAnswer = ["Ayer/Hoy/Mañana (P)*\nNavidad/Mi cumpleaños [se refiere a una festividad o día especial](P)*\nEl 25 de octubre [responde con una fecha](P)\n[Nombra cualquier otro día de la semana]",
                "[Describe la forma de una pelota de rugbi o de cualquier otra pelota no esférica](P)*\nPelota de fútbol (tenis) [nombra el tipo de bola]\n[Nombra cualquier otra forma]",
                "Cuando estás enfermo/Gente enferma/Enfermedad(P)\nMedida de la presión atmosférica (nivel del agua)",
                "Un escritor\nUn genio/Un vanguardista(P)",
                "[Nombra otro continente distinto a África]",
                "Un escritor (español) (P)\n[Nombra a otro autor]\nMiguel",
                "[Nombra otra ciudad]\nJapón/China [Nombra un país]",
                "Partículas\nElementos físicos\n[Nombra una composición errónea]",
                "[Nombra otro continente distinto a África]",
                "Un pintor italiano (P)\n[Nombra a otro pintor]",
                "[Nombre otro año]\nCristóbal Colón",
                "100 grados Fahrenheit [cifra correcta pero denominación de una escala incorrecta]\n[Cualquier otra cifra]",
                "Bélgica (P)\n[Nombra otra ciudad]\nAlemania/Inglaterra [Nombra un país]",
                "Científico(P)\nInventor del teléfono",
                "Un italiano (P)\nEscultor [Cualquier otra profesión]",
                "[Cualquier otro nombre]",
                "[Nombra otro idioma]\nChina (P)",
                "Escritor/Novelista (P)\nGabriel\nMacondo\n[Nombra otro autor]",
                "Ganador del Premio Nobel de la Paz (P)\nLíder/Religioso (P)\nUn budista/Un filósofo\nPresidente de la India\nEra de la India (P)\nDejó de comer (P)",
                "[Nombra otra cordillera]",
                "Aorta, carótida y femoral [nombra un vaso específico](P)*\n[Nombra menos de tres tipos de vaos sanguíneos](P)**",
                "La mujer de Alejandro el Grande\nReina española [nombra un país incorrecto]\nReina (monarca/emperatriz)/De la realeza (P)",
                "[Nombra otro órgano]",
                "Un año\n250000 a 320000 kilómetros por segundo [cualquier respuesta en referencia a la velocidad de la luz](P)*",
                "Lewis/Charles (P)\nWalt Disney",
                "[Cualquier respuesta entre 32060 y 48090](P)*\n[Cualquier respuesta entre 19921 y 29881](P)*\n2πr/πd/π/πr2/Pi(P)**"];


let comentary = ["* Si el sujeto dice <<Ayer>>,<<Hoy>> o <<Mañana>>, o da el nombre de una festividad a un día especial, se pregunta:<<¿Qué día es?>>",
                "* Si el sujeto describe la forma de una pelota que no es redonda (p. ej., la de rugby), se pregunta: <<Qué forma tienen la mayoría de las pelotas?>>",
                "† Si el sujeto no da una respuesta correcta, decir: <<Un termómetro es un instrumento que sirve para medir la temperatura>>",
                "† Si el sujeto no da una respuesta correcta, decir: <<Salvador Dalí era un pintor y escultor>>",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "* Si el sujeto da el nombre de un vaso sanguíneo específico (p. ej., <<Ahorta>>), decir: <<Sí, pero dígame el nombre de tras tipos de vasos sanguíneos humanos>>\n** Si el sujeto nombra menos de tres tipos de vasos sanguíneos, decir: <<Dígame el nombre de otro tipo de vaso sanguíneo>>",
                "",
                "",
                "* Si el sujeto da una respuesta que se refiere a la velocidad de la luz, decir: <<Cuántos minutos tarda la luz del Sol en alcanzar la Tierra?>>",
                "",
                "* Si el sujeto da una respuesta numérica correcta pero no indica la unidad de medida, decir: <<Si, pero ¿en qué una unidad de medida?>>\n** Si el sujeto dice <<2πr>> o <<πd>>, decir: <<Sí, pero ¿cuál es la respuesta en kilómetros?>>"];

const useStyles = makeStyles((theme) => ({
  ordenar:{
    display:"inline-flex"
  },
  fields:{
    display: "inline-grid",
    width:"50%"
  },
  field:{
    display:"flex",    
  },
  textfield:{
    width:"100%"
  },
  concepts:{
    width:"80%"
  }
}));


let returnDone = false; // Esta variable me ayuda a controlar el uso de la regla del retorno
let returnVar = false; // Esta variable me ayuda a controlar el uso de la regla del retorno
let countRe = 0; //Esta variable me dice cuando se puede salir de la condición de retorno
let flagRe = null;//Esta variable me ayuda a decir en que posicion quedo el paciente antes de entrar al retorno
let badAnswerCount= 0; //Esta variable me dice cuantos ceros consecutivos tuvo el paciente
let firstItem;// Item en el que inicio la prueba
      

function Informacion(props) {
  var [state,setState] = useState("instruccion")
  var [results, setResults] = useState(new Array(NUMBER_STIMULI).fill(0));
  var [numberItem,setNumberItem] = useState(0)
  var [givenAnswer, setGivenAnswer] = useState("");

  const classes = useStyles();

  function changeStimuli(punt){    
    var returnController = firstItem!==0 && returnVar && numberItem===0 && countRe!==2; // Verifica que al hacer el retorno y llegar al estimulo 0 no siga avanzando en la prueba
    if((badAnswerCount < LIMIT_ERROR && numberItem < NUMBER_STIMULI) && !returnController){ // Verifica que no se haya cumplido la condicion de termino
      var nextNumber = numberItem;

      //Este verificacion me dice si se cumple la condición para retornar y asi devolverse en caso de ser necesario
      if((((numberItem === 2 || numberItem === 3) && firstItem === 2))
          && punt === 0 && !returnDone){
        returnVar = true;
        flagRe = numberItem;
        nextNumber = firstItem;
        returnDone = true;
      }

      if(!returnVar){ //En caso de no haber fallado los items 6 0 7 sigue aumentado a partir de ahí
        nextNumber += 1;
        

      }else{ //En caso de que halla fallado los primeros reactivos vuelve al reactivo anterior y empieza a disminuir desde ahí        
        if(countRe===2){
          returnVar = false;
          nextNumber = flagRe + 1;
          
        }else{
          nextNumber -= 1;
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

  function testInit(item){    
    if(item !== 0){
      let arrayAux = results
      for (let i = 0; i < item; i++) {
        arrayAux[i]=1
      }
      setResults(arrayAux)
    }

    firstItem=item
    setNumberItem(item)
    setState("test")
  }


  function getResult() {
    var total = 0;
    for(var i=0;i<results.length;i++){
      total = total + results[i];
    }

    if(!props.resWechsler.hasOwnProperty('I')){
      props.setResWechsler('I',total)
    }else{
      if(props.resWechsler['I'] !== total){
        props.setResWechsler('I',total)
      }
    }

    return total;
  }

  function score(punt){
    answers[numberItem] = givenAnswer;
    setGivenAnswer('');
    if(punt !== 0){
      if(returnVar){        
        countRe +=1;
      }

      if(badAnswerCount > 0){        
        badAnswerCount = 0;
      }
      
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

      if(countRe>0){
        countRe=0;
      }
      changeStimuli(punt);
    }    
  }


  function content(){
    switch (state) {
      case "instruccion":
        return(
          <div>
            <h1>Información</h1>
            <b>instrucciones generales:</b>
            <p>A continuación se mostrará el enunciado por cada uno de los puntos, ademas</p>
            <p>Se dispone de cajas de texto que sirven como guia para evaluar la respuesta dada por el paciente.</p>
            <p>Debajo de las cajas de texto puede haber información en caso de que el paciente de ciertas respuestas</p>
            <br/>
            <b>instrucciones para registrar la respuesta de paciente:</b>
            <br/>
            <br/>
            <li>La respuesta dada por el paciente debe ser registrada en la casilla de respuesta</li>
            <li>Se debe escoger, teniendo en cuenta la guía, entre 1 y 0 para la puntuación de la respuesta</li>
            <br/>
            <CustomButton
            msj="Iniciar subprueba"
            callback={()=>setState("seleccion")}
            ></CustomButton>   
          </div>
        )
      case "seleccion":
        return(
          <div >
            <h1>Información</h1>
            <p>En que estimulo desea iniciar la prueba? </p>
            <p>Pacientes con sospechas de discapacidad intelectual:</p>
            <CustomButton
              msj="Estimulo 1"
              callback={()=>testInit(0)}
            ></CustomButton>
            <p>Pacientes de edad 16-89:</p>
            <CustomButton
              msj="Estimulo 3"
              callback={()=>testInit(2)}
            ></CustomButton>
          </div>
        )
      case "test":
        return(
        <div > 
          <h2>{clues[numberItem]}</h2>
          <br/>

          <div className={classes.ordenar}>
            <div >
              <Typography gutterBottom variant="h5" component="h2"> 0 puntos </Typography>
              <Card className={classes.root}>
                <CardContent>
                  {badAnswer[numberItem].split("\n").map((i,key) => {
                    return <div key={key}>
                        <Typography variant="body2" color="textSecondary" component="p"> {i} </Typography> 
                      </div>;
                  })}
                </CardContent>
              </Card>
              </div>
              
              &nbsp;  &nbsp; &nbsp;  &nbsp;
              <div>
                <Typography gutterBottom variant="h5" component="h2"> 1 punto </Typography>
                <Card className={classes.root}>
                  <CardContent>
                    {rightAnswer[numberItem].split("\n").map((i,key) => {
                    return <div key={key}>
                        <Typography variant="body2" color="textSecondary" component="p" > {i} </Typography> 
                      </div>;
                    })}
                  </CardContent>
                </Card>
              </div>
          </div>
          
          &nbsp; &nbsp;
          <Typography variant="body2" component="p"> {comentary[numberItem]} </Typography>

          &nbsp; &nbsp;
          <Grid container justify="center">
            <TextField
              label = "Respuesta dada"
              value={givenAnswer}
              variant="outlined"
              onChange={(x)=>{setGivenAnswer(x.target.value)}}
            /> 
          </Grid>

          &nbsp; &nbsp;
          <div className={classes.ordenar}>
            <CustomButton
              msj="0 Puntos"
              callback={()=>score(0)}
            ></CustomButton>
            &nbsp; &nbsp;
            <CustomButton
              msj="1 Punto"
              callback={()=>score(1)}
            ></CustomButton>
          </div>

        </div>)
      case "revision":
        return(
          <div>
            <h1>Información</h1>
            <h3>El puntaje por cada Item fue: </h3>
            <div className={classes.fields}>
              {results.map((result,index)=>
                [<h3 key={index+1}>Reactivo {index+1}</h3>,
                <div key={index} className={classes.field}>
                  <TextField
                    className={classes.textfield}
                    label={"Calificacion"}
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
                </div>]
              )}
            </div>

            <div>
              <CustomButton             
                msj="Resumen"
                callback={()=>setState("results")}
              />
            </div>
          </div>
        )
      case "results":
        return(
          <Results
            name="Información"
            result={getResult()}
            callback={()=>setState("revision")}
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

export default connect(mapStateToProps, mapDispatchToProps)(Informacion);
import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import update from 'react-addons-update';
import { makeStyles } from '@material-ui/core/styles';
import Results from '../../../components/results'
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";

const LIMIT_ERROR = 3

const NUMBER_STIMULI = 30

let items= ["","","","Guante","Manzana", "Desayuno", "Cama","Espejo", "Silencioso","Generar","Compasión",
            "Remordimiento","Meditar","Confiar","Esquivar","Valiente","Fortaleza","Evolucionar","Distinción",
            "Opaco","Peculiar","Contrastar","Plagiar", "Tangible","Reacio","Iniciativa","Audaz","Paliar","Solidario","Pragmatico"];

let answer0= ["",
              "",
              "",
              "Para el invierno\nVienen por pares\nEncajan\nEstan hechos de piel(algodón)\nSeñala la mano",
              "Va a tu boca\nEstá buena/Es dulce",
              "Por las mañanas/Un buen momento del día",
              "Lugar para relajarse (sentirse bien)\nDormir",
              "Mueble\nMirarse/Verse",
              "Estar silencio\nSin palabras\nTranquilidad/Calma",
              "Empezar/Fomentar\nMotivar/Desarrollar\nGnerar electricidad (energía)",
              "Tolerancia/Amor/Apasionado\nSentimiento/Emoción\nAfecto por alguien\nTernura/Bondad",
              "Rabia/Lástima/Compasión/Piedad\nCuando alguien te da pena\nHacer algo malo (algo que no estuvo bien)",
              "Estar solo\nComportarse bien/Estar callado\nEstado de relajación",
              "Esconder (guardar) un secreto\nNo tener miedo de alguien",
              "No decir nada/No responder\nHuir\nConseguir no hacer algo\nQue no quiere hacerse",
              "Calidad humana\nEntusíasmo\nContrario de pereza\nSeguir adelante\nQue no se deja llevar por las emociones",
              "Capacidad para parecer fuerte\nAlgo grande\nVirtud",
              "Aprender\nPasar el tiempo\nAdaptarse a lo malo",
              "Lujoso/Ostentoso/Clase\nPersona que se sale de lo normal\nDiferente",
              "Transparente/Translúcido/Borroso/Vidrioso\nPerdidad de visibilidad\nQue no da una visión neta de las cosas",
              "Extraordinario/Unico/Raro\nSimple\nPopular",
              "Analizar opiniones\nVer más allá\nDar veracidad a las cosas",
              "Robar/Engañar\nBeneficiarse de la obra de otro\nFalsear",
              "Tarea fácil de realizar/Viable\nNo cambiable\nEstá tan claro que no se ve",
              "Timido\nApartarse de/No seguro de\nNo estar de acuerdo con alguien\nSentirse rechazado/Que sufre rechazo",
              "Empezar algo\nHacerse cargo de algo\nHacer algo nuevo\nHacer algo solo",
              "Rápido/Listo/Inteligente/Extravertido\nExtravagante/Que va llamando la atención\nCapaz de hacer cosas",
              "Quitar/Erradicar/Ayudar/Proteger/Frenar",
              "Ayudar a alguien/Mantener a alguien/Hacer algo por alguien\nAsociación caritativa/Comportamiento altruista\nGFormar un grupo/Tener espíritu de grupo",
              "Persona que no opina de religión\nProblemático"]

let answer1= ["",
              "",
              "",
              "Para las manos\nPrenda de vestir\nSe ponen/Para proteger cuando hace frio\nSe ponen para hacer ejercicio(limpiar/trabajar)",
              "Comida/Algo que comes\nTiene piel(semilla/corazon)\nCrece en los arboles\nEs saludable(nutritiva/buena para ti)",
              "Comida/Lo que comemos\nMomento del día en el que se toma café y galletas\nLo primero del día/La comida más importante del día",
              "Tiene colchón, mantas y sábanas\nLugar de descando\nMueble/Cosa de metal (madera)\nPara dormir",
              "Idea de objeto o idea de reflejo\nPara verse (mirarse) en el\nRefleja tu imagen\nVidrio/Cristal/Objeto",
              "Contrario de ruidoso\nReservado/Ser callado/Calmado",
              "Inventar\nHacer/Construir",
              "Idea de pena o idea de preocupación por el otro\nPena/Lástima/Preocupación/Cuidado\nEmpatía\nPerdón hacia alguien\nComprensión/Consideración/Sentimiento humanitario",
              "Idea de inquietud interna o idea de una mala acción\nSentimiento de pena (culpa) que te entra\nArrepentirse de haber hecho algo\nPena/Dolor\nQue te pesa la conciencia/Cargo de conciencia",
              "Pensar\nPensarse algo mucho/Pensar la forma de realizar algo/Pensar en algo que hiciste antes\nAsimilar (comprender) una idea",
              "Compartir/Hacer participes\nContar algo solo a un amigo íntimo\nContar con alguien",
              "Evitar/Evitar un golpe (ataque)/Evitar algo por poco\nApartarse/Desviar\nNo dejarse atrapar",
              "Voluntad/Determinación/Superación personal\nAtrevido/temerario/Fuerte/Resistente\nCuando no se tiene miedo\nContrario de debilidad (cobardía)\nAfrontar la realidad sea la que sea",
              "Fuerza/Tener mucha fuerza/Ser fuerte\nMuralla/Muros/Algo que te protege de los peligros que te rodean\nDureza de carácter/Persistencia\nValor/Coraje/Resistencia",
              "Idea de cambio en el tiempo o idea de mejora\nCambiar/Crecer/Progresar/Transformarse\nIr de un estado a otro\nCambiar a mejor/Mejorar\nAvanzar con el tiempo",
              "Premiar/Homenajear/Dar un premio\nDiferente de algo o alguien\nComparar/Separar\nAlgo que sobresale (que tiene algo especial)",
              "Que no se puede ver a través de el\nContrario de transparente/Que no es transparente\nQue no se puede entender/Incompresible",
              "Diferente\nCaracteristico de una persona[Limito el concepto a las personas]\nFuera de lo normal/Que se ve poco\nQue pertenece a una persona",
              "Comparar/Distinguirse/Comprobar/Verificar\nVer si es verdad",
              "Robar algo, como un escrito a otra persona\nCopiar/Copiar algo que ha sido patentado",
              "Evidente\nPuede verse/Visible\nAlgo que puedes tener\nAlgo concreto\nQue se toca en un punto",
              "Retricente\nNo querer decir\nDudoso (temeroso) de hacer o decir algo",
              "Pasar a la acción\nDar el primer paso/Emprender/Proponerse algo\nHacer algo de forma espontánea",
              "Valiente\nQue no tiene miedo\nCapaz de realizar cualquier acción\nSin freno/Sin control",
              "Moderar/Mitigar/Calmar\nFrenar algo malo",
              "Hacer algo con alguien/Compartir\nDefender una causa común con otras personas\nApoyarse mutuamente\nUna unión para algo\nContrario de egoista",
              "Real/Realista\nConcreto/Racional/Lógico\nQue presta atención a la realidad\nOperativo\nDirecto"]

let answer2= ["",
              "",
              "",
              "Prenda para las manos\nCubren(protegen) las manos\nTe las pones en las manos/Te los quitas de las manos\nAlgo que llevas en las manos\nProtegen las manos del frio",
              "Fruta/Pieza de fruta",
              "Primera comida (alimento) del día\nComida a primera hora\nAlimento que ayuda a emprender el día con fuerza",
              "Mueble para dormir (descansar)\nEn (sobre) lo que dormimos\nLugar para dormir/Donde duermes",
              "Idea de objeto e idea de reflejo\nLo que devuelve la imagen (reflejo) de algo\nLo que refleja nuestra imagen\nUn objeto para reflejarse",
              "Que no hay ruido/Ausencia de ruido/Que no se oye nada\nQue no hace ruido\nEstar callado",
              "Procrear/Engendrar/Reproducir\nCrear/Producir\nCausar alguna cosa/Hacer que algo suceda/Causar la existencia de algo",
              "Idea de pena que surge por el malestar de otro\nPiedad\nSentimiento de pena (pesar/lástima/tristeza) por una persona\nQue alguien te de pena",
              "Idea de inquietud interna e idea de una mala acción\nPesar(Arrepentimiento/arrepentirse) por algo malo que has hecho\n Pena por no haber hecho lo que debías",
              "Recapacitar/Cavilar/Reflexionar\nPensar profundamente en algo (en si mismo)",
              "Creer en (fiarse de) alguien\nEsperar con firmeza y seguridad\nContar a alguien tus secretos\nCustodiar\nTner certeza de que algo o alguien no nos va a defraudar",
              "Idea de evitar algo con destreza\nConseguir no hacer algo molesto hábilmente (con rapidez)\nEludir/Librarse de algo\nEvitarse una pregunta (un obstaculo/a una  persona) para no hacerle frente",
              "Persona que actúa con firmeza (determinación) ante el peligro o cualquier situación díficil\nPersonas con fuerza de carácter (coraje/heroísmo)\nAlguien que actúa con valor\nA pesar de los miedos se enfrentan a ellos",
              "Fuerza y vigor\nResistencia (coraje/fuerza moral) en la adversidad\nRecinto fortificado/Defensa natural que tiene un lugar por su propia situación\nAlgo inexpugnable",
              "Idea de cambio en el tiempo e idea de mejora\nCambiar y crecer a lo largo del tiempo\nMadurar\nAvanzar en la especie/Adaptarse cada vez más a las circunstancias",
              "Elegancia\nHacer que algo se diferencie de algo\nVer un objeto diferenciado de los demás\nConocer la diferencia/diferenciar de algo",
              "Que no deja atravesar (pasar) la luz\nSombrío/Sin Luz/Tenebroso/Oscuro\nPersona triste y melancólica\nPersona mediocre",
              "Idea de propio o privativo de cada persona (cosa)\nDiferente de lo corriente u ordinario\nCaracteristico/Distintivo/Especial/Original/Especifico/Singular/Típico",
              "Comprobar la exactitud de las cosas\nMostrar notable diferencia o condiciones opuestas",
              "Idea de robar o copiar una obra literaria (artística) de otro y hacerla pasar por propia\nPresentarse como el autor de los escritos de otro",
              "Tocable/Palpable/Perceptible\nQue se puede tocar\nQue se puede percibir de manera precisa\nEn real/Comprobable",
              "Idea de mostrar resistencia a hacer algo o contrario a algo\nQue se resiste/Está poco dispuesto a hacer algo\nContrario a algo\nQue no permite que una acción se ejerza sobre él",
              "Idea de hacer o actuar e idea de que procede de uno mismo\nUna persona que actúa sin que nadie se la haya dicho\nAcción de adelantarse a otros en algo",
              "Que muestra arrebatamiento (osadia/conducta imprudente)\nAtrevido/Temerario/Arriesgado\nCapaz de acometer empresas arriesgadas o peligrosas\nValor y osadía",
              "Aliviar (aminorar/atenuar) el sufrimiento\nDisminuir la enfermedad (el dolor físico/dolor moral) de un acontecimiento perjudicial",
              "Idea de vinculación o unión con algo\nVinculado/Relacionado/Unido\nQue se identifica con una causa común\nSe dice de las personas que responden jurídicamente las unas de las otras",
              "Que se busca en los hechos (en la acción/práctica/experiencia)\nPráctico\nSe adapta a las circunstancias\nRelacionado con la lingüística"]


const useStyles = makeStyles((theme) => ({
  img:{
      width:"45%"
  },
  fields:{
    display: "inline-grid",
    width:"30%"
  },
  field:{
    paddingTop:"6%",
    
  },
  textfield:{
    width:"100%"
  },
  ordenar:{
      display:"inline-flex"
  },
  root: {
    maxWidth: 245,
    maxHeight: 345,
  },
}));

let retornoHecho = true; // Esta variable me ayuda a controlar el uso de la regla del retorno
let retorno = false; // Esta variable me ayuda a controlar el uso de la regla del retorno
let countRe = 0; //Esta variable me dice cuando se puede salir de la condición de retorno
let flagRe = null;//Esta variable me ayuda a decir en que posicion quedo el paciente antes de entrar al retorno 
let terminacion= 0; //Esta variable me dice cuantos ceros consecutivos tuvo el paciente
let firstItem;// Item en el que inicio la prueba

function Vocabulario(props) {
  const [state,setState]=useState("instruccion")
  const [results, setResults] = React.useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsAux ,setResultsAux] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)
  const classes = useStyles();

  function changeStimuli(key){

    if(state==='test' || 'testImage'){
      
      if(retorno){

        if(numberItem===4){
          setState('testImage')
        }
        
        if(0!==key){
          countRe++;
          if(countRe===2){

            if(state==='testImage'){
              setState('test')
            }

            retorno=false;
            retornoHecho=false;
            terminacion=0
            setNumberItem(flagRe)
            return 
          }
        }
        else {
          countRe=0
          terminacion++;
          setResults(update(results,{
            [numberItem-1]: {
              $set: key
            }}))
        }        
      }
      else{

        if(0!==key){

          
    
          setResults(update(results,{
            [numberItem-1]: {
              $set: key
            }}))
          terminacion=0
        }
        else{
       
          if((numberItem===firstItem || numberItem===firstItem+1) && retornoHecho){

            
            retorno=true;
            flagRe=numberItem+1;
            setNumberItem(firstItem-1);
            terminacion++;
            return                        
          }
          else terminacion++;
          
        }

        if(numberItem===3){
          setState('test')
        }
        
      }


      if(numberItem===NUMBER_STIMULI || (numberItem===1 && retornoHecho)|| terminacion===LIMIT_ERROR){
        if(numberItem===1 ||retorno)setResults(new Array(NUMBER_STIMULI).fill(0))
        setState('results')
      }
      else{      
        if(retorno)setNumberItem(numberItem-1);
        else setNumberItem(numberItem+1);
      }
      
    }
  }

  function imagenInit(item){
    
    if(item!==1){
      let arrayAux = results
      for (let i = 0; i < 3; i++) {
        arrayAux[i]=1
      }
      for (let i = 3; i < item-1; i++) {
        arrayAux[i]=2
      }
      setResults(arrayAux)
    }
    else{
      retornoHecho=false
    }

    firstItem=item
    setNumberItem(item)

    if(item<=3){
      setState("testImage")
    }else if(item>3){
      setState("test")
    }
    
  }

  function getResult() {
    var total = 0;
    for(var i=0;i<results.length;i++){
      total = total + results[i];
    }

    if(!props.resWechsler.hasOwnProperty('V')){
      props.setResWechsler('V',total)
    }else{
      if(props.resWechsler['V'] !== total){
        props.setResWechsler('V',total)
      }
    }

    return total;
  }


  function content(){
    switch (state) {
      case "instruccion":
        return(
          <div>
            <h1>Vocabulario</h1>
            <b>Intrucciones generales:</b>
            <p>Para los items del uno al tres la tarea del paciente consiste en nombrar una serie de imagenes presentadas</p>
            <p>Para el resto de los items la tarea del paciente consiste en definir oralmente una serie de palabras que el examinador lee en voz alta</p>
            <p>Los items se presentan de forma verbal</p>
            <br/>
            <b>Intrucciones para registrar la respuesta de paciente:</b>
            <p>Para calificar se debe presionar el botón que corresponda con la calificacion que desea dar al item </p>
            <p>Recuerde, debe escribir de manera literal la respuesta dada por el paciente en el espacio disponible</p>
            <li>0 : Una respuesta verbal que no muestra un conocimiento real de la palabra</li>
            <li>1 : En general se trata de respuestas correctas pero con contenido escaso o pobre</li>
            <li>2 : La respuesta refleja una buena comprensión de la palabra</li>
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
            <h1>Vocabulario</h1>
            <p>En que estimulo desea iniciar la prueba? </p>
            <p>Pacientes con sospechas de discapacidad intelectual</p>
            <CustomButton
            msj="Estimulo 1"
            callback={()=>imagenInit(1)}
            ></CustomButton>
            <p>Pacientes de edad 16-89:</p>
            <CustomButton
            msj="Estimulo 5"
            callback={()=>imagenInit(5)}
            ></CustomButton>      
          </div>
        )
        case "testImage":
          return(
            <div >
              <h1>Item #{numberItem}</h1>
          
              <img 
               className={classes.img}
               alt={"Estimulo "+numberItem}
               src={require("../../../assets/estimulos/vocabulario/0"+numberItem+".jpg")} />
               <KeyboardEventHandler 
               handleKeys={['0','1']} 
               onKeyEvent={(key, e) => {
                 changeStimuli(parseInt(key))
                 }} />

              <br></br>
          
              <div className={classes.ordenar}>
                <CustomButton
                  msj="0 Puntos"
                  callback={()=>changeStimuli(0)}
                ></CustomButton>
                &nbsp; &nbsp;
                <CustomButton
                  msj="1 Punto"
                  callback={()=>changeStimuli(1)}
                ></CustomButton>
              </div>    
     
            </div>
          )
      case "test":
        return(
        <div > 
          <h1>Item #{numberItem}</h1>
          
          <h2>¿Qué es {items[numberItem-1]}?</h2> 
          
          <div className={classes.ordenar}>
            <div >
              <Typography gutterBottom variant="h5" component="h2">
                0 puntos
              </Typography>
              <Card className={classes.root}>
                <CardContent>
                  {answer0[numberItem-1].split("\n").map((i,key) => {
                    return <div key={key}>
                      <Typography variant="body2" color="textSecondary" component="p" >
                        {i}
                      </Typography> 
                    </div>;
                  })}
                </CardContent>
              </Card>
            </div>
            &nbsp;  &nbsp; &nbsp;  &nbsp;
            <div >
              <Typography gutterBottom variant="h5" component="h2">
                1 punto
              </Typography>
              <Card className={classes.root}>
                <CardContent>
                  {answer1[numberItem-1].split("\n").map((i,key) => {
                    return <div key={key}>
                      <Typography variant="body2" color="textSecondary" component="p" >
                        {i}
                      </Typography> 
                    </div>;
                  })}
                </CardContent>
              </Card>
            </div>
            &nbsp;  &nbsp; &nbsp;  &nbsp;
            <div >
              <Typography gutterBottom variant="h5" component="h2">
                2 puntos
              </Typography>
              <Card className={classes.root}>
                <CardContent>
                  {answer2[numberItem-1].split("\n").map((i,key) => {
                    return <div key={key}>
                      <Typography variant="body2" color="textSecondary" component="p" >
                        {i}
                      </Typography> 
                    </div>;
                  })}
                </CardContent>
              </Card>
            </div>
          </div>  

          <br/>
          <br/>
          <div className={classes.ordenar}>
            <CustomButton
              msj="0 Puntos"
              callback={()=>changeStimuli(0)}
            ></CustomButton>
            &nbsp; &nbsp;
            <CustomButton
              msj="1 Punto"
              callback={()=>changeStimuli(1)}
            ></CustomButton>
            &nbsp; &nbsp;
            <CustomButton
              msj="2 Puntos"
              callback={()=>changeStimuli(2)}
            ></CustomButton>
          </div>  

        </div>)
      case "revision":
        return(
        <div>
          <h1>Vocabulario</h1>
          <h3>El puntaje por cada Item fue: </h3>
          <div className={classes.fields}>
            {results.map((result,index)=>
              <div key={index} className={classes.field}>
                <TextField
                  className={classes.textfield}
                  id="filled-number"
                  label={"Item "+(index+1)}
                  type="number"
                  defaultValue={result}
                  inputProps={ index<2 ? {min:0, max:1} : {min:0, max:2} }
                  variant="outlined"
                  onChange={(x)=>
                    setResultsAux(update(resultsAux,{
                      [index]: {
                        $set: parseInt(x.target.value)
                      }}))}
                />
              </div>
              )}
            </div>
            

            <div id='buttons'>
              <CustomButton              
              msj="Regresar"
              callback={()=>setState("results")}
              ></CustomButton> 
              <CustomButton             
              msj="Actualizar Datos"
              callback={()=>{
                setResults(resultsAux)
                setState("results")
              }}
              ></CustomButton> 
            </div>
        </div>
        )
      case "results":
        return(
         <Results
         name="Vocabulario"
         result={getResult()}
         callback={()=>{
          setResultsAux(results) 
          setState("revision")
          }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Vocabulario);

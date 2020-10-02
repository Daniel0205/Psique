import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import update from 'react-addons-update';
import { makeStyles } from '@material-ui/core/styles';
import Results from '../../../components/results'
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";

const LIMIT_ERROR = 3

const NUMBER_STIMULI = 18

let example = ["Dos","Siete"];

let items =  [["Tenedor","Cuchara"],["Brocoli","Espinaca"],["Caballo","Tigre"],
              ["Piano","Tambor"],["Barco","Automóvil"],["Calcetines","Zapatos"],
              ["Alegria","Miedo"],["Huevo","Semilla"],["Comida","Gasolina"],
              ["Vapor","Niebla"],["Poema","Estatua"],["Ancla","Valla"],
              ["Cubo","Cilindro"],["Música","Marea"],["Sedentario","Nómada"],
              ["Amigo","Enemigo"],["Siempre","Nunca"],["Permitir","Prohibir"]];

let answer0 =  ["Los dos son largos\nLos dos se cogen con la mano\nEstan hechos de metal(plastico)",
                "Legumbres\nTienen hojas\nSon del mismo color",
                "Los puedes ver en el zoo\nPertenecen a la misma especie(P)\nLos tigres se comen a los caballos\nSon salvajes/Viven en la naturaleza/Viven en libertad",
                "Tienen ritmo\nPuedes golpearlos/tocarlos\nMi hermano tiene un tambor y toca el piano",
                "Barco para navegar y coche para viajar\nTienen motor(ruedas/asientos)\nNecesitan gasolina",
                "Van juntos/Uno complementa al otro\nLos dos son marrones",
                "Lo que sientes cuando estás feliz\nSon opuesto/Lo contrario",
                "Los dos están en la naturaleza\nUno se come y el otro se planta\nSe comen",
                "Son caros/Cuestan dinero\nSe compran/Se encuentra en las tiendas\nPara viajes\nPara existir (vivir/sobrevivir)",
                "Falta de visibilidad/No dejan ver bien\nHumo/Se parece al humo\nSon densos/Son blancos",
                "Romántico\nDe una estatua puedes escribir un poema\nPoema para leer,estatua para observar",
                "Sujetar/Sujeción\nHecho de metal (madera)\nBarreras\nEntan fijados en la tierra",
                "Formas/Figuras\nRecipientes/Continentes\nMatemáticas\nRedondos",
                "Hacen ruido/Producen sonido\nArte/Artístico\nMúsica de las ondas/Las olas suenan como la música\nMarea es un grupo de música",
                "Estilo de vida\nAntepasados\nCaracterísticas de la vida del ser humano\nUno no se mueve y el otro si",
                "Personas/Individuos/Humanos\nPersonas que conocer/Personas que conoces bien\nTodos tenemos de los dos",
                "Cuando ocurren las cosas\nDecisiones y acciones que toma la gente\nCantidad de algo\nFinito",
                "Reglas/Leyes/Normas\nFormas de disciplina\nOrdenes/Muestra de poder\nAlgo que los padres hacen/Cosas que haces a los niños"] 

let answer1 =  ["Para comer\nLos llevas a la boca/Para la boca\nTienen mango\nLos pones sobre la mesa",
                "Alimentos/Comestibles\nSe cocinan\nCrecen en el campo\nSon saludables(Nutritivas)/Tienen Vitaminas\nContienen fibra",
                "Tienen cuatro patas/Tienen cola(Cualquier característica física)\nSeres vivos\nSon rápidos(fuertes)",
                "Reproducen obras de arte\nCosas ruidosas\nAmbos se tocan con las manos",
                "Para desplazarnos/Para moverse/Para viajar/Para ir de un lado a otro\nLlevan gente o cosas\nLos dos se mueven\nHan de ser conducidos",
                "Idea de ropa (complementos) sin referencia a los pies\nPrenda de vestir/Ropa/Complementos\nCalzado",
                "Sensaciones\nFormas de sentir\nEstados",
                "Referencia vaga a la vida/Son origen de algo\nPrincipio de algo/Nace algo\nLos dos producen algo/Para crear\nLas dos dan frutos",
                "Combustibles\nQue permiten funcionar\nComida/Alimento\nNecesidades/necesarios",
                "Idea de agua sin la idea de estado o visceversa\nHumedad/Son húmedos/Formas gaseosas/Gaseoso\nSon del agua\nCondensación\nResultado de las condiciones ambientales",
                "Arte\nFormas de expresión\nCreaciones propias del hombre\nObras que sirven para enriquecernos",
                "Paran cosas/Evitan que algo se vaya/No dejan ir más allá\nContienen algo/Sujetan algo/Impiden algo\nProtegen cosas/Para protección/Elementos de protección",
                "Noción de geometría\nFormas geométricas\nGeometría",
                "Son relajantes (Calmantes/tranquilizantes)\nOndas sonoras\nFluyen\nAltos y bajos",
                "Una idea de las tres siguientes: Habitat/Modo de viva/Desplazamiento",
                "Apreciaciones (percepciones) sobre los demás\nSentimientos que tienes por alguien\nTienes relación con ambos/Relaciones entre personas",
                "Son dos formas de tiempo/expresiones de tiempo\nCosas externas\nRelacionado con el tiempo\nTiempo/Medidas/Dimensiones",
                "Algo que tiene que ver con la autoridad/Formas de autoridad\nMétodos de guiar el comportamiento\nReglas que orientan el comportamiento\nLimites/Limitaciones/Exclusiones\nNiveles de acceso"]

let answer2 =  ["Cubiertos/Cubertería\nInstrumentos(utensilios) que sirven para comer\nCosas con las que comes",
                "Hortalizas/Verduras/Vegetales",
                "Animales/Mamiferos/Cuadrúpedos\nMiembros del reino animal",
                "Instrumentos\nInstrumentos musicales (de percusión)\nPara hacer música/Para crear musica",
                "Vehículos/Medios de tranporte/Transportes\nAmbos sirven para transportar gente\nMedios para viajar(Ir de un sitio a otro)",
                "Referencia a los pies\nPara (cubren/se ponen en) los pies",
                "Sentimientos del ser humano\nEmociones/Estados de ánimo\nReacciones psicológicas",
                "Referencia al origen de la vida o de nuevos seres\nLos dos son del origen de un ser vivo/Principio de un nuevo ser/Generan formas de vida\nEmbriones\n",
                "Energía\nSon fuentes(tipos/forma) de energía\nDan (producen) energía",
                "Ideas de estado e idea de agua\nEvaporacion del agua\nFormas de agua/Diferentes estados del agua\nAgua condensada\nHumedad en forma gaseosa/Formas de humedad",
                "Obras (formas) de arte\nCreaciones (exoresiones) artísticas",
                "Mantienen (Retienen) cosas en su lugar\nPor seguridad/Elementos de seguridad\nLimitan (dekimitan/restringen) el movimiento de las cosas",
                "Noción de volumen\nVolúmenes/Formas volumétricas\nFormas (figuras) geométricas en 3 dimensiones (en el espacio)\nSe miden en metros cúbicos",
                "Rítmicas/Tienen ritmo\nTienen (son) movimientos\nComportamiento ondulatorio/Tienen ondas/Transmiten ondan sinusoidales\nTienen compás",
                "Dos ideas de las tres siguientes: Habitat/Modo de viva/Desplazamiento",
                "Personas que influyen en tu vida\nPersonas hacia las que tienes fuertes sentimientos",
                "Extremos de tiempo (frecuencia)\nMedidas absolutas\nCosas definitivas",
                "Formas (maneras) de ejercer la autoridad\nManeras (formas) de controlar la conducta\nMedio (métodos) de control del comportamiento"]

const useStyles = makeStyles((theme) => ({
  ordenar:{
      display:"inline-flex"
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

function Semejanzas(props) {
  const [state,setState] = useState("instruccion")
  const [results, setResults] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsAux ,setResultsAux] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)
  const classes = useStyles();

  function changeStimuli(key){

    if(state==='test'){
      
      if(retorno){
        
        if(0!==key){
          countRe++;
          if(countRe===2){
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
      for (let i = 0; i < item-1; i++) {
        arrayAux[i]=2
      }
      setResults(arrayAux)
    }
    else{
      retornoHecho=false
    }

    firstItem=item
    setNumberItem(item)
    setState('ejemplo')
  }

  function getResult() {
    var total = 0;
    for(var i=0;i<results.length;i++){
      total = total + results[i];
    }

    if(!props.resWechsler.hasOwnProperty('S')){
      props.setResWechsler('S',total)
    }else{
      if(props.resWechsler['S'] !== total){
        props.setResWechsler('S',total)
      }
    }

    return total;
  }


  function content(){
    switch (state) {
      case "instruccion":
        return(
          <div>
            <h1>Semejanzas</h1>
            <b>instrucciones generales:</b>
            <p>Se presentarán dos palabras que representan objetos o conceptos comunes</p>
            <p>La tarea del paciente es determinar en que se parecen esos objetos o conceptos</p>
            <p>Los items se presentan de forma verbal</p>
            <br/>
            <b>instrucciones para registrar la respuesta de paciente:</b>
            <p>Para calificar se debe presionar el botón que corresponda con la calificación que desea dar al item </p>
            <p>Recuerde, debe escribir de manera literal la respuesta dada por el paciente en el espacio disponible</p>
            <li>0 : Cualquier clasificación general que es poco pertinente y que define con poca precisión ambos elementos</li>
            <li>1 : Cualquier propiedad común que supone una semejanza secundaria o menos pertinente</li>
            <li>2 : Cualquier clasificación general pertinente y que define con precisión ambos elementos</li>
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
            <h1>Semejanzas</h1>
            <p>¿En qué estímulo desea iniciar la prueba? </p>
            <p>La prueba se inicia en el estimulo 4 para los pacientes entre los 16-89 años </p>
            <CustomButton msj="Siguiente"
            callback={()=>imagenInit(4)}></CustomButton>       
          </div>
        )
        case "ejemplo":
          return(
            <div >
              <h1>Ejemplo</h1>
          
              <h2>¿En que se parecen {example[0]} y {example[1]}?</h2>      
          
              <div className={classes.ordenar}>
                <div >
                  <Typography gutterBottom variant="h5" component="h2">
                    0 puntos
                  </Typography>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p" >
                        Sin respuesta
                      </Typography>
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
                      <Typography variant="body2" color="textSecondary" component="p" >
                        Cualquiera que incluya números
                      </Typography>  
                    </CardContent>
                  </Card>
                </div>
              </div>    

              <CustomButton
                  msj="Siguiente"
                  callback={()=>setState("test")}
              ></CustomButton>
     
            </div>
          )
      case "test":
        return(
        <div > 
          <h1>Item #{numberItem}</h1>
          
          <h2>¿En que se parecen {items[numberItem-1][0]} y {items[numberItem-1][1]}?</h2> 
          
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
          <h1>Semejanzas</h1>
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
         name="Semejanzas"
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

export default connect(mapStateToProps, mapDispatchToProps)(Semejanzas);

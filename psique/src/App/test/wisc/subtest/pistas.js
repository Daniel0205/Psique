import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import WaisWiscReturnButton from '../../../components/WaisWiscReturnButton';
import update from 'react-addons-update';
//import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import Results from '../../../components/results'
import TextField from '@material-ui/core/TextField';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
//import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import { setBody } from "../../../store/body/action";

const LIMIT_ERROR = 5

const NUMBER_STIMULI = 24

let clues =["1. Sirve para secarse después de que te bañas",
            "2. Sirve para oler cosas",
            "3. Es un satélite natural...\n-Y sólo puedes verlo en la noche.",
            "4. Es un animal con trompa y grandes orejas.",
            "5. Se pone en la cabeza para protegerse del frío y del sol.",
            "6. Tiene una perilla o picaporte y la gente puede abrirla para pasar.",
            "7. Mezcla de tierra con la lluvia...\n-Y puedes manchar con esto tu ropa o el piso.",
            "8. Tiene cosas del pasado o antiguas...\n-Y en este lugar se se exhiben cosas interesantes.",
            "9. Líquido de colores...\n-Y se usa para poner en las paredes.",
            "10. Esta es una habitación donde la gente duerme. ",
            "11. Proviene de los charcos/ estanques en la costa del mar...\n-Y es útil para (aderezar, condimentar, sazonar) los alimentos.",
            "12. Nacen al pie de las montañas...\n-Y Por lo general desembocan en el océano.",
            "13. Son los responsables de que tu cuerpo funcione...\n-Y algunos de ellos se pueden trasplantar.",
            "14. Conduce a nuevos descubrimientos...\n-Y comprende un proceso con una serie de pasos…\n-Y puede incluir experimentos.",
            "15. Facilita la convivencia de las personas que son diferentes…\n-Se rompe cuando hay conflictos sociales…-Y es algo que la ONU y muchos gobiernos tratan de mantener.",
            "16. Son normas que debe respetar el ciudadano...\n-Y están escritas con el fin de proteger la sociedad.",
            "17. La gente lo hace para arreglar edificios viejos…\n-Y se hace para devolver el aspecto original de algo.",
            "18. No se detiene\n-No se toca\n-Y se puede medir",
            "19. Es un permiso oficial…\n-Por lo general lo otorga una autoridad…\n-Y puede ser que hagas un examen para obtenerlo.",
            "20. Lo festejas…\n-Aumenta cada año…\n-Y te hace más grande.",
            "21. Nunca se ha visto…\n-Mejora nuestras vidas…\n-Y se puede provocar que la gente gane premios.",
            "22. Este es un lugar…\n-Y te protege de los cambios de clima...\n-Y se halla dentro de otra cosa.",
            "23. Puede ser un río…\n-Y las guerras pueden cambiarlo…\n-Y dos países pueden compartirlo.",
            "24. Ha pasado…\n-Y se puede contar... \n-Y otorga lecciones a la gente."]




let rightAnswer = ["Toalla\nSecador para el pelo\nSecador de aire\njerga\nTrapo",
                  "Nariz, Fosa nasal",
                  "Luna\nEstrellas\nAurora boreal\nConstelaciones\nPlanetas\nSatélite",
                  "Elefante",
                  "Sombrero\nCachucha\nGorra\nCasco\nVisera\nCapucha\nBonete\nBufanda\nPeluca\nPelo\nDiadema",
                  "Puerta\nPuerta mosquitera [Cualquier puerta específica]\nCancel",
                  "Lodo\n(Pasto, tierra) húmedo\ncharcos\nAgua sucia\nNieve\nAgua nieve\nHielo",
                  "Museo\nBiblioteca\nIglesia",
                  "Pintura",
                  "Recamara\nCuarto de huéspedes",
                  "Sal",
                  "Río\nRiachuelo\nArroyo\nTorrente\nManantial\nCascada\nFuente\nPuerto\nBahía\nEstuario  ",
                  "Órgano\nCorazón [Cualquier órgano que se pueda trasplantar]",
                  "Ciencia\nInvestigación\nMétodo científico\nInventar\nInvención\nBiología [Cualquier ciencia específica]\nSolución de problemas\nExperimentación\nRazonamiento deductivo\nHipótesis\nExploración\nTecnología\nTeorías",
                  "Paz\nLibertad\nAutonomía\nLey\nSeguridad\nControl\nPoder\nOrden\nJusticia\nDerechos\nReglas\nDinero\nRiqueza\nSalvaguardia\nAutoridad",
                  "Ley\nRegla\nContrato\nPóliza\nTestamento\nConstrucción\nDeclaración de independencia [ Cualquier documento histórico específico]\nTratado\nConvenio\nDerechos",
                  "Restaurar\nReparar\nArreglar\nReconstruir\nRearmar\nRehabilitar\nRenovar\nVolver a armar\nComponer\nReconstruir\nRepintar\nReamueblar\nBarnizar",
                  "Tiempo\nEnvejecimiento\nRotación de la tierra\nLuz",
                  "Visa\nLicencia\nLicencia de manejo [Cualquier licencia específica]\nPermiso\nTarjeta de inmigración\nCredencial de elector\nBeca\nNaturalización\nPatente\nDerecho de autor",
                  "Edad\nCumpleanos\nEstatura",
                  "Desubrimiento\nInvencion\nInnovacion\nTEcnologia\nImaginacion\nCreatividad\nSueno",
                  "Interiores\nHabitacion\nRecamara [Cualquier habitacion especifica]\nSotano\nAtico\nDentro dela casa\nBoveda\nCaja fuerte\nRefugio (subterraneo,Contra Bombas)\nCueva\nTunel\nBunker",
                  "Frontera\nLimite\nLinea fronteriza\n(linea , marca) territorial\nCanal\nRio Bravo\n[Cualquier rio fronterizo especifico]",
                  "Historia\nPasado\n(Acciones, Pensamientos, Decisiones, Errores) Pasados Ayer\nRecuerdos\nDescubrimientos"]

let badAnswer = ["Tina\nBaño",
                  "Rostro\nMente\nCerebro\nSentido\nBoca\nLengua",
                  "Luciernaga\nSol\nNubes\nMurciélagos\nBúhos\nAviones",
                  "Ciervo\nCerdo\nOso hormiguero",
                  "Sabana\nToalla",
                  "(Perilla, manija) de la puerta\nGabinete",
                  "Escarcha\nHumedad\nPasto\nAgua\nTierra\nBarro",
                  "Escuela\nColegio\nUniversidad\nSalón de Clases\nClase\nLaboratorio\nLibro\nMemoria\nGuardería\nHogar",
                  "Papel tapiz\nIlustración\nMarco\nCartel\nCortinas\nTela\nCuadro\nTiza\nArcoiris\nHojas otoñales\nCrayones\nMarcadores\nPluma",
                  "Cama\nApartamento\nHotel ",
                  "Agua\nAlgas\nSazonadores",
                  "Océanos\nMar\nBallena\nLluvia\nPozo\nCanal",
                  "Cartílago\nPiel\nAnginas\nCerebro\nDientes\nHuesos\nOperación\nPartes del cuerpo\nEntrañas\nCélula",
                  "Pruebas de laboratorio\nExámenes\nProyectos\nMicroscopios\nAprendizaje\nEnseñanza\nEstudio",
                  "Revolución\nPropiedad de la tierra\nLiderazgo\nEstado\nPaís",
                  "Juramento\nseguros\nInstrucciones",
                  "Rehacer\nRegenerar\nConstruir\nActualizar\nLimpiar\nRegresar a la tienda\nPegar\nUnir con cinta adhesiva",
                  "Viento\nHistoria\nFuturo\nAire\naño(cualquier unidad específica de tiempo)\nEdad",
                  "Seguro social\nVle de alimento\nDErecho al voto\nConcesion de tierra\nEmpleo\nTRabajo\nGrado",
                  "Calendario\naños\nMeses\nPesos\nTalla\nTiempo\nCrecimiento ",
                  "Esperanza\nFelicidad\nViaje intergalactico [Cualquier descubirmiento que no haya sucedido]\nPensamientos\nAprendizaje\nPaz\nIdea\nTelepatia\nInformacion",
                  "Casa\n[Cualquier construccion especifica]\nSubterraneo\nAlbergue\nArco\nDepartamento\nTienda en un centro comercial",
                  "Presa\nPuente\nDIvision\nHito\nPared\nNilo\n[Cualquier rio especifico no fronterizo]\nDivision",
                  "Noticias\nFuturo\nGuerra\nMilenio [Cualquier suceso historico]\nBebe\nNacimiento"]

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
  container: {
    width: "60%",
    display: "inline-flex",
  },
  card: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 20,
    marginTop: 10,
    paddingBottom: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  cardContent: {
    padding: 5,
    paddingBottom: 5,
  },
}));


let retornoHecho = true; // Esta variable me ayuda a controlar el uso de la regla del retorno
let retorno = false; // Esta variable me ayuda a controlar el uso de la regla del retorno
let countRe = 0; //Esta variable me dice cuando se puede salir de la condición de retorno
let flagRe = null;//Esta variable me ayuda a decir en que posicion quedo el paciente antes de entrar al retorno
let terminacion= 0; //Esta variable me dice cuantos ceros consecutivos tuvo el paciente
let firstItem;// Item en el que inicio la prueba
      

function Pistas(props) {
  const [state,setState] = useState("seleccion")
  const [results, setResults] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsAux ,setResultsAux] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)
  const classes = useStyles();

  function changeStimuli(key){

    if(state==='test'){
      
      if(retorno){
        
        if(1===key){
          countRe++;
          terminacion=0
          if(countRe===2){
            retorno=false;
            retornoHecho=false;
            setNumberItem(flagRe)
            return 
          }
        }
        else {
          countRe=0
          terminacion++;
          setResults(update(results,{
            [numberItem-1]: {
              $set: 0
            }}))
        }        
      }
      else{
        if(1===key){
          
          setResults(update(results,{
            [numberItem-1]: {
              $set: 1
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
        arrayAux[i]=1
      }
      setResults(arrayAux)
    }
    else{
      retornoHecho=false
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

    if(!props.resWechsler.hasOwnProperty('PC')){
      props.setResWechsler('PC',total)
    }else{
      if(props.resWechsler['PC'] !== total){
        props.setResWechsler('PC',total)
      }
    }

    return total;
  }


  function content(){
    switch (state) {
      case "instruccion":
        return(
          <div>
            <h1>Pistas</h1>
            <b>Instrucciones generales:</b>
            <p>A continuación se darán una serie de pistas al paciente</p>
            <p>el cual deberá relacionarlo con un concepto. </p>
            <br/>
            <b>Instrucciones para registrar la respuesta de paciente:</b>
            <br/>
            <li>La respuesta dada por el paciente debe ser registrada en la casilla de respuesta</li>
            <li>Se debe escoger, teniendo en cuenta la guía, entre 0 y 1 para la puntuación de la respuesta</li>
            <br/>
            <Grid container justify="center">
              <WaisWiscReturnButton
                msj="Regresar a prueba"
                callback={()=>setState("seleccion")}
              ></WaisWiscReturnButton>          
            </Grid>
          </div>
        )
      case "seleccion":
        return(
          <div >
            <h1>Pistas</h1>
            <p>¿En qué estímulo desea iniciar la prueba? </p>
            <p>Pacientes con sospechas de discapacidad intelectual o de edad 6-9:</p>
            <CustomButton
              msj="Estímulo 1"
              callback={()=>imagenInit(1)}
            ></CustomButton>
            <p>Pacientes de edad 10-16:</p>
            <CustomButton
              msj="Estímulo 5"
              callback={()=>imagenInit(5)}
            ></CustomButton>       
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
          </div>
        )
      case "test":
        return(
        <div > 
          <h2>{clues[numberItem-1]}</h2>

          <Grid container spacing={3} justify="center" className={classes.container}>
            <Grid item xs={6}>
              <Typography gutterBottom variant="h5" component="h2"> 0 puntos </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom variant="h5" component="h2"> 1 punto </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} justify="center" className={classes.container}>
            <Grid item component={Card} xs className={classes.card}>
              <CardContent className={classes.cardContent}>
                {badAnswer[numberItem-1].split("\n").map((i,key) => {
                  return <div key={key}>
                      <Typography variant="body2" color="textSecondary" component="p"> {i} </Typography> 
                    </div>;
                })}
              </CardContent>
            </Grid>              
              
            <Grid item component={Card} xs className={classes.card}>
            <CardContent className={classes.cardContent}>
                {rightAnswer[numberItem-1].split("\n").map((i,key) => {
                return <div key={key}>
                    <Typography variant="body2" color="textSecondary" component="p" > {i} </Typography> 
                  </div>;
                })}
              </CardContent>
            </Grid>          
          </Grid>
          
          <br/>          
          <div className={classes.ordenar}>
            <CustomButton
              msj="0 Puntos"
              callback={()=>changeStimuli(0)}
            ></CustomButton>
            &nbsp; 
            <CustomButton
              msj="1 Punto"
              callback={()=>changeStimuli(1)}
            ></CustomButton>            
          </div>
        </div>)
      case "revision":
        return(
        <div>
          <h1>Pistas</h1>
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
                  inputProps={{
                    min:0,
                    max:1,
                  }}
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
         name="Pistas"
         result={getResult()}
         callback={()=>{
          setResultsAux(results) 
          setState("revision")
          }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Pistas);
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

const NUMBER_STIMULI = 23

let example = ["Rojo","Azul"]

let items =  [["Leche","Agua"],["Pluma","Lápiz"],["Gato","Ratón"],
              ["Manzana","Plátano"],["Camisa","Zapato"],["Invierno","Verano"],
              ["Mariposa","Abeja"],["Madera","Ladrillos"],["Enojo","Alegria"],
              ["Poeta","Pintor"],["Pintura","Estatua"],["Montaña","Lago"],
              ["Hielo","Vapor"],["Codo","Rodilla"],["Mueca","Sonrisa"],
              ["Inundación","Sequía"],["el Primero","el Último"],["Hule","Papel"],
              ["Permiso","Prohibición"],["Sal","Agua"],["Venganza","Perdón"],
              ["la Realidad","la Fantasía"],["el Espacio","el Tiempo"]];

let answer0 =  ["Humedos/Tienen agua\nPuedes (verterlos/derramarlos)\nVienen en un envase o jarra\nTienen vitaminas",
                "Tienen (punta afilada,gomas)\nTienen (tinta/grafito) dentro de ellos\nSon de la misma forma/Rectos/Largos/Redondos\nVienen en diferentes colores",
                "Ambos viven en casas/Son domésticos\nComen queso/Roban comida\nSon del mismo color\nJuegan/Juegas con ellos\nEnemigos/Se persiguen",
                "Son buenos para ti\nSon del mismo color/Amarilloas\nJugosos/Chiclosos/Se mastican\nVerduras",
                "Se atan/Cierran/Abotonan\nSon de piel/Tejido/Están hechos de tela\nCuestan dinero/Los compras\nLos usas afuera/Son suaves/Del mimo color\n[Señala a los zapatos o la camisa]",
                "Partes de la naturaleza\nVacaciones/Temporada de descanso\nMeses\nDivertidos/Puedes salir y jugar en esos tiempos\nTormentosos/Frios",
                "(Están/Se paran/Se ponen/Comen) en las flores\n(Hacen/Recolectan) miel\nPican\nLas dos estan afuera",
                "Construcción\nCosas que pueden utilizar\nSon duros/pesados/sólidos/ásperos/Fuertes\nProductos naturales/Elementos de la tierra",
                "Algo que tu mente controla\nAcciones/Comportamientos/Cosas que haces\nCosas que puedes ser\nTienes ambos/Te pueden pasar\nSeñas/Apariencias/Rostros/Caras que haces\nParte de (la vida/tu imagen/personalidad/temperamento)",
                "Arte/Tienen que ver con el arte\nEmocionales\nTrabajan con sus (mentes/manos)/Colocan cosas sobre papel\nPersonas famosas/Inspiran a la gente/Hacen mucho dinero\n",
                "Expresiones/Sentimientos/Imágenes\nLas (pintas/dibujas/eriges)\nSe coleccionan/Se compran/Antigüedades/Tesoros\nCuadros/Dibujos/Esculturas/Retratos\nCosas que ves/Puedes verlas",
                "Lugares para (ir/divertirse/escalar)\nLos dos están en exteriores/Están en el (bosque/campo/valle)\nGrandes/Altos/Anchos",
                "Mojados/Húmedos\nLíquidos\nTienen temperatura/Temperaturas\nPuedes hacer uno con el otro\nProducen (bruma/vapor)",
                "Se mueven\nConectan\nHuesos\nRedondos/Curvados/Puntiagudos/Duros/Están cubiertos de piel\nSe rompen/Pueden lastimarse\nLos usas",
                "Movimientos/Acciones/Actos\nReacciones/Tu las haces\nCosas(movimientos/acciones) que relizas(haces) con tu boca(rostro/labios)\nRasgos faciales/Tristeza y felicidad\nUtilizas los músculos\nDe la misma forma/Medios círculos",
                "Relacionados con agua\nTragedias/Problemas/Malas condiciones\nDañinas/Peligrosas/Riesgosas\nAfectan a las (personas/terreno/naturaleza/tierra)",
                "En una linea\nTienen que ver con (un nombre/tiempo)\nNúmeros/Competencia/Carrera\nObtener tu turno",
                "Tienen muchos usos/Se usan en la (escuela/oficina)\nLos dos se pueden (reciclar/quemar)\nArticulos (escolares/de oficina)/Herramientas/Utensilios\nAmbos son (rugosos/lisos/flexibles/delgados)",
                "Los (padres/maestros/adultos) te las dan\nAlgo que se te concede\nSon necesarios para la sociedad\nNo puedes tener el uno sin el otro\nAlgo que puedes(no puedes) hacer",
                "Elementos/Químicos/Minerales\nRecursos/Sustancias/Materiales\nCompuestos organicos\nSe disuelven/Pueden disolver cosas\n",
                "Tipo de resoluciones/Sentiemiento/Emociones\nPensamientos/Actitudes/Expresiones\nTienen que ver contigo y con otra persona\nRasgos humanos",
                "Parecen (reales/verdaderos/verídicos/falsos/ficticios)\nAfectan tu vida/Tienen que ver con tu futuro\nAburridos/Emocionantes/Atemorizantes",
                "Inevitables/Constantes\nIncontrolables/Algo que no podemos cambiar\nSe mueven/Tienen que ver con el movimiento\nFuerzas/Materia/Parte de la ciencia(física)\nEstán en el universo/Maravillas naturales\nVuelas a través de ambos\nSon grandes/pequeños/rápidos/largos"] 

let answer1 =  ["Liquidos/Fluidos\nSon buenos para ti/Sanos\nBebidas/Liquidos para beber/Los dos se toman\n[Demuestra beber]",
                "Cosas con las que (escribes/dibujas/pintas)\nInstrumentos para escribir/Herramientas de dibujo\nArtículos (escolares/de oficina/de arte)\n[Demuestra escribir]",
                "Tienen (Cualquier característica física)\nLos dos comen/Duermen/Se arrastran\nNocturnos/Pueden ver en la oscuridad/Activos en la noche\n",
                "Alimento/Cosas que comes/Comestibles\nCrecen en arboles\nSaben bien/Son dulces\nSaludables/Nutritivas/Tienen vitaminas\nTienen (semillas/cáscara)\nCosas que (pelas/rebanas)",
                "Vestido\nTe lo pones/Cubren o van sobre el cuerpo\nProtegen tu cuerpo/Te mantienen caliente\nLe queda a tu cuerpo o al de otra persona",
                "(Épocas/partes/categorías) del año\nClima/Cambios de clima/Estado climatico\nParte de [nombra todas las estaciones]",
                "Son animales/Criaturas\nTienen alas/Criaturas que vuelas\nTienen (6 patas/cuerpos segmentados)\nRecogen (nectar/polen)/Ayudan a la polinización de las flores\nTienen antenas",
                "Materiales/Recursos materiales/Artículos\nHaces cosas con ellos\nPara los edificios/Partes de tu casa\nSe usan en contrucción/Parte de los cimientos/paredes/cercas",
                "Expresiones/Puedes expresar los dos\nLa manera como te sientes/Formas en que pueden sentirte\nRespuestas/Reacciones/Actitudes\nExpresiones faciales\nLas dos están dentro de ti\nPensamientos",
                "Artisticos/Talentosos/Creativos/Imaginativos/Expresivos\n(Expresan/Ilustran/Transmiten) cosas o puntos de vista\nExpresan sentimientos y emociones\nGanan dinero con su arte/Venden arte",
                "Artísticas/Creativas\nCreaciones/Son hechas por el hombre\n(Formas/Tipos/Clases) de expresion\nSon símbolos/Simbólicas\nEstán en un museo/Pueden ser obras maestras",
                "Lugares de la tierra/Partes de la (Tierra/Planeta/Mundo)\nRasgos físicos\nLo natural/(Patrones/Recursos) naturales\nPanorama/Entorno/Los dos están formados por el clima/Los dos sirven para (recreación/acampar/vacacionar)",
                "Agua/Hecho agua/Creado a partir de agua\nExtremos de la temperatura/Partes del ciclo del agua\n(Formas/Fases/Estado) de la materia/Tienen sustancias quimicas\nPueden volverse líquidos",
                "Te ayudan a doblarte/Se doblan/Son flexibles\nPartes del cuerpo que (conectan huesos/se mueven/son flexibles)\n Partes de los miembros\nTienen (cavidades/ligamentos/cartilago)\nHuesos que (conectan/se doblan/se mueven/sostienen juntos los huesos)",
                "Expresiones/Emociones/Ademanes\nEmociones del rostro/Sentimientos que haces con tu cara\nManeras de decir si alguien está feliz o triste\nAlgo que haces cuando te enojas o estás feliz\nSentimientos/Aspecto de tu rostro/Algo que haces con tu cara/Movimientos faciales\nMuestran felicidad o tristeza",
                "Tienen que ver con (lluvia,precipitación)\n(Problemas/Accidentes) que implican (Agua/Lluvia)\n(Estados/Condiciones) del terreno\n(Condiciones/Patrones) del clima/Causan (devastación/desastres/destrucción)/Arruinan la (agricultura/cosecha)",
                "Puntos que están en un extremo/Ambos extremos\nLugares/Clasificaciones/Posiciones\nLugares o posiciones en una (competencia/deporte/maratón/linea)\nPuntos en (el tiempo/una linea/una carrera)/Puntos designados\nEn una escala/Parte de una escala numérica",
                "Los dos son materiales/Materiales físicos/materiales que usas\nProvienen de la madera\nLos dos estan hechos por el hombre/Manufacturados\nLos dos se usan para hacer productos/cosas",
                "Tienen que ver con (autoridad/control)\nOrdenes/Mandatos/Instrucciones/Disposiciones/Normas/Restricciones\nExpectativas de lo que debes hacer\nConsecuencias de la conducta\nTe permiten hacer algo [Enfásis en el permiso]",
                "Compuestos/Compuestos (físicos/cientificos)\nTienen (elementos/moléculas)\nLas consumen las personas/Son comestibles\nSustancias naturales/Buenas para el cuerpo/Tienen (minerales/nutrientes)\nMateriales para cocinar/Son parte del mar/El cuerpo las transpira",
                "(Resultados/Consecuencias/Desenlaces) de haber sido lastimado\nDecisiones/Elecciones/Opciones/Maneras de reaccionar/Reacciones\nCosas que puedes (conceder/hacerle) a alguien/Actos/Acciones",
                "(Están en/Tienen que ver con) tu (cerebro/cabeza/mente)\nFormas de pensamiento\nPensamiento/Ideas/Sentimientos/Visiones\nLas personas los (experimentan/visualizan)\nTe (imaginas/ves/observas) en ambos\nPuedes vivir en los dos/Maneras en que puedes vivir",
                "Los dos se miden/Mediciones\nA los dos les afecta (la gravedad/relatividad/masa)\nInfinito/Ninguno es absoluto/Limitados/Cosas que se te pueden acabar\nAbstractos/No físicos/No se pueden ver ni tocar/Se puede (mover/viajar) a través de ellos/Escenarios"]

let answer2 =  ["",
                "",
                "Mamíferos/Ambos tienen sangre caliente/Vertebrados\nAnimales/Criaturas/Cuadrúpedos\nSeres vivientes",
                "Frutas",
                "Prendas de vestir/Ropas/Vestimenta\nTe vistes con ellas\nAmbos son parte de un uniforme",
                "Estaciones/Estaciones del año\nTienen solsticios",
                "Insectos/Bichos que vuelan",
                "Artículos(materiales/productos) para la construcción\nArtículos(materiales/productos) para hacer una casa",
                "Emociones/Respuestas emocionales\nSentimientos/Estados de ánimo/Estados mentales",
                "Se expresan a través del arte\nArtistas/Maestros de un arte\nCreadores/Hacen cosas creativas\nTrabajos/Profesiones",
                "Formas de arte/Obras artísticas\nExpresiones(representacione/creaciones) artísticas hechas por artistas\nArte/Tienen que ver con el arte",
                "Aspectos geográficos/topográficos/Características físicas de la tierra\nPaisajes\nGeofráfia/Lugares geográficos\nLos dos son parte del terreno",
                "Son (formas/estados) del agua/Agua en diferente (forma/estados)\nAgua en temperaturas extremas\nCambios físicos en el agua",
                "Estan articulados/Partes del cuerpo con articulaciones\nPartes del cuerpo que se (doblan/flexionan)\nMantienen juntas las partes del brazo o la pierna\nAmbos giras/Funcionana como bisagras",
                "Expresiones faciales/Estados de ánimo de tu rostro\nManeras de mostrar tus sentimientos o emociones\nSe usan para mostrar emociones\nSeñales de emociones",
                "Desastres naturales/Desastres naturales con agua\nClima extremo/Tragedias climáticas\nFormas extremas de clima\n(Actos/Fuerzas) de la naturaleza",
                "Extremos/Posiciones extremas\nPuntos extremos en una secuencia numérica\nPosiciones en una serie\nLugres opuestos\nParte de una secuencia cronológica",
                "Subproductos (Productos/Provienen) de los árboles\nSe elaboran de recursos naturales/Hechos a partir de la naturaleza\nDerivados de las plantas",
                "Métodos de control/Maneras de controlar la conducta\nEstablecen rangos para lo que puedes hacer o como puedes comportarte\nLímites/Pautas/Parámetros\nReglas/Leyes/Reglamentos/Niveles de libertad\nCondiciones de (aprobación/autorización/permiso)",
                "Las necesitas para vivir\nCompuestos químicos\nEl cuerpor las necesita/esenciales para el cuerpo",
                "Decisiones que tomas o cosas que puedes hacer si alguien te ha hecho algo malo\nManeras de afrontar los problemas\nSentimientos asociados a acciones y decisiones",
                "Estados o niveles de conciencia/Niveles del estado de alerta\nEstados o esquemas de la mente/Estados mentales/psíquicos\nManeras (de percibir/ver) el mundo\nModos de pensamiento",
                "Dimensiones/Partes de un continuo\nSon cosas que nos limitan\nIdeas abstractas(no se pueden tocar/ver)\nPermean nuestra existencia"]

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
    
    if(item===3){
      let arrayAux = results

      for (let i = 0; i < item-1; i++) {
        arrayAux[i]=1
      }
      setResults(arrayAux)
    }else if(item===5){
      let arrayAux = results

      for (let i = 0; i < 2; i++) {
        arrayAux[i]=1
      }

      for (let i = 2; i < item-1; i++) {
        arrayAux[i]=2
      }
      setResults(arrayAux)
    }
    else{
      retornoHecho=false
    }

    firstItem=item
    setNumberItem(item)
    setState("ejemplo")
  }

  function getResult() {
    var total = 0;
    for(var i=0;i<results.length;i++){
      total = total + results[i];
    }

    if(!props.resWechsler.hasOwnProperty('SE')){
      props.setResWechsler('SE',total)
    }else{
      if(props.resWechsler['SE'] !== total){
        props.setResWechsler('SE',total)
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
            <p>Para calificar se debe presionar el botón que corresponda con la calificacion que desea dar al item </p>
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
            <p>En que estimulo desea iniciar la prueba? </p>
            <p>Pacientes con sospechas de discapacidad intelectual o de edad 6-8:</p>
            <CustomButton
            msj="Estimulo 1"
            callback={()=>imagenInit(1)}
            ></CustomButton>
            <p>Pacientes de edad 9-11:</p>
            <CustomButton
            msj="Estimulo 3"
            callback={()=>imagenInit(3)}
            ></CustomButton>
            <p>Pacientes de edad 12-16:</p>
            <CustomButton
            msj="Estimulo 5"
            callback={()=>imagenInit(5)}
            ></CustomButton>       
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
                        Cualquiera que incluya colores
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
    setResWechsler: (pro1, pro2) => dispatch(setResWechsler(pro1,pro2)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Semejanzas);

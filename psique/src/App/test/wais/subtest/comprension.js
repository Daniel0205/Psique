import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import update from 'react-addons-update';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import Results from '../../../components/results'
import TextField from '@material-ui/core/TextField';
import { setResWechsler } from "../../../store/wechsler/action";
import { connect } from "react-redux";

const LIMIT_ERROR = 3

const NUMBER_STIMULI = 18

let clues =["Porque la gente lleva reloj?",
            "Porque lavamos la ropa?",
            "Que deberia hacer usted  si se encuentra en la calle un sobre cerrado con la direccion escrita y el sello sin usar?",
            "Porque nos interesamos, cada vez mas en las energias renovables?",
            "Digame algunas razones por las que es importante que un pais tenga buenas relaciones con otro pais.",
            "Que interes puede tener un inventor en patentar una idea?",
            "Porque hay museos?",
            "Porque se necesita receta para comprar ciertos medicamentos?",
            "Porque fue importante, para algunas civilizaciones,la creacion  de la escritura?",
            "Porque es importante para la mayoria de la gente, tener amigos?",
            "Digame algunas razones por las que algunas personas piensan que deberiamos explorar el espacio.",
            "Porque es importante el estudio de la historia?",
            "Porque exije el estado que algunos profesionales obtengan el titulo antes de ofrecer sus servicios al publico?",
            "Que quiere decir el proverbio \"si caes siete veces, levantate ocho\"?",
            "Porque algunas personas piensan que es importante proteger a los animales en peligro de extincion?",
            "Porque cuesta mas un terreno en la ciudad que en el campo?",
            "Digame algunas razones por las que conviene  que haya un regimen de libertad condicional.",
            "Que quiere decir el refran \"una golondrina no hace verano\"",]




let rightAnswer = ["Concepto general de tiempo\nPara decir (saber) la hora\nSaber lo tarde (temprano) que es \nPara llegar o estar a tiempo/ Para no llegar tarde (antes)\nPara mantener la noción del tiempo",
                  "Concepto general de higiene \nIdea de limpieza (de quitar la suciedad)\nHigiene\nPorque se ensucian ",
                  "Concepto general de envío de postal \nEcharlo a uno buzón\nMandarlo por correo ",
                  "Concepto general de protección del medio ambiente o agotamiento de los recursos naturales\nPara proteger el medio ambiente (el planeta)\nPorque las energías tradicionales se agotan ( son contaminantes)\nPorque el petróleo escasea\nPara evitar el calentamiento del planeta",
                  "Una respuesta que indique al menos dos de los conceptos generales anteriores",
                  "Concepto general que haga referencia a los motivos económicos o simple notoriedad \nPara obtener beneficios/Para hacerse rico \nPara ser reconocido por su trabajo/ para ser reconocido ",
                  "concepto general de conservar o exponer el patrimonio o concepto de aprendizaje \nPara exponer (preservar/mostrar/conservar/presentar) las piezas \nPara exponer pinturas (estatuas/cuadros/piezas arqueológicas/cualquier otro objeto más específico)\nPara conservar el patrimonio \nPara cultivarse/aprender/instruirse/informarse/educarse",
                  "concepto general que haga referencia al daño personal asociado al uso de medicamentos sin prescripción\nPara controlar el uso \nPorque pueden hacerte daño \nPara no enfermar o intoxicarse\nPorque puedes tomar una dosis inadecuada\nPorque pueden tener efectos secundarios perjudiciales ",
                  "Permite transcribir el saber\nHa permitido conservar los vestigios y la memoria \nPara dejar una prueba tangible de su existencia\nPrueba escrita de lo que ha existido \nPara poder escribir la historia/Para recuperar la historia",
                  "Una respuesta que indique al menos dos de los conceptos generales anteriores",
                  "Una respuesta que indique al menos dos de los conceptos generales anteriores",
                  "Una respuesta que indique al menos dos de los conceptos generales anteriores",
                  "Una respuesta que indique al menos dos de los conceptos generales anteriores",
                  "Concepto general de no abandonar ante el fracaso \nSeguir intentándolo a pesar de los errores\nNo defraudarse o venirse abajo tras un fallo\nIncluso si las cosas van mal continúa hacia delante",
                  "Concepto general que haga referencia a la idea de la interdependencia de las especies (cadena trófica)\nMantener el balance natural (el ciclo de vida/ la cadena alimentaria)\nCuando unas especies mueren afectan a otras\nTodos los animales contribuyen al ecosistema",
                  "Concepto general que haga referencia a la mayor demanda con la implicación de una oferta  limitada \nLey de la oferta y la demanda \nPorque hay menos terreno y la gente lo quiere más \nHay más gente que lo quiere y, al ser más valorado, sube el precio",
                  "Una respuesta que indique al menos dos de los conceptos generales anteriores",
                  "Concepto general que haga referencia a la idea de no generalizar a partir de un único hecho\nNo conviene sacar conclusiones generales de un hecho aislado\nNo se puede predecir por una simple apariencia\nUn caso no hace la regla\nDe un caso concreto no puede deducirse la generalidad"]

let mediumAnswer =["Concepto general de estetica \nPara ir a la moda/ Por estética\nComo accesorio (complemento/joya)",
                  "Concepto general de apariencia\nPara que no huela (P)\nPara conservarla mejor (P)\nPara tener buena apariencia",
                  "Concepto general que haga referencia un método poco eficaz o inusual de hacer llegar la carta a su destinatario\nLlevarlo a esa dirección/Llevarlo a la policía\nDevolverlo al remitente \nLlevarlo a la oficina de objetos perdidos",
                  "Concepto general vago de protección del medio ambiente o agotamiento de los recursos naturales \nPara no seguir malgastando los recursos naturales de la tierra (P)\nPorque la Tierra está enferma y hay que salvarla",
                  "Una respuesta que indique uno de los conceptos generales anteriores",
                  "Concepto general que haga referencia a la protección de los derechos de propiedad del inventor\nPara evitar que copien(plagien) una idea\nPara que no roben (se apropien de) un invento",
                  "Concepto general vago de conservar o exponer el patrimonio o concepto vago de aprendizaje\nPara ver (poner) objetos antiguos (raros/de valor/huesos de dinosaurios/lo que hacen los artistas)\nPara ver que había en el pasado/para recordar la historia(P)\nPara ver que hay en otros países",
                  "Concepto general vago que haga referencia al daño personal\nLos medicamentos son peligrosos\nPuede crear el hábito(P)\nAlguno crean adicción(P) \nEl médico conoce la dosis adecuada(P)\npor seguridad(P)",
                  "Concepto general vago de transmisión del conocimiento o permanencia de la historia \nPara la comunicación/La enseñanza/El desarrollo de los conocimientos(P)\nPara escribir lo que sucede(P) \nPermite evolucionar/Permite el desarrollo de las civilizaciones(P)",
                  "Una respuesta que indique uno de los conceptos generales anteriores",
                  "Una respuesta que indique uno de los conceptos generales anteriores",
                  "Una respuesta que indique uno de los conceptos generales anteriores",
                  "Una respuesta que indique uno de los conceptos generales anteriores",
                  "Concepto general que haga referencia a la persistencia sin referencia clara al fracaso \nAprender de los errores (P)\nNo abandonar(P)\nSeguir intentándolo(P)",
                  "Concepto general que haga referencia a la importancia de los animales sin una referencia a la interdependencia de las especies\nLos animales pueden desaparecer(P)\nMantener las formas de vida (biodiversidad)(P)\nNo puedes destruir una especie \nDesaparecerían para siempre",
                  "Concepto general que haga referencia vaga a una oferta limitada sin un a clara implicación de una mayor demanda, o viceversa\nEscasea en la ciudad/Menos terreno en la ciudad/Mayor demanda del terreno de la ciudad(P)\nPorque hay más ventajas en la ciudad: teatros, tiendas, transportes, servicios…[ mencion de  más de una ventaja en la ciudad] (p)\nHay (vive) más gente en la ciudad que en el campo (P)",
                  "Una respuesta que indique uno de los conceptos generales anteriores",
                  "Concepto general que haga referencia vaga a la idea de no generalizar a partir de un único hecho \nPorque hagas una cosa bien no significa que todo lo vayas a hacer bien\nSe necesita más de una cosa para decir que se conseguido lo que se pretendía\nUna sola cosa no lo hace todo\nNo hay que generalizar (P)"]


let concepts = ["","","","",
                "-Mantener o formar alianzas/Mantener la paz/Prevenir la guerra \nPara que te ayude si recibes el ataque de otro\nPara no volver a la situación de guerras del pasado  \n\n-Facilitar el intercambio de ideas culturales, información o costumbres\nPara compartir conocimientos\nPara conocer la forma de vida y cultura de otros países\n\n-Proporcionar asistencia en tiempos de crisis o desastres naturales \nPara que te ayuden si hay un terremoto un incendio mandando equipos de rescate o acogiendo a la población\npara que te ayuden económicamente en caso de necesidad \n\n-Facilitar el comercio/Compartir recursos, tecnología o información científica\nPara poder exportar los productos de un país\nPara conocer los avances de investigación o científicos de otro país",
                "","","","",
                "-Por la intimidad, la cercanía, el apoyo emocional\nPara ser feliz se necesita intimidad (cercanía) \nPara nuestro bienestar emocional \nPara tener un punto de apoyo (ánimo/consuelo)\nPorque se tiene a alguien con quien contar (en quien apoyarse)\n\n-Para tener compañía, relaciones sociales, vida social\nLas personas son seres sociales\nEs una necesidad humana/Propia de nuestra naturaleza\nLa vida sería triste (solitaria) sin los amigos\nPara ser feliz se necesita compañia\n\n-Para compartir actividades sociales de intereses\nPara tener a alguien con quien salir (hacer cosas/divertirse)\nPara estar con personas que tienen los mismos gustos (intereses)",
                "-Para buscar recursos naturales u otros lugares de la vida para el ser humano \nBuscar otras alternativas de vida\nPara saber si es posible vivir fuera de la Tierra\nPara buscar otros planetas en los que vivir \n\n-Para hacer avanzar o promover la ciencia y la tecnología \nPara descubrir lo que hay afuera\nPara estudiar las condiciones gravitatorias en el espacio\n\nPara buscar otras formas de vida o amenazas para nuestro planeta \nPara saber si existen extraterrestres \nPara conocer si estamos solos en el universo \n\n-Explorar lo desconocido es la naturaleza humana\nPorque el ser humano es curioso por naturaleza\nPorque nos gusta saber (explorar)",
                "-Para aprender del pasado para entender el presente y el futuro\nPara no repetir los errores/Aprender de los errores\nAplicar lo que se aprende del pasado, al presente y al futuro\nLo que ocurrió en el pasado influye en el presente y el futuro \n\nPara el conocimiento y la comprensión de nosotros mismos, de lo que somos \nPara saber de dónde venimos \nPara saber cómo hemos llegado a lo que somos actualmente\nConocer tus ancestros\n\n-Para el conocimiento y la comprensión de la sociedad \nPara entender la cultura de las sociedades\nPara conocer la evolución política de tu país",
                "-Para la protección al público\nPara no hacer daño a las personas\nPara que no te hagan daño\nPara estar seguro de que haran bien su trabajo \n\n-Para asegurar la cualificación profesional  \nPara estar seguro de que poseen los conocimientos necesarios\nPara estar seguro de que saben hacer su trabajo \nPara evitar el intrusismo profesional",
                "","","",
                "-Para recompensar la buena conducta de los presos \nPorque han demostrado buena conducta \nPorque se portan bien \n\n-Reinserción de los de los presos en la sociedad, “segunda oportunidad”\nPara darles la oportunidad de empezar de nuevo \nPorque cada uno tiene derecho a una nueva oportunidad \n\n-No hay suficientes plazas en las cárceles, masificación.\nPorque hay demasiada gente en las cárceles \nPara poder encarcelar nuevos delincuentes\n\n-Para realizar un control (seguimiento) de los delincuentes.\nPara que no le pierdan las piesta\nPara intentar evitar que vuelvan a cometer un delito",""]



let badAnswer = ["Es un símbolo de estatus\nSon pesados (ligeros)",
                "Hacer la colada (P)\nEs bueno\nPara tener algo que ponernos",
                "Dejarlo donde estaba/No tocarlo\nTirarlo a la papelera\nAbrirlo",
                "Para ahorrar (P)\nPara ahorrar energía (P)\nPor el calor (la calefacción)\nSe ha abusado de las energías naturales",
                "Para ayudar a otros (P)\nPara compartir ideas \nPodemos necesitar algo en el futuro (P)\nPara permitir turismo e inmigración(P)",
                "Para ser famoso\nPara solucionar algo \nPara ayudar ",
                "Para visitarlos \nPara mirar cosas\nPara comprar cuadros \nPara la historia (P)\nPara la importancia de los objetos (P)",
                "Por ley/El gobierno lo exige(P)\nPara estar seguros de que estamos tomando lo correcto(P)\nCualquiera podría comprarlos sin receta(P)",
                "Para expresarse (entenderse)(P) \nPara conservar(P)",
                "Porque es humano\nLa amistad es importante\nEs mejor que la familia\nLos elegimos",
                "Curiosidad/Aventura/Aprendizaje(P)\nPérdida de tiempo y dinero\nDar a los astronautas trabajo",
                "Para conocerla\nPara sentirse más completo \nPara no ser ignorantes ",
                "Para que no se hagan negocios fraudulentos \nPara hacerlo legal",
                "Piensa en positivo \nSi te caes, levántate\nPon la otra mejilla ",
                "Todas las vidas son importantes \nSe merecen vivir\nNo queremos que mueran \nDebemos aprender de los animales \nEs nuestras responsabilidad (P)",
                "Hay más cosas en la ciudad (P)\nEs más difícil vivir en la ciudad (P)\nLos edificios son más grandes, por eso cuestan más",
                "Vaciar las cárceles (P)\nDejar que salgan antes (P)\nLos criminales no deben tener un régimen de libertad condicional ",
                "No hay que creer todo lo que ves(P)\nPara hacer fuerza se tienen que juntar las personas\nPorque debe haber más de una"]

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
  concepts:{
    width:"80%"
  }
}));


let retornoHecho = true; // Esta variable me ayuda a controlar el uso de la regla del retorno
let retorno = false; // Esta variable me ayuda a controlar el uso de la regla del retorno
let countRe = 0; //Esta variable me dice cuando se puede salir de la condición de retorno
let flagRe = null;//Esta variable me ayuda a decir en que posicion quedo el paciente antes de entrar al retorno
let terminacion= 0; //Esta variable me dice cuantos ceros consecutivos tuvo el paciente
let firstItem;// Item en el que inicio la prueba
      

function Comprension(props) {
  const [state,setState] = useState("instruccion")
  const [results, setResults] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [resultsAux ,setResultsAux] = useState(new Array(NUMBER_STIMULI).fill(0));
  const [numberItem,setNumberItem] = useState(1)
  const classes = useStyles();

  function changeStimuli(key){

    if(state==='test'){
      
      if(retorno){
        
        if(1===key | 2===key){
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
        if(1===key ||key===2){
          
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

    if(!props.resWechsler.hasOwnProperty('CO')){
      props.setResWechsler('CO',total)
    }else{
      if(props.resWechsler['CO'] !== total){
        props.setResWechsler('CO',total)
      }
    }

    return total;
  }


  function content(){
    switch (state) {
      case "instruccion":
        return(
          <div>
            <h1>Comprensión</h1>
            <b>instrucciones generales:</b>
            <p>A continuación se darán una serie de preguntas al paciente</p>
            <p>el cual deberá relacionarlo con un concepto. </p>
            <br/>
            <b>Instrucciones para registrar la respuesta de paciente:</b>
            <br/>
            <br/>
            <li>La respuesta dada por el paciente debe ser registrada en la casilla de respuesta</li>
            <li>Se debe escoger, teniendo en cuenta la guía, entre 0,1 y 2 para la puntuación de la respuesta</li>
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
            <h1>Comprensión</h1>
            <p>¿En qué estímulo desea iniciar la prueba? </p>
            <p>Pacientes con sospechas de discapacidad intelectual:</p>
            <CustomButton
            msj="Estímulo 1"
            callback={()=>imagenInit(1)}
            ></CustomButton>
            <p>Pacientes de edad 16-89:</p>
            <CustomButton
            msj="Estímulo 3"
            callback={()=>imagenInit(3)}
            ></CustomButton>       
          </div>
        )
      case "test":
        return(
        <div > 
          <h1>Item #{numberItem}</h1>
          
          <h2>{clues[numberItem-1]}</h2>      
          <br/>
            {concepts[numberItem-1]!==""?<div >
              <h2><b>Conceptos generales</b></h2>
              <br/>
              <TextareaAutosize className={classes.concepts} value={concepts[numberItem-1]} disabled></TextareaAutosize>
            </div>:""}
          <div className={classes.ordenar}>
            <div >
              <h2><b>0 Puntos</b></h2>
              <br/>
            <TextareaAutosize value={badAnswer[numberItem-1]} disabled></TextareaAutosize>
            </div>
            &nbsp;  &nbsp; &nbsp;  &nbsp;
            <div >
            <h2><b>1 Punto</b></h2>
              <br/>
              <TextareaAutosize value={mediumAnswer[numberItem-1]} disabled></TextareaAutosize>
            </div>
            &nbsp;  &nbsp; &nbsp;  &nbsp;
            <div >
            <h2><b>2 Puntos</b></h2>
              <br/>
              <TextareaAutosize value={rightAnswer[numberItem-1]} disabled></TextareaAutosize>
            </div>
          </div>    
          <br/>
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
            <CustomButton
              msj="2 Punto"
              callback={()=>changeStimuli(2)}
            ></CustomButton>
            
          </div>
        </div>)
      case "revision":
        return(
        <div>
          <h1>Comprensión</h1>
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
                    max:2,
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
         name="Comprensión"
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

export default connect(mapStateToProps, mapDispatchToProps)(Comprension);

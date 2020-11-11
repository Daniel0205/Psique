import React, { useState } from 'react';
import CustomButton from '../../../components/customButton'
import WaisWiscReturnButton from '../../../components/WaisWiscReturnButton';
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
import Grid from '@material-ui/core/Grid';
import { setBody } from "../../../store/body/action";

const LIMIT_ERROR = 3

const NUMBER_STIMULI = 36

let items =  ["","","","","Reloj","Sombrilla/Paraguas", "Ladron", "Vaca",
              "Sombrero", "Valiente","Obedecer","Bicicleta","Antiguo","Alfabeto/Abecedario","Remedar","Fábula", 
              "Emigrar","Isla","Absorber","Salir","Transparente","Molestia","Raramente","Preciso", 
              "Obligar","Rivalidad","Disparate","Previsión","Aflicción","Arduo","Unánime","Dilatorio",
              "Enmienda","Inminente","Aberración","Locuaz"];

let answer0 =  ["",
                "",
                "",
                "",
                "Tiempo\nHace un sonido/Timbra/Te despierta\nDa vueltas\nCuelga de la pared\nUn juguete/Es redondo/Un circulo",
                "La (sostienes/llevas/abres/cierras)\nSe llena de lluvia\nTiene un mango y es circular/Es una cosa (grande/circular/que puedes doblar)\n[Demuestra el uso de una sombrilla]",
                "Alguien que la policía intenta atrapar\nAlguien que usa máscara sobre la cara\nUn tipo malo/Un villano\nVan a la carcel",
                "Tienen (cuernos/cuatro patas/manchas/ubres)/[Nombra una cracterística]\nVive en (una granja/una finca/un granero)\nUna ternera\nMascota/Camina/Corre",
                "Para los vaqueros/Un sombrero de vaquero\n[Hace una demostración de ponerse un sombrero en la cabeza]",
                "Cuando te obligas a hacer algo\nFuerte/Recio/Bueno/Listo\nCuando harías cualquier cosa que alguien te pidiera\nSimplemente hazlo/siempre intentas hacerlo\nConfiado/Que no siente panico\nNo ser (llorón/ganllina)",
                "Hacer algo/Hacer un buen trabajo\nHacer allgo que no deberias haber hecho/Rezongar\nObedecer a (tus padres/la ley)/Si no obedeces, te metes en problemas\nNo seguir las reglas/Que alguien te pida hacer algo y no hacerlo",
                "Bici/De diez velocidades\nUn juguete/para jugar con ella\nSe maneja\nTiene (asiento/canasta/corneta)",
                "Historia/Escritos antiguos\nValioso\nComo de los (egipcios/romanos)\nUna persona vieja/Una leyenda\nMisterioso/Secreto\nLegado/Raro/Que no está en cualquier parte",
                "Palabras para hacer palabras/Palabras en orden\nAlgo que está en tu nombre\nLo puedes aprender en la escuela\nTodas las mayúsculas\nHay una canción de eso\nSopa de letras",
                "Es una persona que habla con sus manos\nMolestas a alguien/Algo irritante\nAlguien que habla mucho\nTartamudear o balbucear",
                "Es como las canciones de cri-cri\nComo un caballero que pelea con un dragón\nUna historia verdadera/Una pelicula",
                "Estación/Estacional\nLo hacen las aves o algunos animales\nComo un trabajador migratrorio/Marcharse/Ir a álgun lado\n[Describe hibernar]",
                "Está en el (agua/mar/océano)\nTierra/Lugar\nLugar al que si vas se hunde tu barco\nDonde quedas abandonado/Algo que está desierto\nAlgo que asle del agua\nUna playa\nUn lugar con (arena/árbles/volcanes)",
                "Empapar\nConservar/Retener\nAprender/Obtener conocimiento\nMirar/Contemplar/Observar/Examinar/Investigar\n[Describe la evaporación]\nDejar entrar/Meterse/Llenar/\nQue se va/Desaparece/Mezclar/Combinar/Juntar",
                "Decir adiós\nLas personas se van de casa\nPerder\nIr a (tienda/parque/zoológico)\nReprimir",
                "Invisible/Alguien que desaparece\nQue lo puedes ver/manera de ver\nQue puedes pasar a través de el\nComo un espejo/Reflejo\nCopia/Exactamente igual\nPoco claro/Que es difícil ver a través de él",
                "Alguien que es (ruin/malo) contigo\nUna mascota\nSer (malo/ruin)\nActuar tontamente",
                "Muy poco/Pequeña cantidad\nSolo/Solitario\nQue pasa con frecuencia/Común\nTranquilo/pacífico/calmado",
                "Breve/Sucinto\nCasi (exacto/perfecto)\nSeguro de algo\nQuiere decir que sí/Estás de acuerdo con alguien\nUna suposición/un tanteo",
                "Amenazar\nEsperar hacer algo\nObligación\nImpedir que se haga algo\nQue te (afecta/conmueve emocionalmente)",
                "Entre dos equipos/pasa en las escuelas\nTensión entre dos personan\nEnemigo\nEquipo/Grupo\nEnojado/Celosos/Desalmado\nRepresalia contra alguien/Venganza",
                "Engañado/No real/De mentiras/Incorrecto\nAlgo que no se debe hacer/Inútil\nSin importancia\nSer malo/Portarse mal\nDisparado/No lo crees/",
                "Futuro\n Ves (Algo que sucede/que está pasando)\nConsiderar\nUna manera diferente de ver algo\nQue tiene astigmatismo/Relacionado con los ojos",
                "Tener algo que te está molestand\nUn problema/Un reto/Conflicto/Desacuerdo/Discusión\nAlgo que está mal con la mente\nCausar dolor/Lastimar a alguien [Descrcibe afectar o afección]",
                "Recio/Pesado/Fuerte/Vigoroso\nConstante/Continuo/Sigue y sigue\nTedioso/Abrumador/Doloroso para tus músculos",
                "Completo\nClaramente decidido/Resultado obvio\nQue casi todo el mundo está de acuerdo\nUna mayoría/Más de la mitad/Obvio/Bien sabido\nVotar/Un buen voto/Enorme/Una gran cantidad",
                "Flojo\nObligatorio\nDiligente/Trabajador/Determinado\nTiene que ver con los ojos/Dilatar los ojos",
                "Regla escrita\nDerechos/Libertad/ Libertad de (prensa/expresión)\nUna ley/Un decreto/Una regla/Un documento",
                "Cercano\n[Describe eminente o inminente]\nQue puede suceder/Obvio/Que siempre está presente\nFamoso/Importante",
                "Extraño/Raro\nAlgo tonto\nUn fantasma",
                "Que discute demasiado\nQue habla demasiado rápido"]
                
let answer1 =  ["",
                "",
                "",
                "",
                "Hace tic-tac/Tiene (manecillas/un disco/números) [Nombra un rasgo]\nEs para el tiempo/¿Qué hora es?\nTe dice cuando (ir a la escuela/regresar a casa/es de noche o de día)\nUn despertador/Un cronómetro",
                "Te mantiene seco/Para la lluvia\nLa llevas cuando llueve\nTe la pones sobre la cabeza\nLa colocas en la playa/Te mantiene fresco\nLa sostienes[Hace demosytración apropiada]",
                "Roba/Toma las cosas\nPersona que (hace cosas ilegales/viola la ley)\nAlguien que se mete por la fuerza",
                "(Hace/Produce) leche/carne\nAlgo que hace mú\nComo un toro pero más pequeña\n[Nombra razas ej. Angus,Brahma]",
                "Lo usas/Te lo pones\nTe quita (el sol/la lluvia)/Te mantiene la cabeza caliente\nVa en tu cabeza\nTe cubre el pelo/Te quita el son del pelo\nEs circular y tiene una parte más alta",
                "Salvar a alguien que está en peligro/Proteger a las personas\nHacer algo desafiante\nArriesgarse/Hacer cosas arriesgadas\nHacer frente a/Le haces frente a un bravucón\nComo cuando me ponen una inyección y me porto valiente[Ejemplo específico\nUn heroe/Alguien que hace algo heroíco]",
                "Portarse bien/Cooperar\nPrestar atencion/Escuchar/Acatar\nHacer lo que tus (papás/maestros) te dicen\nAlgo que te mandan a hacer\nRespeto/No faltar al respeto/Honrar\n[Ejemplos de uso]",
                "Tiene (ruedas/pedales/cadena)[Nombra una característica]\nVas a diferentes lugares en ella/Viajas con ella\nLa pedaleas\nImpulsada por el hombre\nEs como (una moto con pedales/un carro para niños)\nAlgo que montas para hacer ejercicio",
                "Histórico/Prehistórico\nDe hace mucho tiempo\nAlgo hecho hace mucho tiempo/Antigüedad\nPasado de moda/Antes de nuestros tiempos\nPunta de flecha/Momia\nQue ha estado aquí hace mucho",
                "ABC/De la A a la Z\nTienes que saber el abecedario para (leer/escribir)\nDeletreas/escribes con él\nLetras/Letras en un cierto (orden/secuencia)\nUna canción con las letras\n[Recita o canta todo o parte del abecedario]",
                "Actuar como alguien\nHcaer mímica/Repetir\nFingir\nRetar/Burlarse de\nAlguien que te copia\nAlguien que te imita fingiendo tu voz\nCuando alguien dice Hola y otra persona dice lo mismo",
                "Ficción/No es real/Algo inventado\nTu lees una fábula\nAlgo que leiste\nUna lección/Un refrán\n[Ejemplos específicos]",
                "Mudarse\nIr a algún lado (debido al clima/cuando hace frio)\nVolar al sur/Las aves van al sur\nCuando las personas viven de otras partes a nuestro país/Dejar tu país\nCuando los animales van de caceria a un nuevo lugar\nNo quedarte en un lugar por mucho tiempo",
                "Está en mitad del (mar/océano)/ Está rodeada de agua\nLugar en el océano/Tierra en el agua\nUn lugar en mitad del océano\nHecho de un volcán\nSuperficie de tierra\nComo Hawai/Cuba [Ejemplo particular]",
                "Absorber humedad/Si absorbes algo en la escuela en que lo aprendes [Ejemplo de uso sin esponja]\nIntroducir [sin indicación de humedad]\nRecolectar/Reunir\nLlevarse\nComo una esponja\nRecoger/Secar\nSe lleva el agua\nConsumir/Volverse parte de",
                "Marcharte\nIrte/Huir/Escapar\nDejar el lugar donde estas/Ir a algún lado\n (Dejar/Salir de) la casa\nDespedir/Dispersar\nMudarse\nDejar (el ejercito/la universidad)",
                "Como cristal/Vidrio\nVes hacia afuera\nComo una ventana/Ventana transparente\nQue se puede ver a lo lejos\nVisible",
                "Latoso/Desesperante/Engorroso/Distractor\nUn buscapleitos\nAlguien (que te cae mal/a quien no soportas)\nMosquitos/Moscar/Termitas/Roedores[Ejemplo específico]\nAlguien (malcriado/grosero)\nMi hermanito",
                "Escaso/Poco común\nA veces/En ocasiones\nQue no pasa con regularidad\nNo mucho/Difícilmente/Apenas\nDe vez en cuando/Una que otra vez/No todo el tiempo\nQue no es probable",
                "Exactamente/Al grano\nBien detallado\nPerfecto\nAcertado/Correcto\nEspecífico",
                "Instar/Incitar/Estimular\nPersuadir/Convencer/Influir\nAlentar/Motivar/Inspirar\nTratar de lograr que alguien haga algo\nCuando logras que algo suceda\nEn el ejercito cuando te dan una orden\nTe ves impulsado a ello/Tentado",
                "Pelea/Conflicto/Opositores que están uno contra otro\nCompetir\nOpositor/Competidor/Adversario\nRiñas entre hermanos o hermanas\nUn duelo\nDos paises que juegan uno contra otro\nCuando desafias a alguien\nPeleas entre dos familias/Enemistad",
                "Tonto/Bobo/Estúpido/Loco/Ridículo/Gracioso/Simple\nAlguien que trata de ser gracioso\nNo es realmente verdadero/Es una mentira\nHacer (tonterias/bobadas/juguetear)\nActuar de manera tonta\nDifícil de creer",
                "Ver en el tiempo\nAnticipar\nAnunciar\nVer previamente",
                "Algo que está mal (contigo/con alguien)\nUna (herida/cortada/lastimadura)\nDesgracia\nComo una parálisis/Un brazo roto\nAlgo malo que es terrible/Algo que hiere\nQue te lastimas/Alguien te hace daño",
                "Duro/Complicado/Difícil(Laborioso\nDura mucho tiempo/Una y otra vez/Mucha presión\nCansado/Desgastante\nTensionante/Que te destroza los nervios\nUn esfuerzo\nTe lleva hasta el límite",
                "Todo el grupo tiene una idea\nTodos deciden sobre una cosa\nSin objeción\nTodos\nEstar de acuerdo con algo\nUn voto unánime",
                "Que no puedes decidir\nNo puedes empezar\nNo puede decidirse a hacer algo",
                "Revisar/Cambiar/Adaptar\nUna adición\nAñadir algo adicional/Adicionar\nAtrreglar algo",
                "Inevitable/Irremediable\nQue va a suceder\nPronto/Apremiante\nQue esta muy cerca\nDefinitivo/certero/Peligroso\nProbable/Viable",
                "Un (alejamiento/desviación)\nAnormal\nAlgo (diferente/inusual/inesperado)\nCambio/Defecto de carácter",
                "Hablador/Parlanchín/Platicador\nMolesto/Irritante/Fastidioso\nQue (habla/dice) demasiado\nAburrido/Agotador"]

let answer2 =  ["",
                "",
                "",
                "",
                "Te dice la hora/(Lleva/Muestra/MMide) el tiempo\nTe (dice/muestra) las horas y minutos\nTiene manecillas que se mueven alrededor de un disco\n Tiene manecillas y hace tic-tac[Nombra dos rasgos]",
                "Algo que usas para que no te mojes en la lluvia [Debe contener lluvia]\nImpide que te mojes cuando llueve/Te protege de la lluvia/sol\nTe tapa para que no te (mojes/asolees)\nTe protege del sol/Te hace sombra",
                "Un ratero/Un bandido/Un asaltante\nAlguien que (roba/asalta/toma algo de otra persona)\nSe mete por la fuerza en tu casa y (se lleva las cosas/te roba)\nUn criminal/Un malhechor/Un forajido",
                "Un animal/Un mamífero\nTe da leche y carne\nUn animal que produce (leche/carne)/Un animal de granja",
                "Algo que (cubre/tapa) la cabeza/Una gorra\nLo usas (para protegerte de la lluvia/cuando hace frio)\n(Lo usas sobre/Prenda para) la cabeza\nTe protege la cabeza\nLo usas para hacerte sombre y que no te de el sol en los ojos",
                "Valeroso/Audaz/Arrojado/Intrépido/Que tiene agallas\nDefender (algo en lo que crees/tu país)\nNo (tener miedo/estar asustado/ser un cobarde)\nHacer algo que nadie más se atreve a hacer\nHacer algo así estes asustado\nEnfrentar el peligro/Hacer cosas peligrosas",
                "Cumplir/Aceptar órdenes/Hacer caso/Seguir lo que te mandan\nSeguir (instrucciones/órdenes/reglas)/Hacer lo que se te ordena (lo que alguien dice)\nSi alguien te pide algo/No decir que no, sino sólo hacerlo",
                "Lo usas para transportarte\nTe montas en ella y vas a muchas partes\nVehículo/Es un vehículo impulsado por el hombre/Vehículo de dos ruedas con pedales\nEs una cosa que montas/ que es mejor que caminar y te ayuda a ahorrar tiempo\nTiene (ruedas y pedales/manubrio y una cadena)[Nombra dos características]",
                "(Muy/Realmente) viejo\nArcaico/Vetusto\nUna persona que ha vivido mucho tiempo/Algo que existió hace miles de años\nUn ancestro antiguo/Vivió en los tiempos de las cavernas\nAlgo muy histórico (del pasado)\nOpuesto de moderno/Algo que sicedió hace largo tiempo",
                "Símbolos que se usan para escribir las palabras de nuestro idioma/Letras en cierto orden con las que puedes formar palabras\nTodas las letras/29 letras/Letras de la A a la Z\nSistema basado en letras/letras de un idioma\nLos nombres de las letras\nLas letras que usas para comunicarte\nLas usas para (leer/hacer) palabras/ Las utilizas para (deletrear/escribir) palabras",
                "Copiar/Imitar/Personificar\nRepetir lo que alguien (hace/dice)\nDecir exactamente lo que otra persona dice\nCopiar/Duplicar",
                "Una historia que (tiene moraleja/te deja una lección)\nUna historia que usa como personajes a los animales\nUna historia de mentira/Un cuento que no es verdad\nUn cuento de hadas/Mito/Leyenda/Una historia\nUn cuento escrito por Esopo [ejemplo]",
                "Ir de un lugar a otro/Ir a algún lugar durante un tiempo y regresar\nMovimiento de personas o animales (para satisfaces sus necesidades/para buscar condiciones más favorables cuando cambian las estaciones)\nDejar tu país para (trabajar/establecerte/vivir) en un nuevo lugar\nDesplazarse a un lugar diferente\nLas aves migran al sur durante el invierno[Ejemplo específico]",
                "Tierra rodeada de agua/Un lugar con agua por todo el derredor\nTierra en el océano que se forma de un volcán\nTierra en mitad del agua/Un lugar en el océano\nUn terreno que surge de otras tierras/Porción de tierra que está separada del resto de la tierra\nUn pequeño terreno en el océano",
                "Empapar/Aspirar/Beber/Atraer/Jalar/Tomar/Succionar/Chupar\nAtraer humedad\nUna esponja absorbe (agua/líquido) [Debe contener esponja]",
                "Partir/Salir/Abandonar/Marcharse/Evacuar\nLo opuesto de quedarse aquí/No quedarse/Irse\nIr a (otro sitio/otro lugar)/No volver\nLevantarse y salir de donde estás\nAusentarse de algo",
                "Que puedes ver a través de él\nObvio\nClaro/Cristalino\nQue permite que pase la luz\nNo opaco",
                "Algo que (es engorroso/te incomoda)\nAlguien que (te saca de casillas/te irrita/te provoca/te desespera)\nUn fastidioso/Una incomodidad/Algo irritante\nDolor/Algo doloroso",
                "Que no ocurre a menudo/No sucede mucho\nQue difícilmente pasa/casi nunca\nExtraño/Desacostumbrado/Desusado\nQue no ocurre generalmente/ que no se hace de manera común",
                "Exacto\nApropiado/Medida (cantidad) exacta\nExactamente adecuado (correcto)\nJusto en el clavo\nClaramente expresado\nCien por ciento correcto/Absolutamente correcto",
                "Mandar a alguien a hacer alguna cosa\nImpulsar a alguien/Sentirse impulsado a hacer algo\nForzar/coaccionar\nActuar sobre una persona para comprometerla a decidir\nPresionar a alguien a hacer algo",
                "Competencia/Concurso\nDisputa frecuente/Pelea constante\nGente que compite una con otra\nDos (personas/equipos) que compiten\nComo cuando dos (equipos/escuelas) quieren tener el primer lugar",
                "Tontería/Simpleza/Cosas simplonas\nAlgo que es estúpido y que nunca podría pasar\nQue no tiene ningún significado\nAlgo que no tiene sentido (no es razonable/no es realista/no es lógico/no es serio/es una pérdida de tiempo)",
                "Predecir/Predicción\nPronosticar/Anticiparse/Vaticinar\nSaber que es lo que va a suceder antes de que pase/Premonición\n(Planear/pensar) de antemano\nAdelantarse/Ver al futuro",
                "Una (carga/dificultad) que debes soportar\nAlgún tipo de perturbación\nUn (malestar/dolencia/enfermedad/incapacidad)\nAlgo que causa dolor/Sufrimiento/Pena\nQue tienes algo que está mal [Ejemplo específico]",
                "Que necesita gran (empelo/energía/esfuerzo)\nAgotador/Esfuerzo\nAlgo que es demasiado (complicado/difícil/cansado) de hacer\nNecesitas mucha (energía/esfuerzo) para hacerlo\nEs difícil durante mucho tiempo y te hace pagar un precio alto\nFísicamente (demandante/difícil)",
                "De completo acuerdo/Todos están de acuerdo o a favor de algo\nElegido sin duda\nSin oposición o desacuerdo\nTodos van por lo mismo/Todos votas por el mismo sentido",
                "Lento/Una persona pausada\nTardado/Lerdo\nQue causa demoras/Que detiene las cosas\nUna persona tediosa",
                "Modificación/Alteración/Revisión/Correción\nUna mejoría/Un cambio para mejorar\nUn cambio que se hace a (un documento/ley/legislación)\nCorregir el camino\nAlgo que se añade después de que se ha terminado una cosa",
                "Amenzante/A punto de suceder\nQue se aproxima en el futuro/Algo que va a suceder en cualquier momento\nAlgo que (ronda/ está proximo)\nAlgo malo que está a punto de suceder",
                "Una (desviación/cambio/modificación) de lo normal\nAlgo que se aleja de lo típico\nUna alteración anormal\nUn deterioro en el estado mental",
                "Parlanchín e irritante (aburrido/cansado/tedioso)\nHabla tanto que (Molesta/vansa/incomoda) a los demás\nHablador y que divaga\nQue habla mucho acerca de nada"]

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

            if(numberItem===firstItem){
              setState('testImage')
            }

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
    
    if(item===5){
      let arrayAux = results

      for (let i = 0; i < item-1; i++) {
        arrayAux[i]=1
      }
      setResults(arrayAux)
    }else if(item>5){
      let arrayAux = results

      for (let i = 0; i < 4; i++) {
        arrayAux[i]=1
      }

      for (let i = 4; i < item-1; i++) {
        arrayAux[i]=2
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

    if(!props.resWechsler.hasOwnProperty('VB')){
      props.setResWechsler('VB',total)
    }else{
      if(props.resWechsler['VB'] !== total){
        props.setResWechsler('VB',total)
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
            <b>instrucciones generales:</b>
            <p>Para los items del uno al tres la tarea del paciente consiste en nombrar una serie de imagenes presentadas</p>
            <p>Para el resto de los items la tarea del paciente consiste en definir oralmente una serie de palabras que el examinador lee en voz alta</p>
            <p>Los items se presentan de forma verbal</p>
            <br/>
            <b>instrucciones para registrar la respuesta de paciente:</b>
            <p>Para calificar se debe presionar el botón que corresponda con la calificación que desea dar al item </p>
            <p>Recuerde, debe escribir de manera literal la respuesta dada por el paciente en el espacio disponible</p>
            <li>0 : Una respuesta verbal que no muestra un conocimiento real de la palabra</li>
            <li>1 : En general se trata de respuestas correctas pero con contenido escaso o pobre</li>
            <li>2 : La respuesta refleja una buena comprensión de la palabra</li>
            <br/>
            <Grid container justify="center">
              <WaisWiscReturnButton
                msj="Retroceder"
                callback={()=>props.setBody("WISC-selection")}
              ></WaisWiscReturnButton>
              <CustomButton
                msj="Iniciar subprueba"
                callback={()=>setState("seleccion")}
              ></CustomButton>
            </Grid>
          </div>
        )
      case "seleccion":
        return(
          <div >
            <h1>Vocabulario</h1>
            <p>¿En qué estímulo desea iniciar la prueba? </p>
            <p>Pacientes con sospechas de discapacidad intelectual o de edad 6-8:</p>
            <CustomButton
              msj="Estímulo 5"
              callback={()=>imagenInit(5)}
            ></CustomButton>
            <p>Pacientes de edad 9-11:</p>
            <CustomButton
              msj="Estímulo 7"
              callback={()=>imagenInit(7)}
            ></CustomButton>
            <p>Pacientes de edad 12-16:</p>
            <CustomButton
              msj="Estímulo 9"
              callback={()=>imagenInit(9)}
            ></CustomButton>
            
            <WaisWiscReturnButton
              msj="Retroceder"
              callback={()=>setState("instruccion")}
            ></WaisWiscReturnButton>
          </div>
        )
        case "testImage":
          return(
            <div >
              <h1>Item #{numberItem}</h1>
          
              <img 
               className={classes.img}
               alt={"Estímulo "+numberItem}
               src={require("../../../assets/estimulos/vocabulario-wisc/"+numberItem+".jpg")} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Vocabulario);

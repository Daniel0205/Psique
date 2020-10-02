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

const LIMIT_ERROR = 5

const NUMBER_STIMULI = 33

let answers;

let clues =["† 1. Enseñame tu pie",
            "† 2. Señalando hacia su propia nariz, pregunte: ¿Cómo se llama esto?",
            "3. Nombra algo que comas",
            "*4. ¿Cuántas orejas tienes?",
            "5. ¿Cuántos años tienes?",
            "6. ¿Cuántas patas tiene un perro?",
            "*7. ¿Qué día le sigue al jueves?",
            "*8. Nombra dos tipos de monedas",
            "9. ¿Qué mes sigue después de marzo?",
            "10. ¿Qué se debe hacer para que el agua hierva?",
            "*11. ¿Cuántos días hay en una semana?",
            "*12. ¿Cuántos días hay en un año?",
            "13. ¿Quién fue Cristóbal Colón?",
            "*14. ¿Cuáles son las cuatro estaciones del año?",
            "15. ¿Cuántas cosas forman una docena?",
            "*16. ¿Qué hace el estómago?",
            "17. ¿Cuál mes tiene un día adicional cada cuatro años?",
            "*18. ¿Qué es un fósil?",
            "19. ¿Qué es la capa de ozono?",
            "20. ¿Cómo regresa el oxígeno al aire?",
            "21. ¿Qué son los jeroglíficos?",
            "*22. ¿Cuál país en el mundo tiene la población más grande?",
            "23. ¿Cuál es la capital de Grecia",
            "*24. ¿Por qué se oxida el hierro?",
            "25. ¿Qué hace que las hojas de las plantas sean verdes?",
            "*26. ¿Quién fue Charles Darwin?",
            "27. ¿De qué están hechos los diamantes?",
            "28. ¿Quién fue Confucio?",
            "29. ¿Qué es el solsticio de invierno?",
            "30. ¿Qué es un barómetro?",
            "*31. ¿Qué es la fisión nuclear?",
            "*32. ¿Qué distancia hay entre la ciudad de México y la ciudad de Nueva York?",
            "33. ¿De dónde se obtiene la resina natural?"];


let rightAnswer = ["[Toca, señala o indica de cualquier otro modo su propio pie o el del examinador]",
                  "Nariz",
                  "Manzana; Carne; Cereales; Frutas [nombra cualquier cosa que constituya un alimento común de los humanos]\nDesayuno; Comida; Cena; Bocadillo",
                  "[Indica dos de manera verbal o física]",
                  "[Indica verbal o físicamente la edad correcta]",
                  "[Indica verbal o físicamente cuatro]",
                  "Viernes",
                  "$1.00; $2.00; $5.00; $10.00; $20.00; 050; 020; 010\nPesos y centavos; Dólar y penny; Chelines y peniques\n[Nombra dos monedas de cualquier denominación, incluso extranjeras]",
                  "Abril",
                  "[Describe cualquier medio para calentar agua]\nCalentarla; Exponerla al calor\nPonerla en la estufa; Ponerla en el microondas\nHacer que se caliente; Ponerla sobre algo caliente\nEncender el horno; Ponerla en una sartén caliente\nCocinarla; Calentarla con vapor; Cocerla\nHacer que la temperatura suba hasta (100° o 200°, etc.)",
                  "[Indica verbal o físicamente siete]\n[Nombra los siete días]",
                  "365, 365¼; [365 con cualquier fracción o decimal]\n365 excepto en los años bisiestos en que hay 366",
                  "El descubridor de (América, las Indias occidentales, el Nuevo Mundo)\nLo mandó la reina de España para establecer una ruta de comercio\nNavegó para probar que la tierra era redonda\nNavegó hacia América\nUn explorador; Navegó por el océano para descubrir tierra\nNavegó en (la Nina, la Pinta y la Santa María)\nUn explorador que quería encontrar una mejor ruta para la India; Un hombre que deseaba explorar las Indias",
                  "Verano, otoño, invierno, primavera (en cualquier orden)",
                  "[Verbal o físicamente indica 12]",
                  "Digiere alimentos; Es parte del sistema digestivo; Prepara la comida para la digestión Toma nutrientes de los alimentos; Convierte los alimentos en energía\n(Procesa, Descompone, Muele) la comida\n(Mantiene, Absorbe, Mezcla) la comida\nForma ácido\nConvierte la comida en líquido",
                  "Febrero",
                  "Algo orgánico que (se ha convertido en piedra, está conservado en piedra)\nAlgo que se convirtió (en piedra, roca)\nHueso (endurecido, petrificado, fosilizado)\nHueso (antiguo, prehistórico, viejo); Un hueso de hace mucho tiempo\nImagen que dejó una (hoja, huella, animal, dinosaurio) en una piedra\nUna (impresión, vestigio) de algo sobre roca\n(Impresión, marca) dejada por algo de hace mucho tiempo\nRestos de algo viejo; Residuos de algo conservado por la naturaleza\nEvidencia de algo vivo en el pasado\nUn hueso de dinosaurio; Huella de un dinosaurio\n",
                  "Parte de la atmósfera que bloquea (la radiación, los rayos UV); Parte de la atmósfera que protege a la tierra\nCapa protectora en el exterior de la tierra\nCapa que nos protege de los rayos UV\nMantiene fuera los rayos del sol; Nos protege del sol; Protege a la tierra\nCubierta de gases que cubre a la tierra; Una capa de gas\nAtmósfera; Parte de la atmósfera\nTres átomos de oxígeno; Capa de O3",
                  "Fotosíntesis\nPlantas; Árboles; Hojas; Flores",
                  "Forma antigua de (escritura, letras, alfabeto, símbolos, palabras, lenguaje)\nEscritura con figuras; Sistemas de escritura que usan dibujos; Dibujos que se usan para la comunicación\n(Caracteres, Símbolos) sagrados; Caracteres que tienen un significado oculto; Símbolos que representan palabras\nEscritura que usaban los (egipcios, chinos); Escritura que está en las pirámides\n(Escritura pictográfica, Símbolos) griegos; Símbolos (árabes, hebreos)*",
                  "China\nRepública Popular China",
                  "Atenas",
                  "Oxidación; Oxígeno\nUna reacción química; Cambios químicos\nHumedad; Aire húmedo; Humedecimiento",
                  "Clorofila; Cloroplasto\nQuímicos que absorben la luz\nLo que absorbe la luz para la fotosíntesis\nColor pigmentario",
                  "Desarrolló la teoría de (la evolución, la supervivencia del más apto)\nEstudió la selección natural\nEscribió (El Origen de las Especies, El Origen del Hombre, Selección Natural)\nEstudió a los animales en las islas Galápagos",
                  "Carbón; Carbón (cristalizado, comprimido); Carbón bajo presión\nHulla (con alguna transformación, calentada); Hulla bajo presión; Hulla comprimida\nGrafito\nCarboncillo bajo presión",
                  "(Filósofo, pensador) chino\nLíder religioso chino; Líder chino\n(Educador; Maestro; Estudioso) chino\nChino que escribió (frases sencillas, proverbios); Escritor chino\n(Líder, maestro) religioso\nDesarrolló una forma de (filosofía, religión); Filósofo; Sabio\nHombre que escribió refranes sabio",
                  "Día más corto del invierno; La noche más larga del año; El día con menos sol\nPrimer día del invierno\nCuando los días empiezan a hacerse más largos\nCuando la tierra está (con la inclinación, en el ángulo) más alejado del sol\nEl sol está más bajo en el cielo en el hemisferio norte\n20, 21, 22, 23 de diciembre",
                  "Mide la presión (atmosférica, en el arre, barométrica)\nUn indicador de la presión; Algo que mide la presión\nPredice los cambios de clima; Dice si va a llover",
                  "Átomos que se dividen y crean energía\nUna fuente de energía radioactiva\nForma de energía; Crea potencia\nCuando el núcleo se divide\nSeparación de átomos de uranio\nExplosión de un átomo",
                  "4 800 a 6 400 kilómetros\n3 000 a 4 000 milla",
                  "De las plantas; De los cortes que se hacen a las plantas; De la secreción de las plantas; De la savia de las plantas; De los fósiles; De los fósiles animales y vegetales\nDe los árboles; De los troncos; Del pino, del álamo; De los cortes que se hacen a los árboles; De los cortes que se hacen a los troncos de los árboles; De los capullos de los árboles"];


let badAnswer = ["[Cualquier otra respuesta]",
                "[Cualquier otra respuesta]",
                "Alimentos; Plantas; Animales (I)\nPasto; Paja\nTierra; Piedras [nombra atgo no comestible]",
                "[Indica verbal o físicamente cualquier otro número que no es dos]\n[Señala a sus propias orejas o a las del examinador] (I)",
                "[Indica verbal o físicamente la edad incorrecta]",
                "[Indica verbal o físicamente cualquier otro número]",
                "Ayer; Hoy; Mañana (I)*\n[Nombra cualquier otro día]",
                "Peso; Centavo; Dólar [Nombra una moneda de curso legal, incluso extranjera](I)*\nFicha [nombra cualquier moneda que no sea de curso legal]\nOro; Plata; Monedas de oro y plata\nMexicana; Águila y sol; Estadounidense\nBillete; Cheque",
                "[Nombra cualquier otro mes]",
                "Prenderla; Ponerla en una olla (I)\nEstufa; Horno; Fuego (I)\nPonerla en agua caliente\nHervir huevos",
                "[Indica verbal o físicamente cinco] (I)*\n[Indica verbal o físicamente cualquier otro número]\n[Nombra menos de siete días]\nUn montón; Muchos",
                "366 (I)*\n[Nombra cualquier otro número]",
                "Descubrió que la tierra era redonda (I)\nUn (marino, capitán); Navegó en 1492 (I)\nViajero; Un hombre que viajó por el mundo (I)\nEl hombre que descubrió la electricidad; Científico\nUn Europeo/Italiano\nDescubridor (de Asia, Veracruz); Fundador de Estados Unidos; Navegó por toda América\nHombre; Tipo; Persona\nConoció a los indígenas de América",
                "[Nombra menos de las cuatro estaciones] (I)*\nDe ferrocarril, autobuses, metro\nDe policía, bomberos, de servicio\nDe radio, televisión, telecomunicaciones\nDel vía crucis",
                "Una docena de tortillas (I)\n[Verbal o físicamente indica cualquier otro número]",
                "Es un órgano; Parte de tu cuerpo (I)*\nEs donde va la comida; Para lo que comes (I)\n(Gruñe, hace ruidos, te dice) cuando tienes hambre\nTe ayuda a comer\nDa dolor de estómago; Duele",
                "[Nombra cualquier otro mes]\nEl año bisiesto",
                "Hueso; Diente; Hueso en el suelo (I)\nRestos de un animal muerto (I)\nHuella (de la mano, de una pata) (I)\nArtefacto; Un artefacto animal (I)\nDinosaurio (I)\nPiedra; Roca; Minerales (I)\nPrehistórico; Del pasado; Una cosa vieja (I)\nAlgo (conservado, subterráneo, comprimido)\n(I) Pinturas en piedra; Algo que está labrado en las rocas (I)\n Marca de (ropa, relojes) (I)\nAlgo que cavas en la tierra; Está alrededor de un castillo (I)*\nUna pintura",
                "Una capa; una de las capas de la tierra; Está alrededor de (la tierra, el planeta) (I)\nNos protege de no calentarnos demasiado (I)\nTiene agujeros por causa de la contaminación; Cosa que la contaminación destruye (I)\nConserva dentro el aire (I)\nSepara a la tierra del espacio (I)\nCorteza terrestre; En la tierra; Parte de la tierra\nNos protege de (meteoritos, cometas, asteroides)\nGases que mantienen la tierra caliente; Atrapa los rayos del sol [describe el efecto invernadero]\nEstá en el espacio",
                "Evaporación\nRespirar; Exhalar; A través de tus pulmones\nPersonas; Nuestros cuerpos; Tu corazón\nLluvia; Nube; Agua\nDióxido de carbono\nBomba de aire",
                "Escritura (griega, árabe, hebrea) (I)\nSímbolos; Figuras; Dibujos antiguos (I)\nForma de escritura; Escritura (I)\nLetras; Alfabeto (I)\nPinturas en las cuevas; Grabados en piedra\nCosas de Egipto",
                "Asia (I)\n[Nombra otro país o continente]",
                "[Nombra cualquier otra ciudad]",
                "Aire (I)*\nAgua (I)*\nLluvia; Que se moje (I)*\nÁcido; Lluvia acida\nClima; Sol; Contaminación\nEdad; Tiempo",
                "Sustancias químicas (I)\nCitoplasma (I)\nFotosíntesis\nAlimento; Glucosa; Nutrientes\nDióxido de carbono; Oxígeno; Agua; Sol\nÁrbol; Semillas; Tallos; Raíces\nClima; Estaciones; Ambiente; Temperatura\nSus genes",
                "Desarrolló una teoría; Clasificó a los animales (I)\nUn (biólogo, científico, escritor, autor) (I)*\nPresidente [nombra cualquier otra ocupación]\nUn hombre",
                "Hulla; Coque (I)\nRoca comprimida (I)\nCalor; Presión (I)\nRoca; Piedra; Cuarzo; Gemas (I)\nCristal; Vidrio (I)\nLava que se comprime y enfría; Lava derretida (I)\nMetal; Acero\nTierra; Suelo\nGemas; Algo precioso",
                "(Hombre, dirigente) chino (I)\nEscritor (I)\nUn dios; Dios chino\nCientífico; Explorador; Rey\nHombre de (Grecia, la Biblia)\nUn hombre antiguo; Un hombre; Persona\nPersona confundida",
                "Fiesta; Celebración del invierno (I)\nInvierno; Mitad del invierno (I)\nCambio de estación (I)\nPosición del sol (I)\nÁngulo de la tierra (I)\nCuando el sol está más cerca de nosotros\nEl día y la noche tienen la misma duración\nLos días se van haciendo más cortos; El día más largo del año\nEl sol se pone detrás de la luna; El sol y la luna se alinean [describe eclipse]\nEs el día en que regresamos los relojes",
                "Instrumento de medición (I)\nMide algo en el aire; Para medición (I)\nMide (el clima, humedad, cantidad de lluvia, temperatura, velocidad del viento) Brújula",
                "Bombardeo de átomos con (neutrones, electrones) (I)\nSe obtiene electricidad de ella (I)\nHace que las bombas atómicas exploten (I)\nUna explosión (I)\nDivisión celular\nLa fricción causada entre partículas atómicas\nHace que las cosas se vuelvan radioactivas; Es (peligrosa, mala, venenosa)\nCuando se funden dos átomos; Como en el sol [describe la fusión]",
                "Unas cuantas horas en avión [cualquier número de horas] (I)*\nUnos cuantos miles de kilómetros (I)\n[Nombra una distancia fuera de los rangos aceptables]\nMuy lejos; Realmente lejos; Un montón de kilómetro",
                "Se obtiene de animales y vegetales (I)\nSe obtiene de las abejas; De la miel (I)\nDe las sustancias sólidas; Dejos sólidos (I)\nDe los aceites esenciales (I)\nDe la polimerización (I)\nSe obtiene de la cera (I)\nLa resina arde en contacto con el aire\nSe obtiene por destilación\nDe las piedras\nProviene del latín resina\nSe obtiene de los metales\nSe usa para el tratamiento de los dientes; Se usa para hacer cosméticos; Para hacer ungüentos; Para hacer cremas"];


let comentary = ["† Respuesta incorrecta: señale el pie del niño y diga: Este es tu pie",
                "† Respuesta incorrecta: señale de nuevo a su propia nariz y diga: Esto se llama nariz",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si la respuesta sugiere que el niño escuchó ¿Cuántas ovejas tienes? repita la pregunta, enfatizando la palabra oreja",
                "",
                "",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si el niño dice 'ayer', 'hoy' o 'mañana', se le pregunta: ¿Qué día es ese?",
                "*Si el niño responde sólo con una moneda, se le pide: Nombra dos tipos de monedas",
                "",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si el niño dice 'cinco', diga: ¿Cuántos días incluyendo el fin de semana?",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si el niño responde '366', se le pregunta: ¿Cuántos días hay en un año normal?",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si el niño nombra menos de cuatro estaciones, diga: Dime más estaciones del año, hasta que haya mencionado las cuatro",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si el niño contesta, 'Es un órgano' o 'Es parte de tu cuerpo', diga: Sí, pero ¿qué hace?",
                "",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si el niño definefosos en lugar de fósil, se le pregunta: ¿Qué es un fósil? Enfatizando la palabra fósil",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n* Si el niño identifica correctamente los jeroglíficos como escritura con dibujos o símbolos, pero lo asocia de manera incorrecta con los griegos o con otro grupo incorrecto, se le concede crédito",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si el niño no comprende la palabra población, se le puede decir: ¿Cuál país en el mundo tiene la mayor cantidad de gente?",
                "",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si el niño contesta 'Aire' o 'Agua', se le dice: Sí, pero ¿qué está en [inserte la respuesta del niño] que causa que el hierro se oxide?",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si el niño contesta 'Un (científico, biólogo, escritor, autor)', se le dice: ¿Qué lo hizo famoso?",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n *Si el niño contesta 'A unas cuantas horas en avión' o da una cantidad de horas, se le dice: ¿Qué tan lejos está en kilómetros o millas?",
                "(I) ¿Qué quieres decir? o dime más acerca de ello"];

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


let returnDone; // Esta variable me ayuda a controlar el uso de la regla del retorno
let returnVar; // Esta variable me ayuda a controlar el uso de la regla del retorno
let countRe; //Esta variable me dice cuando se puede salir de la condición de retorno
let flagRe;//Esta variable me ayuda a decir en que posicion quedo el paciente antes de entrar al retorno
let badAnswerCount; //Esta variable me dice cuantos ceros consecutivos tuvo el paciente
let firstItem;// Item en el que inicio la prueba
      

function Informacion(props) {
  var [state,setState] = useState("instruccion")
  var [results, setResults] = useState(new Array(NUMBER_STIMULI).fill(0));
  var [numberItem,setNumberItem] = useState(0)
  var [givenAnswer, setGivenAnswer] = useState("");

  const classes = useStyles();

  function changeStimuli(punt){    
    var returnController = returnVar && numberItem===0 && countRe!==2; // Verifica que al hacer el retorno y llegar al estimulo 0 no siga avanzando en la prueba
    if((badAnswerCount < LIMIT_ERROR && numberItem < NUMBER_STIMULI) && !returnController){ // Verifica que no se haya cumplido la condicion de termino
      var nextNumber = numberItem;

      //Este verificacion me dice si se cumple la condición para retornar y asi devolverse en caso de ser necesario
      if((
          ((numberItem === 4 || numberItem === 5) && firstItem === 4) ||
          ((numberItem === 9 || numberItem === 10) && firstItem === 9) ||
          ((numberItem === 11 || numberItem === 12) && firstItem === 11))
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

    //Set Globals
    answers = new Array(NUMBER_STIMULI).fill("");
    returnDone = false;
    returnVar = false;
    countRe = 0;
    flagRe = null;
    badAnswerCount= 0;
  }


  function getResult() {
    var total = 0;
    for(var i=0;i<results.length;i++){
      total = total + results[i];
    }

    if(!props.resWechsler.hasOwnProperty('IN')){
      props.setResWechsler('IN',total)
    }else{
      if(props.resWechsler['IN'] !== total){
        props.setResWechsler('IN',total)
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
            <b>Intrucciones generales:</b>
            <p>A continuación se mostrará el enunciado por cada uno de los puntos, ademas</p>
            <p>Se dispone de cajas de texto que sirven como guia para evaluar la respuesta dada por el paciente.</p>
            <p>Debajo de las cajas de texto puede haber información en caso de que el paciente de ciertas respuestas</p>
            <br/>
            <b>Intrucciones para registrar la respuesta de paciente:</b>
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
            <p>Pacientes de edad 6-8 años o con sospechas de discapacidad intelectual:</p>
            <CustomButton
              msj="Estimulo 5"
              callback={()=>testInit(4)}
            ></CustomButton>
            <p>Pacientes de edad 9-11:</p>
            <CustomButton
              msj="Estimulo 10"
              callback={()=>testInit(9)}
            ></CustomButton>
            <p>Pacientes de edad 12-16:</p>
            <CustomButton
              msj="Estimulo 12"
              callback={()=>testInit(11)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Informacion);

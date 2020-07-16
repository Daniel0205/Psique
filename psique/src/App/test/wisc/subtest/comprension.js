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

const LIMIT_ERROR = 3

const NUMBER_STIMULI = 21

let answers = new Array(NUMBER_STIMULI).fill("");

let clues =["1. ¿Por qué la gente se cepilla los dientes?",
            "2. ¿Por qué las personas deben comer verduras?",
            "3. ¿Por qué los coches tienen cinturones en los asientos?",
            "4. ¿Por qué es importante que los policías usen uniforme?",
            "5. ¿Qué se supone que deberías hacer si te encuentras la cartera o bolsa de una persona en una tienda?",
            "*6. ¿Qué deberías hacer si ves que está saliendo mucho humo por la ventana de la casa de tu vecino?",
            "7. ¿Qué debes hacer si un niño o niña mucho más pequeño que tú empieza a pelear contigo?",
            "*8. ¿Cuáles son algunas ventajas de tener bibliotecas públicas?",
            "9. ¿Por qué es importante que el gobierno inspeccione la carne antes de que la vendan?",
            "10. ¿Cuáles son las ventajas de hacer ejercicio y mantenerse activo?",
            "11. ¿Por qué es importante disculparse cuando sabes que heriste o lastimaste a alguien?",
            "*12. Dime algunas razones por las que debes apagar las luces cuando nadie las está usando",
            "13. ¿Por qué es importante dar derechos de autor a los; escritores por sus libros y patentes a los inventores por sus creaciones?",
            "14. ¿Por qué se debe cumplir una promesa?",
            "*15. ¿Por qué los médicos deben tomar clases adicionales después de haber practicado su profesión durante algún tiempo?",
            "*16. Dime algunas ventajas de leer las noticias en un periódico en lugar de verlas en la televisión",
            "*17. ¿Por qué es importante la libertad de expresión en una democracia?",
            "*18. ¿Por qué es importante impedir que sólo una compañía sea la propietaria de todos los periódicos y las estaciones de radio y televisión en una misma ciudad?",
            "19. ¿Por qué ponemos estampillas en las cartas?",
            "*20. ¿Por qué los medios de comunicación (como televisión, radio e internet) pueden ser una amenaza para las dictaduras?",
            "*21. ¿Cuáles son algunos de los problemas asociados con los cambios rápidos en ciencia y tecnología?"];

          
let general = ["Reconocimiento de que cepillarse los dientes los limpia; previene el deterioro, enfermedad, caries y otros problemas dentales; o mejora la apariencia",
              "Reconocimiento de que las verduras son parte de una dieta nutritiva y son necesarias para la salud apropiada, la energía, la fortaleza o el crecimiento",
              "Reconocimiento de que los cinturones sirven como precaución de seguridad, para proteger a las personas o para detenerlas en su asiento durante un accidente",
              "Indicación clara de que el uniforme es un medio para identificar con facilidad y rápidamente a una persona como oficial de policía. Para mostrar quién tiene la autoridad de imponer la ley",
              "Intentar regresarla a su dueño, ya sea buscando una identificación del propietario y regresandola o, entregandola  al dueño de la tienda o a un policía",
              "General: Notificar al departamento de bomberos o de policía\nLlamar a la policía; Reportarlo (al departamento de bomberos, a la policía)\nPedirle a un adulto que llame (al departamento de bomberos, a la policía)\nPrender la alarma incendios; Tirar la manija de la alarma de incendios\nLlamar y (contestar las preguntas del despachador, decir dónde está el incendio)\nIr a la (estación de bomberos, policía) y decirles\n\nGeneral: Ejecutar una acción hasta que lleguen los bomberos\nPedir ayuda; Obtener ayuda\nLlamar (una ambulancia, al hospital)\nDecirle a mi (mamá papá); Pedirle a mis padres que (ayuden; vayan a ver qué pasa)[notificar a un adulto]\nAdvertir a los vecinos; Tocar en la puerta y decirles que su casa se está incendiando\nIr a ver si están bien; Revisar cómo están los vecinos [verificar la seguridad de los vecinos]\nLograr que salgan de la casa; Ver que todo el mundo haya salido [evacuar a los vecinos]\nAveriguar qué está pasando; Verificar que en realidad sea un incendio; asegurarse de que no están haciendo un asado en el jardín\nIr a ayudar; Ayudarles\nHacer que todos salgan de la casa porque se podría incendiar [Evacuar la propia casa]\nQuedarse lejos para no salir lastimado\nConseguir un extintor; Conseguir una manguera",
              "Tomar la iniciativa de no pelear con él o ella (autocontrol)",
              "General: Reconocimiento de que las bibliotecas públicas permiten el acceso libre y público a la información\nPermite que todas las personas tengan acceso a los libros y a la información; Las personas que no tienen dinero pueden (leer, aprender) gratis; Puedes ver un libro en lugar de comprarlo\nPuedes usar gratis las computadoras\nTodo mundo puede usarlas\n\nGeneral: Reconocimiento de que las bibliotecas públicas son un lugar donde se puede consultar información sobre temas relacionados con la escuela, el trabajo, la investigación; Aumentar tu conocimiento personal; Para congregarle como comunidad;\nPuedes (revisar, pedir prestados) libros; Puedes solicitar los libros para llevártelos a casa\nEs un buen lugar para (hacer investigación, estudiar, leer, trabajar); Puedes encontrar información para una tarea\nPuedes averiguar más que con los libros que tienes en (la escuela, casa); Hay varios ejemplares del mismo libro\nPara aprender; Puedes (leer y aprender más, obtener más educación)\nPuedes (aprender más sobre alguna cosa que te agrade, leer algo interesante, encontrar información que quieres)\nPuedes ir a cualquier hora y leer; Es cómodo\nPara que leas mejor; Te ayuda a leer más; Puedes aprender a leer\nPuedes emplear las computadoras de allí; Utilizar las computadoras para investigar\nLas bibliotecas ayudan a la comunidad a reunirse; Puedes (participar en las actividades de la biblioteca, unirte a clubes de lectura)\nEs un lugar para conocer personas",
              "Refleja una conciencia sobre la importancia de los inspectores de carne para el público en general (es decir, que mucha gente está protegida por ellos o se vería afectada de manera adversa si no existiera)",
              "Reconocimiento de que el ejercicio es bueno para el cuerpo al aumentar la salud, la capacidad física y cardiovascular",
              "Para conservar una amistad al admitir tu cula e intentar que la otra persona se sienta mejor al tener consciencia de tu pena y de que buscas perdón",
              "General: Reconocimiento de la conservación de los recursos energéticos\nPara que no desperdicies la electricidad; Para ahorrar (electricidad, energía, luz, combustible)\nPorque podrías necesitar la electricidad en el futuro y ya no tendrías;\nPara que no nos quedemos sin energía; Para que no se acabe la energía\nDisminuir la contaminación que generan las plantas de energía; Maltratas el ambiente si no lo haces\n\nGeneral: Reconocimiento de la conservación de los recursos económicos\nPara que no aumente la cuenta de electricidad; Porque de otra manera la cuenta sería alta\nPara ahorrar dinero; Para que no tengas que pagar tanto; Porque desperdicias dinero\nCuesta mucho dinero tenerlas prendidas; Cuesta dinero\nSe gastarían los focos; Se pueden fundir los focos\nPara que la luz no (se vaya, se apague)",
              "Reconocimiento de que los derechos de autor y patentes proporcionan protección legal y dan el crédito apropiado a la propiedad intelectual",
              "Reconocimiento de que una promesa es una base para la fe y confianza mutuas, y tiene — una ventaja mutua o recíproca; Reconocimiento de que una promesa tiene el estatus de un contrato implícito",
              "General: Reconoce la necesidad de mantenerse actualizado con la nueva tecnología, investigación y medicamentos\nPaira mantenerse al tanto dé los nuevos (tratamientos, investigación, información médica)\nPara aprender las maneras de curar las nuevas enfermedades\nPara aprender a utilizar nuevos (equipos, tecnología); Para realizar nuevos procedimientos\nPorque siempre están saliendo nuevas medicinas\n\nGeneral: Reconocimiento de que los médicos deberían continuar su educación para proporcionar mejor atención a los pacientes, aumentar o mantener sus habilidades o conocimientos, o como requisito para conservar su licencia\nPara dar mejor atención a sus pacientes; Para ser mejores médicos\nPara (aprender, saber) más; Para aprender todo lo que puedan para curar enfermedades; Porque existen más cosas que deben aprender de la medicina; Necesitan saber más acerca de cómo funciona el cuerpo\nPara fortalecer su entrenamiento; Para tener más (experiencia, práctica)\nPara revisar sus estudios; Para repasar sus habilidades; Para aprender lo que se les podría haber olvidado\nPara que se les enseñe sobre su campo específico; Para especializarse en un área de la medicina\nPara que puedan obtener una cierta cantidad de (horas; créditos); Para conservar su Licencia;\nPara que puedan continuar con su práctica",
              "General: Reconocimiento de la mayor profundidad de cobertura en un periódico\nEl periódico (te dice más, entra en mayores detalles)\nLe caben más (datos, palabras); No hay límite de cuánto puedes escribir\nLa televisión es breve\n\nGeneral: Reconocimiento de la mayor amplitud de cobertura de un periódico\nEl periódico tiene una variedad más amplia de cosas\nEn el periódico hay más (noticias, puntos de vista, información, ideas, narraciones)\nEl periódico tiene noticias locales; Los periódicos tienen noticias sobre la ciudad en que vives\nEn el periódico aparecen los (avisos de nacimientos y matrimonios, obituarios, deportes, nota roja)\n\nGeneral: Reconocimiento de la conveniencia de tener el material impreso\nPuedes leerlo en cualquier momento; Puedes volver a leerlo\nLo puedes llevar a donde vayas; Puedes traerlo contigo\nLos periódicos no tienen límite de tiempo; Puedes leer durante el tiempo que quieras, Puedes 'saltarte' noticias\nNo tienes que esperar como lo haces para los programas de noticias; Puedes encontrar lo que a quieres sin tener que esperar\nTomas y escoges lo que quieres leer; Sólo lees las noticias que te interesan\nSi eres sordo lo puedes leer, en vez de obtener las noticias de un noticiario televisivo que tenga subtítulos\nPuedes (compartir, prestar, pedir prestado) un periódico; Está escrito de manera que se lo puedas mostrar a otros",
              "General: Reconocimiento del derecho de todos los ciudadanos a expresar sus opiniones. [Una respuesta que refleje esta idea no debe sugerir expresión propia sin consideración hacia los derechos de otras personas.]\nPara que se escuchen todas las opiniones acerca de un tema; Puedes expresar las diferencias;\nPuedes comunicarte con otras personas acerca de problemas\nLa gente puede decir lo que piensa; Compartes tus (opiniones, puntos de vista); Cada quien tiene su opinión propia\nPermite disentir; Porque puedes (estar en desacuerdo con el gobierno, Protestar por injusticias)\nPuedes criticar a otras personas sin que te arresten\n\nGeneral: Reconocimiento del derecho de los ciudadanos a participar en el proceso político\nLo que dices puede (dirigir, influir en) los cambios; Lo que dices puede (cambiar, influir) a otros\nPuedes estar a favor o en contra de los candidatos\nPorque puedes cabildear a favor o en contra de ciertos temas\nPorque es una manera de influir en el gobierno\nProporciona una manera de controlar el poder del gobierno\nPorque proporciona retroalimentación para los representantes de gobierno; Le dice al gobierno lo que la gente quiere\nPara que no se le oculten secretos a la gente; Si el gobierno hace algo malo, la gente lo sabrá",
              "General: Disminución de las fuentes y calidad de la información\nNo habría otras fuentes para obtener información; Sólo escucharías un lado de la historia\nNo habría variedad; Toda la información sería igual; Para que la gente tenga opciones\nPara que no haya sólo una opinión; Para que la gente pueda expresar diferentes puntos de vista\nPorque pueden imprimir cualquier cosa que quieran que tú leas o escuches; La competencia da hechos más precisos\nCompetencia (mejora la calidad, hacer mejor las cosas); La competencia resulta en hechos más precisos\nPara que la gente pueda hacer publicidad de sus productos; Para que no se restrinjan otros anuncios\n\nGeneral: Disminuye la competencia económica y previene los monopolios ilegales\nPara que no haya un monopolio\nPara que exista competencia\nPara que más de una compañía pueda hacer dinero; Para que no saquen a todos los demás del negocio; Porque otras compañías no sobrevivirían\nEntre más compañías haya, más personas pueden tener trabajo; Los trabajos se limitarían si hubiera un monopolio; Estarían disponibles menos empleos\nLa competencia crea precios más bajos; Pueden subir los precios\nEs contra la ley antimonopolios; Es ilegal",
              "Reconocimiento de que la compra de una estampilla paga el costo de envío de una carta que es posible que ésta no pueda enviarse sin una estampilla (incluso si el niño no expresa específicamente que la estampilla paga los costos de envío)",
              "General: Reconocimiento de que los medios de comunicación amenazan la capacidad de un * dictador para censurar la información sobre su gobierno o área de influencia\nPorque es más difícil para la dictadura dar información equivocada cuando otras personas dan información correcta\nLes es más difícil usar propaganda\nLas personas pueden hacer que el mundo exterior se entere de lo que está pasando; Las personas descubrirán lo que él hizo mal\nLas personas escucharán lo que han hecho (hicieron, están haciendo)\nPermite que las personas oigan la verdadera historia de lo que está pasando allí\nLas personas pueden hablar contra (él, el gobierno)\n\nGeneral: Reconocimiento de que los medios de comunicación promueven el intercambio de ideas, así como el pensamiento y expresión individuales\nLas personas pueden compartir sus (ideas, opiniones, valores); La gente empieza a comunicarse entre sí\nLas personas se exponen a nuevas (ideas, opiniones, valores)\nLa gente comenzaría a pensar por sí misma\nPueden ver lo que está pasando en otros lugares; Aprenden cómo funcionan otros países\nLa gente está más consciente de cómo pueden ser las cosas\nLas personas se enteran de otras formas de gobierno; La gente empieza a comunicarse con personas en países (libres, democráticos); Muestran cómo es la libertad de expresión",
              "General: Reconocimiento de que el cambio rápido puede crear consecuencias imprevistas y reducir la consideración de las experiencias pasadas\nPodríamos estar yendo más allá de nuestra capacidad; Es posible qué no se haya pensado en las consecuencias\nLos avances rápidos en tecnología pueden tener fallas; Podemos cometer errores si vamos demasiado rápido\nPorque se crean cosas que causan controversia, como la clonación; Se podrían crear cosas dañinas por accidente\nSi vamos demasiado rápido, podríamos olvidar cosas importantes que aprendimos hace mucho tiempo\nEl mundo no está listo para algunos cambios\n\nGeneral: Reconocimiento de que los cambios rápidos crean dificultades para conservar el conocimiento y tecnología actuales\nNo tenemos suficiente tiempo para aprender las cosas; No todo el mundo se puede mantener a la d par; Algunas personas tienen más dificultad para cambiar si no están en la escuela\nLos hechos y el conocimiento cambian con demasiada rapidez; Es difícil mantener actualizada la información en los libros\nTienes que seguir comprando equipos; Compras una cosa y salen con algo nuevo; Ya no se usa lo viejo porque está obsoleto\nEs una pérdida de dinero; Se desperdicia mucho dinero y tiempo\nLas personas pueden perder su trabajo si no tienen las nuevas habilidades; La tecnología puede 0 hacer los trabajos que la gente hacía antes"];


let rightAnswer = ["Para mantener su higiene; es higiénico\nMata los microbios; elimina los microbios de los dientes\nPara mantenerlos limpios; para que no se ensucien\nPara impedir que salgan (caries, enfermedades de las encías)\nPara que tus (dientes, encías) sean sanos\nPara que los dientes no ( se echen a perder, se pudran)\nPara que no se forme (placa, sarro)\nPara que no te salgan (llagas, enfermedades)\nPara proteger tus dientes\nPara que los dientes ( sean más fuertes, estar en mejor condición)\nPara que (permanezcan blancos, no se pongan amarillos)\nPara tener un buen aliento",
                  "Para una dieta balanceada; Para comer algo de cada grupo de alimentos\nContienen vitaminas (minerales, nutrientes, fibra, proteínas); Incluyen elementos que tu cuerpo necesita\nEs sano; Te mantienen sano\nPrevienen enfermedades (ataques cardíacos, cáncer, males o enfermedades)\nPara tener (fuerza, energía); Para volverte (más fuerte, más activo)\nTe ayuda a (la digestión, la vista, los huesos, la memoria) [Nombra una parte o función específica del cuerpo]\nPara (crecer, volverte grande)",
                  "Para impedir que la gente se lastime en un accidente de coche; Para reducir las lesiones en un choque\nPara que no salgas volando por el parabrisas; Para que no te caigas durante un accidente\nPara mantener seguras a las personas en un accidente de coche; Para estar seguro; Como precaución de seguridad\nPara proteger a la gente de un choque; Como precaución\nPara que no te golpees (con el tablero, con el volante, la cabeza); Para detenerte en un accidente\nTe mantiene fijo en un punto; Te mantiene adentro; Previene que salgas volando hacia delante\nPueden salvar tu vida en un accidente",
                  "Para que sepas quienes son; Para identificarlos en caso de una urgencia\nPara que la gente sepa que son (genuinos, reales); Para probar que son policias\nLes proporciona honor y respeto; Para que la gente no le falte respeto\nPara que las personas puedan saber que son quienes imponen la ley; Para demostrar su autoridad",
                  "Verificar si trae identificación y (regresarla, hablarle al propietario) [Debe contener ambas partes]\nTratar de descubrir a quién le pertenece y regresarla; Encontrar al dueño y devolverla [Debe contener ambas partes]\nLlevarla a la policía\nEnviarla por correo si existe una identificación\nDevolverla; Entragarla al (cajero, dependiente, guardia de seguridad, oficina de objetos perdidos)\nInformar en el sistema de sonido de la tienda",
                  "Una respuesta que refleje ambas ideas generales",
                  "No pelear( golpearla, pegarle, devolverle el golpe)\nLa violencia no resuelve nada; pelearnos bueno\nHablar con ella de manera sensata; Averiguar Qué le sucede; Ver cuál es el problema;Tratar de parar la pelea\nDecirle que no quieres pelear; Enseñarle a no pelear, Tranquilizarlo(a)\nDejarlo en paz; Ignorarlo\nEvitar la pelea; alejarse (voltearse, irse)",
                  "Respuesta que refleje cuando menos dos de las ideas generales",
                  "Para asegurarse de la calidad de la carne; Porque la mala calidad podría poner en peligro la vida de las personas\nPara prevenir una epidemia; Porque se podrían trasmitir enfermedades infecciosas\nPara garantizar que la gente obtenga carne buena; Para que las personas no le vendan carne podrida a la gente; Porque no pueden dejar que haya carne en mal estado en la tienda\nPara que la gente no sufra (enfermedades, envenenamientos por alimentos, salmonela, el mal de las vacas locas); Para que la gente no se enferme por carne en mal estado",
                  "Te mantiene sano\nPara tu capacidad cardiovascular, Reduce tu frecuencia cardiaca\nReduce el tiesgo de un ataque cardiaco; Mantiene tu presión sanguínea baja\nEs bueno para (tu corazón, pulmones, circulación)",
                  "Para hacerle sentir mejor; Para que la persona se sienta aliviada; Para que no se sienta (mal, herida)\nPara hacer las paces; Para que no haya sentimientos negativos\nPorque es bueno para los dos aclarar las cosas\nPara que no pierdas a un amigo; Para que vuelvan a ser amigos\nPara que (te sientas mejor, no te sientas culpable)\nPara que la persona te perdone; Para recuperar su confianza",
                  "Una respuesta que refleje ambas ideas generales",
                  "Para proteger su (creatividad, originalidad, propiedad intelectual)\nPara que reciban crédito por lo que han hecho\nPara que nadie más (robe, copie) sus ideas; Para que otros no puedan tener el crédito de lo que ellos hicieron; No sería justo si alguien tomara su idea\nPara que nadie más pueda hacer dinero con algo que otra persona inventó\nPorque da protección legal a su trabajo",
                  "Una promesa es (tu palabra de honor, un compromiso)\nLas personas tienen que poder confiar unas en otras\nPorque si nadie cumpliera con sus promesas, nadie les podría creer\nPorque confían en ti y tú quieres su confianza; Para mantener la fe en ti mismo y para que la otra persona pueda tener fe en ti\nEntonces la otra persona tendrá confianza en ti y si tú valoras su amistad, cumplirás con la promesa\nEl acuerdo entre dos personas es en realidad un contrato y debería cumplirse; Una promesa es un contrato social\nNuestro sistema social se basa en la fe, en las palabras y en los actos",
                  "Una respuesta que refleje ambas ideas generales",
                  "Respuesta que refleje cuando menos dos de las ideas generales",
                  "Respuesta que refleje ambos tipos de ideas generales",
                  "Respuesta que refleje ambos tipos de ideas generales",
                  "Para pagar (el envío, porte, entrega del correo)\nEs (una cuota, cargo, costo) de envío; Cubre los costos de envío que paga el correo; Cubre los costos de manejo y envío\nLas estampillas son una señal de que pagaste el dinero del correo\nIndica el pago al gobierno por el envío; Es un impuesto que pagas por mandar algo por correo\nPara (pagarle al cartero, para sostener al sistema postal, aportar dinero a la oficina postal",
                  "Una respuesta que refleje ambas ideas generales",
                  "Una respuesta que refleje ambas ideas generales"];

let mediumAnswer = ["Para que no tengas que ir al dentista; para que la cuenta del dentista no sea alta (I)\nEs bueno para (ellos, los dientes, encías, tu boca) (I)\nPara que los dientes no se (dañen, lastimen) (I)\nPara que los dientes no tengan bichos (I)\nPara que no se te caigan los dientes; para que no pierdas los dientes",
                    "Son buenas para ti; Ayudan a tu cuerpo (I)\nPara perder perder peso; Para estar delgado: para control del peso\nTe ayudan a ver mejor; Para que puedas ver en la oscuridad\nPrevienen problemas de (calambres, estómago)\nSi solo comieran (dulces, comida chatarra) se enfermarian",
                    "Para salvar la vida de las personas [sin mención de accidente](I)\nEn caso de un accidente (I)\nEs la ley; Para que no te multen; Porque te detendría una patrulla",
                    "Para que sepas que están (de guardia, trabajando)(I)\nPara que la gente no haga nada malo; Para disuadir la conducta (mala, criminal)(I)\nPara que las personas cooperen\nPara que sepas que estas seguro; Para sentirte seguro",
                    "Verificar si trae (identificación, nombre, dirección, número telefónico)(I)\nBuscar a quien le pertenece (I)\nTratar de regresarla (I)\nPreguntar a la gente alrededor si ellos la perdieron; Dársela si se le cayó (I)\nDársela a mi mamá y que ella encuentre al dueño\nLlevarsela a su casa; Hablarles por teléfono\nInformar de ello en un cartel (volante); Poner un anuncio en el periódico",
                    "Una respuesta que refleje una de las ideas generales",
                    "Decirle que no lo quieres lastimar (I)\nTranquilizarme; Convencerme de no pelear (I)\nDecirle que ( se vaya, me deje en paz, lo olvide)\nDecirle que (se detenga, le pare, se calme, no  pelee, sea un niño agradable)\nPedirle a (mi maestra,mamá, papá) que la detenga",
                    "Respuesta que refleje una de las ideas generales",
                    "Para que la gente no (se enferme, muera) (I)\nPorque de otro modo se pondría en peligro la vida de las personas (I)\nPor seguridad; Para hacerla segura (I)\nPodría tener (microbios, enfermedades); La carne podría estar (echada a perder, podrida, envenenada) (I)\nPara asegurarse de que (no tiene nada malo, la carne es buena); La carne podría estar mala (I)\nPodría tener (bichos, pelo, navajas) dentro de ella\nPara asegurarse de que es (comestible, fresca, no está caducada)",
                    "Te mantiene en forma; Conserva la buena condición (I)\nEs bueno para (ti, tu cuerpo); Puedes dañar tu cuerpo si no lo haces (I)\nPara (perder, subir de) peso; Para (adelgazar, quemar grasa); Conservar el peso (I)\nAumenta tu metabolismo (I)\nTe ves mejor; Mejora como te ves(I)\nTe sientes mejor acerca de ti mismo; Vivirás más tiempo (I)\nPara obtener (energía, resistencia)(I)\nEs bueno para tus (huesos, musculos, piernas, articulaciones)\nTe ayuda a (dormir, relajarte); Reduce el estrés\nTe hace más fuerte; Los musculos se hacen (más grandes, más fuertes)\nMejora la flexibilidad; Te ayuda a aflojarte\nTe ayuda a jugar mejor en los deportes; Haces mejor las cosas que la gente que no hace ejercicio\nPara que no te vuelvas (flojo, te la pases sentado en una sillón); Para que hagas más cosas",
                    "Para que (no se enojen contigo; no se queden enojados para siempre; no piensen que eres malo)(I)\nPara evitar que el problema se empeore; Para arreglar la situación; Para hacer más chico el problema (I)\nPorque fue tu culpa; porque estuvo mal lo que hiciste (I)\nPorque los (molestaste, hiciste llorar); Para no lastimar sus sentimientos\nPorque debes respetar sus sentimientos; Una muestra de respeto\nPorque es (amable, de buena educación); Es grosería no hacerlo",
                    "Una respuesta que refleje una de las ideas generales",
                    "Para que puedan probar que fue su idea (I)\nPara que sepas quién lo (hizo, escribió, inventó)(I)\nPara que la gente no invente lo mismo (I)\nPara que sepas (cuando, dónde) sé hizo\nPara que puedan (ganar dinero, tener ganancias)\nPara llevar registro de las cosas; Para que esté documentado y registrado; Porque proporciona un registro público",
                    "Para que la gente confíe en ti; Es cuestión de confianza; Demuestra que eres confiable\nDiste tu palabra y faltar a ella sería una mentira\nLa gente pensarían que eres un mentiroso; La gente ya no te creería\nDemuestra que (tienes integridad, lo que dijiste era en serio)\nPara conservar a los amigos; Para no perder amigos\nPara que no lastimes los sentimientos de otras personas; Para que no hagas que alguien se sienta sin apoyo\nLa gente (depende de ti, se apoya en ti, cuenta contigo)",
                    "Una respuesta que refleje una de las ideas generales",
                    "Respuesta que refleje una de las ideas generales",
                    "Respuesta que refleje una de las ideas generales",
                    "Respuesta que refleje una de las ideas generales",
                    "Cuestan dinero; Pagas por ellas (I)\nPara que la persona que recibe la carta no pague por ella (I)\nEs una forma de impuesto; Para pagarle al gobierno (I)\nSi no lo haces, no la (enviarían, entregarían, embarcarían)\nSi no tuviera estampilla te la devolverían; No puedes mandar algo sin una estampilla\nEl cartero no se lleva cosas que no tienen una estampilla; Para que el cartero la recoja",
                    "Una respuesta que refleje una de las ideas generales",
                    "Una respuesta que refleje una de las ideas generales"];


let badAnswer = ["Es bueno (I)\nSi comes dulces o bebes refrescos\nTe lavas los dientes para ir al dentista\nPorque la gente piensa que eres sucio si lo haces\nSe supone que debes hacerlo; tus padres te obligan",
                "Previene la muerte; para seguir vivos(I)\nPara que no te de hambre; Porque saben bien\nPara subir de peso; Para no ponerse demasiado delgados\nPorque te lo dicen tus papás\nPara verte bien (bonito)\nPara que te toque postre",
                "Para amarrarte (I)\nEvitan que la bolsa de aire te lastimen (I)\nPara que no tengas un accidente de tránsito (I)\nAtraviesa tu pecho o regazo\nPorque mis papas me hacen ponermelo\nPara que los puedas usar",
                "Para asumir su papel como oficiales de policía; Porque es parte de su trabajo (I)\nPara que puedan (ayudar a la gente, dar infracciones, llevar personas a la cárcel (I)\nPara que nos portemos bien con ellos (I)\nPara que se vean bien vestidos (I)\nPara que se tengan(metal, chalecos) debajo de su uniforme y que no los lastime una bala\nPara que puedan cargar todas sus cosas\nPara que puedan llevar un arma; Para que puedan disparar cuando les disparan\nPara que no se ensucien su ropa\n[Cualquier respuesta que haga referencia a bomberos]",
                "No quedarte con ella (I)\nRecogerla (I)\nDársela a mi (mamá, papá) (I)\nPreguntarle al personal de la tienda si es suya(I)\nDejarla en el mismo lugar; Regresarla a donde la encontré [No realizar ninguna acción]\nEntregarla al cartero; Echarla en un buzón de correo\nGritar; Decirles\nTirarla\nConservarla; Ver cuánto dinero tiene",
                "Llamar a la operadora(I)\nIr a la casa de junto(I)\nAlejarse del fuego (I)\nGritar “fuego” (I)\nApagar el fuego (I)\nRomper la ventana y dejar salir el humo\nEsperar a los bomberos\nDetenerse, dejarse caer al suelo y rodar\nEntrar en pánico",
                "Nada; No hacer nada (I)\nDetenerlos (I)\nSimplemente dejaría que peleará(I)\nDecir lo que sientes; Disculparte; Darles lo que quieren (I)\nDecirle a mi (maestra, mamá, papá) (I)\nPedir ayuda\nDecir “te voy a acusar”\nTe meterias en problemas si te pelearas\nSujetarlo; Pegarle levemente; Empujarlo\nDecirle que me deje en paz o se las verá conmigo\nHacer como si pelearas; Cansarlos sin lastimarlos\nGolpearlos; Pelear con ellos; Castigarlos; Pegarles",
                "(Obtienes, ves) los libros; Libros (I)\nMás personas pueden ir a una biblioteca pública (I)\nEs un lugar tranquilo para pensar; Nadie te molesta (I)\nAyudan a satisfacer las necesidades de las personas (I)\nPor diversión; Por entretenimiento (I)\nImpide que te metas en problemas; Te dan algo bueno por hacer\nTienen (bibliotecario, a alguien) que te ayuda",
                "Para inspeccionar la carne (I)\nPorque es posible que algunas de las personas que trabajan allí no sepan cómo envolver la carne (I)\nPara que no demanden a las compañías\nPara asegurarse de que es carne\nPorque podría (estar cruda, tener sangre, tener huesos)\nPara que esté fría\nPara asegurarse de que ya se les acabó y necesitan conseguir más",
                "Para tener una vida más feliz; Te hace sentir feliz (I)\nPara (crecer, volverte grande)(I)\nTe da algo que hacer (I)\nSe supone que debes hacerlo\nEs divertido; Agradable",
                "Porque es (bueno, amable)(I)\nEs lo correcto; Está mal no hacerlo (I)\nTú querrias que sse disculparan; Los tratas bien para que te traten bien; Es una regla de oro (I)\nPorque lo heriste\nPara que no lo hagas de nuevo; Para impedir que lo vuelvas a hacer\nPara que tu vida sea mejor\nPorque (tienes, deberías, necesitas) hacerlo\nPara que no (sigas enojado, quedes mal)\nPorque después podrías querer algo\nSi fueras su amigo no se enojarían\nPorque los (maestros, padres) se enojan\nPara que no te metas en problemas. para que no te acusen",
                "Para que no te corten la luz (I)\nPara que no (comiences un incendio, quemes la casa)\nEs más seguro\nSe podría volar un fusible; Un foco podría explotar\nPara que no exploten los cables de luz; Para que no te caiga un rayo\nPorque tus padres se enojan si no lo haces\nAlguien podría robar tu casa",
                "Es justo (I)\nEllos hicieron el trabajo (I)\nPara que no los utilicemos mal (I)\nPodrían tener (errores, equivocaciones)\nA Hicieron un buen trabajo",
                "Es tu palabra (I)\nEs (moral, ético, honrado)(I)\nNo es justo si no lo haces (I)\nOtros sabrían qué tipo de persona eres (I)\nSi no cumples con tus promesas (sucederá algo malo; Se pueden enojar, te podrían despedir)\nEs lo correcto; Las promesas no deberían romperse; No está bien romper una promesa\nEstarías mintiendo\nEs un secreto; No cuentas los secretos\nEsa persona no quiere que otros sepan; Podría ser personal",
                "Para saber qué deben hacer; Para que no cometan errores (I)\nPara volverse más listos (I)\nPara que puedan enseñar a otros (I)\nPara tener un grado académico superior; Para ser un médico (I)\nTienen que hacerlo; Se los exigen como requisito (I)\nPara ganar más dinero (I)\nPara que la gente se pueda sentir mejor\nPara saber cómo hacer medicinas",
                "Tiene mejor cobertura; Trae otras noticias (I)\nPuedes obtener otras noticias (cupones, tiras cómicas) en el periódico (I)\nMejora tu vocabulario; Te ayuda en la lectura (I)\nPuedes leerlo (I)\nAhorras electricidad; Ahorras en la cuenta de electricidad (I)\nEl periódico es más barato\nPuedes reciclarlo\nTe llega más temprano; La televisión te lleva más tiempo\nNo es tan (violento, gráfico) como la televisión\nEs mejor para tu (vista, cerebro, salud)\nEl periódico es más preciso; La televisión miente",
                "Está en la (Carta de los Derechos, Constitución)(I)\nSin libertad de expresión no habría democracia (I)\nEs lo que tenemos en nuestro país; Es en lo que se funda nuestro país (I)\nNo podemos ir a la cárcel por ello (I)\nPuedes hacer o decir lo que se te antoje\nPara que (sepas, comprendas) lo que la gente dice\nCausa disturbios; Las personas se meten en problemas por ello",
                "La gente se aburriría (I)\nSe apropiarían de la ciudad (I)\nNo sería justo (I)\nLos costos serían muy altos; Se haría muy caro (I)\nTendrían toda (la audiencia, el crédito)\nSería más fácil de manejar",
                "Para enviar por correo; Correo; Enviar; Para mandarla (I)\nEs por ley (I)\nMuestra cuanto (pesa la carta)\nPara demostrar que fue a la oficina de correos\nPara que el cartero la vea y le ponga un sello\nPara que puedan saber a dónde va la carta; Para que llegue a la dirección correcta\nPara saber quién la mandó; Muestra el país o el estado de donde vino",
                "Es más difícil (censurar, controlar) la información (I)\nLes dan más (libertad, independencia)(I)\nHace que pierdan (poder, control)(I)\nLes muestra cosas que son secretas (I)\nLa gente se podría organizar contra él (I)\nEl internet es difícil de detener\nTe pueden lavar el cerebro; Dan información falsa\nDan total libertad para hacer lo que quieras\nPodrían decidir (huir, irse a algún otro-sitio)",
                "Evoluciona demasiado rápido; Demasiados cambios, demasiado rápido (I)\nCausa pérdida de empleos; Reemplaza a las personas con robots (I)\nLa vieja tecnología sale demasiado rápido (I)\nLas cosas buenas o malas que ahora podemos hacer (I)\nTienes que seguir (cambiando, aprendiendo nuevas cosas) (I)\nPuedes llegar a hacerte dependiente de la tecnología (I)\nPodemos (destruir el ambiente, causar contaminación)\nEl cambio es malo; La tecnología hace que las cosas empeoren"];


let comentary = ["(I) ¿Qué quieres decir? o dime más acerca de ello\n† Si el niño no proporciona una respuesta de 2 puntos, diga: Las personas se lavan los dientes para mantenerlos limpios y prevenir la caries. Cepillarte los dientes también puede hacer que tu sonrisa se vea mejor y ayuda a mantener tu aliento fresco",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si la respuesta del niño refleja sólo una idea general, pedir una segunda respuesta diciendo: Dime otra cosa que debes hacer si ves que está saliendo humo espeso por la ventana de la casa de tu vecino",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si la respuesta del niño refleja sólo una idea general, se le pide una segunda respuesta planteando: Dime algunas otras ventajas de tener bibliotecas públicas",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si la respuesta del niño refleja sólo una idea general, se le pide una segunda respuesta planteando: Dime algunas otras razones por las que deberías apagar las luces cuando nadie las está a utilizando",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si la respuesta del niño refleja sólo una idea general, se le pide una segunda respuesta planteando: Dime algunas otras razones por las que los médicos toman clases adicionales",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si la respuesta del niño refleja sólo una idea general, se le pide una segunda respuesta planteando: Díme algunas otras ventajas de obtener las noticias de un periódico en vez de verlas en un noticiario de la televisión",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si la respuesta del niño refleja sólo una idea general, se le pide una segunda respuesta planteando: Dime algunas otras razones por las que es importante la libertad de expresión en una democracia",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si la respuesta del niño refleja sólo una idea general, se le pide una segunda respuesta, planteando: Dime algunas otras razones por las que es importante impedir que sólo una compañía sea la propietaria de todos los periódicos y de las estaciones de radio y televisión en una misma ciudad",
                "(I) ¿Qué quieres decir? o dime más acerca de ello",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si la respuesta del niño refleja sólo una idea general, se le pide una segunda respuesta planteando: Dime algunas otras maneras en que los medios de comunicación pueden ser una amenaza para las dictaduras",
                "(I) ¿Qué quieres decir? o dime más acerca de ello\n*Si la respuesta del niño refleja sólo una idea general, se le pide una segunda respuesta planteando: Dime algunos otros problemas relacionados con los cambios rápidos en ciencia y tecnología"];

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
      

function Comprension() {
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
      if((
          ((numberItem === 2 || numberItem === 3) && firstItem === 2) ||
          ((numberItem === 4 || numberItem === 5) && firstItem === 4))
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
            <h1>Comprension</h1>
            <b>Intrucciones generales:</b>
            <p>A continuación se le realizara una serie de preguntas al paciente</p>
            <p>el cual debera responder de acuerdo a la pregunta que se le haga.</p>
            <br/>
            <b>Intrucciones para registrar la respuesta de paciente:</b>
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
            <h1>Comprension</h1>
            <p>En que estimulo desea iniciar la prueba? </p>
            <p>Pacientes de edad 6-8 años o con sospechas de discapacidad intelectual:</p>
            <CustomButton
              msj="Estimulo 1"
              callback={()=>testInit(0)}
            ></CustomButton>
            <p>Pacientes de edad 9-11:</p>
            <CustomButton
              msj="Estimulo 3"
              callback={()=>testInit(2)}
            ></CustomButton>
            <p>Pacientes de edad 12-16:</p>
            <CustomButton
              msj="Estimulo 5"
              callback={()=>testInit(4)}
            ></CustomButton>
          </div>
        )
      case "test":
        return(
        <div > 
          <h2>{clues[numberItem]}</h2>

          <div id="generalC">
            <Typography variant="h6" component="p"> Conceptos Generales </Typography>
            {general[numberItem].split("\n\n").map((i,key) => {
              return <div key={key}>
                  &nbsp;
                  <Typography variant="body2" component="p"> {i} </Typography> 
                </div>;
            })}
          </div>
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
              <div >
                <Typography gutterBottom variant="h5" component="h2"> 1 punto </Typography>
                <Card className={classes.root}>
                  <CardContent>
                    {mediumAnswer[numberItem].split("\n").map((i,key) => {
                      return <div key={key}>
                        <Typography variant="body2" color="textSecondary" component="p" > {i} </Typography> 
                      </div>;
                    })}
                  </CardContent>
                </Card>
              </div>

              &nbsp;  &nbsp; &nbsp;  &nbsp;
              <div>
                <Typography gutterBottom variant="h5" component="h2"> 2 puntos </Typography>
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
            &nbsp; &nbsp;
            <CustomButton
              msj="2 Puntos"
              callback={()=>score(2)}
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
            name="Comprensión"
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

export default Comprension;

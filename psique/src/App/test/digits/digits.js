import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from '../../components/customButton'
import DigitCard from './components/digitCard'

const useStyles =  makeStyles((theme) => ({
    general: {
      padding: theme.spacing(3),
      textAlign: "center",
      maxHeight:"90vh",
    },
    root: {
        textAlign: "center",
        display: 'flex',
        //flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
    },
    card:{
        backgroundColor: "bisque"
    }
    
  }));


let testTime = [0,0,0,0]
let testMistakes = [0,0,0,0]

let subtest1 = [[1,4,3,2,5],[4,3,1,5,2],[5,4,2,3,1],[2,5,1,4,3],
                [1,3,2,5,4],[3,5,4,1,2],[1,4,3,2,5],[4,1,5,3,2],
                [5,2,1,4,3],[2,5,3,1,4]];

let subtest2 = [[1,4,3,2,5],[4,3,1,5,2],[5,4,2,3,1],[2,5,1,4,3],
                [1,3,2,5,4],[3,5,4,1,2],[1,4,3,2,5],[4,1,5,3,2],
                [5,2,1,4,3],[2,5,3,1,4]];

let subtest31 = [[1,4,3,2,5],[4,3,1,5,2],[5,4,2,3,1],[2,5,1,4,3],
                 [1,3,2,5,4],[3,5,4,1,2],[1,4,3,2,5],[4,1,5,3,2],
                 [5,2,1,4,3],[2,5,3,1,4]];

let subtest32 = [[5,1,4,3,2],[2,5,3,1,4],[3,2,1,4,5],[4,3,2,1,5],
                 [5,4,3,2,1],[1,3,5,2,4],[3,2,4,5,1],[2,4,3,1,5],
                 [3,1,2,5,4],[5,2,1,4,3]];

let subtest41 = [[1,4,3,3,5],[4,5,1,5,2],[5,4,3,3,1],[3,5,1,4,3],
                 [1,3,2,5,2],[3,5,4,3,2],[1,3,3,2,5],[4,1,4,3,2],
                 [3,2,1,4,3],[2,5,3,1,2]]

let subtest42 = [[4,5,1,2,3],[2,3,5,1,4],[3,1,2,4,5],[2,3,4,1,5],
                 [5,1,3,2,4],[2,3,5,1,4],[3,4,2,5,1],[2,4,5,1,3],
                 [5,1,2,3,4],[5,2,1,3,4]];

let subtest43 = [[0,0,0,1,0],[0,1,0,0,0],[0,0,1,0,0],[1,0,0,0,0],
                 [0,0,0,0,1],[0,0,0,1,0],[0,1,0,0,0],[0,0,1,0,0],
                 [1,0,0,0,0],[0,0,0,0,1]];
  
function Digits() {
    const [state,setState] = useState("lectura")
    const [seconds,setSeconds] = useState(0)
    const [isActive,setIsActive] = useState(true)

    const classes = useStyles();


    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    function content(){

        switch(state){
            case 'intro-lectura':
                return (
                    <div>
                    <h1>Parte 1: Lectura</h1> 
                    <b>Instrucciones generales:</b>
                    <p>A continuación se mostrará una serie de imágenes (reactivo 1/retorno) o preguntas (reactivo 6)</p>
                    <p>las imágenes deben ser mostradas al paciente para que las visualice</p>
                    <p>en el caso de las preguntas deben ser mencionadas al paciente</p>
                    <br/>
                    <b>Instrucciones para registrar la respuesta de paciente:</b>
                    <br/>
                    <br/>
                    <li>Clickee en los estimulos incorrectas del paciente</li>
                    <p>El sistema calificara automáticamente la respuesta</p>
                    <br/>
                    <CustomButton
                        msj="Iniciar subprueba"
                        callback={()=>{
                            setState("lectura")
                            setIsActive(true)
                        }}
                    ></CustomButton>
                    </div>
                );
            case 'lectura':
                
                return (
                    <div>
                        {subtest1.map((x,i) => 
                        <div key={i} className={classes.root}>
                            {x.map( (y,j) => <DigitCard key={j} type={1} digit={y} 
                            callback={(x)=> x ? testMistakes[0]=testMistakes[0]+1 : testMistakes[0]=testMistakes[0]-1}/>)}
                        </div>)}
                       
                        <CustomButton
                        msj="Terminar"
                        callback={()=>{
                            testTime[0] = seconds
                            setIsActive(false)
                            setSeconds(0)
                            setState("intro-conteo")
                            }}
                        ></CustomButton>
                    </div>
                    );
            case 'intro-conteo':
                
                return (
                    <div>
                    <h1>Parte 2: Conteo</h1> 
                    <b>Instrucciones generales:</b>
                    <p>A continuación se mostrará una serie de imágenes (reactivo 1/retorno) o preguntas (reactivo 6)</p>
                    <p>las imágenes deben ser mostradas al paciente para que las visualice</p>
                    <p>en el caso de las preguntas deben ser mencionadas al paciente</p>
                    <br/>
                    <b>Instrucciones para registrar la respuesta de paciente:</b>
                    <br/>
                    <br/>
                    <li>Clickee en los estimulos incorrectas del paciente</li>
                    <p>El sistema calificara automáticamente la respuesta</p>
                    <br/>
                    <CustomButton
                        msj="Iniciar subprueba"
                        callback={()=>{
                            setState("conteo")
                            setIsActive(true)}}
                    ></CustomButton>
                    </div>
                );
            case 'conteo':
                return (
                    <div>
                              
                        {subtest2.map((x,i) => 
                        <div key={i} className={classes.root}>
                            {x.map( (y,j) => <DigitCard key={j} type={2} digit={y} 
                            callback={(x)=> x ? testMistakes[1]=testMistakes[1]+1 : testMistakes[1]=testMistakes[1]-1}/>)}
                        </div>)}                
                        <CustomButton
                        msj="Terminar"
                        callback={()=>{
                            testTime[1] = seconds
                            setIsActive(false)
                            setSeconds(0)
                            setState("intro-eleccion")
                        }}
                        ></CustomButton>
                    </div>
                    );
            case 'intro-eleccion':
                return (
                    <div>
                    <h1>Parte 3: Eleccion</h1> 
                    <b>Instrucciones generales:</b>
                    <p>A continuación se mostrará una serie de imágenes (reactivo 1/retorno) o preguntas (reactivo 6)</p>
                    <p>las imágenes deben ser mostradas al paciente para que las visualice</p>
                    <p>en el caso de las preguntas deben ser mencionadas al paciente</p>
                    <br/>
                    <b>Instrucciones para registrar la respuesta de paciente:</b>
                    <br/>
                    <br/>
                    <li>Clickee en los estimulos incorrectas del paciente</li>
                    <p>El sistema calificara automáticamente la respuesta</p>
                    <br/>
                    <CustomButton
                        msj="Iniciar subprueba"
                        callback={()=>{
                            setState("eleccion")
                            setIsActive(true)}}
                    ></CustomButton>
                    </div>
                );
            case 'eleccion':
                return (
                    <div>
                        {subtest31.map((x,i) => 
                        <div key={i} className={classes.root}>
                            {x.map( (y,j) => <DigitCard key={j} type={3} number={subtest32[i][j]} digit={y}
                            callback={(x)=> x ? testMistakes[2]=testMistakes[2]+1 : testMistakes[2]=testMistakes[2]-1}/>)}
                        </div>)}                
                        
                        <CustomButton
                        msj="Terminar"
                        callback={()=>{
                            testTime[2] = seconds
                            setIsActive(false)
                            setSeconds(0)
                            setState("intro-alternancia")
                        }}
                        ></CustomButton>
                    </div>
                    );
            case 'intro-alternancia':
                return (
                    <div>
                    <h1>Parte 4: alternancia</h1> 
                    <b>Instrucciones generales:</b>
                    <p>A continuación se mostrará una serie de imágenes (reactivo 1/retorno) o preguntas (reactivo 6)</p>
                    <p>las imágenes deben ser mostradas al paciente para que las visualice</p>
                    <p>en el caso de las preguntas deben ser mencionadas al paciente</p>
                    <br/>
                    <b>Instrucciones para registrar la respuesta de paciente:</b>
                    <br/>
                    <br/>
                    <li>Clickee en los estimulos incorrectas del paciente</li>
                    <p>El sistema calificara automáticamente la respuesta</p>
                    <br/>
                    <CustomButton
                        msj="Iniciar subprueba"
                        callback={()=>{
                            setState("alternancia")
                            setIsActive(true)}}
                    ></CustomButton>
                    </div>
                );
            case 'alternancia':
                return (
                    <div>
                        {subtest41.map((x,i) => 
                        <div key={i} className={classes.root}>
                            {x.map( (y,j) => <DigitCard key={j} type={4} number={subtest42[i][j]} marked={subtest43[i][j]} digit={y} 
                            callback={(x)=> x ? testMistakes[3]=testMistakes[3]+1 : testMistakes[3]=testMistakes[3]-1}/>)}
                        </div>)}                
                        
                        <CustomButton
                        msj="Terminar"
                        callback={()=>{
                            testTime[3] = seconds
                            setIsActive(false)
                            setSeconds(0)
                            setState("results")
                        }}
                        ></CustomButton>
                    </div>
                    );
            case 'results':
                return (
                    <div>
                    <h1>Resultados</h1> 
                    <h2>Lectura</h2>
                    <p>Tiempo: {testTime[0]}</p>
                    <p>Errores: {testMistakes[0]}</p>

                    <h2>Conteo</h2>
                    <p>Tiempo: {testTime[1]}</p>
                    <p>Errores: {testMistakes[1]}</p>
                    
                    <h2>Eleccion</h2>
                    <p>Tiempo: {testTime[2]}</p>
                    <p>Errores: {testMistakes[2]}</p>

                    <h2>Alternancia</h2>
                    <p>Tiempo: {testTime[3]}</p>
                    <p>Errores: {testMistakes[3]}</p>
                    <br/>
                    <CustomButton
                        msj="Terminar y guardar"
                        callback={console.log("TERMINADO Y GUARDADOO")}
                    ></CustomButton>
                    <CustomButton
                        msj="Terminar"
                        callback={console.log("TERMINADO")}
                    ></CustomButton>
                    </div>
                );
        
        default:
            break;
        }

    }


    return (
        <div className={classes.general} >
        {content()}
        </div>
    );
  
}

export default Digits;

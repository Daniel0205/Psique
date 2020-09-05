import React,{useState,useEffect} from 'react';
import CustomButton from './customButton';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { setBody } from "../store/body/action";
import { setBirthday } from "../store/patient/action";
import { resetSession } from "../store/wechsler/action";
import { connect } from "react-redux";

import BaremosWAIS from '../assets/Baremos/WAIS/BaremosWAIS.json';
import BaremosWISC from '../assets/Baremos/WISC/BaremosWISC.json';

const useStyles = makeStyles((theme) => ({
    container:{
        textAlign:"center"
    },
    buttons: {
     display:"-webkit-inline-box"
    },
  }));

let yearsAge = ''
let monthsAge = ''

function Baremos(props) {
    const classes = useStyles();

    const [escalar,setEscalar] = useState(0)
    const [puntEscalares,setPuntEscalares] = useState({})
    const [ICV,setICV] = useState(0)
    const [IRP,setIRP] = useState(0)
    const [IMT,setIMT] = useState(0)
    const [IVP,setIVP] = useState(0)
    const [CIT,setCIT] = useState(0)

    function calcularEdadExacta(date1){

        var diff = new Date(new Date() - date1);
        yearsAge = (diff.toISOString().slice(0, 4) - 1970)
        monthsAge = (diff.getMonth()+1)

    }

    function identifyTable(){

        calcularEdadExacta(props.birthday);

        var tabla = ''
        var tabletoCalculate = ''

        yearsAge < 16 ? tabla = BaremosWISC : tabla = BaremosWAIS

        for(var i = 0 ; i < tabla.length ; i++){
            var name = (tabla[i].sheetName).split("-") //Solo funciona con los que tienen nombre con - 
            var inflimity = name[0].slice(0,2)
            var suplimity = name[1].slice(0,2)
            var inflimitm = name[0].slice(2)
            var suplimitm = name[1].slice(2)

            if(yearsAge >= parseInt(inflimity) && yearsAge <= parseInt(suplimity)){

                if(monthsAge >= parseInt(inflimitm) && monthsAge <= parseInt(suplimitm)){
                    tabletoCalculate = tabla[i]
                    calcularPuntEscalar(tabletoCalculate,props.resWechsler)
                    break;
                }
            }
        }

    }

    function calcularPuntEscalar(table, results){

        var keys = Object.keys(table.data[1])
        var size = keys.length

        var newEscalar = 0

        table.data.forEach(element => {

            for(var i = 1; i< size; i++){ //Iniciia desde uno por que el 0 es el indice de la puntuación correspondiente

                var limitInt = 0
                var upperLimit = 0
                var lowerLimit = 0

                //Verificar si el elemento es un entero o un rango y modifica la puntuación si el resultado del subtest corresponde al rango 
                var ejemplo = keys[i]
                
                if(typeof(element[ejemplo]) === 'number'){
                    limitInt = element[ejemplo]
                    if( parseInt(limitInt) === results[ejemplo] ){
                        setPuntEscalares(puntEscalares[ejemplo] = element['Punt. Escalar'])
                        newEscalar = newEscalar + element['Punt. Escalar']
                    }else continue;

                }else if(typeof(element[ejemplo]) === 'string'){
                    var val = (element[ejemplo]).split("-")
                    lowerLimit = val[0]
                    upperLimit = val[1]

                    if( results[ejemplo] >= parseInt(lowerLimit) && results[ejemplo] <= parseInt(upperLimit) ){
                        setPuntEscalares(puntEscalares[ejemplo] = element['Punt. Escalar'])
                        newEscalar = newEscalar + element['Punt. Escalar']
                    }else continue;
                }
            }



        });

        setEscalar(newEscalar)
        setICV(calcularICV(puntEscalares))
        setIRP(calcularIRP(puntEscalares))
        setIMT(calcularIMT(puntEscalares))
        setIVP(calcularIVP(puntEscalares))
        
        
    }

    useEffect(()=>{
        if(escalar!==0){
            setCIT(calcularCIT())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[escalar])

    //========================================================================================================================

    //Esta función calcula el Indice de Comprensión Verbal basado en los resultados de puntuacion natural
    function calcularICV(escalares){
        var keys = Object.keys(escalares)
        var tabla = null;
        var inCV = 0
        var CV = 0

        if(props.name==='WAIS'){

            //Busca en la tabla Baremos la hoja perteneciente a las correspondecias del ICV
            for(var i = 0 ; i < BaremosWAIS.length ; i++){
                if(BaremosWAIS[i].sheetName === "Comprensión verbal a ICV"){
                    tabla=BaremosWAIS[i].data;
                    break;
                }
            }

            //Se suman las puntuaciones escalares de las pruebas que contribuyen al ICV
            if(keys.includes('S')) inCV += escalares.S
            if(keys.includes('V')) inCV += escalares.V
            if(keys.includes('I')) inCV += escalares.I
            if(keys.includes('CO')) inCV += escalares.CO

            //Se halla la correspondencia de las puntuaciones escalares  y se retorna el valor del ICV
            tabla.forEach(element => {
                if(element["Suma de puntos escalares"] === inCV){
                    CV = element["CIT"]
                }
            })

        }else if(props.name==='WISC') {

            //Busca en la tabla Baremos la hoja perteneciente a las correspondecias del ICV
            for(var j = 0 ; j < BaremosWISC.length ; j++){
                if(BaremosWISC[j].sheetName === "Comprensión verbal a ICV"){
                    tabla=BaremosWISC[j].data;
                    break;
                }
            }

            //Se suman las puntuaciones escalares de las pruebas que contribuyen al ICV

            if(keys.includes('SE')) inCV += escalares.SE
            if(keys.includes('VB')) inCV += escalares.VB
            if(keys.includes('CM')) inCV += escalares.CM
            if(keys.includes('IN')) inCV += escalares.IN
            if(keys.includes('PC')) inCV += escalares.PC

            //Se halla la correspondencia de las puntuaciones escalares  y se retorna el valor del ICV
            tabla.forEach(element => {
                if(element["Suma de puntos escalares"] === inCV){
                    CV = element["CIT"]
                }
            })
        }

        return CV
    }

    //========================================================================================================================

    //Esta función calcula el Indice de Razonamiento Perceptual basado en los resultados de puntuacion natural
    function calcularIRP(escalares){
        var keys = Object.keys(escalares)
        var tabla = null;
        var inRP = 0
        var RP = 0

        if(props.name==='WAIS'){

            //Busca en la tabla Baremos la hoja perteneciente a las correspondecias del IRP
            for(var i = 0 ; i < BaremosWAIS.length ; i++){
                if(BaremosWAIS[i].sheetName === "Razonamiento perceptivo a IRP"){
                    tabla=BaremosWAIS[i].data;
                    break;
                }
            }

            //Se suman las puntuaciones escalares de las pruebas que contribuyen al IRP
            if(keys.includes('C')) inRP += escalares.C
            if(keys.includes('M')) inRP += escalares.M
            if(keys.includes('PV')) inRP += escalares.PV
            if(keys.includes('B')) inRP += escalares.B
            if(keys.includes('FI')) inRP += escalares.FI

            //Se halla la correspondencia de las puntuaciones escalares  y se retorna el valor del IRP
            tabla.forEach(element => {
                if(element["Suma de puntos escalares"] === inRP){
                    RP = element["CIT"]
                }
            })

        }else if(props.name==='WISC') {

            //Busca en la tabla Baremos la hoja perteneciente a las correspondecias del IRP
            for(var j = 0 ; j < BaremosWISC.length ; j++){
                if(BaremosWISC[j].sheetName === "Razonamiento perceptivo a IRP"){
                    tabla=BaremosWISC[j].data;
                    break;
                }
            }

            //Se suman las puntuaciones escalares de las pruebas que contribuyen al IRP

            if(keys.includes('DC')) inRP += escalares.DC
            if(keys.includes('CD')) inRP += escalares.CD
            if(keys.includes('MT')) inRP += escalares.MT
            if(keys.includes('IN')) inRP += escalares.IN

            //Se halla la correspondencia de las puntuaciones escalares  y se retorna el valor del IRP
            tabla.forEach(element => {
                if(element["Suma de puntos escalares"] === inRP){
                    RP = element["CIT"]
                }
            })
        }

        return RP
    }

    //========================================================================================================================

    //Esta función calcula el Indice de Memoria de Trabajo basado en los resultados de puntuacion natural
    function calcularIMT(escalares){
        var keys = Object.keys(escalares)
        var tabla = null;
        var inMT = 0
        var MT = 0

        if(props.name==='WAIS'){

            //Busca en la tabla Baremos la hoja perteneciente a las correspondecias del IMT
            for(var i = 0 ; i < BaremosWAIS.length ; i++){
                if(BaremosWAIS[i].sheetName === "Memoria de trabajo a IMT"){
                    tabla=BaremosWAIS[i].data;
                    break;
                }
            }

            //Se suman las puntuaciones escalares de las pruebas que contribuyen al IMT
            if(keys.includes('D')) inMT += escalares.D
            if(keys.includes('A')) inMT += escalares.A
            if(keys.includes('LN')) inMT += escalares.LN

            //Se halla la correspondencia de las puntuaciones escalares  y se retorna el valor del IMT
            tabla.forEach(element => {
                if(element["Suma de puntos escalares"] === inMT){
                    MT = element["CIT"]
                }
            })

        }else if(props.name==='WISC') {

            //Busca en la tabla Baremos la hoja perteneciente a las correspondecias del IMT
            for(var j = 0 ; j < BaremosWISC.length ; j++){
                if(BaremosWISC[j].sheetName === "Memoria de trabajo a IMT"){
                    tabla=BaremosWISC[j].data;
                    break;
                }
            }

            //Se suman las puntuaciones escalares de las pruebas que contribuyen al IMT

            if(keys.includes('RD')) inMT += escalares.RD
            if(keys.includes('NL')) inMT += escalares.NL
            if(keys.includes('AR')) inMT += escalares.AR

            //Se halla la correspondencia de las puntuaciones escalares  y se retorna el valor del IMT
            tabla.forEach(element => {
                if(element["Suma de puntos escalares"] === inMT){
                    MT = element["CIT"]
                }
            })
        }

        return MT
    }

    //========================================================================================================================

    //Esta función calcula el Indice de Velocidad de Procesamiento basado en los resultados de puntuacion natural
    function calcularIVP(escalares){
        var keys = Object.keys(escalares)
        var tabla = null;
        var inVP = 0
        var VP = 0

        if(props.name==='WAIS'){

            //Busca en la tabla Baremos la hoja perteneciente a las correspondecias del IVP
            for(var i = 0 ; i < BaremosWAIS.length ; i++){
                if(BaremosWAIS[i].sheetName === "Velocidad de procesamientoa IVP"){
                    tabla=BaremosWAIS[i].data;
                    break;
                }
            }

            //Se suman las puntuaciones escalares de las pruebas que contribuyen al IVP
            if(keys.includes('BS')) inVP += escalares.BS
            if(keys.includes('CN')) inVP += escalares.CN
            if(keys.includes('CA')) inVP += escalares.CA

            //Se halla la correspondencia de las puntuaciones escalares  y se retorna el valor del IVP
            tabla.forEach(element => {
                if(element["Suma de puntos escalares"] === inVP){
                    VP = element["CIT"]
                }
            })

        }else if(props.name==='WISC') {

            //Busca en la tabla Baremos la hoja perteneciente a las correspondecias del IVP
            for(var j = 0 ; j < BaremosWISC.length ; j++){
                if(BaremosWISC[j].sheetName === "Velocidad de procesamientoa IVP"){
                    tabla=BaremosWISC[j].data;
                    break;
                }
            }

            //Se suman las puntuaciones escalares de las pruebas que contribuyen al IVP

            if(keys.includes('CL')) inVP += escalares.CL
            if(keys.includes('BS')) inVP += escalares.BS
            if(keys.includes('RG')) inVP += escalares.RG

            //Se halla la correspondencia de las puntuaciones escalares  y se retorna el valor del IVP
            tabla.forEach(element => {
                if(element["Suma de puntos escalares"] === inVP){
                    VP = element["CIT"]
                }
            })
        }

        return VP
    }

    //========================================================================================================================

    //Esta función calcula el CIT basado en los resultados de puntuacion natural
    
    function calcularCIT(){
        var tabla = null;
        var CI = 0

        if(props.name==='WAIS'){

            //Busca en la tabla Baremos la hoja perteneciente a las correspondecias del CIT
            for(var i = 0 ; i < BaremosWAIS.length ; i++){
                if(BaremosWAIS[i].sheetName === "Escala total a CIT"){
                    tabla=BaremosWAIS[i].data;
                    break;
                }
            }

            //Se halla la correspondencia de las puntuaciones escalares  y se retorna el valor del CIT
            tabla.forEach(element => {

                if(element["Suma de puntos escalares"] === escalar){
                    CI = element["CIT"]
                }
            })

        }else if(props.name==='WISC') {

            //Busca en la tabla Baremos la hoja perteneciente a las correspondecias del CIT
            for(var j = 0 ; j < BaremosWISC.length ; j++){
                if(BaremosWISC[j].sheetName === "Escala total a CIT"){
                    tabla=BaremosWISC[j].data;
                    break;
                }
            }

            //Se halla la correspondencia de las puntuaciones escalares  y se retorna el valor del CIT
            tabla.forEach(element => {
                if(element["Suma de puntos escalares"] === escalar){
                    CI = element["CIT"]
                }
            })
        }

        return CI
    }

    //useEffect(identifyTable,[])

    return (
    <div className={classes.container} >
        <h2>Puntuación Escalar de la prueba {props.name}</h2>

        <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(x)=>{
                props.setBirthday(new Date(x.target.value))
            }}
        />
        <p>Por favor, escoge la fecha de nacimiento del paciente. Según esta se calculara la puntuación escalar</p>
        <CustomButton
          msj="Calcular"
          callback={identifyTable}>
        </CustomButton>

        <h4>La suma de las puntuación escalares obtenida en cada prueba fue: </h4>
        <h2> {escalar}</h2>

        <h3>El Indice de compresion verbal es:</h3>
        <h2> {ICV}</h2>

        <h3>El Indice de Razonamiento Perceptual es:</h3>
        <h2> {IRP}</h2>

        <h3>El Indice de Memoria de Trabajo es:</h3>
        <h2> {IMT}</h2>

        <h3>El Indice de Velocidad de Procesamiento es:</h3>
        <h2> {IVP}</h2>

        <h3>El CIT es:</h3>
        <h2> {CIT}</h2>

        <h3>Las puntuaciones individuales por cada subprueba son las siguientes</h3>
        { Object.entries(props.resWechsler).map((t,i) => <h2 key={i}> {t[0]} : {t[1]} </h2> ) }
        

        <CustomButton
          msj="Volver al Inicio"
          callback={()=>{
              props.setBody('init')
              props.resetSession('initial',false)
              }}>
        </CustomButton>

    </div>
    );
}

const mapStateToProps = (state) => {
  
    return {
        birthday: state.patientReducer.birthday,
        resWechsler: state.wechslerReducer.resWechsler,
    };
  };

function mapDispatchToProps(dispatch) {
    return {
        setBody: (item) => dispatch(setBody(item)),
        setBirthday: (item) => dispatch(setBirthday(item)),
        resetSession: (itemTest,itemActive) => dispatch(resetSession(itemTest,itemActive)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Baremos);
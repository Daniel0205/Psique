import React,{useState, useEffect} from 'react';
import CustomButton from './customButton';
import { makeStyles } from '@material-ui/core/styles';
import { setBody } from "../store/body/action";
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
            console.log(tabla[i].sheetName)
            console.log(name)
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
                        newEscalar = newEscalar + element['Punt. Escalar']
                    }else continue;

                }else if(typeof(element[ejemplo]) === 'string'){
                    var val = (element[ejemplo]).split("-")
                    lowerLimit = val[0]
                    upperLimit = val[1]

                    if( results[ejemplo] >= parseInt(lowerLimit) && results[ejemplo] <= parseInt(upperLimit) ){
                        newEscalar = newEscalar + element['Punt. Escalar']
                    }else continue;
                }
            }

        });

        setEscalar(newEscalar)
        console.log('La puntiacuón escalar total es ' + newEscalar )

    }
    
    useEffect(identifyTable,[])

    return (
    <div className={classes.container} >
        <h2>Puntuación Escalar</h2>

        <h4>La suma de las puntuación escalares obtenida en cada prueba fue: </h4>
        <h2> {escalar}</h2>

        <h3>Las puntuaciones individuales son las siguientes</h3>
        <h2> {JSON.stringify(props.resWechsler)}</h2>

        <CustomButton
          msj="Volver al Inicio"
          callback={()=>{props.setBody('init')}}>
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Baremos);
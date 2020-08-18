import React from 'react';
import CustomButton from '../../components/customButton'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  div:{
    paddingLeft: "2%",
    paddingRight: "2%"
  }
});

let aphasiasFinal = ["Afasia aferente","Afasia eferente","Afasia mixta"]

function ResultsWada(props) {
  const classes = useStyles(); 
    
    function getTotal(){
        let total = 0
        for (let i = 0; i < props.test.length; i++) {
          total+= props.results[i]
          
        }
        return total
    }

    function getTime(seconds){
    
      let aux = ""
      let minutes = Math.trunc(seconds/60)
      if(minutes<10) aux+="0"+minutes
      else aux+=minutes
  
      aux+=":"
  
      if((seconds%60)<10) aux+="0"+seconds%60
      else aux+=seconds%60
  
      return aux
    }

    function didAphasia(name,bool){
        if(bool){
        props.aphasias.push([name,null])
        }
        else{
            var index = props.aphasias.findIndex((x)=>name===x[0]);
            if (index > -1) {
                props.aphasias.splice(index, 1);
            }
        }
    }

    return(<div className={classes.div}>
        <h1>Resultados</h1>
        <h2>Tiempo empleado: {props.cronometer()}</h2>
        <h2>Momento de aplicacion del propofol: {props.propofol}</h2>
        <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell >Subtest</TableCell>
              <TableCell align="center">Resultados</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.test.map((name,index) => 
              props.selectedTest[index]?<TableRow key={index}>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="center">{props.results[index]}</TableCell>
              </TableRow>:null
            )}
            <TableRow >
                <TableCell component="th" scope="row">
                  Total
                </TableCell>
                <TableCell align="center">{getTotal()}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
        </TableContainer>
        <h1>Eventos Registradas</h1>
        {props.aphasias.length!==0?<TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell >Afasia</TableCell>
              <TableCell align="center">Tiempo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.aphasias.map((aphasia,index) => 
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {aphasia[0]}
                </TableCell>
                <TableCell align="center">{getTime(aphasia[1])}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </TableContainer>:<p>No eventos registradas</p>}
        <h1>Afasias</h1>
        <FormControl required component="fieldset">
        <FormLabel component="legend">Selecciona las afasias presentadas durante la prueba:</FormLabel>
        <FormGroup>
          {aphasiasFinal.map((x,index)=>
            <FormControlLabel
              key={index}
              control={
              <Checkbox color="primary" 
                onChange={(event)=>didAphasia(aphasiasFinal[index],event.target.checked)}
              />}
              label={aphasiasFinal[index]}
            />
          )}
        </FormGroup>
      </FormControl>
      <br/>
      <CustomButton
        msj="Guardar Resultados"
        callback={()=>console.log("Guardado")}
      />
      </div>)
}


export default ResultsWada;
  

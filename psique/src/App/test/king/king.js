import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';

import reyImage from '../../assets/ReyTest/ReyImage.png';
import Background from '../../assets/Fondo/FondoNubes.jfif';

const useStyles =  makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  classTitle: {
    textAlign: "center",
    /*background-color: dodgerblue;*/
  },
  classTestRey: {
    textAlign: "center",
    /*background-color: rgb(72, 163, 255);*/
  },
  ReyImage: {
    backgroundImage: "url(" + reyImage + ")",
    //backgroundRepeat: no-repeat,
    backgroundSize: "cover",
    //backgroundPosition: center,
    //width: 250px,
    //height: 192px,
    //margin: "auto",
  },

  classTestEval: {
    //margin: "auto",
    //width: 500px,
    //height: 50%,
  },

  /*ng-valid[required], .ng-valid.required  {
    border-left: 5px solid #42A948; /* green 
  }*/
  
  /*ng-invalid:not(form)  {
    border-left: 5px solid #a94442; /* red 
  }*/

  bodypage: {
    backgroundImage: "url(" + Background + ")",
    width: '100%',
    margin: 0,
    //backgroundRepeat: no-repeat,
    backgroundSize: "cover",
    //backgroundPosition: center,
  },

  testcontainer: {
    //margin: "auto",
    backgroundColor: 'white',
    //maxWidth: 75%,
    borderColor: 'black',
  },

  /*gridfig: {
    column-width: 20%,
  },*/
}));


function King() {
  const classes = useStyles();
  const [spacing, setSpacing] = useState(2);

  var [minutes, setMinutes] = useState(0);
  var [seconds, setSeconds] = useState(0);
  var [copyType, setCopyType] = useState("");
  var [observ, setObserv] = useState("");
  

  //var absentFig = new Array(18).fill(false);
  //var stateFig = new Array(18).fill("correcta");
  //var locatedFig = new Array(18).fill(false);

  var [absentFig1, setabsentFig1] = useState(false);
  var [stateFig1, setstateFig1] = useState('correcta');
  var [locatedFig1, setlocatedFig1] = useState(false);

  var [absentFig2, setabsentFig2] = useState(false);
  var [stateFig2, setstateFig2] = useState('correcta');
  var [locatedFig2, setlocatedFig2] = useState(false);

  var [absentFig3, setabsentFig3] = useState(false);
  var [stateFig3, setstateFig3] = useState('correcta');
  var [locatedFig3, setlocatedFig3] = useState(false);

  var [absentFig4, setabsentFig4] = useState(false);
  var [stateFig4, setstateFig4] = useState('correcta');
  var [locatedFig4, setlocatedFig4] = useState(false);

  var [absentFig5, setabsentFig5] = useState(false);
  var [stateFig5, setstateFig5] = useState('correcta');
  var [locatedFig5, setlocatedFig5] = useState(false);

  var [absentFig6, setabsentFig6] = useState(false);
  var [stateFig6, setstateFig6] = useState('correcta');
  var [locatedFig6, setlocatedFig6] = useState(false);

  var [absentFig7, setabsentFig7] = useState(false);
  var [stateFig7, setstateFig7] = useState('correcta');
  var [locatedFig7, setlocatedFig7] = useState(false);

  var [absentFig8, setabsentFig8] = useState(false);
  var [stateFig8, setstateFig8] = useState('correcta');
  var [locatedFig8, setlocatedFig8] = useState(false);

  var [absentFig9, setabsentFig9] = useState(false);
  var [stateFig9, setstateFig9] = useState('correcta');
  var [locatedFig9, setlocatedFig9] = useState(false);

  var [absentFig10, setabsentFig10] = useState(false);
  var [stateFig10, setstateFig10] = useState('correcta');
  var [locatedFig10, setlocatedFig10] = useState(false);

  var [absentFig11, setabsentFig11] = useState(false);
  var [stateFig11, setstateFig11] = useState('correcta');
  var [locatedFig11, setlocatedFig11] = useState(false);

  var [absentFig12, setabsentFig12] = useState(false);
  var [stateFig12, setstateFig12] = useState('correcta');
  var [locatedFig12, setlocatedFig12] = useState(false);

  var [absentFig13, setabsentFig13] = useState(false);
  var [stateFig13, setstateFig13] = useState('correcta');
  var [locatedFig13, setlocatedFig13] = useState(false);

  var [absentFig14, setabsentFig14] = useState(false);
  var [stateFig14, setstateFig14] = useState('correcta');
  var [locatedFig14, setlocatedFig14] = useState(false);

  var [absentFig15, setabsentFig15] = useState(false);
  var [stateFig15, setstateFig15] = useState('correcta');
  var [locatedFig15, setlocatedFig15] = useState(false);

  var [absentFig16, setabsentFig16] = useState(false);
  var [stateFig16, setstateFig16] = useState('correcta');
  var [locatedFig16, setlocatedFig16] = useState(false);

  var [absentFig17, setabsentFig17] = useState(false);
  var [stateFig17, setstateFig17] = useState('correcta');
  var [locatedFig17, setlocatedFig17] = useState(false);

  var [absentFig18, setabsentFig18] = useState(false);
  var [stateFig18, setstateFig18] = useState('correcta');
  var [locatedFig18, setlocatedFig18] = useState(false);
  
  var maxMinutes = 60;
  var score = 0;
  var time = 0;

  function computeScores(absentV, stateV, locatedV){
    /* 
      Correcta: (=2)
        bien situada: 2 Puntos (-1)
        mal situada: 1 Puntos (*0.5)
      Incorrecta: (=1)
        bien situada: 1 Puntos (*1)
        mal situada: 0.5 Puntos (*0.5)
      Ausente: 0 Puntos (*0)
    
      Valor = State[2 ó 1] * Located[1 ó 0.5] * absent[1 ó 0]
    */
    var state, located, absent, score;
    if(stateV === "correcta"){ state = 2; }else{ state = 1; }    
    if(locatedV){ located = 1; }else{ located = 0.5; }
    if(absentV){ absent = 0; }else{ absent = 1; }
    score = state * located * absent;

    return score;
  }

  function save(){
    if((this.minutes >= 0) || (this.minutes <= this.maxMinutes)){
      if((this.seconds >= 0) || (this.seconds < 60)){
        this.time = (this.minutes*60)+this.seconds;

        if(this.time > 0){
          this.score = this.computeScores(this.absentFig1,  this.stateFig1,  this.locatedFig1) +
                       this.computeScores(this.absentFig2,  this.stateFig2,  this.locatedFig2) +
                       this.computeScores(this.absentFig3,  this.stateFig3,  this.locatedFig3) +
                       this.computeScores(this.absentFig4,  this.stateFig4,  this.locatedFig4) +
                       this.computeScores(this.absentFig5,  this.stateFig5,  this.locatedFig5) +
                       this.computeScores(this.absentFig6,  this.stateFig6,  this.locatedFig6) +
                       this.computeScores(this.absentFig7,  this.stateFig7,  this.locatedFig7) +
                       this.computeScores(this.absentFig8,  this.stateFig8,  this.locatedFig8) +
                       this.computeScores(this.absentFig9,  this.stateFig9,  this.locatedFig9) +
                       this.computeScores(this.absentFig10, this.stateFig10, this.locatedFig10) +
                       this.computeScores(this.absentFig11, this.stateFig11, this.locatedFig11) +
                       this.computeScores(this.absentFig12, this.stateFig12, this.locatedFig12) +
                       this.computeScores(this.absentFig13, this.stateFig13, this.locatedFig13) +
                       this.computeScores(this.absentFig14, this.stateFig14, this.locatedFig14) +
                       this.computeScores(this.absentFig15, this.stateFig15, this.locatedFig15) +
                       this.computeScores(this.absentFig16, this.stateFig16, this.locatedFig16) +
                       this.computeScores(this.absentFig17, this.stateFig17, this.locatedFig17) +
                       this.computeScores(this.absentFig18, this.stateFig18, this.locatedFig18);
          console.log("Time: ", this.time, "Segundos  Score: ", this.score);
        }else{
          // MENSAJE DE TIEMPO INVÁLIDO
        }
      }else{
        // MENSAJE DE SEGUNDOS INVÁLIDOS
      }
    }else{
      // MENSAJE DE MINUTOS INVÁLIDOS
    }
  }

  /*function update(x,i,type){
    switch(type){
      case 0:
        absentFig[i]=!absentFig[i];
      break;
      case 1:
        stateFig[i]=x;
      break;
      case 2:
        locatedFig[i]=!locatedFig[i];
      break;
    }    
  }*/


  return (   
    <div className={classes.bodypage}>
      <br></br>
      <Container align="center" fixed>      
      <Paper >
        <br></br>
        <h2 className={classes.classTitle}>Test de Rey</h2>
        <div>
          <table align="center">
            <th>Paciente: Juan Pablo Prueba</th>
            <th>   -   </th>
            <th>ID: 00</th>
          </table>          
        </div>

        <div>
          <form align="center">
            <div>
              <FormLabel for="minutes">Tiempo:</FormLabel>
              <TextField required value={minutes} onChange={(e)=>setMinutes(e.target.value)} maxlength="3" inputProps={{ 'aria-label': 'minutes' }} />
              <FormLabel>  Minutos y  </FormLabel>            
              <Input required  value={seconds}  onChange={(e)=>setSeconds(e.target.value)} maxlength="2" inputProps={{ 'aria-label': 'seconds' }} />
              <FormLabel>  Segundos</FormLabel>        
            </div>      

            <div>
              <FormLabel>Tipo de Copia:</FormLabel> <br></br>          
              <TextField  id="copyType" multiline onChange={(e)=>setCopyType(e.target.value)} value={copyType} inputProps={{ 'aria-label': 'copy-type' }}/>
        
              <br></br><br></br>
              <FormLabel>Observaciones:</FormLabel> <br></br>
              <TextField  id="observ" multiline onChange={(e)=>setObserv(e.target.value)} value={observ} inputProps={{ 'aria-label': 'observations' }}/>
            </div>

            <div>
              <h3 align="center">Calificación de la prueba</h3>
              <img src={reyImage}/>
              {/*<div className={classes.ReyImage} ></div>    */}
            </div>

            <br></br><br></br><br></br>
            <Grid container className={classes.root} justify="center">
              <Grid item xs={12}>
                
                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>No. </FormLabel> </Grid>
                    <Grid item xs={1}> <FormLabel>Ausente </FormLabel> </Grid>
                    <Grid item xs={2}> <FormLabel>Estado de la fig. </FormLabel> </Grid>
                    <Grid item xs={1}> <FormLabel>Bien situada </FormLabel> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>1</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig1(!absentFig1)} checked={absentFig1} inputProps={{ 'aria-label': 'absent-Fig1' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig1} onChange={(e)=>setstateFig1(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig1(!absentFig1)} checked={locatedFig1} inputProps={{ 'aria-label': 'located-Fig#i' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>2</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig1(!absentFig2)} checked={absentFig2} inputProps={{ 'aria-label': 'absent-Fig2' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig2} onChange={(e)=>setstateFig2(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig2(!absentFig2)} checked={locatedFig2} inputProps={{ 'aria-label': 'located-Fig2' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>3</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig3(!absentFig3)} checked={absentFig3} inputProps={{ 'aria-label': 'absent-Fig3' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig3} onChange={(e)=>setstateFig3(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig3(!absentFig3)} checked={locatedFig3} inputProps={{ 'aria-label': 'located-Fig3' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>4</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig4(!absentFig4)} checked={absentFig4} inputProps={{ 'aria-label': 'absent-Fig4' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig4} onChange={(e)=>setstateFig4(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig4(!absentFig4)} checked={locatedFig4} inputProps={{ 'aria-label': 'located-Fig4' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>5</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig5(!absentFig5)} checked={absentFig5} inputProps={{ 'aria-label': 'absent-Fig5' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig5} onChange={(e)=>setstateFig5(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig5(!absentFig5)} checked={locatedFig5} inputProps={{ 'aria-label': 'located-Fig5' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>6</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig6(!absentFig6)} checked={absentFig6} inputProps={{ 'aria-label': 'absent-Fig6' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig6} onChange={(e)=>setstateFig6(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig6(!absentFig6)} checked={locatedFig6} inputProps={{ 'aria-label': 'located-Fig6' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>7</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig7(!absentFig7)} checked={absentFig7} inputProps={{ 'aria-label': 'absent-Fig7' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig7} onChange={(e)=>setstateFig7(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig7(!absentFig7)} checked={locatedFig7} inputProps={{ 'aria-label': 'located-Fig7' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>8</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig8(!absentFig8)} checked={absentFig8} inputProps={{ 'aria-label': 'absent-Fig8' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig8} onChange={(e)=>setstateFig8(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig8(!absentFig8)} checked={locatedFig8} inputProps={{ 'aria-label': 'located-Fig8' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>9</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig9(!absentFig9)} checked={absentFig9} inputProps={{ 'aria-label': 'absent-Fig9' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig9} onChange={(e)=>setstateFig9(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig9(!absentFig9)} checked={locatedFig9} inputProps={{ 'aria-label': 'located-Fig9' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>10</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig10(!absentFig10)} checked={absentFig10} inputProps={{ 'aria-label': 'absent-Fig10' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig10} onChange={(e)=>setstateFig10(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig10(!absentFig10)} checked={locatedFig10} inputProps={{ 'aria-label': 'located-Fig10' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>11</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig11(!absentFig11)} checked={absentFig11} inputProps={{ 'aria-label': 'absent-Fig11' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig11} onChange={(e)=>setstateFig11(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig11(!absentFig11)} checked={locatedFig11} inputProps={{ 'aria-label': 'located-Fig11' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>12</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig12(!absentFig12)} checked={absentFig12} inputProps={{ 'aria-label': 'absent-Fig12' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig12} onChange={(e)=>setstateFig12(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig12(!absentFig12)} checked={locatedFig12} inputProps={{ 'aria-label': 'located-Fig12' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>13</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig13(!absentFig13)} checked={absentFig13} inputProps={{ 'aria-label': 'absent-Fig13' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig13} onChange={(e)=>setstateFig13(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig13(!absentFig13)} checked={locatedFig13} inputProps={{ 'aria-label': 'located-Fig13' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>14</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig14(!absentFig14)} checked={absentFig14} inputProps={{ 'aria-label': 'absent-Fig14' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig14} onChange={(e)=>setstateFig14(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig14(!absentFig14)} checked={locatedFig14} inputProps={{ 'aria-label': 'located-Fig14' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>15</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig15(!absentFig15)} checked={absentFig15} inputProps={{ 'aria-label': 'absent-Fig15' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig15} onChange={(e)=>setstateFig15(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig15(!absentFig15)} checked={locatedFig15} inputProps={{ 'aria-label': 'located-Fig15' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>16</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig16(!absentFig16)} checked={absentFig16} inputProps={{ 'aria-label': 'absent-Fig16' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig16} onChange={(e)=>setstateFig16(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig16(!absentFig16)} checked={locatedFig16} inputProps={{ 'aria-label': 'located-Fig16' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>17</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig17(!absentFig17)} checked={absentFig17} inputProps={{ 'aria-label': 'absent-Fig17' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig17} onChange={(e)=>setstateFig17(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig17(!absentFig17)} checked={locatedFig17} inputProps={{ 'aria-label': 'located-Fig17' }}/> </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={1}> <FormLabel>18</FormLabel> </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setabsentFig18(!absentFig18)} checked={absentFig18} inputProps={{ 'aria-label': 'absent-Fig18' }}/> </Grid>
                    <Grid item xs={2}> 
                      <Select value={stateFig18} onChange={(e)=>setstateFig18(e.target.value)}> 
                        <MenuItem value={"correcta"}>Correcta</MenuItem>
                        <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1}> <Checkbox onChange={(e)=>setlocatedFig18(!absentFig18)} checked={locatedFig18} inputProps={{ 'aria-label': 'located-Fig18' }}/> </Grid>
                  </Grid>


                  {/* 
                  {absentFig.map((x,i)=>
                    <Grid container justify="center" spacing={1}>
                      <Grid item xs={1}> <FormLabel>{i}</FormLabel> </Grid>
                      <Grid item xs={1}> <Checkbox onChange={(e)=>update(x,i,0)} checked={absentFig[i]} inputProps={{ 'aria-label': 'absent-Fig1' }}/> </Grid>
                      <Grid item xs={2}> 
                        <Select value={stateFig[i]}> 
                          <MenuItem value={"correcta"}>Correcta</MenuItem>
                          <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={1}> <Checkbox onChange={update(x,i,3)} checked={locatedFig[i]} inputProps={{ 'aria-label': 'located-Fig#i' }}/> </Grid>
                    </Grid>
                  )}*/}
                
              </Grid>
            </Grid>
              {/* 
              <GridListTile>1</GridListTile>              
              <GridListTile><Checkbox value={absentFig1} checked={absentFig1} inputProps={{ 'aria-label': 'absent-Fig1' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig1}> 
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig1} inputProps={{ 'aria-label': 'located-Fig1' }}/></GridListTile>

              <GridListTile>2</GridListTile>
              <GridListTile><Checkbox checked={absentFig2} inputProps={{ 'aria-label': 'absent-Fig2' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig2}>
                <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig2} inputProps={{ 'aria-label': 'located-Fig2' }}/></GridListTile>
              
              <GridListTile>3</GridListTile>
              <GridListTile><Checkbox checked={absentFig3} inputProps={{ 'aria-label': 'absent-Fig3' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig3}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig3} inputProps={{ 'aria-label': 'located-Fig3' }}/></GridListTile>
              
              <GridListTile>4</GridListTile>
              <GridListTile><Checkbox checked={absentFig4} inputProps={{ 'aria-label': 'absent-Fig4' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig4}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig4} inputProps={{ 'aria-label': 'located-Fig4' }}/></GridListTile>
              
              <GridListTile>5</GridListTile>
              <GridListTile><Checkbox checked={absentFig5} inputProps={{ 'aria-label': 'absent-Fig5' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig5}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig5} inputProps={{ 'aria-label': 'located-Fig5' }}/></GridListTile>
              
              <GridListTile>6</GridListTile>
              <GridListTile><Checkbox checked={absentFig6} inputProps={{ 'aria-label': 'absent-Fig6' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig6}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig6} inputProps={{ 'aria-label': 'located-Fig6' }}/></GridListTile>
              
              <GridListTile>7</GridListTile>
              <GridListTile><Checkbox checked={absentFig7} inputProps={{ 'aria-label': 'absent-Fig7' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig7}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig7} inputProps={{ 'aria-label': 'located-Fig7' }}/></GridListTile>
              
              <GridListTile>8</GridListTile>
              <GridListTile><Checkbox checked={absentFig8} inputProps={{ 'aria-label': 'absent-Fig8' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig8}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig8} inputProps={{ 'aria-label': 'located-Fig8' }}/></GridListTile>
              
              <GridListTile>9</GridListTile>
              <GridListTile><Checkbox checked={absentFig9} inputProps={{ 'aria-label': 'absent-Fig9' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig9}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig9} inputProps={{ 'aria-label': 'located-Fig9' }}/></GridListTile>
              
              <GridListTile>10</GridListTile>
              <GridListTile><Checkbox checked={absentFig10} inputProps={{ 'aria-label': 'absent-Fig10' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig10}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig10} inputProps={{ 'aria-label': 'located-Fig10' }}/></GridListTile>
              
              <GridListTile>11</GridListTile>
              <GridListTile><Checkbox checked={absentFig11} inputProps={{ 'aria-label': 'absent-Fig11' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig11}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig11} inputProps={{ 'aria-label': 'located-Fig11' }}/></GridListTile>
              
              <GridListTile>12</GridListTile>
              <GridListTile><Checkbox checked={absentFig12} inputProps={{ 'aria-label': 'absent-Fig12' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig12}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig12} inputProps={{ 'aria-label': 'located-Fig12' }}/></GridListTile>
              
              <GridListTile>13</GridListTile>
              <GridListTile><Checkbox checked={absentFig13} inputProps={{ 'aria-label': 'absent-Fig13' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig13}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig13} inputProps={{ 'aria-label': 'located-Fig13' }}/></GridListTile>
              
              <GridListTile>14</GridListTile>
              <GridListTile><Checkbox checked={absentFig14} inputProps={{ 'aria-label': 'absent-Fig14' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig14}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig14} inputProps={{ 'aria-label': 'located-Fig14' }}/></GridListTile>
              
              <GridListTile>15</GridListTile>
              <GridListTile><Checkbox checked={absentFig15} inputProps={{ 'aria-label': 'absent-Fig15' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig15}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig15} inputProps={{ 'aria-label': 'located-Fig15' }}/></GridListTile>
              
              <GridListTile>16</GridListTile>
              <GridListTile><Checkbox checked={absentFig16} inputProps={{ 'aria-label': 'absent-Fig16' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig16}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig16} inputProps={{ 'aria-label': 'located-Fig16' }}/></GridListTile>
              
              <GridListTile>17</GridListTile>
              <GridListTile><Checkbox checked={absentFig17} inputProps={{ 'aria-label': 'absent-Fig17' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig17}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig17} inputProps={{ 'aria-label': 'located-Fig17' }}/></GridListTile>
              
              <GridListTile>18</GridListTile>
              <GridListTile><Checkbox checked={absentFig18} inputProps={{ 'aria-label': 'absent-Fig18' }}/></GridListTile>
              <GridListTile> 
                <Select value={stateFig18}>
                  <MenuItem value={"correcta"}>Correcta</MenuItem>
                  <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile><Checkbox checked={locatedFig18} inputProps={{ 'aria-label': 'located-Fig18' }}/></GridListTile>
            </GridList>*/}
    
            <br></br>
            <Button mat-button type="submit" onClick={(e) => {save()}}>Guardar</Button>
          </form>
        </div>

        <br></br>
        </Paper>
      </Container>
      <br></br>
    </div>
  );
}

export default King;

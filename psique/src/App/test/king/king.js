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
  

  var absentFig = new Array(18).fill(false);
  var stateFig = new Array(18).fill("correcta");
  var locatedFig = new Array(18).fill(false);

  var absentFig1 = false;
  var stateFig1 = "correcta";
  var locatedFig1 = false;

  var absentFig2 = false;
  var stateFig2 = "correcta";
  var locatedFig2 = false;

  var absentFig3 = false;
  var stateFig3 = "correcta";
  var locatedFig3 = false;

  var absentFig4 = false;
  var stateFig4 = "correcta";
  var locatedFig4 = false;

  var absentFig5 = false;
  var stateFig5 = "correcta";
  var locatedFig5 = false;

  var absentFig6 = false;
  var stateFig6 = "correcta";
  var locatedFig6 = false;

  var absentFig7 = false;
  var stateFig7 = "correcta";
  var locatedFig7 = false;

  var absentFig8 = false;
  var stateFig8 = "correcta";
  var locatedFig8 = false;

  var absentFig9 = false;
  var stateFig9 = "correcta";
  var locatedFig9 = false;

  var absentFig10 = false;
  var stateFig10 = "correcta";
  var locatedFig10 = false;

  var absentFig11 = false;
  var stateFig11 = "correcta";
  var locatedFig11 = false;

  var absentFig12 = false;
  var stateFig12 = "correcta";
  var locatedFig12 = false;

  var absentFig13 = false;
  var stateFig13 = "correcta";
  var locatedFig13 = false;

  var absentFig14 = false;
  var stateFig14 = "correcta";
  var locatedFig14 = false;

  var absentFig15 = false;
  var stateFig15 = "correcta";
  var locatedFig15 = false;

  var absentFig16 = false;
  var stateFig16 = "correcta";
  var locatedFig16 = false;

  var absentFig17 = false;
  var stateFig17 = "correcta";
  var locatedFig17 = false;

  var absentFig18 = false;
  var stateFig18 = "correcta";
  var locatedFig18 = false;
  
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

  function update(x,i,type){
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
  }


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

                  {absentFig.map((x,i)=>
                    <Grid container justify="center" spacing={1}>
                      <Grid item xs={1}> <FormLabel>{i}</FormLabel> </Grid>
                      <Grid item xs={1}> <Checkbox onChange={(x)=>update(x,i,0)} checked={absentFig[i]} inputProps={{ 'aria-label': 'absent-Fig1' }}/> </Grid>
                      <Grid item xs={2}> 
                        <Select value={stateFig[i]}> 
                          <MenuItem value={"correcta"}>Correcta</MenuItem>
                          <MenuItem value={"incorrecta"}>Deformada o Incorrecta</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={1}> <Checkbox onChange={update(x,i,3)} checked={locatedFig[i]} inputProps={{ 'aria-label': 'located-Fig#i' }}/> </Grid>
                    </Grid>
                  )}
                
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

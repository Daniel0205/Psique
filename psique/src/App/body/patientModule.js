import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

/*
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Category from '../components/category';
import CustomButton from '../components/customButton';
*/

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    borderRadius: "3%",
    backgroundColor: "#017F8D",
    color: "white",
    "&:hover":{
      backgroundColor: "#016570",
    }
  },
  bodypage:{
    textAlign: "-webkit-center",
  },
  space:{
    paddingTop:"30px",
    paddingBottom: "30px"
  },
  buton:{
    backgroundColor: "#017F8D",  
    
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "33% 33% 33%",
    
 },
 cardButton:{
      padding: "5%"
 },
 media: {
    maxHeight:"150px",
    maxInlineSize: "-webkit-fill-available",
  },
  textCardContent: {
    paddingBottom: "5px",
    paddingTop: "5px",
    paddingRight: "0px",
    paddingLeft: "0px",
  },
}));

function PatientModule(props) {

    /* COMENTARIO DE EL CAR BUTTON CREAR PACIENTE EN CASO DE SER NECESARIO
    <div className={classes.grid}>
          
            <div className={classes.cardButton}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardContent className={classes.textCardContent}>          
                            <Typography  variant="h5" component="h2">
                              Crear Paciente
                            </Typography>        
                        </CardContent>
                    </CardActionArea>
                </Card> 
            </div>

        </div>
    */

    const classes = useStyles();
/*
    {
      id_patient:ID!,	
      name:String!,
      surname: String!,
      gender:String!,
      city:String!,
      birth_date: Date!
    }
*/
    const [state, setState] = React.useState({
      columns: [
        { title: 'Identificador', field: 'id_patient' },
        { title: 'Nombres', field: 'name' },
        { title: 'Apellidos', field: 'surname' },
        { title: 'Genero', field: 'gender' },
        { title: 'Ciudad', field: 'city' },
      ],
      data: [
        {
          id_patient:1234194,	
          name:'Pepito',
          surname: 'Perez',
          gender:'M',
          city:'Cali',
          birth_date: 'x-y-z'
        },
        {
          id_patient:1234236,	
          name:'Pedrito',
          surname: 'Pereira',
          gender:'M',
          city:'Cali',
          birth_date: 'x-y-z'
        },
      ],
    });
    
    return(
    
    <div  className={classes.bodypage} >

      <MaterialTable
        title="Editable Example"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />  
        
    </div>
    )

}

export default PatientModule;
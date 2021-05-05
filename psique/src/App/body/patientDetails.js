import React, { useState } from 'react';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import SendIcon from '@material-ui/icons/Send';
import {AddBox,ArrowDownward,Check,ChevronLeft,ChevronRight,Clear,DeleteOutline,Edit,FilterList,FirstPage,LastPage,Remove,SaveAlt,Search,ViewColumn} from "@material-ui/icons";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { setBody } from "../store/body/action";
import { setIdPatient } from "../store/consultation/action";
import { connect } from "react-redux";
import md5 from 'md5';

import { verifyPractitioner,doctorParser, createPractitioner, verifyPatient,patientParser, createPatient } from './transmision'

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
    paddingTop:"30px",
    paddingRight: "20px",
    paddingLeft: "20px"
  },
  space:{
    paddingTop:"30px",
    paddingBottom: "30px"
  },
  separator: {
    marginBottom: '10px'
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

function PatientDetailsModule(props) {

    const classes = useStyles();

    const [state, setState] = React.useState([
        props.dataPatient
    ]);

    const [recipient, setRecipient] = React.useState("")

    const [back, setBack] = useState([{
        head_trauma: false,
        prenatal_trauma: false,
        meningitis: false,
        premature: true,
        narcotics: false,
        asthma: true,
        earache: false,
        sinusitis: false,
        rhinitis: true,
        pneumotorax: false,
        tuberculosis: false,
        heart_problems: false,
        renal_problems: false,
        bone_problems: false,
        epidermal_problems: false,
        high_blood_pressure: false,
        smoking: false,
        alcoholism: false,
    }])

    const [tests, setTests] = useState([{
        id_assessment: 134,
        id_test: 1634,
        start: 134,
        end: 134,
        testType: 'WISC',
        rawdata:'resultados i guess',
    }])

    const [open, setOpen] = React.useState(false);
    const [openToPractitioner, setOpenToPractitioner] = React.useState(false);
    const [openUploadServer, setOpenUploadServer] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
      DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
      ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    //Functions to load Data
/*
    function loadToServer(){

      let verificarPractitioner = new Promise((resolve, reject) => {
        verifyPractitioner()
      })

      verificarPractitioner.then()
    }*/


  //Función que permite crear recursos Practitioner en el server FHIR
    function crearPractitioner(){
      let objPract = {
        identifier: props.id_doctor,
        name: 'Steban Cadena Giraldo'
      }

      createPractitioner(doctorParser(objPract)).then(x=>{
        console.log(x);
        alert("Tus datos han sido cargados con exito")
      })
    }

    //Función que permite crear recursos Patient en el server FHIR
    function crearPatient(){

      createPatient(patientParser(state)).then(x=>{
        console.log(x);
        alert("Los datos del paciente han sido cargados con exito")
      })
    }
    
    return(
    
    <div  className={classes.bodypage} >

        <div className={classes.separator}>

            <MaterialTable
            title="PACIENTE"
            icons={tableIcons}
            columns={[
                { title: 'Identificador', field: 'id_patient' },
                { title: 'Nombres', field: 'name' },
                { title: 'Apellido', field: 'surname' },
                { title: 'Genero', field: 'gender' },
                { title: 'Ciudad', field: 'city' },
            ]}
            data={state}
            options={{
                emptyRowsWhenPaging:false,
                search:false,
                paging:false
                }
            }
            actions={[
                {
                  icon: () => <SendIcon/>,
                  tooltip:'Details',
                  onClick: (event, rowData) => {
                    verifyPractitioner(props.id_doctor).then(x=>{
                      if(x.total===1){
                        alert("Ya existe el usuario")
                      }else if(x.total===0){
                        alert("Aun no existe el usuario")
                        crearPractitioner()
                      }
                      
                    } )
                  } 
                },
                {
                  icon: () => <AddBox/>,
                  tooltip:'Add Patient',
                  onClick: (event, rowData) => {
                    let idMd = String(md5(String(state.id_patient)))
                    verifyPatient(idMd).then(x=>{
                      if(x.total===1){
                        alert("Ya existe el paciente")
                      }else if(x.total===0){
                        alert("Aun no existe el paciente")
                        crearPatient()
                      }
                      
                    } )
                  } 
                }
              ]
              }
            editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        setState(prevState => {
                          const data = [...prevState];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }),
              }}
        />

        </div>

        <div className={classes.separator}>

            <MaterialTable
            title="BACKGROUND"
            icons={tableIcons}
            columns={[
                { title: 'Trauma craneal', field: 'head_trauma' },
                { title: 'Trauma prenatal', field: 'prenatal_trauma' },
                { title: 'Meningitis', field: 'meningitis' },
                { title: 'Prematuro', field: 'premature' },
                { title: 'Narcoticos', field: 'narcotics' },
                { title: 'Asma', field: 'asthma' },
                { title: 'Diagnostico', field: 'earache' },
                { title: 'Sinusitis', field: 'sinusitis' },
                { title: 'Rinitis', field: 'rhinitis' },
                { title: 'Neumotoraz', field: 'pneumotorax' },
                { title: 'Tuberculosis', field: 'tuberculosis' },
                { title: 'Cardipatia', field: 'heart_problems' },
                { title: 'Renales', field: 'renal_problems' },
                { title: 'Huesos', field: 'bone_problems' },
                { title: 'Epidermis', field: 'epidermal_problems' },
                { title: 'Presión', field: 'high_blood_pressure' },
                { title: 'Fumador', field: 'smoking' },
                { title: 'Alcoholismo', field: 'alcoholism' },
            ]}
            data={back}
            options={{
                emptyRowsWhenPaging:false,
                search:false,
                paging:false
                }
            }
            editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        setBack(prevState => {
                          const data = [...prevState];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }),
              }}
        />

        </div>

        <div className={classes.separator}>

            <MaterialTable
            title="TESTS"
            icons={tableIcons}
            columns={[
                { title: 'Evaluación', field: 'id_assessment' },
                { title: 'ID Prueba', field: 'id_test' },
                { title: 'Inicio', field: 'start' },
                { title: 'Fin', field: 'end' },
                { title: 'Prueba', field: 'testType' },
                { title: 'Resultados(RAW)', field: 'rawdata' },
            ]}
            data={tests}
            options={{
                selection:true,
                }
            }
            actions={[
                {
                  icon: () => <SendIcon/>,
                  tooltip:'Details',
                  onClick: (event, rowData) => {
                    handleClickOpen()
                  } 
                }
              ]
              }
            editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        setTests(prevState => {
                          const data = [...prevState];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }),
              }}
        /> 

        </div>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Envio de datos"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Vas a compartir los datos y resultados de las pruebas seleccionadas. 
              Puedes enviar estos datos a un profesional, en cuyo caso se solicitara que cargues una remisión o un consentimiento informado firmado por el paciente.
              O puedes cargar estos datos a nuestro servidor para que puedan ser consultados por otros usuarios de PSIQUE (Se mantendrán los datos sensibles protegidos mediante la ley 1582 de 2012 por lo que los mismos no podrán ser accedidos por terceros)
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => {handleClose();
              setOpenToPractitioner(true);}} color="primary">
              Enviar a un profesional
            </Button>
            <Button onClick={() => {handleClose();
              setOpenUploadServer(true);}} color="primary" autoFocus>
              Cargar al servidor
            </Button>
          </DialogActions>
        </Dialog>



        <Dialog
        open={openToPractitioner}
        onClose={() => {setOpenToPractitioner(false);}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Envio a profesional"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Ingresa el identificador del profesional al que deseas enviar los datos
              <TextField value={recipient} onChange={(event)=>{setRecipient(event.target.value)}} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {setOpenToPractitioner(false);}} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => {setOpenToPractitioner(false);alert(recipient)}} color="primary">
              Enviar al profesional
            </Button>
          </DialogActions>
        </Dialog>


        <Dialog
        open={openUploadServer}
        onClose={() => {setOpenUploadServer(false);}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cargar al servidor"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Estas seguro que deseas cargar los datos al servidor?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {setOpenUploadServer(false);}} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => {setOpenUploadServer(false);}} color="primary" autoFocus>
              Cargar al servidor
            </Button>
          </DialogActions>
        </Dialog>

        
    </div>
    )

}

const mapStateToProps = (state) => {
  
    return {
      id_patient: state.consultationReducer.id_patient,
      id_doctor: state.doctorReducer.id_doctor,
      dataPatient: state.consultationReducer.dataPatient,
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      setIdPatient: (item) => dispatch(setIdPatient(item)),
      setBody: (item) => dispatch(setBody(item)),
    };
  }

export default connect(mapStateToProps, mapDispatchToProps) (PatientDetailsModule);
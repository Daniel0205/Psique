import React, { useState, useEffect} from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import DetailsIcon from '@material-ui/icons/Details';
import {AddBox,ArrowDownward,Check,ChevronLeft,ChevronRight,Clear,DeleteOutline,Edit,FilterList,FirstPage,LastPage,Remove,SaveAlt,Search,ViewColumn} from "@material-ui/icons";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { setBody } from "../store/body/action";
import { connect } from "react-redux";

import { consultPatient, consultCondition, communicationParser, createCommunication} from './transmision'


function FhirPatient(props) {

    const [open, setOpen] = React.useState(false);

    function handleClose(){
        setOpen(false)
    }

    const [recipient, setRecipient] = React.useState("")
    const [about, setAbout] = React.useState("")
    const [observation, setObservation] = React.useState("")

    const [dataPatient, setDataPatient] = useState([]);
    
    useEffect(() => {
      let mounted = true;
      consultPatient().then(items => {

        Promise.all(
            items.map( (item)=>{
                consultCondition(item.id_patient).then(obj => {
                    item.icd10 = obj[0].icd10
                    item.condition = obj[0].name
                })
            })
        )
        .then(() => {
            if(mounted) {
            setDataPatient(items)
            }}
          )

          
        })
      return () => mounted = false;
    }, [])

    function enviarObservation(){
      var objComm = {
        receiver: recipient,
        subj: about,
        sender: 'Practitioner/' + String(props.id_fhir_doctor),
        obs: observation
      }

      createCommunication(communicationParser(objComm)).then(x=>{
        alert("Tu mensaje se ha enviado con exito")
        setOpen(false)
      })

    }

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



    return(
        <div>
            <MaterialTable
                  title="PACIENTES"
                  icons={tableIcons}
                  columns={[
                    { title: 'Identificador', field: 'id_patient' },
                    { title: 'Genero', field: 'gender' },
                    { title: 'Nacimiento', field: 'birthDate' },
                    { title: 'Id de profesional', field: 'performer' },
                    { title: 'Ciudad', field: 'city' },
                    { title: 'Condición', field: 'condition' },
                    { title: 'ICD-10', field: 'icd10' },
                  ]}
                  data={dataPatient}
                  actions={[
                    {
                      icon: () => <DetailsIcon/>,
                      tooltip:'Ver detalles',
                      onClick: (event, rowData) => {
                        alert("Vas a verlos detalles del registro")
                      } 
                    },
                    {
                      icon: () => <AddBox/>,
                      tooltip:'Hacer observación',
                      onClick: (event, rowData) => {
                        setRecipient(rowData.performer)
                        setAbout("Patient/"+rowData.id_patient)
                        setOpen(true)
                      } 
                    }
                  ]
                  }
                  options={{
                      emptyRowsWhenPaging:false,
                      }
                  }
              />

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Envio de observación"}</DialogTitle>
            <DialogContent>
              <TextField disabled={true} value={recipient} label={"Enviar a"} /> <b/>
              <TextField disabled={true} value={about} label={"Hace refencia a"} />
              <TextField value={observation} label={"Observación"} onChange={(event)=>{ setObservation(event.target.value)} } />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={enviarObservation} color="primary">
                Enviar
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
      id_fhir_doctor: state.doctorReducer.id_fhir_doctor,
      dataPatient: state.consultationReducer.dataPatient,
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      setBody: (item) => dispatch(setBody(item)),
    };
  }

export default connect(mapStateToProps, mapDispatchToProps) (FhirPatient);
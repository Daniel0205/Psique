import React, { useState } from 'react';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import SendIcon from '@material-ui/icons/Send';
import {AddBox,ArrowDownward,Check,ChevronLeft,ChevronRight,Clear,DeleteOutline,Edit,FilterList,FirstPage,LastPage,Remove,SaveAlt,Search,ViewColumn} from "@material-ui/icons";

import { setBody } from "../store/body/action";
import { setIdPatient } from "../store/consultation/action";
import { connect } from "react-redux";

import { verifyPractitioner } from './transmision'

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
                    verifyPractitioner()
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
                    alert("Esto incia la tarea de trasmitir")
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

        
    </div>
    )

}

const mapStateToProps = (state) => {
  
    return {
      id_patient: state.consultationReducer.id_patient,
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
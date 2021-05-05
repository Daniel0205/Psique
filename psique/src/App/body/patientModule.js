import React from 'react';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import DetailsIcon from '@material-ui/icons/Details';
import {AddBox,ArrowDownward,Check,ChevronLeft,ChevronRight,Clear,DeleteOutline,Edit,FilterList,FirstPage,LastPage,Remove,SaveAlt,Search,ViewColumn} from "@material-ui/icons";

import { setBody } from "../store/body/action";
import { setIdPatient } from "../store/consultation/action";
import { setDataPatient } from "../store/consultation/action";

import { connect } from "react-redux";

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

    const classes = useStyles();

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
          gender:'male',
          city:'Cali',
          birth_date: 'x-y-z'
        },
        {
          id_patient:1234236,	
          name:'Pedrito',
          surname: 'Pereira',
          gender:'male',
          city:'Cali',
          birth_date: 'x-y-z'
        },
      ],
    });

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

      <MaterialTable
        title="Pacientes"
        icons={tableIcons}
        columns={state.columns}
        data={state.data}
        actions={[
          {
            icon: () => <DetailsIcon/>,
            tooltip:'Details',
            onClick: (event, rowData) => {
              props.setDataPatient(rowData);
              props.setBody("moduloDetallesPacientes")
            } 
          }
        ]
        }
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

const mapStateToProps = (state) => {
  
  return {
    id_patient: state.consultationReducer.id_patient,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setIdPatient: (item) => dispatch(setIdPatient(item)),
    setDataPatient: (item) => dispatch(setDataPatient(item)),
    setBody: (item) => dispatch(setBody(item)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps) (PatientModule);
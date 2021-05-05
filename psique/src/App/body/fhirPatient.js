import React, { useState, useEffect} from 'react';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import {AddBox,ArrowDownward,Check,ChevronLeft,ChevronRight,Clear,DeleteOutline,Edit,FilterList,FirstPage,LastPage,Remove,SaveAlt,Search,ViewColumn} from "@material-ui/icons";

import { setBody } from "../store/body/action";
import { connect } from "react-redux";

import { consultPatient } from './transmision'

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

function FhirPatient(props) {

    const classes = useStyles();

    const [dataPatient, setDataPatient] = useState([]);
    
    useEffect(() => {
      let mounted = true;
      consultPatient().then(items => {
          if(mounted) {
            setDataPatient(items)
          }
        })
      return () => mounted = false;
    }, [])

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
                  ]}
                  data={dataPatient}
                  options={{
                      emptyRowsWhenPaging:false,
                      }
                  }
              />
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
      setBody: (item) => dispatch(setBody(item)),
    };
  }

export default connect(mapStateToProps, mapDispatchToProps) (FhirPatient);
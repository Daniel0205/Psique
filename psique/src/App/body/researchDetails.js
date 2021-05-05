import React, { useState, useEffect} from 'react';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import DetailsIcon from '@material-ui/icons/Details';
import {AddBox,ArrowDownward,Check,ChevronLeft,ChevronRight,Clear,DeleteOutline,Edit,FilterList,FirstPage,LastPage,Remove,SaveAlt,Search,ViewColumn} from "@material-ui/icons";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { setBody } from "../store/body/action";
import { connect } from "react-redux";

import { consultProcedure } from './transmision'

import FhirConsult from './fhirConsult.js';

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

function ResearchDetailsModule(props) {

    const classes = useStyles();

    const [dataProcedures, setDataProcedures] = useState([]);
    /*
    useEffect(() => {
      let mounted = true;
      consultProcedure().then(items => {
          if(mounted) {
            setDataProcedures(items)
          }
        })
      return () => mounted = false;
    }, [])*/

    const [varCargar, setVarCargar] = React.useState(false)
    const [varConsult, setVarConsult] = React.useState(false)

    const [state, setState] = React.useState(
        {
            columns: [
              { title: 'Identificador', field: 'id_research' },
              { title: 'Nombre', field: 'name' },
              { title: 'Estado', field: 'status' },
              { title: 'Organización ', field: 'organization' },
              { title: 'Investigador Principal', field: 'investigator' },
              { title: 'Ciudad', field: 'city' },
            ],
            data:[{
                id_research:1005,	
                name:'WADA ',
                status: 'Activa',
                organization:'IMBANACO',
                investigator:'Caliche',
                city: 'Cali'
            }]
        }
    );

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

    function cargar(){
      
        if(varCargar){
          return(
              <MaterialTable
                  title="Cargar datos"
                  icons={tableIcons}
                  columns={[
                      { title: 'Evaluación', field: 'id_procedure' },
                      { title: 'ID Prueba', field: 'outcome' },
                  ]}
                  data={[
                      {id_assessment: 1242,
                      id_test: 'WADA'},
                      {id_assessment: 1244,
                      id_test: 'WISC'}
                  ]}
                  options={{
                      emptyRowsWhenPaging:false,
                      search:false,
                      paging:false
                      }
                  }
              />
          )
      }
        
        
    }

    function consultar(){
        if(varConsult){
            return(
                <FhirConsult></FhirConsult>
            )
        }
        
    }

  
    
    return(
    <div  className={classes.bodypage}>

        <MaterialTable
            title="Información General de la Investigación"
            icons={tableIcons}
            columns={state.columns}
            data={state.data}
            options={{
                emptyRowsWhenPaging:false,
                search:false,
                paging:false
                }
            }
        />

        <div className={classes.grid}>  

          <div className={classes.cardButton}>
              <Card className={classes.root}>
                  <CardActionArea onClick={() => {setVarConsult(false);setVarCargar(true)}}>
                      <CardContent className={classes.textCardContent}>          
                          <Typography  variant="h5" component="h2">
                            CARGAR DATOS
                          </Typography>        
                      </CardContent>
                  </CardActionArea>
              </Card> 
          </div>

          <div className={classes.cardButton}>
              <Card className={classes.root}>
                  <CardActionArea onClick={() => {setVarCargar(false);setVarConsult(true)}}>
                      <CardContent className={classes.textCardContent}>          
                          <Typography  variant="h5" component="h2">
                            CONSULTAR DATOS
                          </Typography>        
                      </CardContent>
                  </CardActionArea>
              </Card> 
          </div>

        </div>

        {cargar()}

        {consultar()}

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

export default connect(mapStateToProps, mapDispatchToProps) (ResearchDetailsModule);
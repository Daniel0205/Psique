import React, { useState, useEffect} from 'react';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import SendIcon from '@material-ui/icons/Send';
import DetailsIcon from '@material-ui/icons/Details';
import {AddBox,ArrowDownward,Check,ChevronLeft,ChevronRight,Clear,DeleteOutline,Edit,FilterList,FirstPage,LastPage,Remove,SaveAlt,Search,ViewColumn} from "@material-ui/icons";

import { setBody } from "../store/body/action";
import { setResearch } from "../store/research/action";
import { connect } from "react-redux";

import { consultResearch, consultCommunication } from './transmision'

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
    paddingTop:"30px",
    paddingRight: "20px",
    paddingLeft: "20px",
  },
  space:{
    paddingTop:"30px",
    paddingBottom: "30px"
  },
  buton:{
    backgroundColor: "#017F8D",  
    
  },
  separator: {
    marginBottom: '10px'
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

function ResearchModule(props) {

    const classes = useStyles();

    const [dataResearch, setDataResearch] = useState([]);
    const [dataCommunication, setDataCommunication] = useState([]);

    useEffect(() => {
      let mounted = true;
      consultResearch().then(items => {
          if(mounted) {
            setDataResearch(items)
          }
        })

      consultCommunication(props.id_fhir_doctor).then(items => {
          if(mounted) {
            setDataCommunication(items)
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


    <div  className={classes.bodypage} >

      <div className={classes.separator}>

        <MaterialTable
          title="INVESTIGACIONES"
          icons={tableIcons}
          columns={[
            { title: 'Identificador', field: 'id_research' },
            { title: 'Nombre', field: 'name' },
            { title: 'Estado', field: 'status' },
            { title: 'Organización ', field: 'organization' },
            { title: 'Investigador Principal', field: 'investigator' },
            { title: 'Ciudad', field: 'city' },
          ]}
          data={dataResearch}
          actions={[
            {
              icon: () => <DetailsIcon/>,
              tooltip:'Details',
              onClick: (event, rowData) => {
                props.setResearch(rowData);
                props.setBody("moduloDetallesInvestigacion")
              } 
            }
          ]
          }
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setDataResearch(prevState => {
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
                    setDataResearch(prevState => {
                      const data = [...prevState.data];
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
          title="OBSERVACIONES"
          icons={tableIcons}
          columns={[
            { title: 'ID Observación', field: 'id_communication' },
            { title: 'Remitente', field: 'sender' },
            { title: 'Referencia a', field: 'reference' },
            { title: 'Fecha de envio', field: 'date' },
            { title: 'Observación', field: 'data' },
          ]}
          data={dataCommunication}
          options={{
              emptyRowsWhenPaging:false,
              search:false,
              paging:false
              }
          }
          actions={[
              {
                icon: () => <SendIcon/>,
                tooltip:'Send Rerport',
                onClick: (event, rowData) => {
                  alert("report sended")
                } 
              }
            ]
            }
          />

        </div>


    </div>
    )

}

const mapStateToProps = (state) => {
  
  return {
    id_patient: state.consultationReducer.id_patient,
    id_fhir_doctor: state.doctorReducer.id_fhir_doctor,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setBody: (item) => dispatch(setBody(item)),
    setResearch: (item) => dispatch(setResearch(item)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps) (ResearchModule);
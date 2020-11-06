import React, { useEffect } from 'react';
import { setBody } from "../store/body/action";
import { setAssessment } from "../store/assessment/action";
import { connect } from "react-redux";
import { gql, useQuery,useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from './customButton'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const ASSESSMENT_QUERY = gql`

    query ($id_patient: ID!){
      patientAssessment(id_patient:$id_patient){
        active
        assessments{
          id_assessment
          start_date
          end_date
          is_active
          tests{
            id_test
            start_date
            __typename
            is_active
                    
            ... on Zung {  
              result
              
            }
           
            ... on  Wada{
              hemisphere
              propofol_aplication
              duration
              counting
              denomination
              follow_instructions
              lecture
              repetition
              verbal_instructions
              
            }
          }
        }
      }
    }
`;

const CLOSE_ASSESSMENT = gql`
  mutation($id_doctor: ID!,$id_assessment: ID!) {
    closeAssessment(id_doctor: $id_doctor,id_assessment: $id_assessment) {
      id
      error{
        path
        message
      }
    }
  }
`;

const NEW_ASSESSMENT = gql`
  mutation($id_doctor: ID!, $id_patient: ID!) {
    createAssessment(id_doctor: $id_doctor,id_patient:$id_patient) {
      id
      error{
        path
        message
      }
    }
  }
`;


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    borderRadius: "3%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  general: {
    padding: theme.spacing(3),
    textAlign: "center",
    paddingLeft: "30%",
    paddingRight: "30%"
  },
}));

function Assessment(props) {
  const classes = useStyles();
  const { loading, data, refetch } = useQuery(ASSESSMENT_QUERY, {
    variables: { id_patient:props.id_patient },
  });
  
  useEffect(()=>{
    if(data)refetch()
  },[refetch,data])

  const [close] = useMutation(CLOSE_ASSESSMENT);
  const [create] = useMutation(NEW_ASSESSMENT);
  
  async function closeAssessment(id_assessment){
    
    const {data}= await close({ variables: {id_doctor:props.id_doctor, id_assessment:id_assessment} });
    
    if (data.closeAssessment.id) {
      props.setBody("init")
      props.setAssessment(data.closeAssessment.id)
    }
  }

  async function createAssessment(){
    const {data}= await create({ variables: { id_doctor:props.id_doctor,id_patient:props.id_patient} });
    
    if (data.createAssessment.id) {
      props.setBody("init")
      props.setAssessment(data.createAssessment.id)
      
    }
  }
  


  if(loading)return <CircularProgress />

  if(data.patientAssessment.active){

    return (
      <div className={classes.general}>
        <Card className={classes.root}>
          <CardContent>

            <Typography variant="h4" component="h2">
              Retomar Evaluación
            </Typography>
            <Typography variant="h6" component="h4">
              Actualmente la evaluación #{data.patientAssessment.assessments.id_assessment} se encuentra activa.
              <br />
              ¿Desea continuar con esta evaluación o comenzar una nueva?
            </Typography>
            <Typography variant="body2" component="h4">
              *Si comienza una nueva la evaluación actual se dara por terminada.
            </Typography>
          </CardContent>
          <CardActions>
            <CustomButton 
            msj="Nueva evaluación"
            callback={()=>closeAssessment(data.patientAssessment.assessments.id_assessment)}
            />
          <CustomButton 
            msj="Continuar evaluación"
            callback={()=>{
              props.setBody("init")
              props.setAssessment(data.patientAssessment.assessments.id_assessment)
            }}
            />
          </CardActions>
        </Card>

      </div>
    ); 
  }
  else{
    return (
      <div className={classes.general}>
        <Card className={classes.root}>
          <CardContent>

            <Typography variant="h4" component="h2">
              Crear evaluación
            </Typography>
            <Typography variant="h6" component="h4">
              Actualmente no hay ninguna evaluación activa  
            </Typography>
          </CardContent>
          <CardActions>
            <CustomButton 
            msj="Nueva evaluación"
            callback={createAssessment}
            />
          </CardActions>
        </Card>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  
  return {
    id_assessment: state.assessmentReducer.id_assessment,
    id_patient: state.patientReducer.id_patient,
    id_doctor: state.doctorReducer.id_doctor
  };
};

function mapDispatchToProps(dispatch) {
  return {
      setBody: (item) => dispatch(setBody(item)),
      setAssessment: (item) => dispatch(setAssessment(item))

  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Assessment);
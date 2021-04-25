import React from 'react';
import './App.css';
import Sidenav from './App/components/sidenav'
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { setBody } from "./App/store/body/action";
import { setDoctor } from "./App/store/doctor/action";
import { connect } from "react-redux";
import SignIn from './App/components/signIn'
import { gql,  useMutation } from '@apollo/client';

const ID_QUERY = gql`
  mutation($token:String!) {
    getId(token:$token) {
      ok
      id
    }
  }
`;

function App(props) {
  const [idQuery] = useMutation(ID_QUERY);

  async function getId(){
    
    const {data}= await idQuery({ variables: { token:localStorage.token } });
    
    if(data.getId.ok ){
      props.setDoctor(data.getId.id)
      props.setBody("assessment")
    }  
  }


  if(localStorage.token && props.body==='login') getId()


  function body(){
    switch (props.body) {
      case 'login':
        return <Redirect to="/login" />
      case 'init':
        return <Redirect to="/home" />
      case 'moduloPacientes':
        return <Redirect to="/pacientes" />
      case 'moduloDetallesPacientes':
        return <Redirect to="/detalles-de-paciente" />
      case 'moduloInvestigaciones':
        return <Redirect to="/investigaciones" />
      case "assessment":
        return <Redirect to="/startAssessment" />
      case 'Wada':
        return <Redirect to="/test/wada" />
      case "WAIS IV":
        return <Redirect to="/test/wais" />
      case "WAIS-selection":
        return <Redirect to="/test/wais/selection" />
      case "WAIS-baremos":
          return <Redirect to="/test/wais/baremos" />
      case "WAIS-Letras y Números":
        return <Redirect to="/test/wais/numerosLetras" />
      case "WAIS-Figuras Incompletas":
        return <Redirect to="/test/wais/figurasIncompletas" />
      case "WAIS-Cancelación":
        return <Redirect to="/test/wais/cancelacion" />
      case "WAIS-Comprensión":
        return <Redirect to="/test/wais/comprension" />
      case "WAIS-Balanzas":
        return <Redirect to="/test/wais/balanzas" />
      case "WAIS-Cubos":
        return <Redirect to="/test/wais/cubos" />
      case "WAIS-Semejanzas":
        return <Redirect to="/test/wais/semejanzas" />
      case "WAIS-Matrices":
        return <Redirect to="/test/wais/matrices" />
      case "WAIS-Vocabulario":
        return <Redirect to="/test/wais/vocabulario" />
      case "WAIS-Dígitos":
        return <Redirect to="/test/wais/digitos" />
      case "WAIS-Aritmética":
        return <Redirect to="/test/wais/aritmetica" />
      case "WAIS-Clave de Números":
        return <Redirect to="/test/wais/clavesNumeros" />
      case "WAIS-Búsqueda de Símbolos":
        return <Redirect to="/test/wais/busquedaSimbolos" />
      case "WAIS-Información":
        return <Redirect to="/test/wais/informacion" />
      case "WAIS-Puzles Visuales":
        return <Redirect to="/test/wais/pluzlesVisuales" />
      case "WISC IV":
        return <Redirect to="/test/wisc" />
      case "WISC-selection":
        return <Redirect to="/test/wisc/selection" />
      case "WISC-baremos":
        return <Redirect to="/test/wisc/baremos" />
      case "WISC-Registros":
        return <Redirect to="/test/wisc/registros" />
      case "WISC-Conceptos con dibujos":
        return <Redirect to="/test/wisc/concepto" />
      case "WISC-Aritmética":
        return <Redirect to="/test/wisc/aritmetica" />
      case "WISC-Pistas":
        return <Redirect to="/test/wisc/pistas" />
      case "WISC-Figuras incompletas":
        return <Redirect to="/test/wisc/figurasIncompletas" />
      case "WISC-Cubos":
        return <Redirect to="/test/wisc/cubos" />
      case "WISC-Sucesion de numeros y letras":
        return <Redirect to="/test/wisc/numerosLetras" />
      case "WISC-Semejanzas":
        return <Redirect to="/test/wisc/semejanzas" />
      case "WISC-Matrices":
        return <Redirect to="/test/wisc/matrices" />
      case "WISC-Vocabulario":
        return <Redirect to="/test/wisc/vocabulario" />
      case "WISC-Dígitos":
        return <Redirect to="/test/wisc/digitos" />
      case "WISC-Comprensión":
        return <Redirect to="/test/wisc/comprension" />
      case "WISC-Claves":
        return <Redirect to="/test/wisc/claves" />
      case "WISC-Búsqueda de símbolos":
        return <Redirect to="/test/wisc/busquedaSimbolos" />
      case "WISC-Información":
        return <Redirect to="/test/wisc/informacion" />
      case "Prueba de STROOP":
        return <Redirect to="/test/stroop" />
      case "Prueba de Rey":
        return <Redirect to="/test/king" />
      case "Prueba de Zung":
        return <Redirect to="/test/zung" />
      case "Prueba de los Cinco Dígitos":
        return <Redirect to="/test/digits" />
      default:
        break;
    }
  }

  return (
    
    <Router>

      {body()}            
      <Route exact path="/home" component={()=><Sidenav body={"init"}></Sidenav>} />
      <Route exact path="/pacientes" component={()=><Sidenav body={"moduloPacientes"}></Sidenav>} />
      <Route exact path="/investigaciones" component={()=><Sidenav body={"moduloInvestigaciones"}></Sidenav>} />
      <Route exact path="/detalles-de-paciente/" component={()=><Sidenav body={"moduloDetallesPacientes"}></Sidenav>} />
      <Route exact path="/startAssessment"  component={()=><Sidenav body={"assessment"}></Sidenav>} />

      <Route exact path="/login" component={SignIn} />
      
      <Route exact path="/test/wisc" component={()=><Sidenav body={"WISC IV"} subtest={"confirmacion"}></Sidenav>} />
      <Route exact path="/test/wisc/selection" component={()=><Sidenav body={"WISC IV"} subtest={"aplicacion"}></Sidenav>} />
      <Route exact path="/test/wisc/baremos" component={()=><Sidenav body={"WISC IV"} subtest={"baremos"}></Sidenav>} />
      <Route exact path="/test/wisc/figurasIncompletas" component={()=><Sidenav body={"WISC IV"} subtest={"Figuras incompletas"}></Sidenav>} />{/*Estímulos*/}
      <Route exact path="/test/wisc/cubos" component={()=><Sidenav body={"WISC IV"} subtest={"Cubos"}></Sidenav>} />
      <Route exact path="/test/wisc/registros" component={()=><Sidenav body={"WISC IV"} subtest={"Registros"}></Sidenav>} />{/*Estímulos*/}
      <Route exact path="/test/wisc/concepto" component={()=><Sidenav body={"WISC IV"} subtest={"Conceptos con dibujos"}></Sidenav>} />{/*Estímulos*/}
      <Route exact path="/test/wisc/pistas" component={()=><Sidenav body={"WISC IV"} subtest={"Pistas"}></Sidenav>} /> {/*Manual*/}
      <Route exact path="/test/wisc/numerosLetras" component={()=><Sidenav body={"WISC IV"} subtest={"Sucesion de numeros y letras"}></Sidenav>} /> {/*Manual*/}
      <Route exact path="/test/wisc/semejanzas" component={()=><Sidenav body={"WISC IV"} subtest={"Semejanzas"}></Sidenav>} />
      <Route exact path="/test/wisc/matrices" component={()=><Sidenav body={"WISC IV"} subtest={"Matrices"}></Sidenav>} />
      <Route exact path="/test/wisc/vocabulario" component={()=><Sidenav body={"WISC IV"} subtest={"Vocabulario"}></Sidenav>} />
      <Route exact path="/test/wisc/digitos" component={()=><Sidenav body={"WISC IV"} subtest={"Dígitos"}></Sidenav>} />
      <Route exact path="/test/wisc/aritmetica" component={()=><Sidenav body={"WISC IV"} subtest={"Aritmética"}></Sidenav>} />
      <Route exact path="/test/wisc/comprension" component={()=><Sidenav body={"WISC IV"} subtest={"Comprensión"}></Sidenav>} />
      <Route exact path="/test/wisc/claves" component={()=><Sidenav body={"WISC IV"} subtest={"Claves"}></Sidenav>} />
      <Route exact path="/test/wisc/busquedaSimbolos" component={()=><Sidenav body={"WISC IV"} subtest={"Búsqueda de símbolos"}></Sidenav>} />
      <Route exact path="/test/wisc/informacion" component={()=><Sidenav body={"WISC IV"} subtest={"Información"}></Sidenav>} />
      
      <Route exact path="/test/wais" component={()=><Sidenav body={"WAIS IV"} subtest={"confirmacion"}></Sidenav>} />
      <Route exact path="/test/wais/selection" component={()=><Sidenav body={"WAIS IV"} subtest={"aplicacion"}></Sidenav>} />
      <Route exact path="/test/wais/baremos" component={()=><Sidenav body={"WAIS IV"} subtest={"baremos"}></Sidenav>} />
      <Route exact path="/test/wais/numerosLetras" component={()=><Sidenav body={"WAIS IV"} subtest={"Letras y Números"}></Sidenav>} /> {/*Manual*/}
      <Route exact path="/test/wais/figurasIncompletas" component={()=><Sidenav body={"WAIS IV"} subtest={"Figuras Incompletas"}></Sidenav>} />{/*Estímulos*/}
      <Route exact path="/test/wais/cancelacion" component={()=><Sidenav body={"WAIS IV"} subtest={"Cancelación"}></Sidenav>} />{/*Manual*/}
      <Route exact path="/test/wais/comprension" component={()=><Sidenav body={"WAIS IV"} subtest={"Comprensión"}></Sidenav>} />{/*Manual*/}
      <Route exact path="/test/wais/balanzas" component={()=><Sidenav body={"WAIS IV"} subtest={"Balanzas"}></Sidenav>} />{/*Manual*/}
      <Route exact path="/test/wais/cubos" component={()=><Sidenav body={"WAIS IV"} subtest={"Cubos"}></Sidenav>} />
      <Route exact path="/test/wais/semejanzas" component={()=><Sidenav body={"WAIS IV"} subtest={"Semejanzas"}></Sidenav>} />
      <Route exact path="/test/wais/matrices" component={()=><Sidenav body={"WAIS IV"} subtest={"Matrices"}></Sidenav>} />
      <Route exact path="/test/wais/vocabulario" component={()=><Sidenav body={"WAIS IV"} subtest={"Vocabulario"}></Sidenav>} />
      <Route exact path="/test/wais/digitos" component={()=><Sidenav body={"WAIS IV"} subtest={"Dígitos"}></Sidenav>} />
      <Route exact path="/test/wais/aritmetica" component={()=><Sidenav body={"WAIS IV"} subtest={"Aritmética"}></Sidenav>} />
      <Route exact path="/test/wais/clavesNumeros" component={()=><Sidenav body={"WAIS IV"} subtest={"Clave de Números"}></Sidenav>} />
      <Route exact path="/test/wais/busquedaSimbolos" component={()=><Sidenav body={"WAIS IV"} subtest={"Búsqueda de Símbolos"}></Sidenav>} />
      <Route exact path="/test/wais/informacion" component={()=><Sidenav body={"WAIS IV"} subtest={"Información"}></Sidenav>} />
      <Route exact path="/test/wais/pluzlesVisuales" component={()=><Sidenav body={"WAIS IV"} subtest={"Puzles Visuales"}></Sidenav>} />
      
      <Route exact path="/test/stroop" component={()=><Sidenav body={"Prueba de STROOP"}></Sidenav>} />
      <Route exact path="/test/king" component={()=><Sidenav body={"Prueba de Rey"}></Sidenav>} />
      <Route exact path="/test/zung" component={()=><Sidenav body={"Prueba de Zung"}></Sidenav>} />
      <Route exact path="/test/wada" component={()=><Sidenav body={"Wada"}></Sidenav>} />
      <Route exact path="/test/digits" component={()=><Sidenav body={"Prueba de los Cinco Dígitos"}></Sidenav>} />

  </Router>
  );
}



const mapStateToProps = (state) => {
  
  return {
    body: state.bodyReducer.body,
    
  };
};

function mapDispatchToProps(dispatch) {
  return {
      setBody: (item) => dispatch(setBody(item)),
      setDoctor: (item) => dispatch(setDoctor(item)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

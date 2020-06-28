import React from 'react';
import './App.css';
import Sidenav from './App/components/sidenav'
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { setBody } from "./App/store/body/action";
import { connect } from "react-redux";


function App(props) {

  function body(){
    switch (props.body) {
      case 'init':
        return <Redirect to="/home" />
      case "WAIS IV":
        return <Redirect to="/test/wais" />
      case "WISC IV":
        return <Redirect to="/test/wisc" />
      case "WISC-selection":
        return <Redirect to="/test/wisc/selection" />
      case "Registros":
        return <Redirect to="/test/wisc/registros" />
      case "Conceptos con dibujos":
        return <Redirect to="/test/wisc/concepto" />
      case "Figuras incompletas":
        return <Redirect to="/test/wisc/figurasCompletas" />
      case "Prueba de STROOP":
        return <Redirect to="/test/stroop" />
      case "Prueba de Rey":
        return <Redirect to="/test/king" />
      case "Prueba de Zung":
        return <Redirect to="/test/zung" />
      default:
        break;
    }
  }

  return (
    <Router>

      {body()}            
      <Route exact path="/home" component={()=><Sidenav body={"init"}></Sidenav>} />
      <Route exact path="/test/wais" component={()=><Sidenav body={"WAIS IV"}></Sidenav>} />
      
      <Route exact path="/test/wisc" component={()=><Sidenav body={"WISC IV"} subtest={"confirmacion"}></Sidenav>} />
      <Route exact path="/test/wisc/selection" component={()=><Sidenav body={"WISC IV"} subtest={"aplicacion"}></Sidenav>} />
      <Route exact path="/test/wisc/figurasCompletas" component={()=><Sidenav body={"WISC IV"} subtest={"Figuras incompletas"}></Sidenav>} />
      <Route exact path="/test/wisc/registros" component={()=><Sidenav body={"WISC IV"} subtest={"Registros"}></Sidenav>} />
      <Route exact path="/test/wisc/concepto" component={()=><Sidenav body={"WISC IV"} subtest={"Conceptos con dibujos"}></Sidenav>} />
      
      <Route exact path="/test/stroop" component={()=><Sidenav body={"Prueba de STROOP"}></Sidenav>} />
      <Route exact path="/test/king" component={()=><Sidenav body={"Prueba de Rey"}></Sidenav>} />
      <Route exact path="/test/zung" component={()=><Sidenav body={"Prueba de Zung"}></Sidenav>} />
      
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

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
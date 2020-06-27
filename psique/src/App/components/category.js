import React from 'react';
import CardButton from './card-button'
import { connect } from "react-redux";
import { setBody } from "../store/body/action";


const useStyles ={
    category: {
      display: "grid",
      gridTemplateColumns: "33% 33% 33%",
      
   },
   cardButton:{
        padding: "5%"
   }
};

function Category(props) {

    function receiveMessage(event){
        props.messageEvent(event)
    }

    var botons= []

    if(props.sources.length===0){
        botons=props.names.map((name,i)=> 
            <div key={i} style={useStyles.cardButton}>    
                <CardButton  
                name={name}
                source={[]}
                type='card'
                messageEvent={(x)=>props.setBody(x)}
                ></CardButton>
            </div>
                )
    }
    else{
        botons=props.names.map((name,i)=> 
        <div key={i} style={useStyles.cardButton}>
            <CardButton  
            name={name}
            source={props.sources[i]}
            type='card'
            messageEvent={receiveMessage}
            ></CardButton>
        </div>
        )
    }

    return (
        <div style={useStyles.category}>
            {botons}
        </div>
    
    )

}

function mapDispatchToProps(dispatch) {
    return {
        setBody: (item) => dispatch(setBody(item)),

    };
}

export default connect(null, mapDispatchToProps)(Category);
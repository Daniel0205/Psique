import React,{useEffect} from 'react';
import CustomButton from '../../components/customButton'


function IntroTest(props) {

    useEffect(() => {
        props.socket.on('startTest',()=> {
          props.callback()
        })  

    }, [props]);


    return(<div>{props.type==="doctor"?
        <div>            
            <h1> {props.test}</h1>
            <CustomButton
            msj="Empezar"
            callback={()=>props.socket.emit('startTest')}
            ></CustomButton>
        </div>:null}
    </div>)
   
}


export default IntroTest;
  

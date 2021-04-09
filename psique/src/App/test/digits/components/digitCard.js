import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

const useStyles =  makeStyles((theme) => ({
    card:{
        backgroundColor: "bisque"
    },
    bad:{
        borderColor: "red",
        borderStyle: "solid",
    },  
    marked:{
        borderColor: "blue",
        borderStyle: "solid",
    }    
  }));

function DigitCard(props) {
    const [bad,setBad] = useState(false)

    const classes = useStyles();


    function getDigit(){
        switch (props.digit) {
            case 1:
                return(
                <div>1</div>               
                )
            case 2:
                return(
                <div>
                    2  <br/> 2
                </div>
                )

            case 3:
                return(
                <div>
                    3  <br/> 3  &nbsp; 3
                </div>
                )
        
            case 4:
                return(
                <div>
                    4  &nbsp;  4 <br/> 4  &nbsp; 4
                </div>
                )
            case 5:
                return(
                <div>
                    5  &nbsp; 5
                        5
                    5  &nbsp; 5
                </div>
                )
        
            default:
                break;
        }
    }

    function getAsterics(){
        switch (props.digit) {
            case 1:
                return(
                <div>*</div>               
                )
            case 2:
                return(
                <div>
                    *  <br/> *
                </div>
                )

            case 3:
                return(
                <div>
                    *  <br/> *  &nbsp; *
                </div>
                )
        
            case 4:
                return(
                <div>
                    *  &nbsp;  * <br/> *  &nbsp; *
                </div>
                )
            case 5:
                return(
                <div>
                    *  &nbsp; *
                        *
                    *  &nbsp; *
                </div>
                )
        
            default:
                break;
        }
    }



    function getNumbers(){
        switch (props.digit) {
            case 1:
                return(
                <div>{props.number}</div>               
                )
            case 2:
                return(
                <div>
                    {props.number}  <br/> {props.number}
                </div>
                )

            case 3:
                return(
                <div>
                    {props.number}  <br/> {props.number}  &nbsp; {props.number}
                </div>
                )
        
            case 4:
                return(
                <div>
                    {props.number}  &nbsp;  {props.number} <br/> {props.number}  &nbsp; {props.number}
                </div>
                )
            case 5:
                return(
                <div>
                    {props.number}  &nbsp; {props.number}
                        {props.number}
                    {props.number}  &nbsp; {props.number}
                </div>
                )
        
            default:
                break;
        }
    }


    function selectTest(){
        switch (props.type) {
            case 1:
                return getDigit()
            
            case 2:
                return getAsterics()
            
            case 3:
            case 4:
                return getNumbers()
                        
            default:
                break;
        }
    }

    return (
        <Paper onClick={()=>{
            props.callback(!bad)
            setBad(!bad)            
        }} className={clsx({
            [classes.bad]:bad,
            [classes.marked]:!bad && props.marked===1,
            [classes.card]:true
        })} elevation={3}>
            {selectTest()}
        </Paper>
    )

}

export default DigitCard;
  

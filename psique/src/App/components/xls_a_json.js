import React, { useState } from 'react';
import * as XLSX from 'xlsx'
import { makeStyles } from '@material-ui/core/styles';
import { setBody } from "../store/body/action";
import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
    container:{
        textAlign:"center"
    },
    buttons: {
     display:"-webkit-inline-box"
    },
  }));

function XaJ(props) {
    const classes = useStyles();

    function handleInputChange(event){

        const target = event.target
        const name = target.name

        let hojas = []
        if (name === 'file') {
            let reader = new FileReader()
            reader.readAsArrayBuffer(target.files[0])
            reader.onloadend = (e) => {
              var data = new Uint8Array(e.target.result);
              var workbook = XLSX.read(data, {type: 'array'});
      
              workbook.SheetNames.forEach(function(sheetName) {
                // Here is your object
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                hojas.push({
                  data: XL_row_object,
                  sheetName
                })
              })
              console.log(JSON.stringify(hojas))
            }
          }

    }

    return (
    <div className={classes.container} >

        <input
            type='file'
            name='file'
            id='file'
            onChange={handleInputChange}
            placeholder='Archivo de Excel'
        />

    </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        setBody: (item) => dispatch(setBody(item)),

    };
}

export default connect(null, mapDispatchToProps)(XaJ);
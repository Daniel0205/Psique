const express = require("express");
const router = express.Router();
const Doctor = require('../DB/models/Doctor');
const bcrypt =require( 'bcrypt');

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

router.get("/createUsers", async (req, res) => {
  
  var data = [
    {
        id_doctor:201629338,
        name:'Daniel',
        surname:'Diaz',
        password:await bcrypt.hash('123456789', 12)
    },
    {
      id_doctor:201626055,
      name:'Felipe',
      surname:'Gil',
      password:await bcrypt.hash('123456789', 12)
    },
    {
      id_doctor:201670129,
      name:'Steban',
      surname:'Cadena',
      password: await bcrypt.hash('123456789', 12)
    },
    {
      id_doctor:1234,
      name:'Test',
      surname:'test',
      password: await bcrypt.hash('1234', 12)
    }
];
  
  Doctor.bulkCreate(data)
  .then((item)=>{
    res.send({ response: "Users created succesfully!" }).status(200)
  }).catch((err)=>
    res.send({ response: "Users cannot be created!" }).status(200)
  )


  
    
});

module.exports = router;

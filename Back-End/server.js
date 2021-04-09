//Imported modules
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = require('./services/router');
const graphql = require('./graphql/index')
const cors = require('cors');

//Port configuration
const PORT = process.env.PORT || 5000;

//Socket communication 
const server = http.createServer(app);
require("./communication/socket")(server)

////////////////////////////////////////////
//////////CONFIGURACION DEL ORM ////////////
////////////////////////////////////////////

const sequelize = require('./DB/config/database')


/////////////////////////////////////////////
/////VERIFICACION DE CONEXION A LA BD////////
/////////////////////////////////////////////

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto'+err)
}) 

/////////////////////////////////////////////
////////////DEFINITION OF CORS///////////////
/////////////////////////////////////////////

var corsOptions = {
  origin: function (origin, callback) {
    if(process.env.NODE_ENV==="production"){
      if (origin==='https://psique-app.web.app') {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
    else{
      callback(null, true)
    }
  }
}


//Routes
app.use(router);

//Public folder
app.use(cors(corsOptions),express.static(__dirname + '/resources'));

// The GraphQL endpoint
// Middleware: GraphQL
graphql.applyMiddleware({
  app: app
});

//Start the server
server.listen( PORT, () => console.log(`Server has started.`));
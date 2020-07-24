////////////////////////////////////////////
//////////CONFIGURACION DEL ORM ////////////
////////////////////////////////////////////
const Sequelize = require('sequelize')


let DB

if(process.env.NODE_ENV==="production"){
  DB = new Sequelize(process.env.DATABASE_URL);
}
else{
  DB= new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
  });
}


module.exports = DB;
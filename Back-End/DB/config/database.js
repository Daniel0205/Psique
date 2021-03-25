////////////////////////////////////////////
//////////CONFIGURACION DEL ORM ////////////
////////////////////////////////////////////
const Sequelize = require('sequelize')


let DB

if(process.env.NODE_ENV==="production"){
  DB = new Sequelize(process.env.DATABASE_URL,{
    dialectOptions: 
    {
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
}
else{
  
  DB=new Sequelize("Psique", "postgres", 1234, {
    host: 'DB', 
    dialect: 'postgres',  
    port:5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })

}


module.exports = DB;
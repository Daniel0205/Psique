const Sequelize = require('sequelize');
const db = require('../config/database');


const Doctor = db.define ('doctor',{
    id_doctor:{
        type: Sequelize.BIGINT,
        primaryKey: true 
    },
    name:{
        type: Sequelize.TEXT,
        allowNull: false     
    },
    surname:{
        type: Sequelize.TEXT,
        allowNull: false     
    },
    password:{
        type: Sequelize.TEXT,
        allowNull: false     
    }

},{
    freezeTableName: true,
    timestamps: false
})


module.exports = Doctor;
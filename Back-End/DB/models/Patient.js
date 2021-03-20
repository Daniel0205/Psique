const Sequelize = require('sequelize');
const db = require('../config/database');


const Patient = db.define ('patient',{
    id_patient:{
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
    gender:{
        type: Sequelize.STRING(1),
        allowNull: false     
    },
    actual_city:{
        type: Sequelize.STRING(20),
        allowNull: false     
    },
    born_city:{
        type: Sequelize.STRING(20),
        allowNull: false     
    },
    birth_date:{
        type: Sequelize.DATE,
        allowNull: false     
    }
},{
    freezeTableName: true,
    timestamps: false
})


module.exports = Patient;
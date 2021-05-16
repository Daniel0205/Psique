const Sequelize = require('sequelize');
const db = require('../config/database');

const Motor_deficit = db.define ('motor_deficit',{
    id_deficit:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    deficit:{
        type: Sequelize.TEXT,
        allowNull: false    
    },
},{
    freezeTableName: true,
    timestamps: false
})

Motor_deficit.removeAttribute("id");

module.exports = Motor_deficit;
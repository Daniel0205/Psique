const Sequelize = require('sequelize');
const db = require('../config/database');

const Stage = db.define ('stage',{
    id_stage:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
    },
    stage:{
        type: Sequelize.TEXT,
        allowNull: false    
    }
},{
    freezeTableName: true,
    timestamps: false
})

Stage.removeAttribute("id");

module.exports = Stage;
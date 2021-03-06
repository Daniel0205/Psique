const Sequelize = require('sequelize');
const db = require('../config/database');

const Aphasia = db.define ('aphasia',{
    id_aphasia:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    aphasia:{
        type: Sequelize.TEXT,
        allowNull: false    
    }
},{
    freezeTableName: true,
    timestamps: false
})

Aphasia.removeAttribute("id");

module.exports = Aphasia;
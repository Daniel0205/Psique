const Sequelize = require('sequelize');
const db = require('../config/database');

const Assessment = require('./Assessment')


const Test = db.define ('test',{
    id_test:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_assessment:{
        type: Sequelize.BIGINT,
        allowNull: false    
    },
    is_active:{
        type: Sequelize.BOOLEAN,
        allowNull: false     
    },
    start_date:{
        type: Sequelize.DATE,
        allowNull: false     
    }
},{
    freezeTableName: true,
    timestamps: false
})


Assessment.hasMany(Test,{ foreignKey: 'id_assessment'});
Test.belongsTo(Assessment,{ foreignKey: 'id_assessment',source:'id_assessment'});

module.exports = Test;
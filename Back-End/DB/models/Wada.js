const Sequelize = require('sequelize');
const db = require('../config/database');

const Test = require('./Test')
const Stage = require('./stage')

const Wada = db.define ('wada',{
    id_test:{
        type: Sequelize.BIGINT,
        allowNull: false 
    },
    id_stage:{
        type: Sequelize.INTEGER,
        allowNull: false    
    },
    propofol_aplication:{
        type: Sequelize.INTEGER
    },
    duration:{
        type: Sequelize.INTEGER,
        allowNull: false     
    },
    counting:{
        type: Sequelize.INTEGER,  
    },
    denomination:{
        type: Sequelize.INTEGER, 
    },
    verbal_instructions:{
        type: Sequelize.INTEGER, 
    },
    repetition:{
        type: Sequelize.INTEGER, 
    },
    lecture:{
        type: Sequelize.INTEGER, 
    },
    follow_instructions:{
        type: Sequelize.INTEGER, 
    }
},{
    freezeTableName: true,
    timestamps: false
})

Wada.removeAttribute("id");


Test.hasOne(Wada,{ foreignKey: 'id_test'});
Wada.belongsTo(Test,{ foreignKey: 'id_test',source:'id_test'});


Stage.hasOne(Wada,{ foreignKey: 'id_stage'});
Wada.belongsTo(Stage,{ foreignKey: 'id_stage',source:'id_stage'});

module.exports = Wada;
const Sequelize = require('sequelize');
const db = require('../config/database');

const Test = require('./test')

const Wada = db.define ('wada',{
    id_wada:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_test:{
        type: Sequelize.BIGINT,
        allowNull: false 
    },
    hemisphere:{
        type: Sequelize.STRING(1),
        allowNull: false    
    },
    propofol_aplication:{
        type: Sequelize.INT,
        allowNull: false    
    },
    duration:{
        type: Sequelize.INT,
        allowNull: false     
    },
    counting:{
        type: Sequelize.INT,  
    },
    denomination:{
        type: Sequelize.INT, 
    },
    verbal_instructions:{
        type: Sequelize.INT, 
    },
    repetition:{
        type: Sequelize.INT, 
    },
    lecture:{
        type: Sequelize.INT, 
    },
    follow_instructions:{
        type: Sequelize.INT, 
    }
},{
    freezeTableName: true,
    timestamps: false
})


Test.hasOne(Wada,{ foreignKey: 'id_test'});
Wada.belongsTo(Test,{ foreignKey: 'id_test',source:'id_test'});


module.exports = Wada;
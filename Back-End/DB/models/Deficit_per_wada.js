const Sequelize = require('sequelize');
const db = require('../config/database');

const Test = require('./Test')
const Motor_deficit = require('./Motor_deficit')

const Deficit_per_wada = db.define ('deficit_per_wada',{
    id_test:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false 
    },
    id_deficit:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false    
    }
},{
    freezeTableName: true,
    timestamps: false
})

Deficit_per_wada.removeAttribute("id");

Test.hasOne(Deficit_per_wada,{ foreignKey: 'id_test'});
Deficit_per_wada.belongsTo(Test,{ foreignKey: 'id_test',source:'id_test'});

Motor_deficit.hasOne(Deficit_per_wada,{ foreignKey: 'id_deficit'});
Deficit_per_wada.belongsTo(Motor_deficit,{ foreignKey: 'id_deficit',source:'id_deficit'});


module.exports = Deficit_per_wada;
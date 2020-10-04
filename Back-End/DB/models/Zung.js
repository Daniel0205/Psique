const Sequelize = require('sequelize');
const db = require('../config/database');

const Test = require('./Test')

const Zung = db.define ('zung',{
    id_test:{
        type: Sequelize.BIGINT,
        allowNull: false 
    },
  
    result:{
        type: Sequelize.INTEGER, 
    }
},{
    freezeTableName: true,
    timestamps: false
})

Zung.removeAttribute("id");


Test.hasOne(Zung,{ foreignKey: 'id_test'});
Zung.belongsTo(Test,{ foreignKey: 'id_test',source:'id_test'});


module.exports = Zung;
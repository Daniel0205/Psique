const Sequelize = require('sequelize');
const db = require('../config/database');

const Test = require('./Test')

const Aphasia = db.define ('aphasia',{
    time:{
        type: Sequelize.INTEGER, 
    },
    name:{
        type: Sequelize.TEXT,
        allowNull: false    
    }
},{
    freezeTableName: true,
    timestamps: false
})

Aphasia.removeAttribute("id");


Test.hasMany(Aphasia,{ foreignKey: 'id_test'});
Aphasia.belongsTo(Test,{ foreignKey: 'id_test',source:'id_test'});


module.exports = Aphasia;
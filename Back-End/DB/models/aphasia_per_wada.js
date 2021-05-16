const Sequelize = require('sequelize');
const db = require('../config/database');

const Test = require('./Test')
const Aphasia = require('./Aphasia')

const Aphasia_per_wada = db.define ('aphasia_per_wada',{
    id_test:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false 
    },
    id_aphasia:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false    
    },
    time:{
        type: Sequelize.INTEGER,
        allowNull: false    
    }
},{
    freezeTableName: true,
    timestamps: false
})

Aphasia_per_wada.removeAttribute("id");

Test.hasOne(Aphasia_per_wada,{ foreignKey: 'id_test'});
Aphasia_per_wada.belongsTo(Test,{ foreignKey: 'id_test',source:'id_test'});

Aphasia.hasOne(Aphasia_per_wada,{ foreignKey: 'id_aphasia'});
Aphasia_per_wada.belongsTo(Aphasia,{ foreignKey: 'id_aphasia',source:'id_aphasia'});


module.exports = Aphasia_per_wada;
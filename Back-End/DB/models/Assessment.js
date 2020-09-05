const Sequelize = require('sequelize');
const db = require('../config/database');

const Patient = require('./Patient')
const Doctor = require('./Doctor')


const Assessment = db.define ('assessment',{
    id_assessment:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_patient:{
        type: Sequelize.BIGINT,
        allowNull: false    
    },
    id_doctor:{
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
    },
    end_date:{
        type: Sequelize.DATE,
         
    }
},{
    freezeTableName: true,
    timestamps: false
})


Patient.hasMany(Assessment,{ foreignKey: 'id_patient'});
Assessment.belongsTo(Patient,{ foreignKey: 'id_patient',source:'id_patient'});

Doctor.hasMany(Assessment,{ foreignKey: 'id_doctor'});
Assessment.belongsTo(Doctor,{ foreignKey: 'id_doctor',source:'id_doctor'});

module.exports = Assessment;
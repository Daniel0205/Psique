const Assessment = require('../../DB/models/Assessment');


// The resolvers
const resolvers = {

    Mutation: {
        createAssessment: async (parent,{id_doctor,id_patient}) =>{
            const start_date = new Date();
            const is_active = true
            console.log(start_date)
            const assessment =  await Assessment.create({id_doctor,id_patient,is_active,start_date});
            
            return {
                id:assessment.id_assessment
            }
        }
    } 

  };

module.exports = resolvers;
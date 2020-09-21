const Assessment = require('../../DB/models/Assessment');

const Test = require('../../DB/models/Test');

const Zung = require('../../DB/models/Zung');
const Wada = require('../../DB/models/Wada');



function getTest(test){

  var rightTest;
  
  if(test.wada.id_test!==null)rightTest=test.wada
  else if(test.zung.id_test!==null)rightTest=test.zung

  rightTest.dataValues.is_active=test.is_active
  rightTest.dataValues.start_date=test.start_date

  return rightTest.dataValues

}


function deleteWrongTest(tests){
  var newTestArray = []

  tests.forEach(test =>  newTestArray.push(getTest(test)));
  
  return newTestArray

}



// The resolvers
const resolvers = {
    Test: {
        __resolveType(obj, context, info){
            
          if(obj.result){
            return 'Zung';
          }
    
          if(obj.hemisphere){
            return 'Wada';
          }
    
          return null;
        },
      },

    Query:{
        patientAssessment: async (parent,{id_patient}) =>{
            
          var assessments = await Assessment.findOne({where: { id_patient: id_patient,is_active:true}, include:{model:Test,include:[Wada,Zung]}})
  
          if(assessments!==null){
            assessments.dataValues.tests = deleteWrongTest(assessments.dataValues.tests)
            return {active:false,assessments:assessments.dataValues}
          }
          else return {active:false}
            

        }
    },

    Mutation: {
        createAssessment: async (parent,{id_doctor,id_patient}) =>{
            const start_date = new Date();
            const is_active = true

            const assessment =  await Assessment.create({id_doctor,id_patient,is_active,start_date});
            
            return {
                id:assessment.id_assessment
            }
        }
    } 

  };

module.exports = resolvers;
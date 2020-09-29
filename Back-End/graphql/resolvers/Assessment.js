const sequelize = require('../../DB/config/database');
const {formatErrors} = require('../../services/formatErrors');

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
            
          console.log(id_patient)
          var assessments = await Assessment.findOne({where: { id_patient: id_patient,is_active:true}, include:{model:Test,include:[Wada,Zung]}})
  
          if(assessments!==null){
            assessments.dataValues.tests = deleteWrongTest(assessments.dataValues.tests)
            return {active:true,assessments:assessments.dataValues}
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
        },

        closeAssessment: async (parent,{id_assessment,id_doctor}) =>{
          
          try{
          
            const response = await sequelize.transaction(async (t) => {

              const start_date = new Date();
              const is_active = true
    
              const assessmentUpdate =  await Assessment.update({is_active:false,end_date:start_date},{where:{id_assessment:id_assessment},transaction: t, returning:true });
              console.log(assessmentUpdate[1][0].dataValues.id_patient)
              const assessment =  await Assessment.create({id_doctor,id_patient:assessmentUpdate[1][0].dataValues.id_patient,is_active,start_date},{ transaction: t });
              
              return {
                  id:assessment.id_assessment
              }
            })
            return response        

          }
          catch(err){
              console.log(err) 
              return {
                  error: formatErrors(err),
              };
          }
      },

      exitAssessment: (parent,{id_assessment}) =>{
        const start_date = new Date();

        var updated = Assessment.update({is_active:false,end_date:start_date},{where:{id_assessment:id_assessment}})
        .then((x)=>{        
          if(x[0]<1)return ({ok:false,error:[{message:"Evaluacion no encontrada",path:"name"}]})
          else return ({ok:true})
        })
        .catch((err)=>{
          console.log(err) 
          return {
              error: formatErrors(err),
          };
        })

        return updated
      }
    } 

  };

module.exports = resolvers;
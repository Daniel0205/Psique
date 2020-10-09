
const sequelize = require('../../DB/config/database');
const {formatErrors} = require('../../services/formatErrors');

const Wada = require('../../DB/models/Wada');
const Test = require('../../DB/models/Test');
const Aphasia = require('../../DB/models/Aphasia');
//const { includes } = require('../schemas/Wada');

function verifyWada(wadaApplied,hemisphere){
    if(hemisphere){
        for (let i = 0; i < wadaApplied.length; i++) {
            if(wadaApplied[i].dataValues.wada.hemisphere===hemisphere)return true
        }
        return false
    }
    else{
        if(wadaApplied.length <3)return false
        else return true
    }
}

// The resolvers
const resolvers = {

    Query:{
        isWadaDone:async (parent,{id_assessment,hemisphere}) =>{
            let wadaApplied = await Test.findAll({
                where: {id_assessment},
                include: Wada
              });
            
            return verifyWada(wadaApplied,hemisphere)            
        }
    },

    Mutation: {
        createWada: async (parent,{wadaData,id_assessment,aphasiasData}) =>{

            try{
                const response = await sequelize.transaction(async (t) => {
                    const start_date = new Date();
                    const is_active = false

                    const test =  await Test.create({id_assessment,start_date,is_active},{ transaction: t });
                    wadaData.id_test=test.id_test;
                    
                    const wada =  await Wada.create(wadaData,{ transaction: t });  
                    aphasiasData.map(x=>x.id_test=wada.id_test)
                    
                    const aphasia = await Aphasia.bulkCreate(aphasiasData,{ transaction: t });  

                    return {id: wada.id_test}
                })
                
                return response
            }
            catch(err){
                console.log(err) 
                return {
                    error: formatErrors(err),
                };
            }
            
        }
    } 

  };

module.exports = resolvers;
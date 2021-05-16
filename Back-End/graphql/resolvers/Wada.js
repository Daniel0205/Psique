
const sequelize = require('../../DB/config/database');
const {formatErrors} = require('../../services/formatErrors');

const Wada = require('../../DB/models/Wada');
const Stage = require('../../DB/models/stage');
const Test = require('../../DB/models/Test');
const Aphasia = require('../../DB/models/Aphasia');
const Aphasia_per_wada = require('../../DB/models/aphasia_per_wada');
const Motor_deficit = require('../../DB/models/Motor_deficit');
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

function getAphasia(aphasiasData,t){
    var newAphasia = []
    aphasiasData.forEach( async (element) => {

        if(element.time === null || element.time===undefined)return
        
        var aphasia = await Aphasia.findOne({ where: { aphasia: element.name} });

        if(aphasia===null)aphasia = await Aphasia.create({aphasia: element.name},{ transaction: t })

        newAphasia.push({
            id_aphasia:aphasia.id_aphasia,
            time:element.time
        })
    });

    return newAphasia
}

function getDeficit(deficitData,t){
    var newDeficit = []
    deficitData.forEach(async (element)  => {

        if(element.time !== null && element.time!== undefined)return
        
        var deficit = await Motor_deficit.findOne({ where: { deficit: element.name} });

        if(deficit===null)deficit = await deficit.create({deficit: element.name},{ transaction: t })

        newDeficit.push({
            id_deficit:aphasia.id_aphasia
        })
    });

    return newDeficit
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
                    const aphasias = getAphasia(aphasiasData,t);
                    const deficit = getDeficit(aphasiasData,t);

                    const start_date = new Date();
                    const is_active = false

                    const test =  await Test.create({id_assessment,start_date,is_active},{ transaction: t });                    
                    const stage = await Stage.findOne({ where: { stage: wadaData.hemisphere} });

                    wadaData.id_test=test.id_test;
                    wadaData.id_stage=stage.id_stage;
                    delete wadaData.hemisphere

                    const wada =  await Wada.create(wadaData,{ transaction: t });  


                    aphasias.map(x=>x.id_test=wada.id_test)
                    console.log(aphasias)
                    
                    const aphasia_per_wada = await Aphasia_per_wada.bulkCreate(aphasias,{ transaction: t })

                    deficit.map(x=>x.id_test=wada.id_test)
                    
                    const deficit_per_wada = await Aphasia_per_wada.bulkCreate(deficit,{ transaction: t })

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
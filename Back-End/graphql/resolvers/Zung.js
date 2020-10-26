
const sequelize = require('../../DB/config/database');
const {formatErrors} = require('../../services/formatErrors');

const Zung = require('../../DB/models/Zung');
const Test = require('../../DB/models/Test');


// The resolvers
const resolvers = {

    Mutation: {
        createZung: async (parent,{result,id_assessment}) =>{

            try{
                const response = await sequelize.transaction(async (t) => {
                    const start_date = new Date();
                    const is_active = false

                    const test =  await Test.create({id_assessment,start_date,is_active},{ transaction: t });
                                    
                    const zung =  await Zung.create({id_test:test.id_test,result:result},{ transaction: t });  
                
                    return {id: zung.id_test}
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
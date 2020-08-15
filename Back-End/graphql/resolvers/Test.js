const Test = require('../../DB/models/Test');


// The resolvers
const resolvers = {

    Mutation: {
        createTest: async (parent,{id_assessment}) =>{
            const start_date = new Date();
            const is_active = true

            const test =  await Test.create({id_assessment,start_date,is_active});
            
            return {
                id:test.id_test
            }
        }
    } 

  };

module.exports = resolvers;
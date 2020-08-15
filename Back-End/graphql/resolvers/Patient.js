
const Patient =require( '../../DB/models/Patient');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

// The resolvers
const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            
            return returnOnError(() => value == null ? null : Date.parse(value), null);
            // value from the client
        },
        serialize(value) {
            
          return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            return ast.kind === Kind.STRING ? Date.parse(ast.value) : null;// ast value is always in string format        
        },
    }),


    Mutation: {
        createPatient: async(parent,{data}) =>{
            const patient =  await Patient.create(data);
            
            return {id:patient.id_patient}
        }
    } 

  };

module.exports = resolvers;
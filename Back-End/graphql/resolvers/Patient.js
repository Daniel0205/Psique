
const Patient =require( '../../DB/models/Patient');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
var moment = require('moment'); 

// The resolvers
const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            
            return returnOnError(() => value == null ? null : moment(value, "DD-MM-YYYY"), null);
            // value from the client
        },
        serialize(value) {
            
          return moment(value, "DD-MM-YYYY"); // value sent to the client
        },
        parseLiteral(ast) {
            return ast.kind === Kind.STRING ? moment(ast.value, "DD-MM-YYYY") : null;// ast value is always in string format        
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
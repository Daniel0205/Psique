
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { fileLoader, mergeTypes, mergeResolvers } = require( 'merge-graphql-schemas');
const path = require( 'path');



const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


module.exports = [graphqlExpress({ 
  schema
}),graphiqlExpress({ endpointURL: '/graphql' })];
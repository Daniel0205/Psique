
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { fileLoader, mergeTypes, mergeResolvers } = require( 'merge-graphql-schemas');
const path = require( 'path');

const SECRET = 'asiodfhoi1hoi23jnl1kejd';
const SECRET2 = 'asiodfhoi1hoi23jnl1kejasdjlkfasdd';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


module.exports = [graphqlExpress({ 
  schema,
  context: {
    SECRET,
    SECRET2,
  }
}),graphiqlExpress({ endpointURL: '/graphql' })];
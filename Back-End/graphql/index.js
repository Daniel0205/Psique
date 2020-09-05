
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { fileLoader, mergeTypes, mergeResolvers } = require( 'merge-graphql-schemas');
const path = require( 'path');



const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

let endpoint;

if(process.env.NODE_ENV==="production"){
  endpoint= 'https://psique-app.web.app/'
}
else endpoint= "http://localhost:5000/"


// GraphQL: Schema
const SERVER = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  playground: {
    endpoint: endpoint+'graphql',
    settings: {
      'editor.theme': 'dark'
    }
  }
});
// Exports
module.exports = SERVER;
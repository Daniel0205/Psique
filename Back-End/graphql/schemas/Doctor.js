
const { gql } =require( 'apollo-server-express');

module.exports =gql`
  type  Query{
    hola:Boolean
  }

  type Mutation {
    login(username: String!, password: String!): LoginResponse!
  }

`;




const { gql } =require( 'apollo-server-express');

module.exports =gql`
  

  type Mutation {
    createAssessment(id_patient:ID!,id_doctor: ID!): createResponse!
  }

`;


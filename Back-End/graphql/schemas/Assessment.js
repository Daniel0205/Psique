

// The GraphQL schema in string form

module.exports =`
  
  type createResponse {
    id: ID!
  }

  type Mutation {
    createAssessment(id_patient:ID!,id_doctor: ID!): createResponse!
  }

`;


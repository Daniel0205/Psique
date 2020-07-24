

// The GraphQL schema in string form

module.exports =`
  
  type  Query{
    hola:Boolean
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String

  }

  type Mutation {
    login(username: String!, password: String!): LoginResponse!
  }

`;


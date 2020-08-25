

module.exports =`
  type  Query{
    hola:Boolean
  }

  type Mutation {
    login(username: String!, password: String!): LoginResponse!
  }

`;


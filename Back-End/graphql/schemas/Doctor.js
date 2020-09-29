

module.exports =`

  type Mutation {
    login(username: String!, password: String!): LoginResponse!
    getId(token:String!):IdResponse!
  }


`;


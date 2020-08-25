

// The GraphQL schema in string form

module.exports =`
  
  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String

  }

  type Error {
    path: String!
    message: String
  }

  type createResponse {
    id: ID
    error: [Error!]
  }


`;


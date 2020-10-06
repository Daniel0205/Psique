


module.exports =`
  
type Zung implements Test{
    is_active:Boolean!
    start_date: Date!
    id_test: ID!,
    result:Int!
 }

type Mutation {
  createZung(result:Int!,id_assessment:ID!): createResponse!
}



`;



module.exports =`
  scalar Date


  input PatientInput{
    id_patient:ID!,	
	  name:String!,
	  surname: String!,
    gender:String!,
    city:String!,
    birth_date: Date!
  }

  type Mutation {
    createPatient(data:PatientInput!): createResponse!
  }



`;


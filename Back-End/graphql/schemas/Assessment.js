


module.exports =`
  
  type AssessmentResponse{
    active:Boolean!
    assessments:Assessment
  }

  type Assessment{
    id_assessment:ID!
    start_date:Date!
    end_date:Date
    is_active:Boolean
    tests:[Test]!
  }

  interface Test{
    id_test: ID!,
    is_active:Boolean!
    start_date: Date!
  }

  type Query{
    patientAssessment(id_patient:ID!):AssessmentResponse!
  }

  type Mutation {
    createAssessment(id_patient:ID!,id_doctor: ID!): createResponse!
  }

`;


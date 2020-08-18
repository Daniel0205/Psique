

// The GraphQL schema in string form

module.exports =`

  input Wada{
	hemisphere:String!,
	propofol_aplication:Int!,
	duration:Int!,
	counting:Int,
	denomination:Int,
	verbal_instructions:Int,
	repetition:Int,
	lecture:Int,
	follow_instructions:Int
  }

  input Aphasia{
	  time:Int,
	  name:String!
  }

  type Query{
	  isWadaDone(id_assessment:Int!,hemisphere:String):Boolean!
  }

  type Mutation {
    createWada(wadaData:Wada!,id_assessment:Int!,aphasiasData:[Aphasia!]): createResponse!
  }	
  
`;


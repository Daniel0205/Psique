
module.exports =`

  input WadaIn{
	hemisphere:String!,
	propofol_aplication:Int,
	duration:Int!,
	counting:Int,
	denomination:Int,
	verbal_instructions:Int,
	repetition:Int,
	lecture:Int,
	follow_instructions:Int
  }

  type Wada implements Test{
	is_active:Boolean!
    start_date: Date!
	id_test:ID!,
	hemisphere:String!,
	propofol_aplication:Int,
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
	  isWadaDone(id_assessment:ID!,hemisphere:String):Boolean!
  }

  type Mutation {
    createWada(wadaData:WadaIn!,id_assessment:ID!,aphasiasData:[Aphasia!]): createResponse!
  }	
  
`;


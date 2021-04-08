cube(`CognitiveDisease`, {
  sql: `SELECT * FROM public.cognitive_disease`,
  
  joins: {
    
  },
  
  measures: {

  },
  
  dimensions: {
    id_cognitive_disease: {
      sql: `id_cognitive_disease`,
      type: `number`,
      primaryKey: true
    },
    type: {
      sql: `type`,
      type: `string`,
      primaryKey: true
    },
  },
  
  dataSource: `default`
});

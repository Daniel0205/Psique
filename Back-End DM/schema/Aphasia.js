cube(`Aphasia`, {
  sql: `SELECT * FROM public.aphasia`,
  
  joins: {
    
  },
  
  measures: {
  },
  
  dimensions: {
    id_aphasia: {
      sql: `id_aphasia`,
      type: `number`,
      primaryKey: true
    },    
    aphasia: {
      sql: `aphasia`,
      type: `string`
    }
  },
  
  dataSource: `default`
});

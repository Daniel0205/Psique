cube(`Stage`, {
  sql: `SELECT * FROM public.stage`,
  
  joins: {
    
  },
  
  measures: {

  },
  
  dimensions: {
    id_stage: {
      sql: `stage`,
      type: `number`,
      primaryKey: true
    },
    stage: {
      sql: `stage`,
      type: `string`
    }
  },
  
  dataSource: `default`
});

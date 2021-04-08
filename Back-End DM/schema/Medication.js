cube(`Medication`, {
  sql: `SELECT * FROM public.medication`,
  
  joins: {
    
  },
  
  measures: {
  },
  
  dimensions: {
    id_medication: {
      sql: `id_medication`,
      type: `number`,
      primaryKey: true
    },
    medicine: {
      sql: `medicine`,
      type: `string`
    }
  },
  
  dataSource: `default`
});

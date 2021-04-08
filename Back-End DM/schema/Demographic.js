cube(`Demographic`, {
  sql: `SELECT * FROM public.demographic`,
  
  joins: {
    
  },
  
  measures: {
  },
  
  dimensions: {
    id_demographic: {
      sql: `id_demographic`,
      type: `number`,
      primaryKey: true
    },

    gender: {
      sql: `gender`,
      type: `string`
    },
    
    bornCity: {
      sql: `born_city`,
      type: `string`
    },
    
    actualCity: {
      sql: `actual_city`,
      type: `string`
    },
    
    civilState: {
      sql: `civil_state`,
      type: `string`
    },
    
    handedness: {
      sql: `handedness`,
      type: `string`
    },
    
    scholarship: {
      sql: `scholarship`,
      type: `string`
    }
  },
  
  dataSource: `default`
});

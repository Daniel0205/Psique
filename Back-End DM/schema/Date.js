cube(`Date`, {
  sql: `SELECT * FROM public.date`,
  
  joins: {
    
  },
  
  measures: {

  },
  
  dimensions: {
    id_date: {
      sql: `id_date`,
      type: `number`,
      primaryKey: true
    },
    day: {
      sql: `day`,
      type: `number`,
    },
    month: {
      sql: `month`,
      type: `number`,
    },
    year: {
      sql: `year`,
      type: `number`,
    },
  },
  
  dataSource: `default`
});

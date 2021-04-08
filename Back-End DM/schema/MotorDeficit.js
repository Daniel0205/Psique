cube(`MotorDeficit`, {
  sql: `SELECT * FROM public.motor_deficit`,
  
  joins: {
    
  },
  
  measures: {
  },
  
  dimensions: {
    id_motor_deficit: {
      sql: `deficit`,
      type: `number`,
      primaryKey: true
    },
    deficit: {
      sql: `deficit`,
      type: `string`
    }
  },
  
  dataSource: `default`
});

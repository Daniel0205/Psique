cube(`Background`, {
  sql: `SELECT * FROM public.background`,
  
  joins: {
    
  },
  
  measures: {

  },
  
  dimensions: {
    id_background: {
      sql: `id_background`,
      type: `number`,
      primaryKey: true
    },
    update_date: {
      sql: `update_date`,
      type: `number`,
      primaryKey: true
    },
    rhinitis: {
      sql: `rhinitis`,
      type: `string`
    },
    
    earache: {
      sql: `earache`,
      type: `string`
    },
    
    headTrauma: {
      sql: `head_trauma`,
      type: `string`
    },
    
    prenatalTrauma: {
      sql: `prenatal_trauma`,
      type: `string`
    },
    
    meningitis: {
      sql: `meningitis`,
      type: `string`
    },
    
    prematureBirth: {
      sql: `premature_birth`,
      type: `string`
    },
    
    narcotics: {
      sql: `narcotics`,
      type: `string`
    },
    
    asthma: {
      sql: `asthma`,
      type: `string`
    },
    
    sinusitis: {
      sql: `sinusitis`,
      type: `string`
    },
    
    pneumothorax: {
      sql: `pneumothorax`,
      type: `string`
    },
    
    tuberculosis: {
      sql: `tuberculosis`,
      type: `string`
    },
    
    heartProblems: {
      sql: `heart_problems`,
      type: `string`
    },
    
    renalProblems: {
      sql: `renal_problems`,
      type: `string`
    },
    
    boneProblems: {
      sql: `bone_problems`,
      type: `string`
    },
    
    epidermalProblems: {
      sql: `epidermal_problems`,
      type: `string`
    },
    
    highBloodPressure: {
      sql: `high_blood_pressure`,
      type: `string`
    },
    
    smoking: {
      sql: `smoking`,
      type: `string`
    },
    
    alcoholism: {
      sql: `alcoholism`,
      type: `string`
    }
  },
  
  dataSource: `default`
});

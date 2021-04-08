cube(`ChirurgicalAssessment`, {
  sql: `SELECT * FROM public.chirurgical_assessment`,
  
  joins: {

    Background: {
      relationship: `belongsTo`,
      sql: `${Background}.id_background = ${Background}.id_background AND ${Background}.update_date = ${Background}.update_date`
    },
    Demographic: {
      relationship: `belongsTo`,
      sql: `${Demographic}.id_demographic = ${Demographic}.id_demographic AND ${Demographic}.update_date = ${Demographic}.update_date`
    },
    Medication: {
      relationship: `belongsTo`,
      sql: `${Medication}.id_medication = ${Medication}.id_medication`
    },  
    Date: {
      relationship: `belongsTo`,
      sql: `${Date}.id_date = ${Date}.id_date `
    },  
    CognitiveDisease: {
      relationship: `belongsTo`,
      sql: `${CognitiveDisease}.id_cognitive_disease = ${CognitiveDisease}.id_cognitive_disease `
    },
    
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: []
    },
    average_counting: {
      sql: `counting`,
      type: `avg`,
      title: `Promedio de resultados de la subprueba de conteo`,
      description: `Realiza un promedio de todos los resultados de la subprueba de conteo`
    },
    average_denomination: {
      sql: `denomination`,
      type: `avg`,
      title: `Promedio de resultados de la subprueba de denominacion`,
      description: `Realiza un promedio de todos los resultados de la subprueba de denominacion`
    },
    average_verbal_instructions: {
      sql: `verbal_instructions`,
      type: `avg`,
      title: `Promedio de resultados de la subprueba instrucciones verbales`,
      description: `Realiza un promedio de todos los resultados de la subprueba instrucciones verbales`
    },
    average_repetition: {
      sql: `repetition`,
      type: `avg`,
      title: `Promedio de resultados de la subprueba repeticion`,
      description: `Realiza un promedio de todos los resultados de la subprueba repeticion`
    },
    average_processing_speed: {
      sql: `processing_speed`,
      type: `avg`,
      title: `Promedio de resultados de la subprueba velocidad de procesamiento`,
      description: `Realiza un promedio de todos los resultados de la subprueba velocidad de procesamiento`
    },
    average_lecture: {
      sql: `lecture`,
      type: `avg`,
      title: `Promedio de resultados de la subprueba lectura`,
      description: `Realiza un promedio de todos los resultados de la subprueba lectura`
    },
    average_follow_instructions: {
      sql: `follow_instructions`,
      type: `avg`,
      title: `Promedio de resultados de la subprueba seguimiento de instrucciones`,
      description: `Realiza un promedio de todos los resultados de la subprueba seguimiento de instrucciones`
    },
  },
  
  dimensions: {
    id: {
      sql: `id_assessment`,
      type: `number`,
      primaryKey: true
    }
    
  },
  
  dataSource: `default`
});

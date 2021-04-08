
cube(`NeuropsychologicalAssessment`, {
  sql: `SELECT * FROM public.neuropsychological_assessment`,
  
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
    }
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: []
    },
    average_iq: {
      sql: `iq`,
      type: `avg`,
      title: `Promedio de resultados de iq`,
      description: `Realiza un promedio de todos los resultados de IQ`,
    },
    average_verbal_comprehension: {
      sql: `verbal_comprehension`,
      type: `avg`,
      title: `Promedio de resultados del indice de comprension verbal`,
      description: `Realiza un promedio de todos los resultados del indice de comprension verbal`
    },
    average_fluid_reasoning: {
      sql: `fluid_reasoning`,
      type: `avg`,
      title: `Promedio de resultados del indice de fluid_reasoning`,
      description: `Realiza un promedio de todos los resultados del indice de fluid_reasoning`
    },
    average_working_memory: {
      sql: `working_memory`,
      type: `avg`,
      title: `Promedio de resultados del indice de Memoria de trabajo`,
      description: `Realiza un promedio de todos los resultados del indice de Memoria de trabajo`
    },
    average_processing_speed: {
      sql: `processing_speed`,
      type: `avg`,
      title: `Promedio de resultados del indice de velocidad de procesamiento`,
      description: `Realiza un promedio de todos los resultados del indice de velocidad de procesamiento`
    },
    average_rey_result: {
      sql: `rey_result`,
      type: `avg`,
      title: `Promedio de resultados del indice de velocidad de procesamiento`,
      description: `Realiza un promedio de todos los resultados del indice de velocidad de procesamiento`
    },
    average_rey_percentil: {
      sql: `rey_percentil`,
      type: `avg`,
      title: `Promedio de los perceptiles`,
      description: `Realiza un promedio de todos perceptiles de la prueba de rey`
    },
    average_stroop_word_colour: {
      sql: `stroop_word_colour`,
      type: `avg`,
      title: `Promedio de los resultados de la prueba de stroop palabras y colores`,
      description: `Realiza un promedio de todos los resultados de la prueba de stroop palabras y colores`
    },
    average_stroop_colour: {
      sql: `stroop_colour`,
      type: `avg`,
      title: `Promedio de los resultados de la prueba de stroop colores`,
      description: `Realiza un promedio de todos los resultados de la prueba de stroop colores`
    },
    average_stroop_word: {
      sql: `stroop_word`,
      type: `avg`,
      title: `Promedio de los resultados de la prueba de stroop palabras`,
      description: `Realiza un promedio de todos los resultados de la prueba de stroop palabras`
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
import axios from 'axios';
import md5 from 'md5';

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////PRACTITIONER///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

//Función que dado un identificador de un doctor verifica que el respectivo recurso Practioner exista
export function verifyPractitioner(identifier) {

    return new Promise((resolve,reject) => {
        const url = 'http://localhost:8080/fhir/Practitioner?identifier=' + String(identifier)
        console.log(url)

        axios.get(url)
        .then(res => {
            resolve(res.data)
        })

    })

    
}

export function doctorParser(objDoctor) {

    return(
        {
            "resourceType": "Practitioner",
            "meta": {
              "profile": [
                "http://example.org/fhir/StructureDefinition/PsiquePractitioner"
              ]
            },
            "text": {
              "status": "generated",
              "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n      <p>Dr Adam Careful is a Referring Practitioner for Acme Hospital from 1-Jan 2012 to 31-Mar\n        2012</p>\n    </div>"
            },
            "identifier": [
              {
                "system": "http://www.acme.org/practitioners",
                "value": objDoctor.identifier
              }
            ],
            "name": [
              {
                "given": [
                  objDoctor.name
                ],
                "prefix": [
                  "Dr"
                ]
              }
            ]
          }
          
    )
    
}

export function createPractitioner(resourcePractitioner){
  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Practitioner'

    axios.post(url,resourcePractitioner)
    .then(res => {
        resolve(res.data)
    })

  })
}

///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////PATIENT///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


export function verifyPatient(identifier) {

  return new Promise((resolve,reject) => {
      const url = 'http://localhost:8080/fhir/Patient?identifier=' + String(identifier)
      console.log(url)

      axios.get(url)
      .then(res => {
          console.log(res.data)
          resolve(res.data)
      })

  })
}

// Función para acceder y listar los Patient existentes en formato JSON adapatado
export function consultPatient(){

  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Patient'
  
    axios.get(url)
    .then(res => {

      var fhirObjs = res.data.entry

      var formatedObjs = fhirObjs.map( (obj) => {

        var object = {
          id_patient: obj.resource.id,
          gender: obj.resource.gender,
          birthDate: obj.resource.birthDate,
          status: obj.resource.maritalStatus.coding[0].display,
          performer: obj.resource.generalPractitioner[0].reference,
          city: obj.resource.address[0].city
        }
 
       return object
      
      })
        resolve(formatedObjs)
    })
  })

}


export function patientParser(objPatient) {

  const depersonal = md5(String(objPatient.identifier))

  return(
    {
      "resourceType": "Patient",
      "meta": {
        "profile": [
          "http://example.org/fhir/StructureDefinition/PsiquePatient"
        ]
      },
      "identifier": [
        {
          "use": "usual",
          "system": "urn:oid:1.2.36.146.595.217.0.1",
          "value": depersonal,
          "period": {
            "start": "2001-05-06"
          }
        }
      ],
      "name": [
        {
          "use": "official",
          "family": "XXXXX",
          "given": [
            "XXXX"
          ]
        }
      ],
      "gender": objPatient.gender,
      "birthDate": "1974-12-25",
      "address": [
        {
          "use": "home",
          "type": "both",
          "text": "534 Erewhon St PeasantVille, Rainbow, Vic  3999",
          "line": [
            "534 Erewhon St"
          ],
          "city": "PleasantVille",
          "district": "Rainbow",
          "state": "Vic",
          "postalCode": "3999",
          "period": {
            "start": "1974-12-25"
          }
        }
      ],
      "maritalStatus": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "S",
            "display": "Single"
          }
        ],
        "text": "Getrouwd"
      },
      "generalPractitioner": [
        {
          "reference": "Practitioner/1552"
        }
      ]
    }
        
  )
  
}

export function createPatient(resourcePatient){
return new Promise((resolve,reject) => {
  const url = 'http://localhost:8080/fhir/Patient'

  axios.post(url,resourcePatient)
  .then(res => {
      resolve(res.data)
  })

})
}

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////RESEARCH STUDY/////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

// Función para acceder y listar las investigaciones existentes en formato JSON adapatado
export function consultResearch(){

  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/ResearchStudy'
  
    axios.get(url)
    .then(res => {

      var fhirObjs = res.data.entry

      var formatedObjs = fhirObjs.map( (obj) => {

        var object = {
          id_research: obj.resource.id,
          name: obj.resource.title,
          status: obj.resource.status,
          organization: obj.resource.sponsor,
          investigator: obj.resource.principalInvestigator,
          city: obj.resource.location
        }
 
       return object
      
      })
        resolve(formatedObjs)
    })
  })

}

export function researchParser(objResearch){
  return(
    {
      "resourceType": "ResearchStudy",
      "meta": {
        "profile": [
          "http://example.org/fhir/StructureDefinition/PsiqueResearchStudy"
        ]
      },
      "status": objResearch.status,
      "title": objResearch.name,
      "location": objResearch.city,
      "extension":[
          {
              "url": "http://example.org/fhir/StructureDefinition/Contributors",
              "valueReference": {
                "reference": "Organization/5"
                }
          },
          {
              "url": "http://example.org/fhir/StructureDefinition/Contributors",
              "valueReference": {
                "reference": "Organization/2"
                }
          }
          
      ]
    }
  )
}

export function createResearch(resourceResearch){
  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/ResearchStudy'

    axios.post(url,resourceResearch)
    .then(res => {
        resolve(res.data)
    })

  })
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////PROCEDURE///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

// Función para acceder y listar los procedimientois existentes en formato JSON adapatado
export function consultProcedure(){

  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Procedure'
  
    axios.get(url)
    .then(res => {

      var fhirObjs = res.data.entry

      var formatedObjs = fhirObjs.map( (obj) => {

        var object = {
          id_procedure: obj.resource.id,
          procedure: obj.resource.code.text,
          subject: obj.resource.subject.reference,
          status: obj.resource.status,
          performer: obj.resource.performer[0].actor.reference,
          outcome: obj.resource.outcome.text,
          report: obj.resource.report[0].display
        }
 
       return object
      
      })
        resolve(formatedObjs)
    })
  })

}

//Esta función recibe un recurso Procedure JSON y devuelve un JSON en formato FHIR 
export function procedureParser(objProcedure){
  return(
    {
      "resourceType": "Procedure",
      "meta": {
        "profile": [
          "http://example.org/fhir/StructureDefinition/PsiqueProcedure"
        ]
      },
      "status": "in-progress",
      "code": {
        "text": objProcedure.name
      },
      "subject": {
        "reference": objProcedure.subject
      },
      "performedDateTime": "2016-09-27",
      "performer": [
        {
          "actor": {
            "reference": objProcedure.performer
          }
        }
      ],
      "outcome": {
        "text": objProcedure.name
      },
      "report": [
        {
          "display": objProcedure.results
        }
      ]
    
    }
  )
}


//Esta funcion recibe un recurso procedure FHIR y lo carga en la base de datos 
export function createProcedure(resourceProcedure){
  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Procedure'

    axios.post(url,resourceProcedure)
    .then(res => {
        resolve(res.data)
    })

  })
}

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////ORGANIZATION///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

export function consultOrganization(){

  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Organization'
  
    axios.get(url)
    .then(res => {

      var fhirObjs = res.data.entry

      var formatedObjs = fhirObjs.map( (obj) => {

        var object = {
          id_organization: obj.resource.id,
          identifier: obj.resource.identifier[0].value,
          name: obj.resource.name,
          alias: obj.resource.alias,
        }
 
       return object
      
      })
        resolve(formatedObjs)
    })
  })

}

//Esta función recibe un recurso Organization JSON y devuelve un JSON en formato FHIR 
export function organizationParser(objOrganization){
  return(
    {
      "resourceType": "Organization",
      "meta": {
        "profile": [
          "http://example.org/fhir/StructureDefinition/PsiqueOrganization"
        ]
      },
      "identifier": [
        {
          "value": objOrganization.identifier
        }
      ],
      "name": objOrganization.name,
      "alias": [
          objOrganization.alias
      ]
    }
  )
}


//Esta funcion recibe un recurso Organization FHIR y lo carga en la base de datos 
export function createOrganization(resourceOrganization){
  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Organization'

    axios.post(url,resourceOrganization)
    .then(res => {
        resolve(res.data)
    })

  })
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////CONDITION///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

export function consultCondition(identifier){

  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Condition?subject=Patient/' + String(identifier)
  
    axios.get(url)
    .then(res => {

      var fhirObjs = res.data.entry

      if(res.data.total>=1){
        var formatedObjs = fhirObjs.map( (obj) => {

          var object = {
            id_condition: obj.resource.id,
            subject: obj.resource.subject.reference,
            name: obj.resource.code.coding[0].display,
            icd10: obj.resource.code.coding[0].code,
          }
   
         return object
        
        })
        resolve(formatedObjs)
      }
  
    })
  })

}

//Esta función recibe un recurso Condition JSON y devuelve un JSON en formato FHIR 
export function conditionParser(objCondition){

}


//Esta funcion recibe un recurso Condition FHIR y lo carga en la base de datos 
export function createCondition(resourceCondition){
  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Condition'

    axios.post(url,resourceCondition)
    .then(res => {
        resolve(res.data)
    })

  })
}

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////MEDIA//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

export function consultMedia(){

  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Media'
  
    axios.get(url)
    .then(res => {

      var fhirObjs = res.data.entry

      var formatedObjs = fhirObjs.map( (obj) => {

        var object = {
          id_procedure: obj.resource.id,
          subject: obj.resource.subject,
          status: obj.resource.status,
          performer: obj.resource.performer,
          outcome: obj.resource.outcome,
          report: obj.resource.report
        }
 
       return object
      
      })
        resolve(formatedObjs)
    })
  })

}

//Esta función recibe un recurso Media JSON y devuelve un JSON en formato FHIR 
export function mediaParser(objMedia){

}


//Esta funcion recibe un recurso Condition FHIR y lo carga en la base de datos 
export function createMedia(resourceMedia){
  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Media'

    axios.post(url,resourceMedia)
    .then(res => {
        resolve(res.data)
    })

  })
}


///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////BINARY//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

export function consultBinary(){

  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Binary'
  
    axios.get(url)
    .then(res => {

      var fhirObjs = res.data.entry

      var formatedObjs = fhirObjs.map( (obj) => {

        var object = {
          id_procedure: obj.resource.id,
          subject: obj.resource.subject,
          status: obj.resource.status,
          performer: obj.resource.performer,
          outcome: obj.resource.outcome,
          report: obj.resource.report
        }
 
       return object
      
      })
        resolve(formatedObjs)
    })
  })

}

//Esta función recibe un recurso Binary JSON y devuelve un JSON en formato FHIR 
export function binaryParser(objBinary){

}


//Esta funcion recibe un recurso Binary FHIR y lo carga en la base de datos 
export function createBinary(resourceBinary){
  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Binary'

    axios.post(url,resourceBinary)
    .then(res => {
        resolve(res.data)
    })

  })
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////COMMUNICATION//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

export function consultCommunication(identifier){

  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Communication?recipient=Practitioner/' + String(identifier)
  
    axios.get(url)
    .then(res => {

      var fhirObjs = res.data.entry

      var formatedObjs = fhirObjs.map( (obj) => {

        var object = {
          id_communication: obj.resource.id,
          sender: obj.resource.sender.reference,
          recipient: obj.resource.recipient[0].reference,
          date: obj.resource.sent,
          reference: obj.resource.about[0].reference,
          data: obj.resource.payload[0].contentString,
        }
 
       return object
      
      })
        resolve(formatedObjs)
    })
  })

}

//Esta función recibe un recurso Communication JSON y devuelve un JSON en formato FHIR 
export function communicationParser(objCommunication){

  return(
    {
      "resourceType": "Communication",
      "about": [
        {
          "reference": objCommunication.subj
        }
      ],
      "sent": "2016-06-12T18:01:10-08:00",
      "recipient": [
        {
          "reference": objCommunication.receiver
        }
      ],
      "sender": {
        "reference": objCommunication.sender
      },
      "payload": [
        {
          "contentString": objCommunication.obs
        }
      ]
    }
  )

}


//Esta funcion recibe un recurso Communication FHIR y lo carga en la base de datos 
export function createCommunication(resourceCommunication){
  return new Promise((resolve,reject) => {
    const url = 'http://localhost:8080/fhir/Communication'

    axios.post(url,resourceCommunication)
    .then(res => {
        resolve(res.data)
    })

  })
}
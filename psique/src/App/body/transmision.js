import axios from 'axios';

export function verifyPractitioner(identifier) {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        console.log(res.data);
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
                "family": "Careful",
                "given": [
                  objDoctor.identifier
                ],
                "prefix": [
                  "Dr"
                ]
              }
            ]
          }
          
    )
    alert("Esta función verifica que ya se haya creado el practicioner correspondiente")
}

export function verifyPractitioner() {
    alert("Esta función verifica que ya se haya creado el practicioner correspondiente")
}
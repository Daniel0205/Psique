function setIdPatient(payload) {
  return { type: "SET_ID", payload };
}

function setDataPatient(payload) {
    return { type: "SET_DATA", payload };
  }

export {setDataPatient,setIdPatient}
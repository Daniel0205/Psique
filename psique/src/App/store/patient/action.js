function setBirthday(payload) {
    return { type: "SET_BIRTHDAY", payload };
  }

function setIdPatient(payload) {
  return { type: "SET_ID", payload };
}


export {setBirthday,setIdPatient}
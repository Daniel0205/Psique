export function setResWechsler(payloadName, payloadValue) {
    return { type: "SET_RESWECHSLER", payloadName, payloadValue};
  }

export function resetResWechsler() {
    return { type: "RESET_RESWECHSLER"};
  }

export function resetSession(testValue, activeValue) {
    return { type: "RESET_SESSION", testValue, activeValue};
  }
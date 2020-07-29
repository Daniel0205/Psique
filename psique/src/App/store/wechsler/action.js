export function setResWechsler(payloadName, payloadValue) {
    return { type: "SET_RESWECHSLER", payloadName, payloadValue};
  }

export function resetResWechsler() {
    return { type: "RESET_RESWECHSLER"};
  }
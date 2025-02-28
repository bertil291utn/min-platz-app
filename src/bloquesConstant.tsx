export const NUMERO_CAMAS_MIN = 1;
export const NUMERO_CUADROS_PER_CAMAS_MIN = 1;
export const NUMERO_MIN = 1;
export const NUMERO_MAX = 1000;

export const getSpanishOrdinal = (number: number, isLast: boolean = false): string => {
  if (isLast) return "último";

  const ordinals: { [key: number]: string } = {
    1: "primero",
    2: "segundo",
    3: "tercero",
    4: "cuarto",
    5: "quinto",
    6: "sexto",
    7: "séptimo",
    8: "octavo",
    9: "noveno",
    10: "décimo",
    11: "undécimo",
    12: "duodécimo",
    13: "decimotercero",
    14: "decimocuarto",
    15: "decimoquinto",
    16: "decimosexto",
    17: "decimoséptimo",
    18: "decimoctavo",
    19: "decimonoveno",
    20: "vigésimo"
  };

  return ordinals[number] || `${number}º`;
};
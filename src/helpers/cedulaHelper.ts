import validator from 'ecuador-validator';

export const isValidRUC = (RUC: string): boolean => {
  return validator.ci(RUC.slice(0, -3)) && RUC.slice(-3) == "001";
}
export const isValidIdentification = (CI: string): boolean => {
  return validator.ci(CI)
}
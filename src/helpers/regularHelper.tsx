export const sleep = (seconds: number = 2) => new Promise(resolve => setTimeout(resolve, seconds * 1000));
export const getWeekNumber = (date: Date): number => {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
};

export const CURRENT_DATE_UTC5 = new Date(new Date().getTime() - 5 * 60 * 60 * 1000);

export const CURRENT_WEEK_NUMBER = getWeekNumber(CURRENT_DATE_UTC5);
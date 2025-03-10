export const sleep = (seconds: number = 2) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

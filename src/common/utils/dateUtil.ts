export const getDatesInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

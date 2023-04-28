/* floor т.к. функция используется для массивов и максимальным
  числом будет длина массива */

export const randomizeNumber = (max: number): number => {
  return Math.floor(Math.random() * max);
};

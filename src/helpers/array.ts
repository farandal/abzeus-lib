export const groupByTwo = (arr: any, key1: string, key2: string) =>
  arr.reduce((objectsByKeyValue: any, obj: any) => {
    const value1 = obj[key1];
    const value2 = obj[key2];
    const key = `${value1}-${value2}`;
    objectsByKeyValue[key] = (objectsByKeyValue[key] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export const groupByAttr = (arr: any, key: number | string) =>
  arr.reduce((objectsByKeyValue: any, obj: any) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export function groupBy<T>(
  arr: T[],
  callback: (item: T) => string
): { [key: string]: T[] } {
  const result: { [key: string]: T[] } = {};

  arr.forEach((item) => {
    const key = callback(item);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);
  });

  return result;
}



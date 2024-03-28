export const group = (arr: any[]): any => {
  const debug = false;
  const result = [];
  let current = [];
  for (let i = 0; i < arr.length; i++) {
    current.push(arr[i]);
    if (current.length === 3 || i === arr.length - 1) {
      result.push(current);
      current = [];
    }
  }
  debug && console.log("GROUP", result);
  return result;
};

export const removeExtraBracket = (arr: any[]) => {};

export const flatTrini = (arr: any) => {
  if (Array.isArray(arr)) {
    return arr.reduce(
      (acc: any[], val: any) => acc + (Array.isArray(val) ? val.join("") : val),
      ""
    );
  } else {
    return arr;
  }
};

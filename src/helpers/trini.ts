const trini = (arr: any[], obj?: any[], index?: number): any => {
  const debug = false;
  if (!obj) obj = [];
  if (!index) index = 0;

  let current = [];
  let reader = 0;

  const _arr = !Array.isArray(arr) ? Array.from(arr) : arr;

  //current = [arr[index], arr[index + 1], arr[index + 2]];
  if (_arr[index]) current.push(_arr[index]);
  if (_arr[index + 1]) current.push(_arr[index + 1]);
  if (_arr[index + 2]) current.push(_arr[index + 2]);

  obj = [...obj, current];

  index += 3;
  reader++;

  if (index < _arr.length) {
    return trini(_arr, obj, index);
  } else {
    debug && console.log("TRINI", obj);
    return obj;
  }
};

export default trini;

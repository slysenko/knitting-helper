export function setData(data: Record<string, any>, result: Record<string, any> = {}) {
  if (!data) {
    return data;
  }

  if (Array.isArray(data)) {
    result = data.map((el) => setData(el));
  } else if (data.constructor === Object) {
    Object.keys(data).forEach((key) => {
      let propName = key;
      if (propName in result) {
        propName = `__${propName}`;
      }
      result[propName] = setData(data[key]);
    });
  } else {
    result = data;
  }
  return result;
}

export default class Model<T extends Record<string, any>> {
  constructor(data = {} as T) {
    setData(data, this);
  }
}
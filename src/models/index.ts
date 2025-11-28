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

class ModelBase<T extends object> {
  constructor(data = {} as T) {
    Object.assign(this, data);
  }
}

type Model<T extends object> = ModelBase<T> & T;

const Model = ModelBase as new <T extends object>(data?: T) => Model<T>;

export default Model;
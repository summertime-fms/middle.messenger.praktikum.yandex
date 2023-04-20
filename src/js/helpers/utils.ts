type Indexed<T = unknown> = {
  [key in string]: T;
};

export function set(obj: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }
  if (Array.isArray(obj) || typeof obj !== 'object') {
    return obj;
  }

  let pathArr: string[] = path.split('.');
  pathArr.reduce((acc: any, item: string, index: number) => {
    if (pathArr.length - 1 != index) {
      acc[item] = {};
    } else {
      acc[item] = value
    }
    return acc[item]
  }, obj)

  return obj;
}

export const trim = (str: string, filter?: string): string  => {
  let filteredString = str.trim();

  if (filter) {
    const regEx = new RegExp(`^[${filter}]+|[${filter}]+$`, 'g');
    filteredString = filteredString.replace(regEx, '');
  }

  return filteredString;
}

export const isEqual = (x: any, y: any): boolean => {
  if (x === y) {
    return true;
  }
  else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
    if (Object.keys(x).length != Object.keys(y).length)
      return false;

    for (let prop in x) {
      if (y.hasOwnProperty(prop))
      {
        if (!isEqual(x[prop], y[prop]))
          return false;
      }
      else
        return false;
    }

    return true;
  }
  else
    return false;
}

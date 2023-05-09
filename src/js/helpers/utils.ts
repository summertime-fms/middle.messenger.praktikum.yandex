type Indexed<T = unknown> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (let p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p]!.constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);

  return merge(object as Indexed, result);
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

type propsObject = Record<string, unknown>;

export const getChangedProps = (a: propsObject, b: propsObject) => {
  return Object.keys(a).filter((key: string) =>  a[key] === b[key]);
}

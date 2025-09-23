interface OmitProps<T, K> {
  obj: T;
  keys: K[];
}

// Omit 'K[]' properties from an object of type 'T'
function omit<T extends object, K extends keyof T>(props: OmitProps<T, K>): Omit<T, K> {
  const newObj = { ...props.obj };
  for (const key of props.keys) {
    delete newObj[key];
  }
  return newObj;
}

export default omit;

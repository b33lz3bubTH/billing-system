type SchemaFields<T> = {
  [K in keyof T]: any;
};

export { SchemaFields };

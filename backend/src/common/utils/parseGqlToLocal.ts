export function convertArray<T, U>(array: T[], converter: (item: T) => U): U[] {
  return array.map(converter);
}

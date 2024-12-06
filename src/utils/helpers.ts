export function generateRandomInt(min: number = 1, max: number = 9999) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateCssVariables(
  object: Record<string, string> | null | undefined
) {
  return Object.entries(object || {}).reduce(
    (acc, [key, value]) => {
      acc[`--ga-${convertStringToKebap(key)}`] = value;
      return acc;
    },
    {} as Record<string, string | number>
  );
}

export function convertStringToKebap(string: string) {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function isAsync(func: (...args: any) => any): boolean {
  if (typeof func !== 'function') return false;
  // Check if the function is an async function
  if (func?.constructor?.name === 'AsyncFunction') return true;

  const result = func();
  return result instanceof Promise;
}

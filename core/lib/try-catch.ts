export function tryCatchAsync(
  fn: (...args: any[]) => Promise<any>,
  onError: (error: any) => any = error => {
    throw error;
  }
) {
  return (...args: any[]) => {
    return fn(...args).catch(onError);
  };
}

export function tryCatchSync(
  fn: (...args: any[]) => any,
  onError: (error: any) => any = error => {
    throw error;
  }
) {
  return (...args: any[]) => {
    try {
      return fn(...args);
    } catch (error) {
      onError(error);
    }
  };
}

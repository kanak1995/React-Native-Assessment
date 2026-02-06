// logger.ts
export const debugLog = (...args: any[]) => {
  if (__DEV__) {
    console.log(...args);
  }
};

export * from './handleFile';
export * from './trim';
export * from './yupSync';
export * from './formatTime';

export const validateNotOnlyWhitespace = (value: string | undefined | null): boolean => {
  return value ? value.trim().length > 0 : false;
};

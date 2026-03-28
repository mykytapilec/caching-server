type CacheEntry = {
  statusCode: number;
  headers: Record<string, any>;
  body: Buffer;
};

const cache = new Map<string, CacheEntry>();

export const getCache = (key: string): CacheEntry | undefined => {
  return cache.get(key);
};

export const setCache = (key: string, value: CacheEntry) => {
  cache.set(key, value);
};
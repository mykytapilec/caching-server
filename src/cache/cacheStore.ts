type CacheEntry = {
  statusCode: number;
  headers: Record<string, any>;
  body: Buffer;
  timestamp: number;
};

const cache = new Map<string, CacheEntry>();

const TTL = 60 * 1000;

export const getCache = (key: string): CacheEntry | undefined => {
  const entry = cache.get(key);

  if (!entry) return undefined;

  const isExpired = Date.now() - entry.timestamp > TTL;

  if (isExpired) {
    cache.delete(key);
    return undefined;
  }

  return entry;
};

export const setCache = (key: string, value: Omit<CacheEntry, 'timestamp'>) => {
  cache.set(key, {
    ...value,
    timestamp: Date.now(),
  });
};
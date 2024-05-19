import BrowserStore from './browser-store';
import MemoryStore from './memory-store';

export const generateKey = (clientId: string, namespace: string) => `${namespace}-${clientId}-token`;

export const createDefaultTokenStore = (clientId: string, secure: boolean | undefined) => {
  if (typeof document === 'object' && typeof document.cookie === 'string') {
    return new BrowserStore({clientId, secure});
  }
  return new MemoryStore();
}
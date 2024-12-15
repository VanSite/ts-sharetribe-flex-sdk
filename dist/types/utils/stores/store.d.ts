import BrowserStore from './browser-store';
import MemoryStore from './memory-store';
export declare const generateKey: (clientId: string, namespace: string) => string;
export declare const createDefaultTokenStore: (clientId: string, secure: boolean | undefined) => MemoryStore | BrowserStore;

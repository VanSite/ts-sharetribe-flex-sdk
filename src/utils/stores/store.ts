/**
 * Generates a unique key for storing tokens.
 *
 * @param clientId - The unique identifier for the client.
 * @param namespace - The namespace to organize and scope the key.
 * @returns A string combining the namespace, client ID, and a token suffix.
 */
export const generateKey = (clientId: string, namespace: string): string => {
  return `${namespace}-${clientId}-token`;
};

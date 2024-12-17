type ObjectQueryStringParam = Record<string, any>;

const serializeAttribute = (attribute: any) => {
  if (Array.isArray(attribute)) {
    return attribute.join(',');
  } else {
    return attribute;
  }
};

export const objectQueryString = (obj: ObjectQueryStringParam) => {
  // Simple runtime check to ensure obj is an object
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    console.warn("Params must be an object");
    // You could also throw an Error instead of just warning:
    // throw new Error("Params must be an object");
  }

  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}:${serializeAttribute(value)}`)
    .join(';');
};

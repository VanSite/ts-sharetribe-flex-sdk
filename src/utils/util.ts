import {z} from "zod";


const ObjectSchema = z.record(z.string(), z.any(), {
  message: "Params must be an object",
});

type ObjectQueryStringParam = z.infer<typeof ObjectSchema>;

const serializeAttribute = (attribute: any) => {
  ObjectSchema.parse(attribute);

  if (Array.isArray(attribute)) {
    return attribute.join(',');
  } else {
    return attribute
  }
};

export const objectQueryString = (obj: ObjectQueryStringParam) => {
  ObjectSchema.parse(obj);

  return Object.entries(obj)
    .filter(([key, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}:${serializeAttribute(value)}`)
    .join(';')
}
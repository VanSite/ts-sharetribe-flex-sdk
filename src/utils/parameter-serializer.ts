import UUID from '../sdkTypes/UUID';
import LatLng from '../sdkTypes/LatLng';
import LatLngBounds from '../sdkTypes/LatLngBounds';

const UNKNOWN_TYPE = 'unknown-type';

export const serializeValue = (value: any) => {
  let v: any;
  if (value instanceof UUID) {
    v = value.uuid;
  } else if (value instanceof LatLng) {
    v = `${value.lat},${value.lng}`;
  } else if (value instanceof LatLngBounds) {
    v = `${value.ne.lat},${value.ne.lng},${value.sw.lat},${value.sw.lng}`;
  } else if (Array.isArray(value)) {
    v = value.map(serializeValue);
  } else if (value instanceof Date) {
    v = value.toISOString();
  } else if (value === null) {
    v = value;
  } else if (typeof value !== 'object') {
    v = value;
  } else {
    throw new Error(UNKNOWN_TYPE);
  }
  return v
}

function parameterSerializer(params: Record<string, any>) {
  const serializedParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    serializedParams.append(key, serializeValue(value));
  })
  return serializedParams.toString();
}

export default parameterSerializer;
import Money from '../sdkTypes/Money';
import LatLng from '../sdkTypes/LatLng';
import LatLngBounds from '../sdkTypes/LatLngBounds';
import UUID from '../sdkTypes/UUID';
import SharetribeSdk from '../sdk';
import IntegrationSdk from "../integrationSdk";

/**
 * Converts a plain object with `amount` and `currency` to a `Money` instance.
 *
 * @param {Object} value - The value object containing amount and currency.
 * @param {number} value.amount - The monetary amount.
 * @param {string} value.currency - The currency code.
 * @returns {Money} A `Money` instance.
 */
export function convertToMoney(value: { amount: number, currency: string }): Money {
  return new Money(value.amount, value.currency);
}

/**
 * Converts a plain object with `lat` and `lng` to a `LatLng` instance.
 *
 * @param {Object} value - The value object containing latitude and longitude.
 * @param {number} value.lat - Latitude value.
 * @param {number} value.lng - Longitude value.
 * @returns {LatLng} A `LatLng` instance.
 */
export function convertToLatLng(value: { lat: number, lng: number }): LatLng {
  return new LatLng(value.lat, value.lng);
}

/**
 * Converts northeast and southwest coordinate objects to a `LatLngBounds` instance.
 *
 * @param {Object} ne - The northeast coordinates.
 * @param {number} ne.lat - Latitude value.
 * @param {number} ne.lng - Longitude value.
 * @param {Object} sw - The southwest coordinates.
 * @param {number} sw.lat - Latitude value.
 * @param {number} sw.lng - Longitude value.
 * @returns {LatLngBounds} A `LatLngBounds` instance.
 */
export function convertToLatLngBounds(ne: { lat: number, lng: number }, sw: { lat: number, lng: number }): LatLngBounds {
  return new LatLngBounds(ne, sw);
}

/**
 * Converts a string or Date object to a `Date` instance.
 *
 * @param {string|Date} value - The input value to convert.
 * @returns {Date} A `Date` instance.
 */
export function convertToDate(value: string | Date): Date {
  return new Date(value);
}

/**
 * Converts a value based on its key to the appropriate SDK type.
 *
 * @param {string} key - The key indicating the value's type.
 * @param {*} value - The value to convert.
 * @returns {*} The converted value or the original value if no conversion is needed.
 * @throws Will throw an error if the `id` key has an invalid value.
 */
export function convertTypes(key: string, value: any): any {
  if (value === null || value === undefined) {
    return value;
  }

  if (key === 'id') {
    if (typeof value === 'string') {
      return new UUID(value);
    }
    if (value instanceof Object) {
      if ('uuid' in value) {
        return new UUID(value.uuid);
      }
    }
    throw new Error('Invalid id');
  }
  if (['price', 'payinTotal', 'payoutTotal', 'lineTotal', 'unitPrice'].includes(key)) {
    return convertToMoney(value);
  }
  if (['start', 'end', 'displayStart', 'displayEnd', 'createdAt', 'at', 'expiresAt'].includes(key)) {
    return convertToDate(value);
  }

  if (['geolocation'].includes(key)) {
    return convertToLatLng(value);
  }

  if (value instanceof Object) {
    if (Object.keys(value).length === 2 && 'lat' in value && 'lng' in value) {
      return convertToLatLng(value);
    }
    if (Object.keys(value).length === 2 && 'ne' in value && 'sw' in value) {
      return convertToLatLngBounds(value.ne, value.sw);
    }
    if (Object.keys(value).length === 2 && 'amount' in value && 'currency' in value) {
      return convertToMoney(value);
    }
  }

  return value;
}

/**
 * Recursively converts all values in an object from SDK types to plain objects.
 *
 * @param {Object} value - The object to process.
 */
export function recursiveConvertToSdkTypes(value: { [key: string]: any }) {
  Object.keys(value).forEach(key => {
    if (value[key] instanceof Object) {
      recursiveConvertToSdkTypes(value[key]);
    }
    value[key] = convertTypes(key, value[key]);
  })
}

/**
 * Recursively converts all values in an object from SDK types to plain objects.
 *
 * @param {Object} value - The object to process.
 */
export function convertFromSdkTypes(value: any) {
  if (value === null || value === undefined) {
    return value;
  }

  if (value instanceof UUID) {
    return value.uuid;
  }

  if (value instanceof LatLng) {
    return {lat: value.lat, lng: value.lng};
  }

  if (value instanceof LatLngBounds) {
    return {ne: value.ne, sw: value.sw};
  }

  if (value instanceof Money) {
    return {amount: value.amount, currency: value.currency};
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
}

/**
 * Recursively converts all values in an object from SDK types to plain objects.
 *
 * @param {Object} value - The object to process.
 */
export function recursiveConvertFromSdkTypes(value: { [key: string]: any }) {
  Object.keys(value).forEach(key => {
    if (value[key] instanceof Object) {
      recursiveConvertFromSdkTypes(value[key]);
    }
    value[key] = convertFromSdkTypes(value[key]);
  })
}

/**
 * Recursively applies a handler function to all values in an object.
 *
 * @param {Object} value - The object to process.
 * @param {Function} handler - The handler function to apply.
 */
export function recursiveApplyHandler(value: { [key: string]: any }, handler: any) {
  Object.keys(value).forEach(key => {
    if (value[key] instanceof Object) {
      recursiveApplyHandler(value[key], handler);
    }
    value[key] = handler({key, value: value[key]});
  })
}

/**
 * Converts raw data into SDK-compatible types, applying type handlers if configured.
 *
 * @param {Object} data - The raw data to convert.
 * @param {SharetribeSdk|IntegrationSdk} sdk - The SDK instance to use.
 */
export function dataToType(data: any, sdk: SharetribeSdk | IntegrationSdk) {
  recursiveConvertToSdkTypes(data);

  const {typeHandlers} = sdk.sdkConfig

  if (typeHandlers) {
    typeHandlers.forEach(handler => {
      recursiveApplyHandler(data, ({key, value}: {key: string, value: any}) => {
        if (handler.sdkType && handler.appType && handler.reader) {
          // @ts-ignore
          if (value instanceof handler.sdkType) {
            return handler.reader!(value) as typeof handler.appType;
          } else {
            return value;
          }
        }

        if (handler.canHandle && handler.appType && handler.reader) {
          if (handler.canHandle({key, value})) {
            return handler.reader!(value) as typeof handler.appType;
          } else {
            return value;
          }
        }
      });
    })
  }
}

/**
 * Converts SDK-compatible types into plain data, applying type handlers if configured.
 *
 * @param {Object} data - The SDK-compatible data to convert.
 * @param {SharetribeSdk|IntegrationSdk} sdk - The SDK instance to use.
 */
export function typeToData(data: any, sdk: SharetribeSdk | IntegrationSdk) {
  recursiveConvertFromSdkTypes(data);

  const {typeHandlers} = sdk.sdkConfig

  if (typeHandlers) {
    typeHandlers.forEach(handler => {
      recursiveApplyHandler(data, ({key, value}: {key: string, value: any}) => {
        if (handler.sdkType && handler.appType && handler.writer) {
          if (value instanceof handler.appType) {
            return handler.writer!(value) as typeof handler.sdkType;
          }
        }

        if (handler.canHandle && handler.appType && handler.writer) {
          if (handler.canHandle({key, value})) {
            return handler.writer!(value) as typeof handler.sdkType;
          }
        }
      });
    })
  }
}
import Money from '../sdkTypes/Money';
import LatLng from '../sdkTypes/LatLng';
import LatLngBounds from '../sdkTypes/LatLngBounds';
import UUID from '../sdkTypes/UUID';
import SharetribeSdk from '../sdk';

export function convertToMoney(value: { amount: number, currency: string }): Money {
  return new Money(value.amount, value.currency);
}

export function convertToLatLng(value: { lat: number, lng: number }): LatLng {
  return new LatLng(value.lat, value.lng);
}

export function convertToLatLngBounds(ne: { lat: number, lng: number }, sw: {
  lat: number,
  lng: number
}): LatLngBounds {
  return new LatLngBounds(ne, sw);
}

export function convertToDate(value: string | Date): Date {
  return new Date(value);
}

export function convertTypes(key: string, value: any) {
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

export function recursiveConvertToSdkTypes(value: { [key: string]: any }) {
  Object.keys(value).forEach(key => {
    if (value[key] instanceof Object) {
      recursiveConvertToSdkTypes(value[key]);
    }
    value[key] = convertTypes(key, value[key]);
  })
}

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

export function recursiveConvertFromSdkTypes(value: { [key: string]: any }) {
  Object.keys(value).forEach(key => {
    if (value[key] instanceof Object) {
      recursiveConvertFromSdkTypes(value[key]);
    }
    value[key] = convertFromSdkTypes(value[key]);
  })
}

export function recursiveApplyHandler(value: { [key: string]: any }, handler: any) {
  Object.keys(value).forEach(key => {
    if (value[key] instanceof Object) {
      recursiveApplyHandler(value[key], handler);
    }
    value[key] = handler({key, value: value[key]});
  })
}


export function dataToType(data: any, sdk: SharetribeSdk) {
  recursiveConvertToSdkTypes(data);

  const {typeHandlers} = sdk.sdkConfig

  if (typeHandlers) {
    typeHandlers.forEach(handler => {
      recursiveApplyHandler(data, ({key, value}: {key: string, value: any}) => {
        if (handler.sdkType && handler.appType && handler.reader) {
          // @ts-ignore
          if (value instanceof handler.sdkType) {
            return handler.reader!(value) as typeof handler.appType;
          }
        }

        if (handler.canHandle && handler.appType && handler.reader) {
          if (handler.canHandle({key, value})) {
            return handler.reader!(value) as typeof handler.appType;
          }
        }
      });
    })
  }
}

export function typeToData(data: any, sdk: SharetribeSdk) {
  recursiveConvertFromSdkTypes(data);

  const {typeHandlers} = sdk.sdkConfig

  if (typeHandlers) {
    typeHandlers.forEach(handler => {
      recursiveApplyHandler(data, ({key, value}: {key: string, value: any}) => {
        if (handler.sdkType && handler.appType && handler.writer) {
          // @ts-ignore
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
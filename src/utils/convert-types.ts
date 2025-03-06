import Money from "../sdkTypes/Money";
import LatLng from "../sdkTypes/LatLng";
import LatLngBounds from "../sdkTypes/LatLngBounds";
import UUID from "../sdkTypes/UUID";
import BigDecimal from "../sdkTypes/BigDecimal";

/**
 * Converts a value based on its `_sdkType` property to the appropriate SDK type.
 * @param {*} value - The value to convert.
 * @returns {*} The converted value or the original value if no conversion is needed.
 */
export function toSdkTypes(
  value: any
): LatLng | LatLngBounds | UUID | Money | BigDecimal | any {
  const type = value && value._sdkType;

  switch (type) {
    case "LatLng":
      return new LatLng(value.lat, value.lng);
    case "LatLngBounds":
      return new LatLngBounds(value.ne, value.sw);
    case "UUID":
      return new UUID(value.uuid);
    case "Money":
      return new Money(value.amount, value.currency);
    case "BigDecimal":
      return new BigDecimal(value.value);
    default:
      return value;
  }
}

//
// JSON replacer
//
// Deprecated
//
// The _sdkType field is added to the type object itself,
// so the use of replacer is not needed. The function exists purely
// for backwards compatibility. We don't want to remove it in case
// applications are using it.
//
export const replacer = (key: string, value: any) => value;

//
// JSON reviver
//
export const reviver = (key: string, value: any) => toSdkTypes(value);

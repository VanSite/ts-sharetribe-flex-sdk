import {
  convertToMoney,
  convertToLatLng,
  convertToLatLngBounds,
  convertToDate,
  convertTypes,
  recursiveConvertToSdkTypes,
  recursiveConvertFromSdkTypes,
  recursiveApplyHandler,
  dataToType,
  typeToData,
} from "../../src/utils/convert-types";
import Money from "../../src/sdkTypes/Money";
import LatLng from "../../src/sdkTypes/LatLng";
import LatLngBounds from "../../src/sdkTypes/LatLngBounds";
import UUID from "../../src/sdkTypes/UUID";
import { TypeHandler } from "../../src/types/config";

// Mock SDK Configuration
const mockSdk = {
  sdkConfig: {
    typeHandlers: [] as TypeHandler<any, any>[],
  },
};

describe("Conversion Functions", () => {
  it("should convert to Money", () => {
    const result = convertToMoney({ amount: 1000, currency: "USD" });
    expect(result).toBeInstanceOf(Money);
    expect(result.amount).toBe(1000);
    expect(result.currency).toBe("USD");
  });

  it("should convert to LatLng", () => {
    const result = convertToLatLng({ lat: 40.7128, lng: -74.006 });
    expect(result).toBeInstanceOf(LatLng);
    expect(result.lat).toBe(40.7128);
    expect(result.lng).toBe(-74.006);
  });

  it("should convert to LatLngBounds", () => {
    const ne = { lat: 40.7128, lng: -74.006 };
    const sw = { lat: 34.0522, lng: -118.2437 };
    const result = convertToLatLngBounds(ne, sw);
    expect(result).toBeInstanceOf(LatLngBounds);
    expect(result.ne).toBeInstanceOf(LatLng);
    expect(result.sw).toBeInstanceOf(LatLng);

    // Type assertion to access LatLng properties
    const neLatLng = result.ne as LatLng;
    const swLatLng = result.sw as LatLng;

    expect(neLatLng.lat).toEqual(ne.lat);
    expect(neLatLng.lng).toEqual(ne.lng);
    expect(neLatLng.value).toEqual("40.7128,-74.006");
    expect(swLatLng.lat).toEqual(sw.lat);
    expect(swLatLng.lng).toEqual(sw.lng);
    expect(swLatLng.value).toEqual("34.0522,-118.2437");
  });

  it("should convert to Date", () => {
    const dateStr = "2020-01-01T00:00:00.000Z";
    const result = convertToDate(dateStr);
    expect(result).toBeInstanceOf(Date);
    expect(result.toISOString()).toBe(dateStr);
  });

  it("should convert types based on key", () => {
    const uuid = "550e8400-e29b-41d4-a716-446655440000";
    expect(convertTypes("id", uuid)).toBeInstanceOf(UUID);

    const moneyValue = { amount: 1000, currency: "USD" };
    expect(convertTypes("price", moneyValue)).toBeInstanceOf(Money);

    const dateStr = "2020-01-01T00:00:00.000Z";
    expect(convertTypes("start", dateStr)).toBeInstanceOf(Date);

    const latLngValue = { lat: 40.7128, lng: -74.006 };
    expect(convertTypes("geolocation", latLngValue)).toBeInstanceOf(LatLng);
  });
});

describe("Recursive Conversion Functions", () => {
  it("should recursively convert to SDK types", () => {
    const data = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      price: { amount: 1000, currency: "USD" },
      geolocation: { lat: 40.7128, lng: -74.006 },
      bounds: {
        ne: { lat: 40.7128, lng: -74.006 },
        sw: { lat: 34.0522, lng: -118.2437 },
      },
    };

    recursiveConvertToSdkTypes(data);

    expect(data.id).toBeInstanceOf(UUID);
    expect(data.price).toBeInstanceOf(Money);
    expect(data.geolocation).toBeInstanceOf(LatLng);
    expect(data.bounds).toBeInstanceOf(LatLngBounds);
  });

  it("should recursively convert from SDK types", () => {
    const data = {
      id: new UUID("550e8400-e29b-41d4-a716-446655440000"),
      price: new Money(1000, "USD"),
      geolocation: new LatLng(40.7128, -74.006),
      bounds: new LatLngBounds(
        { lat: 40.7128, lng: -74.006 },
        { lat: 34.0522, lng: -118.2437 }
      ),
    };

    recursiveConvertFromSdkTypes(data);

    expect(data.id).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(data.price).toEqual({ amount: 1000, currency: "USD" });
    expect(data.geolocation).toEqual({ lat: 40.7128, lng: -74.006 });
    expect(data.bounds).toEqual({
      ne: { lat: 40.7128, lng: -74.006 },
      sw: { lat: 34.0522, lng: -118.2437 },
    });
  });
});

describe("Handler Application Functions", () => {
  it("should apply handlers recursively", () => {
    const data = { id: new UUID("550e8400-e29b-41d4-a716-446655440000") };
    const handler = jest.fn(({ key, value }) =>
      value instanceof UUID ? value.uuid : value
    );

    recursiveApplyHandler(data, handler);

    expect(handler).toHaveBeenCalled();
    expect(data.id).toBe("550e8400-e29b-41d4-a716-446655440000");
  });
});

describe("integrationApi Tests", () => {
  it("should convert data to SDK types using dataToType", () => {
    const data = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      price: { amount: 1000, currency: "USD" },
      geolocation: { lat: 40.7128, lng: -74.006 },
    };

    // @ts-ignore
    dataToType(data, mockSdk);

    expect(data.id).toBeInstanceOf(UUID);
    expect(data.price).toBeInstanceOf(Money);
    expect(data.geolocation).toBeInstanceOf(LatLng);
  });

  it("should convert SDK types to data using typeToData", () => {
    const data = {
      id: new UUID("550e8400-e29b-41d4-a716-446655440000"),
      price: new Money(1000, "USD"),
      geolocation: new LatLng(40.7128, -74.006),
    };

    // @ts-ignore
    typeToData(data, mockSdk);

    expect(data.id).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(data.price).toEqual({ amount: 1000, currency: "USD" });
    expect(data.geolocation).toEqual({ lat: 40.7128, lng: -74.006 });
  });
});

describe("TypeHandler Tests", () => {
  it("should handle custom types correctly", () => {
    const data = {
      id: new UUID("550e8400-e29b-41d4-a716-446655440000"),
      price: new Money(1000, "USD"),
      geolocation: new LatLng(40.7128, -74.006),
    };

    const uuidHandler: TypeHandler<UUID, string> = {
      sdkType: UUID,
      appType: String,
      reader: (value: UUID) => value.toString(),
      writer: (value: string) => new UUID(value),
    };

    mockSdk.sdkConfig.typeHandlers = [uuidHandler];

    // @ts-ignore
    typeToData(data, mockSdk);

    expect(data.id).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(data.price).toEqual({ amount: 1000, currency: "USD" });
    expect(data.geolocation).toEqual({ lat: 40.7128, lng: -74.006 });
  });
});

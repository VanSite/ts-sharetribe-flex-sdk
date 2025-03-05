import UUID from "../../src/sdkTypes/UUID";
import parameterSerializer, {
  serializeValue,
} from "../../src/utils/parameter-serializer";
import LatLng from "../../src/sdkTypes/LatLng";
import LatLngBounds from "../../src/sdkTypes/LatLngBounds";

describe("serializeValue", () => {
  it("should serialize UUID", () => {
    const uuid = new UUID("550e8400-e29b-41d4-a716-446655440000");
    const result = serializeValue(uuid);
    expect(result).toBe("550e8400-e29b-41d4-a716-446655440000");
  });

  it("should serialize LatLng", () => {
    const latLng = new LatLng(40.7128, -74.006);
    const result = serializeValue(latLng);
    expect(result).toBe("40.7128,-74.006");
  });

  it("should serialize LatLngBounds", () => {
    const ne = { lat: 40.7128, lng: -74.006 };
    const sw = { lat: 34.0522, lng: -118.2437 };
    const latLngBounds = new LatLngBounds(ne, sw);
    const result = serializeValue(latLngBounds);
    expect(result).toBe("40.7128,-74.006,34.0522,-118.2437");
  });

  it("should serialize Date", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    const result = serializeValue(date);
    expect(result).toBe("2020-01-01T00:00:00.000Z");
  });

  it("should serialize Array", () => {
    const array = [
      new UUID("550e8400-e29b-41d4-a716-446655440000"),
      new LatLng(40.7128, -74.006),
    ];
    const result = serializeValue(array);
    expect(result).toEqual([
      "550e8400-e29b-41d4-a716-446655440000",
      "40.7128,-74.006",
    ]);
  });

  it("should serialize null", () => {
    const result = serializeValue(null);
    expect(result).toBeNull();
  });

  it("should serialize primitive values", () => {
    expect(serializeValue(123)).toBe(123);
    expect(serializeValue("test")).toBe("test");
    expect(serializeValue(true)).toBe(true);
  });

  it("should throw error for unknown type", () => {
    const unknownType = { some: "object" };
    expect(() => serializeValue(unknownType)).toThrowError("unknown-type");
  });
});

describe("parameterSerializer", () => {
  it("should serialize parameters", () => {
    const params = {
      id: new UUID("550e8400-e29b-41d4-a716-446655440000"),
      location: new LatLng(40.7128, -74.006),
      bounds: new LatLngBounds(
        { lat: 40.7128, lng: -74.006 },
        { lat: 34.0522, lng: -118.2437 }
      ),
      date: new Date("2020-01-01T00:00:00.000Z"),
      count: 5,
      name: "test",
      isActive: true,
    };

    const result = parameterSerializer(params);
    const expected =
      "id=550e8400-e29b-41d4-a716-446655440000&location=40.7128%2C-74.006&bounds=40.7128%2C-74.006%2C34.0522%2C-118.2437&date=2020-01-01T00%3A00%3A00.000Z&count=5&name=test&isActive=true";

    expect(result).toBe(expected);
  });
});

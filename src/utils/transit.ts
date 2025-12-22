/* eslint no-underscore-dangle: ["error", { "allow": ["_sdkType"] }] */

import {
  keyword,
  makeWriteHandler,
  map as transitMap,
  reader as transitReader,
  writer as transitWriter,
} from "transit-js";
import LatLng from "../sdkTypes/LatLng";
import UUID from "../sdkTypes/UUID";
import Money from "../sdkTypes/Money";
import BigDecimal from "../sdkTypes/BigDecimal";
import {TypeHandler} from "../types";
import {toSdkTypes} from "./convert-types";

// Type definitions for SDK types
type SdkTypeClass = any; // Using any to avoid complex type issues

// Helper functions to replace lodash
const identity = <T>(value: T): T => value;
const find = <T>(array: T[], predicate: (item: T) => boolean): T | undefined =>
  array.find(predicate);
const fromPairs = <T>(pairs: [string, T][]): Record<string, T> =>
  Object.fromEntries(pairs) as Record<string, T>;
const map = <T, R>(array: T[], callback: (item: T, index: number) => R): R[] =>
  array.map(callback);
const flatten = <T>(array: T[][]): T[] => array.flat();
const isObject = (value: any): boolean =>
  value !== null && typeof value === "object";
const entries = (obj: Record<string, any>): [string, any][] => {
  if (obj == null) {
    return [];
  }
  return Object.entries(obj);
};

// Define interfaces for reader and writer objects
export interface TransitReader {
  sdkType: SdkTypeClass;
  reader: (value: any) => any;
}

export interface TransitWriter {
  sdkType?: SdkTypeClass;
  appType?: any;
  canHandle?: (args: { key: string; value: any }) => boolean;
  writer: (value: any) => any;
}

const composeReader = (
  sdkTypeReader: TransitReader,
  appTypeReader: TransitReader | undefined
) => {
  const sdkTypeReaderFn = sdkTypeReader.reader;
  const appTypeReaderFn = appTypeReader ? appTypeReader.reader : identity;

  return (rep: any) => appTypeReaderFn(sdkTypeReaderFn(rep));
};

/**
 * Map from transit tags to SDK type classes.
 */
const typeMap: Record<string, SdkTypeClass> = {
  u: UUID,
  geo: LatLng,
  mn: Money,
  f: BigDecimal,
};

/**
 * Readers for SDK types.
 */
const sdkTypeReaders: TransitReader[] = [
  {
    sdkType: UUID,
    reader: (rep: string) => new UUID(rep),
  },
  {
    sdkType: LatLng,
    reader: ([lat, lng]: [number | string, number | string]) =>
      new LatLng(lat, lng),
  },
  {
    sdkType: Money,
    reader: ([amount, currency]: [number, string]) =>
      new Money(amount, currency),
  },
  {
    sdkType: BigDecimal,
    reader: (rep: string) => new BigDecimal(rep),
  },
];

/**
 * Writers for SDK types.
 */
const sdkTypeWriters: TransitWriter[] = [
  {
    sdkType: UUID,
    writer: (v: UUID) => v.uuid,
  },
  {
    sdkType: LatLng,
    writer: (v: LatLng) => [v.lat, v.lng],
  },
  {
    sdkType: Money,
    writer: (v: Money) => [v.amount, v.currency],
  },
  {
    sdkType: BigDecimal,
    writer: (v: BigDecimal) => v.value,
  },
];

/**
 * Construct read handlers for transit types. The handlers are constructed
 * from `appTypeReaders`, `sdkTypeReaders` and `typeMap`.
 */
const constructReadHandlers = (appTypeReaders: TransitReader[]) =>
  fromPairs(
    map(Object.entries(typeMap), ([tag, typeClass]) => {
      const sdkTypeReader = find(
        sdkTypeReaders,
        (r) => r.sdkType === typeClass
      );
      const appTypeReader = find(
        appTypeReaders,
        (r) => r.sdkType === typeClass
      );

      if (!sdkTypeReader) {
        throw new Error(`SDK type reader not found for tag: ${tag}`);
      }

      return [tag, composeReader(sdkTypeReader, appTypeReader)];
    })
  );

const writeHandlers = flatten(
  map(Object.entries(typeMap), ([tag, typeClass]) => {
    const sdkTypeWriter = find(sdkTypeWriters, (w) => w.sdkType === typeClass);

    if (!sdkTypeWriter) {
      throw new Error(`SDK type writer not found for tag: ${tag}`);
    }

    const handler = makeWriteHandler({
      tag: () => tag,
      rep: sdkTypeWriter.writer,
      stringRep: (v: any) => sdkTypeWriter.writer(v.toString()),
    });

    return [typeClass, handler];
  })
);

const mapBuilder = {
  init: () => ({}),
  add: (ret: Record<string, any>, key: string, val: any) => {
    ret[key] = val;
    return ret;
  },
  finalize: identity,
};

export const reader = (appTypeReaders: TransitReader[] = []) => {
  const handlers = constructReadHandlers(appTypeReaders);

  return transitReader("json", {
    handlers: {
      ...handlers,

      // Convert keyword to a string
      // This is a simplification. The API uses keywords, but we
      // can coerse strings to keywords, so it's ok to send strings
      // to the API when keywords is expected.
      ":": (rep: string) => rep,

      // Convert set to an array
      // The conversion loses the information that the
      // value was a set, but that's ok. The API uses sets, but we
      // can coerse arrays to sets, so it's ok to send arrays
      // to the API when set is expected.
      set: (rep: any[]) => rep,

      // Convert list to an array
      list: (rep: any[]) => rep,
    },
    mapBuilder,
  });
};

// Convert JS object to transit map
const MapHandlers = [
  Object,
  makeWriteHandler({
    tag: () => "map",
    rep: (v: any) =>
      entries(v).reduce((map: any, entry: [string, any]) => {
        const [key, val] = entry;
        map.set(keyword(key), val);
        return map;
      }, transitMap()),
    stringRep: (v: any) => JSON.stringify(v),
  }),
];

export const writer = (
  appTypeWriters: TransitWriter[] = [],
  opts: TransitOptions = {}
) => {
  const {verbose} = opts;
  const transitType = verbose ? "json-verbose" : "json";

  return transitWriter(transitType, {
    handlers: transitMap([...writeHandlers, ...MapHandlers]),

    // @ts-ignore - Adding custom properties to transit writer
    transform: (v: any) => {
      if (isObject(v)) {
        if (v._sdkType) {
          return toSdkTypes(v);
        }

        const appTypeWriter = find(
          appTypeWriters,
          (w) =>
            (w.appType && v instanceof w.appType) ||
            (w.canHandle && w.canHandle(v))
        );

        if (appTypeWriter && appTypeWriter.writer) {
          return appTypeWriter.writer(v);
        }
      }
      return v;
    },
    handlerForForeign: (x, handlers) => {
      if (Array.isArray(x)) {
        return handlers.get("array");
      }
      if (typeof x === "object") {
        return handlers.get("map");
      }

      return null;
    },
  });
};

export type TransitOptions = {
  verbose?: boolean;
  typeHandlers?: TypeHandler[];
};

export const createTransitConverters = (
  typeHandlers: TypeHandler[] = [],
  opts: TransitOptions = {}
) => {
  const {readers, writers} = typeHandlers.reduce<{
    readers: TransitReader[];
    writers: TransitWriter[];
  }>(
    (memo, handler) => {
      const r: TransitReader = {
        sdkType: handler.sdkType,
        reader: handler.reader!,
      };
      const w: TransitWriter = {
        sdkType: handler.sdkType,
        appType: handler.appType,
        canHandle: handler.canHandle,
        writer: handler.writer!,
      };

      memo.readers.push(r);
      memo.writers.push(w);

      return memo;
    },
    {readers: [], writers: []}
  );

  return {
    reader: reader(readers),
    writer: writer(writers, opts),
  };
};

export const read = (str: string, opts: TransitOptions = {}) => {
  const {typeHandlers = [], verbose = false} = opts;
  const {reader: r} = createTransitConverters(typeHandlers, opts);
  return r.read(str);
};

export const write = (data: any, opts: TransitOptions = {}) => {
  const {typeHandlers = [], verbose = false} = opts;
  const {writer: w} = createTransitConverters(typeHandlers, opts);
  return w.write(data);
};

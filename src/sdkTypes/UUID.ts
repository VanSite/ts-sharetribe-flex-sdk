/**
 * @fileoverview Provides the UUID class for handling universally unique identifiers (UUIDs).
 * This class allows for the creation and validation of UUIDs, using the `uuid` library.
 */

import {v4 as uuidv4, validate as uuidValidate} from "uuid";
import {SdkType} from "../types";

// Define a static class name
const UUID_SDK_TYPE = "UUID";

/**
 * Error thrown when an invalid UUID is provided.
 */
export class InvalidUUIDError extends Error {
  constructor(value: unknown) {
    super(`Invalid UUID: expected a valid UUID string, received ${typeof value === "string" ? `"${value}"` : typeof value}`);
    this.name = "InvalidUUIDError";
  }
}

/**
 * Class representing a UUID (Universally Unique Identifier).
 *
 * The UUID class ensures that a valid UUID is created or used, with the option to generate one if none is provided.
 */
class UUID implements SdkType {
  uuid: string;
  readonly _sdkType: typeof UUID_SDK_TYPE;

  /**
   * Creates an instance of the UUID class.
   *
   * @param {string} [uuid] - An optional UUID string. If not provided, a new UUID will be generated.
   * @throws {InvalidUUIDError} If the provided value is not a valid UUID string.
   * @example
   * const id = new UUID();
   * console.log(id.toString()); // Outputs a newly generated UUID.
   *
   * const predefinedId = new UUID('123e4567-e89b-12d3-a456-426614174000');
   * console.log(predefinedId.toString()); // Outputs: '123e4567-e89b-12d3-a456-426614174000'
   */
  constructor(uuid?: string) {
    this._sdkType = UUID_SDK_TYPE;

    if (uuid === undefined) {
      // Generate a new UUID if none provided
      this.uuid = uuidv4();
    } else if (typeof uuid !== "string") {
      throw new InvalidUUIDError(uuid);
    } else if (!uuidValidate(uuid)) {
      throw new InvalidUUIDError(uuid);
    } else {
      this.uuid = uuid;
    }
  }

  /**
   * Converts the UUID instance to its string representation.
   *
   * @returns {string} - The string representation of the UUID.
   * @example
   * const id = new UUID();
   * console.log(id.toString()); // Outputs the UUID as a string.
   */
  toString(): string {
    return this.uuid;
  }
}

// Default export for backward compatibility
export default UUID;

// Export the instance type
export type UUIDInstance = InstanceType<typeof UUID>;

/**
 * @fileoverview Provides the UUID class for handling universally unique identifiers (UUIDs).
 * This class allows for the creation and validation of UUIDs, using the `uuid` library.
 */

import { v4 as uuidv4 } from "uuid";
import { SdkType } from "../types/sdk-types";

// Define a static class name
const UUID_SDK_TYPE = "UUID";

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
   * @example
   * const id = new UUID();
   * console.log(id.toString()); // Outputs a newly generated UUID.
   *
   * const predefinedId = new UUID('123e4567-e89b-12d3-a456-426614174000');
   * console.log(predefinedId.toString()); // Outputs: '123e4567-e89b-12d3-a456-426614174000'
   */
  constructor(uuid?: string) {
    this._sdkType = UUID_SDK_TYPE;

    if (uuid !== undefined && typeof uuid !== "string") {
      console.warn("uuid must be a string");
      // If it's not a string, fallback to a generated UUID.
      this.uuid = uuidv4();
    } else {
      // Use the provided UUID or generate a new one.
      this.uuid = uuid || uuidv4();
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

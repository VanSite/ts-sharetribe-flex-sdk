/**
 * @fileoverview Provides the UUID class for handling universally unique identifiers (UUIDs).
 * This class allows for the creation and validation of UUIDs, using the `uuid` library.
 */
/**
 * Class representing a UUID (Universally Unique Identifier).
 *
 * The UUID class ensures that a valid UUID is created or used, with the option to generate one if none is provided.
 */
declare class UUID {
    uuid: string;
    readonly _sdkType: 'UUID';
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
    constructor(uuid?: string);
    /**
     * Converts the UUID instance to its string representation.
     *
     * @returns {string} - The string representation of the UUID.
     * @example
     * const id = new UUID();
     * console.log(id.toString()); // Outputs the UUID as a string.
     */
    toString(): string;
}
export default UUID;

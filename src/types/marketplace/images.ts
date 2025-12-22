/**
 * @fileoverview Type definitions for Images in the Sharetribe Marketplace API.
 */

import {ApiParameter, ExtraParameterType, UUID,} from "../sharetribe";

/**
 * Available endpoints
 */
export type ImagesEndpoints = "upload";

/**
 * Standard image variant names
 */
export type ImageVariantName =
  | "default"
  | "landscape-crop"
  | "landscape-crop2x"
  | "landscape-crop4x"
  | "landscape-crop6x"
  | "scaled-small"
  | "scaled-medium"
  | "scaled-large"
  | "scaled-xlarge"
  | "square-small"
  | "square-small2x"
  | "facebook"
  | "twitter";

/**
 * Image variant object
 */
export interface ImageVariant {
  width: number;
  height: number;
  url: string;
  name: ImageVariantName;
}

/**
 * Image resource
 */
export interface Image {
  id: UUID;
  type: "image";
  attributes: {
    variants: {
      [K in ImageVariantName]?: ImageVariant;
    } & {
      [key: string]: ImageVariant | undefined;
    };
  };
}

/**
 * Base request parameters
 */
export interface ImagesParameter extends ApiParameter {
}

/**
 * Upload endpoint parameters
 */
export interface ImagesUploadParameter extends ImagesParameter {
  image: File;
}

/**
 * Expand behavior
 */
type ExpandResult<EP extends ExtraParameterType | undefined> =
  EP extends { expand: true }
    ? Image
    : EP extends { expand: false }
      ? Omit<Image, "attributes">
      : Omit<Image, "attributes">;

/**
 * Response data per endpoint
 */
type ResponseData<
  E extends ImagesEndpoints,
  EP extends ExtraParameterType | undefined
> = E extends "upload" ? ExpandResult<EP> : never;

/**
 * Final response type
 */
export type ImagesResponse<
  E extends ImagesEndpoints = "upload",
  EP extends ExtraParameterType | undefined = undefined
> = {
  data: ResponseData<E, EP>;
};
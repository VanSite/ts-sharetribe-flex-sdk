/**
 * @fileoverview Type definitions for managing images in the Sharetribe Marketplace API.
 * These types define the structure for image parameters, responses, and variants.
 */

import {
  ApiParameter,
  ExtraParameter,
  ExtraParameterType,
  UUID,
} from "../sharetribe";

// Supported API endpoints for images operations.
export type ImagesEndpoints = "upload";

// Available image variant names.
export type ImageVariantNames =
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

// Image variant details.
export type ImageVariants = {
  height: number;
  width: number;
  url: string;
  name: ImageVariantNames;
};

// Image object structure.
export interface Image {
  id: UUID;
  type: "image";
  attributes: {
    variants: {
      [key in ImageVariantNames]?: ImageVariants;
    } & {
      [key: string]: ImageVariants | undefined; // Allows custom string keys for additional variants.
    };
  };
}

// Parameters for image-related operations.
export interface ImagesParameter extends ApiParameter {}

// Parameters for uploading an image.
export interface ImagesUploadParameter extends ImagesParameter {
  image: File;
}

// Expand the return type based on the expand parameter.
type ExpandReturnType<EP> = EP extends { expand: true }
  ? Image
  : EP extends { expand: false }
  ? Omit<Image, "attributes">
  : Omit<Image, "attributes">;

// Define the possible data type for images based on the endpoint and parameters.
type DataType<
  E extends ImagesEndpoints,
  EP extends ExtraParameter | undefined
> = E extends "upload" ? ExpandReturnType<EP> : never;

// Response structure for image-related endpoints.
export type ImagesResponse<
  E extends ImagesEndpoints,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, EP>;
};

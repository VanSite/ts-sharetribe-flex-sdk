/**
 * @fileoverview Type definitions for managing images in the Sharetribe Marketplace API.
 * These types define the structure for image parameters, responses, and variants.
 */
import { ApiParameter, ExtraParameter, ExtraParameterType, UUID } from '../sharetribe';
export type ImagesEndpoints = 'upload';
export type ImageVariantNames = 'default' | 'landscape-crop' | 'landscape-crop2x' | 'landscape-crop4x' | 'landscape-crop6x' | 'scaled-small' | 'scaled-medium' | 'scaled-large' | 'scaled-xlarge' | 'square-small' | 'square-small2x' | 'facebook' | 'twitter';
export type ImageVariants = {
    height: number;
    width: number;
    url: string;
    name: ImageVariantNames;
};
export interface Image {
    id: UUID;
    type: 'image';
    attributes: {
        variants: {
            [key in ImageVariantNames]?: ImageVariants;
        } & {
            [key: string]: ImageVariants | undefined;
        };
    };
}
export interface ImagesParameter extends ApiParameter {
}
export interface ImagesUploadParameter extends ImagesParameter {
    image: File;
}
type ExpandReturnType<EP> = EP extends {
    expand: true;
} ? Image : EP extends {
    expand: false;
} ? Omit<Image, 'attributes'> : Omit<Image, 'attributes'>;
type DataType<E extends ImagesEndpoints, EP extends ExtraParameter | undefined> = E extends 'upload' ? ExpandReturnType<EP> : never;
export type ImagesResponse<E extends ImagesEndpoints, EP extends ExtraParameterType = undefined> = {
    data: DataType<E, EP>;
};
export {};

/**
 * @fileoverview Type definitions for the file-sharing endpoints in the
 * Sharetribe Marketplace API: files, own_files, file_uploads, file_downloads,
 * and own_file_downloads.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#files
 */

import {ApiParameter, ExtraParameterType, UUID} from "../sharetribe";

/**
 * Lifecycle states a file moves through from upload to availability.
 */
export type FileState =
  | "pendingUpload"
  | "pendingVerification"
  | "available"
  | "verificationFailed";

/**
 * Result of a verification check performed on a file (e.g. malware scan).
 */
export interface FileVerificationCheck {
  type: string;
  result: string;
}

/**
 * A file resource.
 *
 * The Marketplace API (`files/show`) exposes only `name`, `size`, `state` and
 * `deleted`. The Integration API (`files/query`) additionally exposes the
 * verification and timestamp attributes marked below — hence they are optional.
 */
export interface File {
  id: UUID;
  type: "file";
  attributes: {
    name: string;
    size: number;
    state: FileState;
    deleted: boolean;
    /** Integration API only. */
    verificationChecks?: FileVerificationCheck[];
    /** Integration API only. */
    requiredVerificationChecks?: string[];
    /** Integration API only. */
    createdAt?: Date;
    /** Integration API only. */
    stateUpdatedAt?: Date;
  };
}

/**
 * A file owned by the current user.
 */
export interface OwnFile {
  id: UUID;
  type: "ownFile";
  attributes: {
    name: string;
    size: number;
    state: FileState;
    createdAt: Date;
    stateUpdatedAt: Date;
  };
}

/**
 * A signed upload instruction. The binary is PUT directly to `url` (outside
 * the Sharetribe API) using the provided `headers`.
 */
export interface FileUpload {
  id: UUID;
  type: "fileUpload";
  attributes: {
    fileId: UUID;
    method: string;
    url: string;
    headers: Record<string, string>;
    expiresAt: Date;
  };
}

/**
 * A signed download URL for a file accessed via a file attachment.
 */
export interface FileDownload {
  id: UUID;
  type: "fileDownload";
  attributes: {
    fileId: UUID;
    url: string;
    expiresAt: Date;
  };
}

/**
 * A signed download URL for a file owned by the current user.
 */
export interface OwnFileDownload {
  id: UUID;
  type: "ownFileDownload";
  attributes: {
    fileId: UUID;
    url: string;
    expiresAt: Date;
  };
}

/**
 * Expand behavior — applied to resource-returning create endpoints.
 */
type ExpandResult<T, EP extends ExtraParameterType | undefined> =
  EP extends { expand: true } ? T : Omit<T, "attributes">;

/**
 * files/show — fetch a file the current user can access.
 */
export interface FilesShowParameter extends ApiParameter {
  fileAttachmentId: UUID | string;
}

export type FilesShowResponse = { data: File };

/**
 * own_files/show — fetch a file owned by the current user.
 */
export interface OwnFilesShowParameter extends ApiParameter {
  id: UUID | string;
}

export type OwnFilesShowResponse = { data: OwnFile };

/**
 * own_files/create — register a new file owned by the current user. The
 * actual bytes are uploaded afterwards via file_uploads/create.
 */
export interface OwnFilesCreateParameter extends ApiParameter {
  name: string;
  mimeType: string;
  size: number;
}

export type OwnFilesCreateResponse<
  EP extends ExtraParameterType | undefined = undefined
> = { data: ExpandResult<OwnFile, EP> };

/**
 * file_uploads/create — obtain a signed URL to upload bytes for an own file.
 */
export interface FileUploadsCreateParameter extends ApiParameter {
  fileId: UUID | string;
}

export type FileUploadsCreateResponse = { data: FileUpload };

/**
 * file_downloads/create — obtain a signed download URL for a file accessed
 * via a file attachment.
 */
export interface FileDownloadsCreateParameter extends ApiParameter {
  fileAttachmentId: UUID | string;
}

export type FileDownloadsCreateResponse = { data: FileDownload };

/**
 * own_file_downloads/create — obtain a signed download URL for an own file.
 */
export interface OwnFileDownloadsCreateParameter extends ApiParameter {
  fileId: UUID | string;
}

export type OwnFileDownloadsCreateResponse = { data: OwnFileDownload };

/**
 * @fileoverview Type definitions for the file endpoints in the Sharetribe
 * Integration API: files/query and file_attachments/query.
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#files
 */

import {ApiMeta, ApiParameter, UUID} from "../sharetribe";
import {File} from "../marketplace/files";
import {User} from "../marketplace/user";
import {Marketplace} from "../marketplace/marketplace";
import {Message} from "../marketplace/messages";

/**
 * Scope controls who can access a file attachment. Only `public` is currently
 * documented by the API.
 */
export type FileAttachmentScope = "public";

/**
 * Links a file to a resource (e.g. a transaction message).
 */
export interface FileAttachment {
  id: UUID;
  type: "fileAttachment";
  attributes: {
    scope: FileAttachmentScope;
    deleted: boolean;
  };
  relationships?: {
    file: { data: { id: UUID; type: "file" } | null };
    /** Only present when the file is attached to a message. */
    message?: { data: { id: UUID; type: "message" } | null };
  };
}

/**
 * files/query — list files in the marketplace, filtered by owner.
 */
export interface FilesQueryParameter extends ApiParameter {
  ownerId?: UUID | string;
  include?: ("owner" | "marketplace")[];
}

export type FilesQueryResponse = {
  data: File[];
  included?: (User | Marketplace)[];
  meta: ApiMeta;
};

/**
 * file_attachments/query — list file attachments, filtered by message.
 */
export interface FileAttachmentsQueryParameter extends ApiParameter {
  messageId?: UUID | string;
  include?: ("file" | "message")[];
}

export type FileAttachmentsQueryResponse = {
  data: FileAttachment[];
  included?: (File | Message)[];
  meta: ApiMeta;
};

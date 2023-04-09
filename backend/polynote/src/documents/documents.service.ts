import { ExceptionFilter, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Document,
  DocumentDocument,
  LinkPermission,
} from './models/document.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document.name) private documentModel: Model<Document>,
  ) {}

  /** List documents for a list view */
  async listDocuments(userId: string): Promise<DocumentDocument[]> {
    return await this.documentModel.find(
      {
        owner: new mongoose.Types.ObjectId(userId),
      },
      {
        name: 1,
        path: 1,
        owner: 1,
      },
    );
  }

  /** Get the document from an id, either the real ID either the "proxy id" (link)
   * //TODO let's hope I do not have any ID collision
   */
  async getDocument(
    documentId: string,
    ownerId: string,
  ): Promise<DocumentDocument> {
    // Sign of a proxy link instead
    const filter: mongoose.FilterQuery<Document> = this.isProxyId(documentId)
      ? {
          sharableLinkId: documentId,
        }
      : {
          _id: new mongoose.Types.ObjectId(documentId),
          owner: ownerId,
        };

    return await this.documentModel.findOne(filter);
  }

  /** Delete the document, cannot delete from a "proxy id" */
  async deleteDocument(documentId: string, ownerId: string): Promise<void> {
    await this.documentModel.deleteOne({
      _id: documentId,
      owner: ownerId,
    });
  }

  /** Create a document linked to the current user */
  async createDocument(
    userId: string,
    documentName: string,
    filePath: string,
  ): Promise<DocumentDocument> {
    //FIXME there is no path validation on this end !!!
    return await this.documentModel.create({
      name: documentName,
      owner: new mongoose.Types.ObjectId(userId),
      path: filePath,
      sharableLinkPermission: 'READ',
      sharableLinkId: uuidv4(),
    });
  }

  /** Save the document data, as is.
   * You can save through the proxy ID, this requires the write permission
   * Could be done in a much better way
   */
  async saveDocument(
    documentId: string,
    ownerId: string,
    documentName: string,
    data: any,
  ) {
    const filter: mongoose.FilterQuery<Document> = this.isProxyId(documentId)
      ? {
          sharableLinkId: documentId,
          sharableLinkPermission: 'WRITE',
        }
      : {
          _id: documentId,
          owner: ownerId,
        };

    const result = await this.documentModel.updateOne(filter, {
      $set: {
        name: documentName,
        data: data,
      },
    });

    // Document without rights to be modified
    if (result.modifiedCount == 0) {
      throw new NotFoundException();
    }
  }

  /** Set the document permission to either READ/WRITE. Owners only */
  async setDocumentLinkPermission(
    ownerId: string,
    documentId: string,
    permission: LinkPermission,
  ) {
    const result = await this.documentModel.updateOne(
      {
        _id: documentId,
        owner: new mongoose.Types.ObjectId(ownerId),
      },
      {
        $set: {
          sharableLinkPermission: permission,
        },
      },
    );

    if (result.matchedCount == 0) {
      throw new NotFoundException();
    }
  }

  /** Enable looking for wether it is a shared link */
  isProxyId(id: string): boolean {
    return id.includes('-');
  }
}

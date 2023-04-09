import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/models/validatedUser';
import { DocumentsService } from './documents.service';
import { CreateDocumentBody } from './models/createDocumentBody';
import { DocumentDocument, LinkPermission } from './models/document.schema';
import { SaveDocumentBody } from './models/saveDocumentBody';
import { LinkPermissionPipe } from './pipes/permission.pipe';

@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createDocument(
    @Request() request: RequestUser,
    @Body() body: CreateDocumentBody,
  ): Promise<DocumentDocument> {
    return await this.documentsService.createDocument(
      request.user._id,
      body.name,
      body.path,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getUserDocuments(@Request() req: RequestUser) {
    return await this.documentsService.listDocuments(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async saveDocument(
    @Request() req: RequestUser,
    @Param('id') documentId: string,
    @Body() body: SaveDocumentBody,
  ) {
    return this.documentsService.saveDocument(
      documentId,
      req.user._id,
      body.name,
      body.data,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getDocument(
    @Request() req: RequestUser,
    @Param('id') documentId: string,
  ): Promise<DocumentDocument> {
    return await this.documentsService.getDocument(documentId, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id/share/permission/:permission')
  async setDocumentSharePermission(
    @Request() req: RequestUser,
    @Param('id') documentId: string,
    @Param('permission', LinkPermissionPipe) permission: LinkPermission,
  ) {
    await this.documentsService.setDocumentLinkPermission(
      req.user._id,
      documentId,
      permission,
    );
  }
}

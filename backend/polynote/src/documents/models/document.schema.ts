import { Type } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/models/users.schema';

export type LinkPermission = 'READ' | 'WRITE';

// Okay, maybe not a good move
export type DocumentDocument = HydratedDocument<Document>;

@Schema()
export class Document {
  @Prop({ required: true })
  name: string;

  //A file like string path
  @Prop({ required: true })
  path: string;

  // The tiptap json data. Can't say I have a precise schema for it, so string it is.
  @Prop()
  data: string;

  // TODO validation wouldn't kill to be honest
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  // As far as I understood, only one link is necessary, not many ones
  @Prop({ required: true, unique: true })
  sharableLinkId: string; // A string that gives read or write access

  @Prop({ required: true, enum: ['READ', 'WRITE'] })
  sharableLinkPermission: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);

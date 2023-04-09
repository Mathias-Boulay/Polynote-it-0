import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // TODO not required by the project for now, but what about a permission system ?

  @Prop({ required: true })
  emailValidated: boolean;

  // The validation ID is an obscure string chain sent with the email.
  @Prop({ unique: true })
  emailValidationId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

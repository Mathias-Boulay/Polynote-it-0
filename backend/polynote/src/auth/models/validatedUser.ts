import { Request } from 'express';
import { Types } from 'mongoose';

export class ValidatedUser {
  _id: string;
  email: string;
  emailValidated: boolean;
}

export type RequestUser = Request & {
  user: ValidatedUser;
};

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/users.schema';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private mailService: MailService,
  ) {}

  /** Validate the email of said user */
  async validateEmail(emailId: string) {
    const result = await this.userModel.updateOne(
      { emailValidationId: emailId, emailValidated: false },
      {
        $set: {
          emailValidated: true,
        },
      },
    );

    // TODO exception if there is nothing updated ?
    if (result.modifiedCount == 0) {
      console.warn('Email already validated !');
    }
  }

  /** Create a new user with the default settings */
  async createUser(username: string, email: string, password: string) {
    const emailValidationId = uuidv4();
    let userResult: UserDocument;
    try {
      userResult = await this.userModel.create({
        username,
        email,
        password: await this.hashPassword(password),
        emailValidated: false,
        emailValidationId: emailValidationId,
      });
    } catch (error) {
      // So, either we have a db issue, either the user exists already
      return new ConflictException(error, 'Conflict with another user');
    }

    await this.mailService.sendVerificationEmail(
      userResult.email,
      userResult.emailValidationId,
    );
  }

  /** Get a single user */
  async getUser(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email: email });
  }

  /** Hash the password, we don't need to see the real value */
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  /** Compare plain password to the hash equivalent */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

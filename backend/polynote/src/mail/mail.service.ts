import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MAIL_SENDER, MAIL_VERIFICATION_LINK_ROOT } from 'src/constants';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  /** Send an email for the user to verify his account */
  async sendVerificationEmail(email: string, verificationId: string) {
    await this.mailerService.sendMail({
      from: MAIL_SENDER,
      to: email,
      subject: 'Welcome to Polynotes !',
      template: './welcome',
      context: {
        username: email.split('@')[0],
        verificationLink: MAIL_VERIFICATION_LINK_ROOT + verificationId,
      },
    });
  }
}

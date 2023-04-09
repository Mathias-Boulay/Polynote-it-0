import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {
  MAIL_SENDER,
  MAIL_HOST,
  MAIL_USERNAME,
  MAIL_PASSWORD,
} from 'src/constants';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: MAIL_HOST,
        secure: false,
        auth: {
          user: MAIL_USERNAME,
          pass: MAIL_PASSWORD,
        },
      },
      defaults: {
        from: MAIL_SENDER,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {
  constructor() {
    console.log({
      MAIL_SENDER,
      MAIL_HOST,
      MAIL_USERNAME,
      MAIL_PASSWORD,
    });
  }
}

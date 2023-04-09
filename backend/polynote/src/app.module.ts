import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MONGO_CONNECTION_STRING } from './constants';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(MONGO_CONNECTION_STRING, {}),
    DocumentsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

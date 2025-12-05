import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { VerificationCode } from './entity/verification-code.entity';
import { VerificationController } from './controllers/verification-code.controller';
import { VerificationService } from './service/verification-code.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationCode]),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    }),
  ],
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}

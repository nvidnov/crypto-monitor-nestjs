import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { generateCode } from '../../../common/verification/verificationCode';

@Injectable()
export class VerificationService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);

  }
  async sendVerificationCode(email: string) {
    const code = generateCode()
    return await this.resend.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: email,
      subject: "Код подтверждения",
      html: `<p>Ваш код: <b>${code}</b></p>`,
    });
  }
}

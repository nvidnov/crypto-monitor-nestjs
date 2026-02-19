import { BadRequestException, Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateCode } from '../../../common/verification/verificationCode';
import { VerificationCode } from '../entity/verification-code.entity';

@Injectable()
export class VerificationService {
  private resend: Resend;

  constructor(
    @InjectRepository(VerificationCode)
    private repo: Repository<VerificationCode>,
  ) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendVerificationCode(email: string) {
    const code = generateCode()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 минут


    const record = this.repo.create({
      email,
      code,
      expiresAt,
      isUsed: false,
    });

    await this.repo.save(record);

    await this.resend.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: email,
      subject: "Код подтверждения",
      html: `<p>Ваш код: <b>${code}</b></p><br/>
              <p>Код действует 5 минут</p>
             `,
    });

    return { success: true };
  }
  // Проверка кода
  async verify(email: string, code: string) {
    const record = await this.repo.findOne({
      where: { email, code, isUsed: false },
    });

    if (!record) {
      throw new BadRequestException('Неверный код');
    }

    if (record.expiresAt < new Date()) {
      throw new BadRequestException('Код истёк');
    }

    record.isUsed = true;
    await this.repo.save(record);

    return { verified: true };
  }
}

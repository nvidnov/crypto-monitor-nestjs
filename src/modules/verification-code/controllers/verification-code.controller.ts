import { Controller, Post, Body } from '@nestjs/common';
import { VerificationService } from '../service/verification-code.service';

@Controller('verification')
export class VerificationController {
  constructor(private service: VerificationService) {}

  @Post('send')
  async send(@Body('email') email: string) {
    return this.service.sendVerificationCode(email);
  }

  @Post('check')
  async check(
    @Body('email') email: string,
    @Body('code') code: string
  ) {
    // return this.service.verify(email, code);
  }
}

import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { registerSchema, verifyOtpSchema } from "@onlyflags/shared";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body(new ZodValidationPipe(registerSchema)) body: any,
  ) {
    return this.authService.register(body);
  }

  @Post("otp/request")
  @HttpCode(HttpStatus.OK)
  async requestOtp(@Body("identifier") identifier: string) {
    return this.authService.requestOtp(identifier);
  }

  @Post("otp/verify")
  @HttpCode(HttpStatus.OK)
  async verifyOtp(
    @Body(new ZodValidationPipe(verifyOtpSchema)) body: any,
  ) {
    return this.authService.verifyOtp(body.identifier, body.code);
  }
}

import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/prisma.service";
import { RegisterInput } from "@onlyflags/shared";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(input: RegisterInput) {
    // Check uniqueness
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: input.email },
          { phone: input.phone },
          { nickname: input.nickname },
        ],
      },
    });

    if (existing) {
      if (existing.email === input.email) throw new ConflictException("Email already registered");
      if (existing.phone === input.phone) throw new ConflictException("Phone already registered");
      if (existing.nickname === input.nickname) throw new ConflictException("Nickname already taken");
    }

    // Create user + token balance + affiliate profile
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        phone: input.phone,
        nickname: input.nickname,
        gender: input.gender,
        age: input.age,
        bio: input.bio || null,
        tokenBalance: {
          create: { balance: 0, lifetimeEarned: 0 },
        },
        affiliateProfile: {
          create: {
            affiliateCode: `OF-${input.nickname}-${Math.random().toString(36).slice(2, 6)}`,
          },
        },
        shareStreak: {
          create: {},
        },
      },
      include: {
        tokenBalance: true,
        affiliateProfile: true,
      },
    });

    const token = this.generateToken(user.id, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        role: user.role,
        affiliateCode: user.affiliateProfile?.affiliateCode,
      },
      token,
    };
  }

  async requestOtp(identifier: string) {
    // In production: send OTP via Twilio (SMS) or SendGrid (email)
    // For now, return success — OTP will be "123456" in dev
    return { message: "OTP sent", identifier };
  }

  async verifyOtp(identifier: string, code: string) {
    // In production: verify OTP against cache (Redis)
    // Dev mode: accept "123456"
    if (code !== "123456") {
      throw new UnauthorizedException("Invalid OTP");
    }

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const token = this.generateToken(user.id, user.role);
    return {
      user: { id: user.id, email: user.email, nickname: user.nickname, role: user.role },
      token,
    };
  }

  private generateToken(userId: string, role: string) {
    return this.jwt.sign({ sub: userId, role });
  }
}

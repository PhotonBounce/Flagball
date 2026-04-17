import { Controller, Get, Put, Post, Body, Param, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { updateProfileSchema, profileSearchSchema } from "@onlyflags/shared";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@CurrentUser("id") userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Put("me")
  @UseGuards(JwtAuthGuard)
  async updateMyProfile(
    @CurrentUser("id") userId: string,
    @Body(new ZodValidationPipe(updateProfileSchema)) body: any,
  ) {
    return this.usersService.updateProfile(userId, body);
  }

  @Post("me/accept-tos")
  @UseGuards(JwtAuthGuard)
  async acceptTos(@CurrentUser("id") userId: string) {
    return this.usersService.acceptTos(userId);
  }

  @Get("search")
  @UseGuards(JwtAuthGuard)
  async searchProfiles(@Query(new ZodValidationPipe(profileSearchSchema)) query: any) {
    return this.usersService.searchProfiles(query);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getPublicProfile(@Param("id") id: string) {
    return this.usersService.getPublicProfile(id);
  }
}

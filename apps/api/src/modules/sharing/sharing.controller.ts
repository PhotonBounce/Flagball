import { Controller, Post, Get, Body, UseGuards, Request } from "@nestjs/common";
import { SharingService } from "./sharing.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";

@Controller("sharing")
@UseGuards(JwtAuthGuard)
export class SharingController {
  constructor(private sharingService: SharingService) {}

  @Post()
  async share(@Request() req: any, @Body() body: { contentType: string; contentId: string; platform: string }) {
    return this.sharingService.recordShare(req.user.id, body.contentType, body.contentId, body.platform);
  }

  @Get("streak")
  async getStreak(@Request() req: any) {
    return this.sharingService.getStreak(req.user.id);
  }

  @Get("history")
  async getHistory(@Request() req: any) {
    return this.sharingService.getShareHistory(req.user.id);
  }
}

import { Controller, Get, Post, Body, UseGuards, Request } from "@nestjs/common";
import { AffiliatesService } from "./affiliates.service";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";

@Controller("affiliates")
@UseGuards(JwtAuthGuard)
export class AffiliatesController {
  constructor(private affiliatesService: AffiliatesService) {}

  @Get("profile")
  async getProfile(@Request() req: any) {
    return this.affiliatesService.getProfile(req.user.id);
  }

  @Post("profile")
  async createProfile(@Request() req: any) {
    return this.affiliatesService.createOrGetProfile(req.user.id);
  }

  @Post("referral")
  async trackReferral(@Request() req: any, @Body() body: { referralCode: string }) {
    return this.affiliatesService.trackReferral(body.referralCode, req.user.id);
  }

  @Get("campaigns")
  async getCampaigns(@Request() req: any) {
    return this.affiliatesService.getCampaignLinks(req.user.id);
  }

  @Post("campaigns")
  async createCampaign(@Request() req: any, @Body() body: { name: string; utmSource: string }) {
    return this.affiliatesService.createCampaignLink(req.user.id, body.name, body.utmSource);
  }
}

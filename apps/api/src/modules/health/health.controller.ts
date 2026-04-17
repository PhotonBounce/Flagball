import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  check() {
    return {
      status: "ok",
      service: "OnlyFlags API",
      credits: "Design/Development by Photon-Bounce",
      timestamp: new Date().toISOString(),
    };
  }
}

import { Module } from "@nestjs/common";
import { FantasyService } from "./fantasy.service";
import { FantasyController } from "./fantasy.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [FantasyController],
  providers: [FantasyService],
})
export class FantasyModule {}

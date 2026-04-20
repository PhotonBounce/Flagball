import { Module } from "@nestjs/common";
import { PredictionsService } from "./predictions.service";
import { PredictionsController } from "./predictions.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [PredictionsController],
  providers: [PredictionsService],
})
export class PredictionsModule {}

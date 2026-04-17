import { Module } from "@nestjs/common";
import { NftsService } from "./nfts.service";
import { NftsController } from "./nfts.controller";
import { TokensModule } from "../tokens/tokens.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TokensModule, AuthModule],
  controllers: [NftsController],
  providers: [NftsService],
  exports: [NftsService],
})
export class NftsModule {}

// ============================================================
// OnlyFlags API — Entry Point
// Design/Development by Photon-Bounce
// ============================================================

import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_ORIGINS?.split(",") || ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global prefix
  app.setGlobalPrefix("api/v1");

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`
  ╔══════════════════════════════════════════════╗
  ║          🏈 OnlyFlags API v0.1.0            ║
  ║    Design/Development by Photon-Bounce       ║
  ║    Running on http://localhost:${port}           ║
  ╚══════════════════════════════════════════════╝
  `);
}
bootstrap();

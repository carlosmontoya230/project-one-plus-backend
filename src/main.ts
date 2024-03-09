import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import * as dotenv from "dotenv";

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3000;
  app.use((req, res, next) => {
    console.log("HAPPIER: ", req.method.toUpperCase(), req.originalUrl);
    return next();
  });
  await app.listen(port);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //si usamos whitelist: true,  en los Dtos
      forbidNonWhitelisted: true, //si usamos forbidNonWhitelisted: true,  en los Dtos
      transform: true, //si usamos transform: true,  en los Dtos
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://192.168.1.33:3000'], // Allow frontend origins
    credentials: true,
  });

  // Use global validation pipes
  app.useGlobalPipes(new ValidationPipe());

  // Start the server on port 3001
  await app.listen(3001);
}
bootstrap();
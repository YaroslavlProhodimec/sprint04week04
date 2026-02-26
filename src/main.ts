// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Убираем префикс для совместимости с тестами
  // app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const errorsMessages: { message: string; field: string }[] = [];
        
        for (const e of errors) {
          if (!e.constraints) continue;
          
          const constraintKeys = Object.keys(e.constraints);
          const constraintValues = Object.values(e.constraints);
          
          // Skip whitelist validation errors (non-whitelisted properties)
          const isWhitelistError = constraintKeys.includes('whitelistValidation') ||
            constraintValues.some((msg) => typeof msg === 'string' && msg.includes('should not exist'));
          
          if (isWhitelistError) continue;
          
          errorsMessages.push({
            message: constraintValues[0] as string,
            field: e.property,
          });
        }
        
        return new BadRequestException({ errorsMessages });
      },
    }),
  );

  await app.listen(3001);
  console.log('🚀 Сервер запущен на http://localhost:3001');
  console.log('   Маршруты: /blogs, /posts, /users, /testing/all-data');
}
 bootstrap();
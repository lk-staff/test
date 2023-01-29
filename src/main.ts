import { promises } from 'fs';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const PORT = +configService.get<number>('APP_PORT') || 3000;
  const pkg = JSON.parse(
    await promises.readFile(join('.', 'package.json'), 'utf8'),
  );

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion(pkg.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('api');

  await app.listen(PORT, () =>
    Logger.log(`App started on port: ${PORT}`, 'Bootstrap'),
  );
}
bootstrap();

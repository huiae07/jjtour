import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  Logger,
  VersioningType,
} from '@nestjs/common';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';
import { initSwagger } from './swagger.options';
import { validationPipe } from './common';
import { initializeTransactionalContext } from 'typeorm-transactional';
const { PORT } = process.env;

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  app
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .useGlobalPipes(validationPipe)
    .use(json({ limit: '50mb' }))
    .use(urlencoded({ limit: '50mb', extended: true }))
    .enableVersioning({
      type: VersioningType.URI,
    });

  app.enableCors({ exposedHeaders: ['Content-Disposition'] });

  initSwagger(app);
  await app.listen(PORT || 3000, () => {
    if (process.send) {
      process.send('ready');
    }
    logger.log(`✅ API Server is listening on ${PORT}`);
  });
}
bootstrap();

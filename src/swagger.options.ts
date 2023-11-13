import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthType } from './common';

export function initSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('API Server')
    .setDescription('API Server')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
      },
      JwtAuthType.USER,
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}

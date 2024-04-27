import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// import { FilterServiceException } from 'src/common/exceptions/controller/FilterServiceException';
import { ServiceExceptionFilter } from 'src/common/exceptions/service.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  

  app.setGlobalPrefix('api/v1');
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // transformOptions: { enableImplicitConversion: true },
    }),
  );

  // app.useGlobalFilters(new FilterServiceException());
  app.useGlobalFilters(new ServiceExceptionFilter());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('QuackHub')
    .setDescription('The Quack Hub API docs')
    .setVersion('1.0')
    .addTag('quack')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(8080);
}
bootstrap();

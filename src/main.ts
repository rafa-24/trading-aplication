import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  // Documentacion swagger
  const config = new DocumentBuilder()
    .setTitle('Trading aplication')
    .setDescription(
      'Aplicacion para registro de sentimiento y datos economicos de traders',
    )
    .setVersion('1.0')
    .addTag('trading')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();

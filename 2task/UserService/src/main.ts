import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata"
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('userService')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('userService')
    .build()
  const Document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, Document);
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

}
bootstrap();

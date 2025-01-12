import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger as NestLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.APP_PORT ?? 3000;
  const globalPrefix = 'api/v1';

  const url_frontend = process.env.URL_FRONTEND ?? '';
  const node_env = process.env.NODE_ENV;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: [url_frontend],
  });

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);

  NestLogger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix} (${node_env})`,
  );
}

bootstrap();

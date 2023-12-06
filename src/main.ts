import fastifyCookie from '@fastify/cookie';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import { AppModule } from './app.module';
import { winstonFactory } from './config/factory/winston.factory';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: WinstonModule.createLogger({ ...winstonFactory() }),
    },
  );
  const config = app.get(ConfigService);

  app.enableCors({
    origin: [
      config.get<string>('app.client') ?? '',
      'http://localhost:3000',
    ].filter((i) => i.length),
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
  });
  await app.register(fastifyCookie, {
    secret: config.get('cookie.secret'),
    parseOptions: {
      path: '/',
      signed: true,
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  });

  const doc = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('api', app, document);

  const is_dev = process.env.NODE_ENV === 'development';
  await app.listen(
    config.get<number>('port') ?? 3000,
    is_dev ? 'localhost' : '0.0.0.0',
  );
}

bootstrap();

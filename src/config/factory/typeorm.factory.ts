import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import DatabaseLogger from 'src/common/logger/db-logger';

export const typeormFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('database.host'),
  port: configService.get('database.port'),
  username: configService.get('database.username'),
  password: configService.get('database.password'),
  database: configService.get('database.database'),
  synchronize: true,
  autoLoadEntities: true,
  logging: process.env.NODE_ENV === 'development' ? true : false,
  logger: new DatabaseLogger(),
});

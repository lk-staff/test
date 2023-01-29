import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('TypeOrm');

const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'develop.sqlite',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/core/migrations/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  synchronize: false,
};

const dataSource: DataSource = new DataSource(dataSourceOptions);

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  ...dataSourceOptions,
  database: configService.get<string>('DATABASE_NAME'),
  logging: configService.get<boolean>('DATABASE_LOGGING'),
  logger: logger.log.bind(logger),
});

export default dataSource;

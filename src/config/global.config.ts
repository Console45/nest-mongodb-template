import { registerAs, ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

const env = process.env;

export interface GlobalConfig {
  databaseUrl: string;
}

const GlobalConfigSchema = Joi.object<GlobalConfig>({
  databaseUrl: Joi.string().required(),
});

export const globalConfig = registerAs('global', () => {
  const config = {
    databaseUrl: env.DATABASE_URL,
  } as GlobalConfig;
  const result = GlobalConfigSchema.validate(config, {
    allowUnknown: true,
    abortEarly: false,
  });
  if (result.error) {
    console.error('GlobalConfig Validation errors:');
    for (const v of result.error.details) {
      console.error(v.message);
    }
    throw new Error('Missing configuration options');
  }
  return config;
});

export const globalConfigOptions: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  load: [globalConfig],
};

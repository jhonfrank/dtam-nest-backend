import { NodeEnv } from 'src/context/common/enums/node-env.enum';

export function validateEnviroment(config: Record<string, string>) {
  const nodeEnv = config.NODE_ENV;

  if (!nodeEnv || !Object.values(NodeEnv).includes(nodeEnv as NodeEnv)) {
    throw new Error(`NODE_ENV has an invalid value: ${nodeEnv}`);
  }

  return config;
}

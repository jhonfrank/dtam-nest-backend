import { NODE_ENV } from 'src/context/shared/enums/node-env.enum';

export function validateEnviroment(config: Record<string, string>) {
  const node_env = config.NODE_ENV;

  if (!node_env || !Object.values(NODE_ENV).includes(node_env as NODE_ENV)) {
    throw new Error(`NODE_ENV has an invalid value: ${node_env}`);
  }

  return config;
}

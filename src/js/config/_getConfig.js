import LogUtil, { LOG_MESSAGE } from '../utils/logUtil';
import SandboxUtil from '../utils/sandboxUtil';

export default function getConfigForEnvironment(sandbox, configJSON) {
  let env;
  let localConfig;
  const sandboxUtil = new SandboxUtil(sandbox);
  try {
    env = sandboxUtil.getEnv() || 'dev';
    if (/perf-\w+/.test(env)) {
      env = 'perf';
    }
  } catch (error) {
    LogUtil.error(sandbox, LOG_MESSAGE.CONFIG_INIT_ERROR, error);
  }

  localConfig = configJSON.default;

  if (configJSON[env]) {
    localConfig = { ...localConfig, ...configJSON[env] };
  }

  localConfig.env = env;
  return localConfig;
}

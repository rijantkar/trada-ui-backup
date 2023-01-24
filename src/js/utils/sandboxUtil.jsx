export default class SandboxUtil {
  constructor(sandbox) {
    if (!sandbox) {
      throw new Error('must supply sandbox');
    }
    this.sandbox = sandbox;
  }

  getExtensionQBO() {
    return (
      this.sandbox && this.sandbox.extensions && this.sandbox.extensions.qbo
    );
  }

  getQBOContext() {
    return this.getExtensionQBO() && this.getExtensionQBO().context;
  }

  getEnv() {
    if (
      this.sandbox.appContext &&
      this.sandbox.appContext.getEnvironment &&
      this.sandbox.appContext.getEnvironment()
    ) {
      return this.sandbox.appContext.getEnvironment();
    }

    const qboEnvInfo = this.getQBOContext().getEnvironmentInfo();
    if (!qboEnvInfo) {
      return '';
    }

    return qboEnvInfo.environment;
  }
}

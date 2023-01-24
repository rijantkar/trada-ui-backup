import getConfigForEnvironment from './_getConfig';
import apiConfigJSON from '../../config/apiConfig.json';

export default (sandbox) => {
  return getConfigForEnvironment(sandbox, apiConfigJSON);
};

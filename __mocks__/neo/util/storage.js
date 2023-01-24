let tempHoldingObject = {};

export default {
  setItem: (key, value) => {
    tempHoldingObject[key] = value;
  },
  getItem: (key) => {
    return tempHoldingObject[key];
  },
  removeItemByCompanyId: (key) => {
    delete tempHoldingObject[key];
  },
  getItemByCompanyId: (key) => {
    return tempHoldingObject[key];
  },
  setItemByCompanyId: (key, value) => {
    tempHoldingObject[key] = value;
  },
  reset: () => {
    tempHoldingObject = {};
  },
};

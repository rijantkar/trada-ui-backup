// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars
export const injectIntl = (component) => component;
export const intlShape = () => ({
  isRequired: true,
});
export const FormattedMessage = ({ id }) => id;

export const createIntl = () => {};

export default {
  injectIntl,
  FormattedMessage,
  intlShape,
  createIntl,
};

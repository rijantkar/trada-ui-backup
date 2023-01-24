import { gapi } from 'gapi-script';

const productObject = {
  productId: 0,
  brandId: 0,
  brandName: '',
  brandDescription: '',
  productName: '',
  productCategory: '',
  productSubcategory: '',
  productImageURL: '',
  productURL: '',
  productDescription: '',
};

const getRandomRowNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const listProductTypes = async (sandbox) => {
  let response;
  let productTypes = [];
  const {
    spreadsheetId,
  } = sandbox.pluginConfig.extendedProperties.googleSpreadsheetConstants;
  try {
    // eslint-disable-next-line no-undef
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'ProductTypes!A:B',
    });

    if (response.result.values && response.result.values.length > 0) {
      productTypes = response.result.values.slice(1).reduce((acc, val) => {
        const [key, value] = val;
        acc.push({ productTypeId: key, productType: value });
        return acc;
      }, []);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
  return productTypes;
};
const getSingleProduct = async (sandbox, rowId) => {
  let response;
  let finalResult;
  let sheetMetaData;
  const {
    spreadsheetId,
  } = sandbox.pluginConfig.extendedProperties.googleSpreadsheetConstants;
  const searchParams = new URLSearchParams(window.location.search);
  let randomRowNumber;
  try {
    sheetMetaData = await gapi.client.sheets.spreadsheets.get({
      spreadsheetId,
      includeGridData: true,
    });
    // eslint-disable-next-line no-undef
    const {
      rowCount,
    } = sheetMetaData.result.sheets[0].properties.gridProperties;
    randomRowNumber = rowId || getRandomRowNumber(2, rowCount);
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `Products!A${randomRowNumber}:J${randomRowNumber}`,
    });

    if (response.result.values && response.result.values.length > 0) {
      const product = response.result.values[0];
      finalResult = Object.keys(productObject).reduce((acc, value, index) => {
        acc[value] = product[index];
        return acc;
      }, {});
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
  if (finalResult) {
    searchParams.set('rowId', randomRowNumber);
    const newRelativePathQuery = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    window.history.pushState(null, '', newRelativePathQuery);
  }
  return finalResult;
};

const saveProductClassification = async (sandbox, values) => {
  const {
    spreadsheetId,
  } = sandbox.pluginConfig.extendedProperties.googleSpreadsheetConstants;
  const params = {
    // The ID of the spreadsheet to update.
    spreadsheetId,
    // The A1 notation of a range to search for a logical table of data.
    // Values will be appended after the last row of the table.
    range: `Classifications!A:C`,
    // How the input data should be interpreted.
    valueInputOption: 'USER_ENTERED',
    // How the input data should be inserted.
    insertDataOption: 'INSERT_ROWS',
  };

  const valueRangeBody = {
    range: `Classifications!A:C`,
    majorDimension: 'COLUMNS',
    values,
  };

  const request = gapi.client.sheets.spreadsheets.values.append(
    params,
    valueRangeBody,
  );
  request.then(
    function (response) {
      // eslint-disable-next-line no-console
      console.error('response', response);
    },
    function (reason) {
      // eslint-disable-next-line no-console
      console.error(`error: ${reason.result.error.message}`);
    },
  );
};

const getEmailAddress = async () => {
  let emailResponse = '';
  try {
    emailResponse = await gapi.client.people.people.get({
      resourceName: 'people/me',
      pageSize: 1,
      personFields: 'emailAddresses',
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('response', err);
    return '';
  }
  const { emailAddresses } = emailResponse.result;
  if (!emailAddresses || emailAddresses.length === 0) {
    // eslint-disable-next-line no-console
    console.log('No email addresses found.');
    return '';
  }
  return emailAddresses[0].value;
};

export {
  listProductTypes,
  saveProductClassification,
  getEmailAddress,
  getSingleProduct,
  productObject,
};

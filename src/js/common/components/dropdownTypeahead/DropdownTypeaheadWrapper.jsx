import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import { prefetchedLazyComponent } from '@appfabric/plugin-utils/lib/context/lazy-react';
import TrieSearch from 'trie-search';

const DropdownTypeahead = prefetchedLazyComponent('@qbds/dropdown-typeahead');
const MenuItem = prefetchedLazyComponent(
  '@qbds/dropdown-typeahead',
  'MenuItem',
);

const trie = new TrieSearch('label', {
  ignoreCase: true,
  splitOnRegEx: /[\s/()&]/, // Split on '/' and '(' and ')' and whitespace
});
export const DropdownTypeaheadWrapper = (props) => {
  const dataList = props.dataSource;
  let suggestedText;
  const [blurred, setBlurred] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [showFullData, setShowFullData] = useState(true);
  const [typeValue, setTypeValue] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(true);

  useEffect(() => {
    // On initial load inputValue is undefined if there is no prefill value
    // Only in that case will this effect prefill the dropdown
    if (inputValue === undefined && props.value) {
      const prefillValue = dataList.find((item) => item.value === props.value);
      if (prefillValue) {
        setInputValue(prefillValue.label);
      }
    }
  }, [props.value, inputValue, dataList]);

  useEffect(() => {
    if (dataList) {
      trie.addAll(dataList);
    }
  }, []);

  useEffect(() => {
    if (!props.value || props.value === '') {
      setInputValue('');
      setInputValue();
      props.onChange('');
    }
  }, [props, props.value]);

  const stripReactProps = () => {
    const {
      triggerInvalid,
      isValid,
      resetValidation,
      alwaysRenderValidity,
      required,
      requiredText,
      ...domProps
    } = props;

    return domProps;
  };

  const getValueFromLabel = (label) => {
    if (!label) {
      return '';
    }
    const data = dataList.filter(
      (item) => item.label.toLowerCase() === label.toLowerCase(),
    );
    return data.length > 0 ? data[0].value : '';
  };

  const handleInputChange = (event) => {
    setShowFullData(false);
    setShowSuggestion(true);
    setInputValue(event.target.value);
    setTypeValue(event.target.value);
    if (props.value) {
      props.onChange(null);
    }
  };

  const handleRenderItem = (data) => {
    return <MenuItem value={data.value}>{data.label}</MenuItem>;
  };

  const handleClick = () => {
    setShowFullData(true);
  };

  const filterData = (data, _inputValue) => {
    if (!_inputValue) {
      return data;
    }
    return trie.search(_inputValue);
  };

  const handleChange = (e, { selectedItem }) => {
    if (!selectedItem.value || !selectedItem.label) {
      return;
    }
    setShowFullData(true);
    setShowSuggestion(false);
    setTypeValue('');
    setInputValue(selectedItem.label);
    props.onChange(selectedItem.value);
  };
  const handleKeyDown = (e, { highlightedItem }) => {
    const keyName = e.key;
    if (keyName === 'ArrowDown' || keyName === 'ArrowUp') {
      const data = filterData(dataList, e.target.value);
      const _inputValue = highlightedItem.label || '';
      setShowFullData(data.length === 0);
      setShowSuggestion(false);
      setInputValue(_inputValue);
    }
    if (keyName === 'Tab' && suggestedText) {
      e.preventDefault();
      const value = getValueFromLabel(suggestedText);
      setShowFullData(true);
      setShowSuggestion(false);
      setTypeValue('');
      setInputValue(suggestedText);
      props.onChange(value);
    }
  };
  const handleBlur = (e) => {
    const data = dataList.filter(
      (item) =>
        e.target.value &&
        item.label.toLowerCase() === e.target.value.toLowerCase(),
    );
    const value = data.length > 0 ? data[0].value : null;
    const _inputValue = value ? data[0].label : '';
    setBlurred(true);
    setShowFullData(true);
    setShowSuggestion(true);
    setTypeValue('');
    setInputValue(_inputValue);
    props.onChange(value);
  };

  const determineErrorMessage = () => {
    if (!props.value && !!props.required) {
      return props.requiredText;
    }

    return props.errorText;
  };

  const showValidation =
    !props.resetValidation &&
    !props.disabled &&
    (blurred || props.alwaysRenderValidity || props.triggerInvalid);

  const isInvalid = !props.isValid || props.triggerInvalid;

  const errorMessage = determineErrorMessage();
  const filteredDataList = showFullData
    ? dataList
    : filterData(dataList, typeValue);
  const firstItem = filteredDataList[0];
  suggestedText =
    showSuggestion &&
    typeValue &&
    firstItem &&
    firstItem.label &&
    firstItem.label.indexOf(typeValue) === 0
      ? firstItem.label
      : null;
  return (
    <DropdownTypeahead
      {...stripReactProps(props)}
      theme={props.idsTheme}
      width="100%"
      onBlur={handleBlur}
      className={classnames([props.className, 'ids-dropdown-wrapper-main'])}
      menuClass="mmo-dropdown-typeahead-menu"
      errorText={showValidation && isInvalid ? errorMessage : ''}
      autoComplete="disabled"
      renderItem={handleRenderItem}
      inputValue={inputValue}
      suggestedText={suggestedText}
      onChange={handleChange}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onSearch={handleInputChange}
      dataSource={filteredDataList}
    />
  );
};

DropdownTypeaheadWrapper.propTypes = {
  onChange: PropTypes.func,
  errorText: PropTypes.string,
  className: PropTypes.string,
  isValid: PropTypes.bool,
  resetValidation: PropTypes.bool,
  alwaysRenderValidity: PropTypes.bool,
  triggerInvalid: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  productType: PropTypes.string,
  required: PropTypes.bool,
  requiredText: PropTypes.string,
  idsTheme: PropTypes.string,
  dataSource: PropTypes.array,
};

DropdownTypeaheadWrapper.defaultProps = {
  className: '',
  isValid: false,
  resetValidation: false,
  alwaysRenderValidity: false,
  triggerInvalid: false,
  disabled: false,
  onChange: null,
  value: '',
  required: false,
  requiredText: '',
};

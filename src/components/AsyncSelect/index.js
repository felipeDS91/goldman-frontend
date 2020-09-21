import React, { useRef, useEffect, useState, useCallback } from 'react';
import Select from 'react-select/async';
import PropTypes from 'prop-types';

import { useField } from '@unform/core';

import { Wrapper } from './styles';

function customStyle() {
  return {
    valueContainer: provided => ({
      ...provided,
      marginTop: -3,
    }),
    control: provided => ({
      ...provided,
      height: 36,
      minHeight: 36,
      fontSize: '14px',
      cursor: 'pointer',
    }),
    input: provided => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      maxHeight: 26,
    }),
  };
}

export default function AsyncSelect({
  name,
  label,
  loadOptions,
  multiple,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [value, setValue] = useState('');

  const parseSelectValue = useCallback(
    selectRef => {
      if (multiple) {
        if (!selectRef.props.value) {
          return [];
        }
        return ref.selectRef.props.value.map(option => option.value.id);
      }
      if (!selectRef.props.value) {
        return '';
      }
      return selectRef.props.value.id;
    },
    [multiple]
  );

  useEffect(() => {
    if (defaultValue && !value) setValue(defaultValue);
  }, [defaultValue]); // eslint-disable-line

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      getValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [fieldName, registerField, multiple]); // eslint-disable-line

  return (
    <Wrapper>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <Select
        name={fieldName}
        isLoading={false}
        loadOptions={loadOptions}
        isMulti={multiple}
        ref={ref}
        getOptionLabel={option => option.title}
        getOptionValue={option => option.id}
        defaultValue={defaultValue}
        value={value}
        onChange={e => setValue(e)}
        noOptionsMessage={() => 'Nenhum registro encontrado'}
        loadingMessage={() => 'Carregando...'}
        styles={customStyle()}
        {...rest}
      />

      {error && <span>{error}</span>}
    </Wrapper>
  );
}

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  loadOptions: PropTypes.func.isRequired,
  label: PropTypes.string,
  multiple: PropTypes.bool,
};

AsyncSelect.defaultProps = {
  multiple: false,
  label: '',
};

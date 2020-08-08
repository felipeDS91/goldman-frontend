import React, { useRef, useEffect, useCallback } from 'react';
import Select from 'react-select';
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

export default function ReactSelect({
  name,
  label,
  options,
  multiple,
  ...rest
}) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const getValue = useCallback(
    ref => {
      if (multiple) {
        if (!ref.state.value) {
          return [];
        }
        return ref.state.value.map(option => option.id);
      }

      if (!ref.state.value) {
        return '';
      }

      return ref.state.value.id;
    },
    [multiple]
  );

  const getDefaultValue = useCallback(() => {
    if (!defaultValue) return null;

    if (!multiple) {
      return options.find(option => option.id === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }, [defaultValue, multiple, options]);

  useEffect(() => {
    if (defaultValue && !selectRef.current.select.props.value)
      selectRef.current.select.setValue(getDefaultValue());
  }, [defaultValue, getDefaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue,
    });
  }, [fieldName, registerField, getValue]);

  return (
    <Wrapper>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        name={fieldName}
        aria-label={fieldName}
        options={options}
        isMulti={multiple}
        placeholder="Selecione..."
        noOptionsMessage={() => 'Sem opção cadastrada'}
        defaultValue={getDefaultValue()}
        ref={selectRef}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        styles={customStyle()}
        {...rest}
      />

      {error && <span>{error}</span>}
    </Wrapper>
  );
}

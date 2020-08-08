import React, { useEffect, useRef, forwardRef, useMemo } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { Wrapper } from './styles';

const Input = forwardRef(({ name, label, mask, ...rest }, ref) => {
  if (!ref) ref = useRef(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'value',
        setValue(inputRef, value) {
          inputRef.setInputValue(value);
        },
        clearValue(inputRef) {
          inputRef.setInputValue('');
        },
      });
    }
  }, [fieldName, ref, registerField]);

  useEffect(() => {
    if (defaultValue && ref.current.setInputValue)
      ref.current.setInputValue(defaultValue);
  }, [defaultValue]); // eslint-disable-line

  const props = {
    ...rest,
    ref,
    id: fieldName,
    name: fieldName,
    'aria-label': fieldName,
    defaultValue,
    mask,
  };

  if (mask) props.maskChar = ' ';

  const renderInput = useMemo(() => {
    const InputComponent = mask ? InputMask : 'input';
    return <InputComponent {...props} />;
  }, [mask, props]);

  return (
    <Wrapper>
      {label && <label htmlFor={fieldName}>{label}</label>}
      {renderInput}
      {error && <span>{error}</span>}
    </Wrapper>
  );
});

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  mask: PropTypes.string,
};

Input.defaultProps = {
  label: null,
  mask: null,
};

export default Input;

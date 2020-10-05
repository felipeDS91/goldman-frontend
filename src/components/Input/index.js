import React, {
  useEffect,
  useRef,
  forwardRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { Wrapper } from './styles';

const Input = forwardRef(({ name, label, mask, ...rest }, ref) => {
  if (!ref) ref = useRef(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const [isFocused, setIsFocused] = useState(false);

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

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const props = {
    ...rest,
    ref,
    id: fieldName,
    name: fieldName,
    'aria-label': fieldName,
    defaultValue,
    mask,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  if (mask) props.maskChar = ' ';

  const renderInput = useMemo(() => {
    const InputComponent = mask ? InputMask : 'input';
    return <InputComponent {...props} />;
  }, [mask, props]);

  return (
    <Wrapper isFocused={isFocused}>
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

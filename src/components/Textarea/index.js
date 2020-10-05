import React, { useCallback, useEffect, useRef, useState } from 'react';
import Proptypes from 'prop-types';
import { useField } from '@unform/core';
import { Wrapper } from './styles';

export default function Textarea({ name, label, ...props }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'value',
      });
    }
  }, [fieldName, registerField]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Wrapper isFocused={isFocused}>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <textarea
        id={fieldName}
        name={fieldName}
        label={label}
        defaultValue={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={ref}
        {...props}
      />
      {error && <span>{error}</span>}
    </Wrapper>
  );
}

Textarea.propTypes = {
  name: Proptypes.string.isRequired,
  label: Proptypes.string,
};

Textarea.defaultProps = {
  label: null,
};

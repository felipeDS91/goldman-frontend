import React, { useEffect, useRef } from 'react';
import Proptypes from 'prop-types';
import { useField } from '@unform/core';
import { Wrapper } from './styles';

export default function Textarea({ name, label, ...props }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'value',
      });
    }
  }, [fieldName, registerField]);

  return (
    <Wrapper>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <textarea
        id={fieldName}
        name={fieldName}
        label={label}
        defaultValue={defaultValue}
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

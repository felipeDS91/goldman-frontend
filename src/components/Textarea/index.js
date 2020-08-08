import React, { useEffect, useRef } from 'react';
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
        id={name}
        name={name}
        label={label}
        defaultValue={defaultValue}
        ref={ref}
        {...props}
      />
      {error && <span>{error}</span>}
    </Wrapper>
  );
}

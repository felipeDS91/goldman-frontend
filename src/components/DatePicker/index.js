import React, { useRef, useEffect, useState } from 'react';
import { parseISO } from 'date-fns';
import ReactDatePicker, {
  registerLocale,
  setDefaultLocale,
} from 'react-datepicker';
import { useField } from '@unform/core';

import ptBR from 'date-fns/locale/pt-BR';
import { Wrapper } from './styles';

import CustomDate from './CustomDate';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({
  name,
  label,
  onChange,
  readOnly,
  ...props
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  registerLocale('ptBR', ptBR);
  setDefaultLocale('ptBR');

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  useEffect(() => {
    if (defaultValue && !selected) setSelected(parseISO(defaultValue));
  }, [defaultValue]); // eslint-disable-line

  return (
    <Wrapper>
      <label htmlFor={fieldName}>{label}</label>
      <ReactDatePicker
        dateFormat="dd/MM/yyyy"
        locale="ptBR"
        customInput={readOnly ? <CustomDate /> : null}
        name={fieldName}
        selected={selected}
        onChange={date => {
          if (onChange) onChange(date);
          setSelected(date);
        }}
        ref={ref}
        {...props}
      />
      {error && <span>{error}</span>}
    </Wrapper>
  );
}

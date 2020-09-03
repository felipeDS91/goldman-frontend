import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import { Radio, Wrapper } from './styles';

function RadioButton({ name, label, value, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'checked',
      });
    }
  }, [defaultValue, fieldName, registerField]);

  useEffect(() => {
    if (defaultValue && !selected) setSelected(defaultValue);
  }, [defaultValue]); // eslint-disable-line

  const props = {
    ref,
    id: value,
    name: fieldName,
    value,
    'aria-label': fieldName,
    type: 'radio',
    defaultChecked: selected,
    ...rest,
  };

  return (
    <Wrapper>
      <label htmlFor={value}>
        <Radio {...props} />
      </label>
      {error && <span>{error}</span>}
    </Wrapper>
  );
}

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

RadioButton.defaultProps = {
  label: null,
};

export default RadioButton;

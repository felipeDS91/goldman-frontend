import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import { CheckBox as Check, Wrapper } from './styles';

function CheckBox({ name, label, position, ...rest }) {
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

  const props = {
    ref,
    id: fieldName,
    name: fieldName,
    'aria-label': fieldName,
    type: 'checkbox',
    defaultChecked: selected,
    position,
    ...rest,
  };

  useEffect(() => {
    if (defaultValue && !selected) setSelected(defaultValue);
  }, [defaultValue]); // eslint-disable-line

  return (
    <Wrapper position={position}>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <Check {...props} />
      {error && <span>{error}</span>}
    </Wrapper>
  );
}

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  position: PropTypes.oneOf(['below', 'right']),
};

CheckBox.defaultProps = {
  label: null,
  position: 'below',
};

export default CheckBox;

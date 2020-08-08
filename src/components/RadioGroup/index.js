import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import { Radio, Wrapper } from './styles';

function RadioGroup({ name, label, options, onChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  function parseSelectValue(selectRef) {
    return selectRef.attributes.props
      ? selectRef.attributes.props.value
      : undefined;
  }

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'props.selected',
        getValue: parseSelectValue,
      });
    }
  }, [ref.current, fieldName]); // eslint-disable-line

  useEffect(() => {
    if (defaultValue && !selected) {
      if (defaultValue) setSelected(defaultValue);
      onChange && onChange(defaultValue);
    }
  }, [defaultValue]); // eslint-disable-line

  return (
    <Wrapper>
      <fieldset ref={ref} props={selected}>
        <legend>{label}</legend>
        <div
          onChange={e => {
            onChange && onChange(e.target.value);
            setSelected(e.target.value);
          }}
        >
          {options.map(item => (
            <label htmlFor={name + item.name} key={item.name}>
              <Radio
                id={name + item.name}
                checked={item.value === selected}
                onChange={() => {}}
                label={item.label}
                value={item.value}
                name={name}
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>

      {error && <span>{error}</span>}
    </Wrapper>
  );
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  label: null,
  onChange: () => {},
};

export default RadioGroup;

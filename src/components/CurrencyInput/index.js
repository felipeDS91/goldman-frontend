import { useField } from '@unform/core';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState, forwardRef, useRef } from 'react';
import Currency from 'react-currency-input';

import { Wrapper } from './styles';

const CurrencyInput = forwardRef(
  ({ name, label, prepend, append, ...rest }, ref) => {
    const { fieldName, registerField, defaultValue, error } = useField(name);
    const [curr, setCurr] = useState(defaultValue);

    if (!ref) ref = useRef(null);

    function parseSelectValue(selectRef) {
      return selectRef.props.value;
    }

    useEffect(() => {
      if (ref.current) {
        registerField({
          name: fieldName,
          ref: ref.current,
          getValue: parseSelectValue,
          path: 'props.value',
        });
      }
    }, [fieldName, ref, registerField]);

    useEffect(() => {
      if (defaultValue && !curr) setCurr(defaultValue);
    }, [curr, defaultValue]); // eslint-disable-line

    const props = {
      ...rest,
      ref,
      id: fieldName,
      name: fieldName,
      decimalSeparator: ',',
      thousandSeparator: '.',
      prefix: 'R$ ',
      'aria-label': fieldName,
    };

    const renderAppend = useMemo(() => {
      return (
        append && (
          <div className="append">{isFunction(append) ? append() : append}</div>
        )
      );
    }, [append]);

    const renderInput = useMemo(() => {
      if (prepend || append) {
        return (
          <div>
            {prepend && <input value={prepend} disabled />}
            <Currency
              onChangeEvent={(_, __, floatvalue) => {
                setCurr(floatvalue);
              }}
              value={curr}
              {...props}
            />
            {renderAppend}
          </div>
        );
      }

      return (
        <Currency
          onChangeEvent={(_, __, floatvalue) => {
            setCurr(floatvalue);
          }}
          value={curr}
          {...props}
        />
      );
    }, [prepend, append, curr, props, renderAppend]);

    return (
      <Wrapper>
        {label && <label htmlFor={fieldName}>{label}</label>}
        {renderInput}
        {error && <span>{error}</span>}
      </Wrapper>
    );
  }
);

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  prepend: PropTypes.string,
  append: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string,
};

CurrencyInput.defaultProps = {
  label: null,
  prepend: '',
  append: '',
};

export default CurrencyInput;

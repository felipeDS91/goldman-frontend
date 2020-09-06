import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function Fieldset({ label, children }) {
  return (
    <Wrapper>
      <fieldset>
        {label && <legend>{label}</legend>}
        <div>{children}</div>
      </fieldset>
    </Wrapper>
  );
}

Fieldset.propTypes = {
  label: PropTypes.string,
  children: PropTypes.element.isRequired,
};

Fieldset.defaultProps = {
  label: null,
};

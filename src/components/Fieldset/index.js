import React from 'react';

import { Wrapper } from './styles';

export default function Fieldset({ label, children }) {
  return (
    <Wrapper>
      <fieldset>
        <legend>{label}</legend>
        <div>{children}</div>
      </fieldset>
    </Wrapper>
  );
}

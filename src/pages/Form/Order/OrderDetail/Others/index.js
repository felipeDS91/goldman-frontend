import React from 'react';

import { Scope } from '@unform/core';
import { Input, CurrencyInput, Textarea } from '~/components';
import { Row, Column } from '~/styles/Default';

function Others({ index }) {
  return (
    <>
      <Scope path={`order_details[${index}]`}>
        <Row>
          <Column width="100%">
            <Input
              name="description"
              label="Descrição"
              placeholder="Descrição"
            />
          </Column>
          <Column width="20%">
            <Input type="number" step="any" name="amount" label="Quantidade" />
          </Column>
          <Column width="30%">
            <CurrencyInput name="value" label="Valor" />
          </Column>
        </Row>
        <Row>
          <Textarea name="observation" label="Observações" />
        </Row>
      </Scope>
    </>
  );
}

export default Others;

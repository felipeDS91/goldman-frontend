import React from 'react';

import { Scope } from '@unform/core';
import { Input, CurrencyInput, Textarea } from '~/components';
import { Row, Column } from '~/styles/Default';
import { useOrder } from '~/context/Order';

function Others({ index }) {
  const { calculateTotal } = useOrder();

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
            <CurrencyInput
              name="value"
              label="Valor"
              onKeyUp={calculateTotal}
            />
          </Column>
        </Row>
        <Row>
          <Textarea name="observation" label="Observações" rows="4" />
        </Row>
      </Scope>
    </>
  );
}

export default Others;

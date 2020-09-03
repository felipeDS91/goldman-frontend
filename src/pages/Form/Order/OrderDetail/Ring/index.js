import React, { useState, useEffect, useCallback } from 'react';

import { Scope } from '@unform/core';
import { Input, CurrencyInput, Textarea, Select } from '~/components';
import { Row, Column } from '~/styles/Default';
import Stone from '../Stone';
import api from '~/services/api';
import { useOrder } from '~/context/Order';

function Ring({ index }) {
  const [colors, setColors] = useState([]);
  const { calculateTotal } = useOrder();

  const loadColors = useCallback(async () => {
    const response = await api.get(`/colors`);

    const dataFormatted = response.data.docs.map(item => ({
      id: item.id,
      title: item.description,
    }));

    setColors(dataFormatted);
  }, []);

  useEffect(() => {
    loadColors();
  }, [loadColors]);

  return (
    <>
      <Scope path={`order_details[${index}]`}>
        <Row>
          <Column width="25%">
            <Input
              type="number"
              step="any"
              name="ring_size_1"
              label="Tamanho do aro"
              min="8"
              max="35"
            />
          </Column>
          <Column width="25%">
            <CurrencyInput
              name="value"
              label="Valor"
              onKeyUp={calculateTotal}
            />
          </Column>
          <Column width="50%">
            <Select name="id_color" label="Tonalidade" options={colors} />
          </Column>
        </Row>
        <Stone indexDetail={index} />
        <Row>
          <Textarea name="observation" label="Observações" rows="4" />
        </Row>
      </Scope>
    </>
  );
}

export default Ring;

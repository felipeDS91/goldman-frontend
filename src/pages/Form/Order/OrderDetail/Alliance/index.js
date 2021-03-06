import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Scope } from '@unform/core';
import { Input, CurrencyInput, Textarea, Select, CheckBox } from '~/components';
import { Row, Column } from '~/styles/Default';
import api from '~/services/api';
import Stone from '../Stone';
import { useOrder } from '~/context/Order';

function Alliance({ indexDetail }) {
  const [finishings, setFinishings] = useState([]);
  const [colors, setColors] = useState([]);
  const { calculateTotal } = useOrder();

  const loadFinishings = useCallback(async () => {
    const response = await api.get(`/finishings`);

    const dataFormatted = response.data.docs.map(item => ({
      id: item.id,
      title: item.description,
    }));

    setFinishings(dataFormatted);
  }, []);

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
    loadFinishings();
  }, [loadColors, loadFinishings]);

  return (
    <>
      <Scope path={`order_details[${indexDetail}]`}>
        <Row>
          <Column width="30%">
            <Input type="number" step="any" name="width" label="Largura" />
          </Column>
          <Column width="30%">
            <Input type="number" step="any" name="weight" label="Peso" />
          </Column>
          <Column width="25%">
            <CurrencyInput
              name="value"
              label="Valor"
              onKeyUp={calculateTotal}
            />
          </Column>
          <Column width="15%">
            <CheckBox name="anatomical" label="Anatômica" />
          </Column>
        </Row>
        <Row>
          <Column>
            <Input
              type="number"
              step="any"
              name="ring_size_1"
              label="Tamanho aro menor"
              min="8"
              max="35"
            />
          </Column>
          <Column>
            <Input
              type="number"
              step="any"
              name="ring_size_2"
              label="Tamanho aro maior"
            />
          </Column>
          <Column>
            <Input name="recording_1" label="Gravação aro menor" />
          </Column>
          <Column>
            <Input name="recording_2" label="Gravação aro maior" />
          </Column>
        </Row>
        <Row>
          <Column width="50%">
            <Select
              name="id_finishing"
              label="Formato externo"
              options={finishings}
            />
          </Column>
          <Column width="50%">
            <Select name="id_color" label="Tonalidade" options={colors} />
          </Column>
        </Row>
        <Stone indexDetail={indexDetail} />
        <Row>
          <Textarea name="observation" label="Observações" rows="4" />
        </Row>
      </Scope>
    </>
  );
}

export default Alliance;

Alliance.propTypes = {
  indexDetail: PropTypes.number.isRequired,
};

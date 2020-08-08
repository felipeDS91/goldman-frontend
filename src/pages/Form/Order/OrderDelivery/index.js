import React, { useState, useEffect } from 'react';

import { MdContentCopy } from 'react-icons/md';
import {
  RadioGroup,
  Collapsible,
  Address,
  Select,
  CurrencyInput,
} from '~/components';
import { Row, Column, Card, Button } from '~/styles/Default';
import api from '~/services/api';

const methods = [
  {
    name: 'loja',
    label: 'Retirada na loja',
    value: 'loja',
  },
  {
    name: 'transportadora',
    label: 'Transportadora',
    value: 'transportadora',
  },
  {
    name: 'motoboy',
    label: 'Motoboy',
    value: 'motoboy',
  },
];

export default function OrderDelivery({ formRef }) {
  const [data, setData] = useState({});
  const [carriers, setCarriers] = useState([]);
  const [freightTypes, setFreightTypes] = useState([]);

  async function loadCarriers() {
    const response = await api.get(`/carriers`);
    const dataFormatted = response.data.docs.map(item => ({
      id: item.id,
      title: item.name,
    }));
    setCarriers(dataFormatted);
  }

  async function copyAddress() {
    const id = formRef.current.getFieldValue('id_customer');
    if (!id) return;
    const result = await api.get(`/customers/${id}`);

    if (result) {
      const { data: customer } = result;

      formRef.current
        .getFieldRef('delivery_zip_code')
        .setInputValue(customer.zip_code);
      formRef.current.getFieldRef('delivery_state').value = customer.state;
      formRef.current.getFieldRef('delivery_city').value = customer.city;
      formRef.current.getFieldRef('delivery_neighborhood').value =
        customer.neighborhood;
      formRef.current.getFieldRef('delivery_address').value = customer.address;
      formRef.current.getFieldRef('delivery_number').value = customer.number;
      formRef.current.getFieldRef('delivery_complement').value =
        customer.complement;
    }
  }

  async function loadFreightTypes() {
    const response = await api.get(`/freight-types`);
    const dataFormatted = response.data.docs.map(item => ({
      id: item.id,
      title: item.description,
    }));
    setFreightTypes(dataFormatted);
  }

  useEffect(() => {
    loadCarriers();
    loadFreightTypes();

    // eslint-disable-next-line
  }, []);

  return (
    <Collapsible title="MÉTODO DE ENVIO">
      <Card>
        <Row>
          <Column width="100%">
            <RadioGroup
              name="delivery_type"
              options={methods}
              onChange={value => setData({ ...data, delivery_type: value })}
            />
          </Column>
        </Row>

        {data.delivery_type === 'transportadora' && (
          <>
            <Row>
              <Column>
                <Select
                  name="delivery_id_carrier"
                  label="Transportadora"
                  options={carriers}
                />
              </Column>
              <Column>
                <Select
                  name="delivery_id_freight_type"
                  label="Tipo de frete"
                  options={freightTypes}
                />
              </Column>
              <Column>
                <CurrencyInput name="delivery_value" label="Valor" />
              </Column>
              <Column width="130px">
                <Button
                  onClick={() => copyAddress()}
                  title="Copiar endereço do cadastro do cliente"
                >
                  <MdContentCopy size={16} color="#FFF" />
                </Button>
              </Column>
            </Row>
            <Address prefix="delivery_" />
          </>
        )}
        {data.delivery_type === 'motoboy' && (
          <>
            <Row>
              <Column width="100%">
                <CurrencyInput name="delivery_value" label="Valor" />
              </Column>
              <Column width="50px">
                <Button
                  onClick={() => copyAddress()}
                  title="Copiar endereço do cadastro do cliente"
                >
                  <MdContentCopy size={16} color="#FFF" />
                </Button>
              </Column>
            </Row>
            <Address />
            <Address prefix="delivery_" />
          </>
        )}
      </Card>
    </Collapsible>
  );
}

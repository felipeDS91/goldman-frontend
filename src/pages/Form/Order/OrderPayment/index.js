import React, { useState, useEffect } from 'react';
import { IoIosAdd, IoIosRemoveCircleOutline } from 'react-icons/io';

import { Scope } from '@unform/core';
import { CurrencyInput, Select, Collapsible, DatePicker } from '~/components';
import { DelDetail } from './styles';
import { Row, Column, Card, AddButton } from '~/styles/Default';
import api from '~/services/api';

export default function OrderPayment() {
  const [payments, setPayments] = useState([{ id: 0 }]);
  const [idItem, setIdItem] = useState(1);
  const [paymentTypes, setPaymentTypes] = useState([]);

  async function loadPaymentType() {
    const response = await api.get(`/payment-type`);
    const dataFormatted = response.data.docs.map(item => ({
      id: item.id,
      title: item.description,
    }));
    setPaymentTypes(dataFormatted);
  }

  async function addPayment() {
    setPayments([...payments, { ...payments, id: idItem }]);
    setIdItem(idItem + 1);
  }

  async function delPayment(idPayment) {
    setPayments(payments.filter(elem => elem.id !== idPayment));
  }

  useEffect(() => {
    loadPaymentType();

    // eslint-disable-next-line
  }, []);

  return (
    <Collapsible title="FORMA DE PAGAMENTO">
      {payments &&
        payments.map((detail, index) => {
          return (
            <Card key={detail.id}>
              <Scope path={`order_payments[${index}]`}>
                <Row>
                  <Column width="100%">
                    <Select
                      name="id_payment_type"
                      label="Tipo de pagamento"
                      placeholder="Selecione o tipo de pagamento"
                      options={paymentTypes}
                    />
                  </Column>

                  <Column width="40%">
                    <CurrencyInput name="value" label="Valor" />
                  </Column>
                  <Column width="40%">
                    <DatePicker label="Data" name="date" />
                  </Column>
                  <Column width="120px">
                    <DelDetail
                      type="button"
                      disabled={payments.length === 1}
                      onClick={() => delPayment(detail.id)}
                    >
                      <IoIosRemoveCircleOutline size={18} color="#ee4d64" />
                      REMOVER
                    </DelDetail>
                  </Column>
                </Row>
              </Scope>
            </Card>
          );
        })}

      <Row>
        <AddButton onClick={addPayment}>
          <IoIosAdd size={20} color="#FFF" />
          ADICIONAR PAGAMENTO
        </AddButton>
      </Row>
    </Collapsible>
  );
}

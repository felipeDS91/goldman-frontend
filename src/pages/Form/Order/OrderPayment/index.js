import React, { useState, useEffect } from 'react';
import { IoIosAdd, IoIosRemoveCircleOutline } from 'react-icons/io';

import { Scope } from '@unform/core';
import { CurrencyInput, Select, Collapsible, DatePicker } from '~/components';
import { DelDetail } from './styles';
import { Row, Column, Card, AddButton } from '~/styles/Default';
import api from '~/services/api';
import { useOrder } from '~/context/Order';

export default function OrderPayment() {
  const { order, setOrder, calculateTotal } = useOrder();
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
    setOrder({
      ...order,
      order_payments: [
        ...order.order_payments,
        {
          id:
            order.order_payments
              .map(elem => elem.id)
              .reduce((a, b) => Math.max(a, b)) + 1,
        },
      ],
    });
  }

  async function delPayment(idPayment) {
    setOrder({
      ...order,
      order_payments: order.order_payments.filter(
        elem => elem.id !== idPayment
      ),
    });
    calculateTotal();
  }

  useEffect(() => {
    loadPaymentType();

    // eslint-disable-next-line
  }, []);

  return (
    <Collapsible title="FORMA DE PAGAMENTO">
      {order.order_payments &&
        order.order_payments.map((detail, index) => {
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
                      disabled={order.order_payments.length === 1}
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

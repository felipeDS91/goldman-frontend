import React, { useEffect, useState, useCallback } from 'react';
import { IoMdPrint, IoIosSearch } from 'react-icons/io';
import {
  Form,
  Select,
  DatePicker,
  AsyncSelect,
  CurrencyInput,
  Input,
} from '~/components';
import Report from '~/components/Report';
import { formatDate, formatPrice } from '~/util/format';

import api from '~/services/api';

import { Container, Content, Filter, Total } from './styles';

import {
  TitlePage,
  PageHeader,
  Options,
  ViewButton,
  PrintButton,
  Row,
  Column,
} from '~/styles/Default';

const paymentStatus = [
  {
    id: 1,
    title: 'Pago',
  },
  {
    id: 0,
    title: 'Em aberto',
  },
];

const type = [
  {
    id: 1,
    title: 'Anel solitário',
  },
  {
    id: 2,
    title: 'Alianças',
  },
  {
    id: 3,
    title: 'Outros',
  },
];

const deliveryTypes = [
  {
    id: 1,
    title: 'Retirado na loja',
  },
  {
    id: 2,
    title: 'Transportadora',
  },
  {
    id: 3,
    title: 'Motoboy',
  },
];

export default function OrderReport() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState([]);
  const [users, setUsers] = useState([]);
  const [paymentType, setPaymentType] = useState([]);

  const loadStatus = useCallback(async () => {
    const response = await api.get(`/status`);

    const dataFormatted = response.data.docs.map(item => ({
      id: item.id,
      title: item.description,
    }));

    setStatus(dataFormatted);
  }, []);

  const loadUsers = useCallback(async () => {
    const response = await api.get(`/users`);

    const dataFormatted = response.data.docs.map(item => ({
      id: item.id,
      title: item.name,
    }));

    setUsers(dataFormatted);
  }, []);

  const loadPaymentType = useCallback(async () => {
    const response = await api.get(`/payment-type`);

    const dataFormatted = response.data.docs.map(item => ({
      id: item.id,
      title: item.description,
    }));

    setPaymentType(dataFormatted);
  }, []);

  useEffect(() => {
    loadStatus();
    loadPaymentType();
    loadUsers();
  }, [loadPaymentType, loadStatus, loadUsers]);

  const handleSubmit = useCallback(async filter => {
    const { data } = await api.get(`/orders-report`, {
      params: { filter },
    });

    const dataFormatted = data.map(item => ({
      ...item,
      date: formatDate(item.createdAt),
      subTotal: formatPrice(item.total - item.delivery_value),
      delivery_value: formatPrice(item.delivery_value),
      total: formatPrice(item.total),
    }));

    setOrders(dataFormatted);

    const sumTotal = await data.reduce(
      (acum, elem) => acum + (elem.total || 0),
      0
    );
    setTotal(formatPrice(sumTotal));
  }, []);

  const printOrder = useCallback(() => {
    window.print();
  }, []);

  const customerPromise = useCallback(value => {
    return value.length > 2
      ? api
          .get('/customers', {
            params: {
              q: value,
            },
          })
          .then(result =>
            result.data.docs.map(item => ({ id: item.id, title: item.name }))
          )
          .catch(() => [])
      : [];
  }, []);

  return (
    <Container>
      <PageHeader>
        <TitlePage>Relação de pedidos</TitlePage>
        <Options>
          <ViewButton type="submit" form="filter" background="#cccccc">
            <IoIosSearch size={26} color="#FFF" />
            VISUALIZAR
          </ViewButton>

          <PrintButton background="#ee4d64" onClick={printOrder}>
            <IoMdPrint size={26} color="#FFF" />
            IMPRIMIR
          </PrintButton>
        </Options>
      </PageHeader>

      <Filter>
        <Form id="filter" onSubmit={handleSubmit}>
          <Row>
            <TitlePage>Filtros</TitlePage>
          </Row>
          <Row>
            <Column>
              <AsyncSelect
                name="id_customer"
                label="Cliente"
                loadOptions={customerPromise}
                placeholder="Todos"
                isClearable
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Select
                name="id_user"
                label="Usuário"
                options={users}
                placeholder="Todos"
                multiple
                isClearable
              />
            </Column>
            <Column>
              <Select
                name="delivery_type"
                label="Método de envio"
                options={deliveryTypes}
                placeholder="Todos"
                multiple
                isClearable
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Select
                name="status"
                label="Status"
                placeholder="Todos"
                options={status}
                multiple
                isClearable
              />
            </Column>
            <Column>
              <Select
                name="paid"
                label="Situação"
                placeholder="Todos"
                options={paymentStatus}
                isClearable
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Select
                name="id_payment_type"
                label="Tipo de pagamento"
                placeholder="Todos"
                options={paymentType}
                multiple
                isClearable
              />
            </Column>
            <Column>
              <Select
                name="type"
                label="Tipo de Jóia"
                placeholder="Todos"
                options={type}
                multiple
                isClearable
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <DatePicker
                label="Data pedido inicial"
                name="order_initial_date"
                isClearable
              />
            </Column>
            <Column>
              <DatePicker
                label="Data pedido final"
                name="order_final_date"
                isClearable
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <DatePicker
                label="Data entrega inicial"
                name="delivery_initial_date"
                isClearable
              />
            </Column>
            <Column>
              <DatePicker
                label="Data entrega final"
                name="delivery_final_date"
                isClearable
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <CurrencyInput name="total_initial_value" label="Valor inicial" />
            </Column>
            <Column>
              <CurrencyInput name="total_final_value" label="Valor Final" />
            </Column>
          </Row>
          <Row>
            <Column>
              <Input name="observation" label="Observação (Contém)" />
            </Column>
          </Row>
        </Form>
      </Filter>

      <Content>
        <Report
          title="Relação de Pedidos"
          columns={
            <tr>
              <th width="20">Nº</th>
              <th width="100px">DATA</th>
              <th width="300px">CLIENTE</th>
              <th width="250px">STATUS</th>
              <th>VALOR</th>
            </tr>
          }
        >
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.customer.name}</td>
                <td>{order.status.description}</td>
                <td>{order.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" align="center">
                Nenhum registro encontrado.
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="5" align="center">
              <Total>Total {total}</Total>
            </td>
          </tr>
        </Report>
      </Content>
    </Container>
  );
}

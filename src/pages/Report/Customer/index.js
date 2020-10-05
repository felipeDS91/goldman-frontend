import React, { useEffect, useState, useCallback } from 'react';
import { IoMdPrint, IoIosSearch } from 'react-icons/io';
import { Form, Select, DatePicker, Input } from '~/components';
import Report from '~/components/Report';
import { formatDate } from '~/util/format';
import { getAllMonths } from '~/util/functions';

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

export default function CustomerReport() {
  const [customers, setCustomers] = useState([]);
  const [months, setMonths] = useState([]);
  const [cities, setCities] = useState([]);

  const loadCities = useCallback(async () => {
    const response = await api.get(`/cities`);
    const dataFormatted = response.data.map(item => ({
      id: item.city,
      title: item.city,
    }));
    setCities(dataFormatted);
  }, []);

  const loadMonths = useCallback(() => {
    const monthList = getAllMonths();

    const dataFormatted = monthList.map(item => ({
      id: item.number,
      title: item.name,
    }));

    setMonths(dataFormatted);
  }, []);

  useEffect(() => {
    loadMonths();
    loadCities();
  }, [loadCities, loadMonths]);

  const handleSubmit = useCallback(async filter => {
    const { data } = await api.get(`/customers-report`, {
      params: { filter },
    });

    const dataFormatted = data.map(item => ({
      ...item,
      birth_date: formatDate(item.birth_date),
    }));

    setCustomers(dataFormatted);
  }, []);

  const printOrder = useCallback(() => {
    window.print();
  }, []);

  return (
    <Container>
      <PageHeader>
        <TitlePage>Relação de clientes</TitlePage>
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
              <Select
                name="birthday_month"
                label="Mês de aniversário"
                options={months}
                placeholder="Todos"
                multiple
                isClearable
              />
            </Column>
            <Column>
              <Input
                type="number"
                step="any"
                name="birthday_day"
                label="Dia de aniversário"
                min="1"
                max="31"
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <DatePicker
                label="Data de cadastro inicial"
                name="register_initial_date"
                isClearable
              />
            </Column>
            <Column>
              <DatePicker
                label="Data de cadastro final"
                name="register_final_date"
                isClearable
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Select
                name="city"
                label="Cidade"
                options={cities}
                placeholder="Todas"
                multiple
                isClearable
              />
            </Column>
          </Row>
        </Form>
      </Filter>

      <Content>
        <Report
          title="Relação de Clientes"
          columns={
            <tr>
              <th width="70px">CÓDIGO</th>
              <th width="400px">NOME</th>
              <th width="120px">NASCIMENTO</th>
              <th width="350px">EMAIL</th>
              <th width="170px">CELULAR</th>
            </tr>
          }
        >
          {customers.length > 0 ? (
            customers.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.birth_date}</td>
                <td>{order.email}</td>
                <td>{order.cellphone}</td>
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
              <Total>Total: {customers.length}</Total>
            </td>
          </tr>
        </Report>
      </Content>
    </Container>
  );
}

import React, { useCallback, useEffect, useState } from 'react';
import { IoIosCheckmark } from 'react-icons/io';
import PropTypes from 'prop-types';

import { ApplyButton } from './styles';
import api from '~/services/api';

import { Form, Select, DatePicker, Modal } from '~/components';
import { Row, Column, TitlePage } from '~/styles/Default';

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

export default function Filters({ opened, setOpened, onApplyFilter }) {
  const [status, setStatus] = useState([]);

  const loadStatus = useCallback(async () => {
    const response = await api.get(`/status`);

    const dataFormatted = response.data.docs.map(item => ({
      id: item.id,
      title: item.description,
    }));

    setStatus(dataFormatted);
  }, []);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  const handleSubmit = useCallback(
    async sendData => {
      onApplyFilter(sendData);
      setOpened(false);
    },
    [onApplyFilter, setOpened]
  );

  return (
    <Modal isOpen={opened} onRequestClose={() => setOpened(false)}>
      <Form id="filter" onSubmit={handleSubmit}>
        <Row>
          <TitlePage>Filtros</TitlePage>
        </Row>
        <Row>
          <Select
            name="status"
            label="Status"
            placeholder="Status"
            options={status}
            multiple
            isClearable
          />
        </Row>
        <Row>
          <Select
            name="paid"
            label="Situação"
            placeholder="Todos"
            options={paymentStatus}
            isClearable
          />
        </Row>
        <Row>
          <Column>
            <DatePicker
              label="Data pedido inicial"
              name="initial_date"
              isClearable
            />
          </Column>
          <Column>
            <DatePicker
              label="Data pedido final"
              name="final_date"
              isClearable
            />
          </Column>
        </Row>
        <Row>
          <ApplyButton>
            <IoIosCheckmark size={26} color="#FFF" />
            APLICAR
          </ApplyButton>
        </Row>
      </Form>
    </Modal>
  );
}

Filters.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
};

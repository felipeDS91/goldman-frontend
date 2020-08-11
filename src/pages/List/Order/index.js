import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IoMdPrint } from 'react-icons/io';
import { Link } from 'react-router-dom';
import history from '~/services/history';

import { formatPrice, formatDateTime } from '~/util/format';
import { Pagination, Search, Table } from '~/components';
import { ToastSuccess, MessageError, ShowMessage } from '~/components/Message';
import api from '~/services/api';

import {
  TitlePage,
  PageHeader,
  Options,
  EditButton,
  PrintButton,
  RemoveButton,
} from '~/styles/Default';
import { Container } from './styles';

export default function ListOrders() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  async function loadData(searchBy, pageNumber = 1) {
    setLoading(true);

    try {
      const result = await api.get('/orders', {
        params: {
          page: pageNumber,
          q: searchBy,
        },
      });

      const { docs, ...info } = result.data;

      const dataFormatted = docs.map(item => ({
        ...item,
        total: formatPrice(item.total),
        createdAt: formatDateTime(item.createdAt),
      }));

      setData(dataFormatted);
      setPagination(info);
    } catch (error) {
      setData([]);
      setPagination({
        page: 1,
        pages: 1,
        total: 0,
      });
    }

    setLoading(false);
  }

  async function deleteRegister({ id }) {
    const confirm = await ShowMessage({
      title: `Deseja excluir o pedido nº ${id}?`,
      text: 'Essa operação não poderá ser revertida!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#EE4D64',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      focusCancel: true,
    });

    if (confirm.value) {
      try {
        await api.delete(`orders/${id}`);
        await loadData();
        ToastSuccess('Pedido excluído com sucesso!');
      } catch (error) {
        MessageError('Não foi possivel excluir o pedido!');
      }
    }
  }

  function handlePage(page) {
    loadData(search, page);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <PageHeader>
        <TitlePage>Gerenciando pedidos</TitlePage>
        <Options>
          <Link to="/order">
            <FiPlus size={20} color="#FFF" />
            CADASTRAR
          </Link>
          <Search
            loadData={loadData}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Options>
      </PageHeader>
      <Table
        loading={loading}
        pagination={<Pagination info={pagination} handlePage={handlePage} />}
      >
        <thead>
          <tr>
            <th width="5%">Nº</th>
            <th width="30%">CLIENTE</th>
            <th width="20%">STATUS</th>
            <th width="20%">DATA</th>
            <th width="130px">VALOR</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer.name}</td>
                <td>{order.status.description}</td>
                <td>{order.createdAt}</td>
                <td align="center">{order.total}</td>
                <td align="center">
                  <PrintButton
                    onClick={() => history.push(`/print-order/${order.id}`)}
                    title="Imprimir pedido"
                    background="#EFEFEF"
                  >
                    <IoMdPrint size={20} color="#ee4d64" />
                  </PrintButton>
                </td>
                <td align="center">
                  <EditButton to={`/order/${order.id}`}>editar</EditButton>
                </td>
                <RemoveButton onClick={() => deleteRegister(order)}>
                  apagar
                </RemoveButton>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" align="center">
                Nenhum registro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

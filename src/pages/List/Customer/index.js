import React, { useEffect, useState, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { formatCPF } from '~/util/format';
import { Pagination, Search, Table } from '~/components';
import { ToastSuccess, MessageError, ShowMessage } from '~/components/Message';
import api from '~/services/api';

import { Container } from './styles';

import {
  TitlePage,
  PageHeader,
  Options,
  EditButton,
  RemoveButton,
} from '~/styles/Default';

export default function ListCustomers() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const loadData = useCallback(async (searchBy, pageNumber = 1) => {
    setLoading(true);

    try {
      const result = await api.get('/customers', {
        params: {
          page: pageNumber,
          q: searchBy,
        },
      });

      const { docs, ...info } = result.data;

      const dataFormatted = docs.map(item => ({
        ...item,
        cpf: formatCPF(item.cpf),
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
  }, []);

  const deleteRegister = useCallback(
    async ({ id, name }) => {
      const confirm = await ShowMessage({
        title: `Deseja excluir o cliente ${name}?`,
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
          await api.delete(`customers/${id}`);
          await loadData();
          ToastSuccess('Cliente excluído com sucesso!');
        } catch (error) {
          MessageError('Não foi possivel excluir o cliente!');
        }
      }
    },
    [loadData]
  );

  const handlePage = useCallback(
    page => {
      loadData(search, page);
    },
    [loadData, search]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Container>
      <PageHeader>
        <TitlePage>Gerenciando clientes</TitlePage>
        <Options>
          <Link to="/customer">
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
            <th width="35%">NOME</th>
            <th width="30%">E-MAIL</th>
            <th width="130px">CPF</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td align="center">{customer.cpf}</td>
                <td align="center">
                  <EditButton to={`/customer/${customer.id}`}>
                    editar
                  </EditButton>
                </td>
                <RemoveButton onClick={() => deleteRegister(customer)}>
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

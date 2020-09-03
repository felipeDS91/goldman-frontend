import React, { useEffect, useState, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Pagination, Search, Table } from '~/components';
import { ToastSuccess, MessageError, ShowMessage } from '~/components/Message';
import api from '~/services/api';

import {
  TitlePage,
  PageHeader,
  Options,
  EditButton,
  RemoveButton,
} from '~/styles/Default';
import { Container } from './styles';

export default function ListPaymentType() {
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
      const result = await api.get('/payment-type', {
        params: {
          page: pageNumber,
          q: searchBy,
        },
      });

      const { docs, ...info } = result.data;

      setData(docs);
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
    async ({ id, description }) => {
      const confirm = await ShowMessage({
        title: `Deseja excluir o registro ${description}?`,
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
          await api.delete(`payment-type/${id}`);
          await loadData();
          ToastSuccess('Registro excluído com sucesso!');
        } catch (error) {
          MessageError('Não foi possivel excluir o registro!');
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
        <TitlePage>Gerenciando tipo de pagamento</TitlePage>
        <Options>
          <Link to="/payment-type">
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
            <th width="100%">DESCRIÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map(item => (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td align="center">
                  <EditButton to={`/payment-type/${item.id}`}>
                    editar
                  </EditButton>
                </td>
                <RemoveButton onClick={() => deleteRegister(item)}>
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

import React, { useEffect, useState } from 'react';
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

export default function ListUsers() {
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
      const result = await api.get('/users', {
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
  }

  async function deleteRegister({ id, name }) {
    const confirm = await ShowMessage({
      title: `Deseja excluir o usuário ${name}?`,
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
        await api.delete(`users/${id}`);
        await loadData();
        ToastSuccess('Usuário excluído com sucesso!');
      } catch (error) {
        MessageError('Não foi possivel excluir o usuário!');
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
        <TitlePage>Gerenciando usuários</TitlePage>
        <Options>
          <Link to="/user">
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
            <th width="38%">NOME</th>
            <th width="30%">E-MAIL</th>
            <th width="60px">ADMINISTRADOR</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td align="center">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={item.profile_admin}
                  />
                </td>
                <td align="center">
                  <EditButton to={`/user/${item.id}`}>editar</EditButton>
                </td>
                <RemoveButton onClick={() => deleteRegister(item)}>
                  apagar
                </RemoveButton>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" align="right">
                Nenhum registro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

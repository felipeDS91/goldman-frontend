import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  HeaderRow,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  Title,
  TableWrapper,
} from './styles';
import logo from '~/assets/logo-2.svg';
import { formatCNPJ, formatDate } from '~/util/format';
import api from '~/services/api';

export default function Report({ children, columns, title }) {
  const [company, setCompany] = useState({});
  const totColumns = columns.props.children.length;

  const actualDate = useCallback(() => {
    return formatDate(new Date());
  }, []);

  const loadCompany = useCallback(async () => {
    const { data } = await api.get(`/company`);

    const dataFormatted = {
      ...data,
      cnpj: formatCNPJ(data.cnpj),
    };

    setCompany(dataFormatted);
  }, []);

  useEffect(() => {
    loadCompany();
  }, [loadCompany]);

  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            <td colSpan={totColumns} align="center">
              <Header>
                <HeaderLeft>
                  <img src={logo} alt="GOLDMAN" />
                </HeaderLeft>
                <HeaderCenter>
                  <HeaderRow style={{ fontWeight: 'bold', fontSize: '16px' }}>
                    {company.fantasy_name}
                  </HeaderRow>
                  <HeaderRow>{`CNPJ: ${company.cnpj}`}</HeaderRow>
                  <HeaderRow>{`${company.address} nº${company.number}`}</HeaderRow>
                  <HeaderRow>{`${company.zip_code} - ${company.neighborhood} - ${company.city} - ${company.state}`}</HeaderRow>
                </HeaderCenter>
                <HeaderRight>{`Data: ${actualDate()}`}</HeaderRight>
              </Header>
            </td>
          </tr>
          <tr>
            <td colSpan={totColumns} align="center">
              <Title>{title}</Title>
            </td>
          </tr>
          {columns}
        </thead>
        <tbody>{children}</tbody>
      </table>
    </TableWrapper>
  );
}

Report.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  columns: PropTypes.node.isRequired,
};

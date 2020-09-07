import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Chart from '~/components/Chart';
import api from '~/services/api';
import { formatDate, formatPrice } from '~/util/format';

import {
  Container,
  FormWrapper,
  User,
  Buttons,
  FilterButton,
  Header,
  Description,
} from './styles';

export default function Home() {
  const profile = useSelector(state => state.user.profile);
  const [total, setTotal] = useState('R$ 0,00');
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState(['outros', 'alianca', 'anel']);

  const calculateTotal = useCallback(
    async (startIndex, endIndex) => {
      const sumTotal = await orders
        .filter((_, index) => index >= startIndex && index <= endIndex)
        .reduce((acum, elem) => acum + (elem.Valor || 0), 0);
      setTotal(formatPrice(sumTotal));
    },
    [orders]
  );

  const handleChangeBrush = useCallback(
    async e => {
      calculateTotal(e.startIndex, e.endIndex);
    },
    [calculateTotal]
  );

  const brushStartIndex = useCallback(() => {
    const size = orders.length;
    return Math.round(size - size * 0.3 - 1);
  }, [orders.length]);

  useEffect(() => {
    calculateTotal(brushStartIndex(), orders.length);
  }, [brushStartIndex, calculateTotal, orders]);

  const loadChartOrder = useCallback(async () => {
    const response = await api.get('/chart-order', {
      params: {
        q: filter,
      },
    });

    const data = response.data.map(item => {
      return { Data: formatDate(item.date), Valor: item.value };
    });

    setOrders(data);
  }, [filter]);

  const handleFilter = useCallback(
    itemName => {
      if (filter.indexOf(itemName) === -1) setFilter([...filter, itemName]);
      else if (filter.length > 1)
        setFilter(filter.filter(item => item !== itemName));
    },
    [filter]
  );

  useEffect(() => {
    loadChartOrder();
  }, [loadChartOrder]);

  return (
    <Container>
      <User>
        Bem vindo, <strong>{profile.name}</strong>
      </User>
      <FormWrapper>
        <Header>
          <Description>
            Total pedidos <span>{total}</span>
          </Description>
          <Buttons>
            <FilterButton
              checked={filter.indexOf('anel') !== -1}
              onClick={() => handleFilter('anel')}
            >
              Anel
            </FilterButton>
            <FilterButton
              checked={filter.indexOf('alianca') !== -1}
              onClick={() => handleFilter('alianca')}
            >
              Aliança
            </FilterButton>
            <FilterButton
              checked={filter.indexOf('outros') !== -1}
              onClick={() => handleFilter('outros')}
            >
              Outros
            </FilterButton>
          </Buttons>
        </Header>
        <Chart
          data={orders}
          brushStartIndex={brushStartIndex()}
          onChangeBrush={handleChangeBrush}
        />
      </FormWrapper>
    </Container>
  );
}

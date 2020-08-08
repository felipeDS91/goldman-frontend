import React, { useState, useEffect } from 'react';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { GiRock } from 'react-icons/gi';

import { Scope } from '@unform/core';
import { Select, Input } from '~/components';
import { AddDetail, DelDetail } from './styles';
import { Row, Column } from '~/styles/Default';
import api from '~/services/api';
import { useOrder } from '~/context/Order';

export default function Stone({ indexDetail: i }) {
  const [materials, setMaterials] = useState([]);
  const { order, setOrder } = useOrder();

  async function addItem() {
    setOrder({
      ...order,
      order_details: order.order_details.map((detail, index) =>
        index === i
          ? {
              ...detail,
              order_detail_stones: detail.order_detail_stones
                ? [
                    ...detail.order_detail_stones,
                    {
                      id:
                        detail.order_detail_stones
                          .map(elem => elem.id)
                          .reduce((a, b) => Math.max(a, b)) + 1,
                    },
                  ]
                : [{ id: 1 }],
            }
          : detail
      ),
    });
  }

  async function delItem(id) {
    setOrder({
      ...order,
      order_details: order.order_details.map((detail, index) =>
        index === i
          ? {
              ...detail,
              order_detail_stones: detail.order_detail_stones.filter(
                elem => elem.id !== id
              ),
            }
          : detail
      ),
    });
  }

  async function loadMaterials() {
    const response = await api.get(`/materials`);

    const dataFormatted = response.data.docs.map(item => ({
      id: item.id,
      title: item.description,
    }));

    setMaterials(dataFormatted);
  }

  useEffect(() => {
    loadMaterials();
  }, []); // eslint-disable-next-line

  return (
    <>
      <Row>
        <Column width="180px">
          <AddDetail type="button" onClick={() => addItem()}>
            <GiRock size={18} color="#4ec162" />
            ADICIONAR PEDRA
          </AddDetail>
        </Column>
      </Row>
      {order.order_details[i].order_detail_stones &&
        order.order_details[i].order_detail_stones.map((detail, index) => {
          return (
            <Scope path={`order_detail_stones[${index}]`} key={detail.id}>
              <Row>
                <Column width="20%">
                  <Input
                    type="number"
                    step="any"
                    name="amount"
                    label={index === 0 ? 'Quantidade' : ''}
                    placeholder="Quantidade"
                  />
                </Column>
                <Column width="20%">
                  <Input
                    type="number"
                    step="any"
                    name="points"
                    label={index === 0 ? 'Pontos (cada)' : ''}
                    placeholder="Pontos (cada)"
                  />
                </Column>
                <Column width="40%">
                  <Select
                    name="id_material"
                    label={index === 0 ? 'Material' : ''}
                    options={materials}
                    placeholder="Material"
                  />
                </Column>
                <Column width="40px">
                  <DelDetail
                    type="button"
                    marginTop={index === 0 ? '33px' : '0'}
                    onClick={() => delItem(detail.id)}
                  >
                    <IoIosRemoveCircleOutline size={18} color="#ee4d64" />
                  </DelDetail>
                </Column>
              </Row>
            </Scope>
          );
        })}
    </>
  );
}

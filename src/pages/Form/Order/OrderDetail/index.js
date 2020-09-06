import React from 'react';
import { IoIosAdd, IoIosRemoveCircleOutline } from 'react-icons/io';

import { RadioGroup, Collapsible } from '~/components';
import { DelDetail } from './styles';
import { Row, Column, Card, AddButton } from '~/styles/Default';
import Others from './Others';
import Ring from './Ring';
import Alliance from './Alliance';
import { useOrder } from '~/context/Order';

const products = [
  {
    name: 'anel',
    label: 'Anel Solitário',
    value: 'anel',
  },
  {
    name: 'alianca',
    label: 'Aliança(s)',
    value: 'alianca',
  },
  {
    name: 'outros',
    label: 'Outros',
    value: 'outros',
  },
];

export default function OrderDetail() {
  const { order, setOrder, calculateTotal } = useOrder();

  async function addItem() {
    setOrder({
      ...order,
      order_details: [
        ...order.order_details,
        {
          id:
            order.order_details
              .map(elem => elem.id)
              .reduce((a, b) => Math.max(a, b)) + 1,
        },
      ],
    });
  }

  async function delItem(idDetail) {
    setOrder({
      ...order,
      order_details: order.order_details.filter(elem => elem.id !== idDetail),
    });
    calculateTotal();
  }

  return (
    <Collapsible title="ITENS">
      {order.order_details &&
        order.order_details.map((detail, index) => {
          return (
            <Card key={detail.id}>
              <Row>
                <Column width="100%">
                  <RadioGroup
                    name={`order_details[${index}].item_type`}
                    label="Tipo de Jóia"
                    options={products}
                    onChange={value => {
                      setOrder({
                        ...order,
                        order_details: order.order_details.map(item =>
                          item.id === detail.id
                            ? { ...item, item_type: value }
                            : item
                        ),
                      });
                    }}
                  />
                </Column>
                <Column width="160px">
                  <DelDetail
                    type="button"
                    disabled={order.order_details.length === 1}
                    onClick={() => delItem(detail.id)}
                  >
                    <IoIosRemoveCircleOutline size={18} color="#ee4d64" />
                    REMOVER
                  </DelDetail>
                </Column>
              </Row>
              {detail.item_type === 'outros' && <Others indexDetail={index} />}
              {detail.item_type === 'anel' && <Ring indexDetail={index} />}
              {detail.item_type === 'alianca' && (
                <Alliance indexDetail={index} />
              )}
            </Card>
          );
        })}
      <Row>
        <AddButton onClick={() => addItem()}>
          <IoIosAdd size={20} color="#FFF" />
          ADICIONAR PRODUTO
        </AddButton>
      </Row>
    </Collapsible>
  );
}

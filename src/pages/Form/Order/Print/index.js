import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoMdPrint } from 'react-icons/io';
import PropTypes from 'prop-types';
import logo from '~/assets/logo-2.svg';
import { formatDate, formatCNPJ, formatCPF, formatPrice } from '~/util/format';

import history from '~/services/history';
import api from '~/services/api';

import {
  Container,
  Content,
  HeaderRow,
  Row,
  Column,
  Fieldset,
  Total,
  Card,
} from './styles';

import {
  TitlePage,
  PageHeader,
  Options,
  BackButton,
  PrintButton,
} from '~/styles/Default';

export default function Print({ match }) {
  const { id } = match.params;
  const [order, setOrder] = useState({});
  const [company, setCompany] = useState({});

  async function loadOrder() {
    const { data } = await api.get(`/print-order/${id}`);

    const dataFormatted = {
      ...data,
      customer: {
        ...data.customer,
        cpf: formatCPF(data.customer.cpf),
        birth_date: formatDate(data.customer.birth_date),
      },
      date: formatDate(data.createdAt),
      subTotal: formatPrice(data.total - data.delivery_value),
      delivery_value: formatPrice(data.delivery_value),
      total: formatPrice(data.total),
      order_payments: data.order_payments.map(payment => {
        return { ...payment, value: formatPrice(payment.value) };
      }),
      order_details: data.order_details.map(detail => {
        return { ...detail, value: formatPrice(detail.value) };
      }),
    };
    setOrder(dataFormatted);
  }

  function printOrder() {
    const originalTitle = document.title;
    document.title = `pedido-n${order.id}`;
    window.print();
    document.title = originalTitle;
  }

  async function loadCompany() {
    const { data } = await api.get(`/company`);

    const dataFormatted = {
      ...data,
      cnpj: formatCNPJ(data.cnpj),
    };

    setCompany(dataFormatted);
  }

  useEffect(() => {
    loadOrder();
    loadCompany();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <PageHeader>
        <TitlePage>{`Impressão do pedido nº ${id}`}</TitlePage>
        <Options>
          <BackButton type="button" onClick={history.goBack}>
            <IoIosArrowBack size={16} color="#FFF" />
            VOLTAR
          </BackButton>
          <PrintButton background="#ee4d64" onClick={printOrder}>
            <IoMdPrint size={26} color="#FFF" />
            IMPRIMIR
          </PrintButton>
        </Options>
      </PageHeader>
      {order.id && (
        <Content>
          <HeaderRow>
            <Column width="155px">
              <HeaderRow>
                <img src={logo} alt="GOLDMAN" />
              </HeaderRow>
            </Column>
            <Column width="100%">
              <HeaderRow style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {company.fantasy_name}
              </HeaderRow>
              <HeaderRow>{`CNPJ: ${company.cnpj}`}</HeaderRow>
              <HeaderRow>{`${company.address} nº${company.number}`}</HeaderRow>
              <HeaderRow>{`${company.zip_code} - ${company.neighborhood} - ${company.city} - ${company.state}`}</HeaderRow>
              <HeaderRow>{`Fone: ${company.phone} Celular: ${company.cellphone}`}</HeaderRow>
              <HeaderRow>{`Email: ${company.email}`}</HeaderRow>
            </Column>
            <Column
              style={{ border: '1px solid #dddddd', padding: '2px' }}
              width="300px"
            >
              <HeaderRow>{`PEDIDO Nº: ${id.padStart(6, '0')}`}</HeaderRow>
              <HeaderRow>{`DATA: ${order.date}`}</HeaderRow>
              <HeaderRow>{`VENDEDOR: ${order.user &&
                order.user.name}`}</HeaderRow>
            </Column>
          </HeaderRow>

          <Row style={{ marginTop: '10px' }}>
            <Fieldset>
              <legend>Dados do cliente</legend>
              <Row>
                <Column>{`NOME: ${order.customer.name}`}</Column>
                <Column>{`CPF: ${order.customer.cpf}`}</Column>
                <Column>{`DATA DE NASCIMENTO: ${order.customer.birth_date}`}</Column>
              </Row>
              <Row>
                <Column>{`TELEFONE: ${order.customer.phone}`}</Column>
                <Column>{`CELULAR: ${order.customer.cellphone}`}</Column>
                <Column>{`EMAIL: ${order.customer.email}`}</Column>
              </Row>
              <Row>
                <Column width="66.66%">{`ENDEREÇO: ${order.customer.address} nº: ${order.customer.number}`}</Column>
                <Column width="33.33%">{`COMPLEMENTO: ${order.customer.complement}`}</Column>
              </Row>
              <Row>
                <Column>{`BAIRRO: ${order.customer.neighborhood}`}</Column>
                <Column>{`CIDADE: ${order.customer.city}/${order.customer.state}`}</Column>
                <Column>{`CEP: ${order.customer.zip_code}`}</Column>
              </Row>
            </Fieldset>
          </Row>
          <Row>
            <Fieldset>
              <legend>Itens do pedido</legend>
              {order.order_details.map(detail => {
                return (
                  <Card>
                    {detail.item_type === 'outros' && (
                      <>
                        <Row>DESCRIÇÃO: {detail.description}</Row>
                        <Row>QUANTIDADE: {detail.amount}</Row>
                        <Row>VALOR: {detail.value}</Row>
                      </>
                    )}

                    {detail.item_type === 'anel' && (
                      <>
                        <Row>
                          <Column>DESCRIÇÃO: Anel</Column>
                          <Column>TAMANHO DO ARO: {detail.ring_size_1}</Column>
                        </Row>
                        <Row>
                          <Column>
                            TONALIDADE: {detail.color.description}
                          </Column>
                          <Column>VALOR: {detail.value}</Column>
                        </Row>
                      </>
                    )}

                    {detail.item_type === 'alianca' && (
                      <>
                        <Row>
                          <Column>DESCRIÇÃO: Aliança</Column>
                          <Column>VALOR: {detail.value}</Column>
                        </Row>

                        <Row>
                          <Column>LARGURA: {detail.width} mm</Column>
                          <Column>PESO: {detail.weight} </Column>
                        </Row>
                        <Row>
                          <Column>
                            TAMANHO ARO MENOR: {detail.ring_size_1}
                          </Column>
                          <Column>
                            GRAVAÇÃO ARO MENOR: {detail.recording_1}
                          </Column>
                        </Row>

                        <Row>
                          <Column>
                            TAMANHO ARO MAIOR: {detail.ring_size_2}
                          </Column>
                          <Column>
                            GRAVAÇÃO ARO MAIOR: {detail.recording_2}
                          </Column>
                        </Row>

                        <Row>
                          <Column>
                            FORMATO EXTERNO: {detail.finishing.description}
                          </Column>
                          <Column>
                            FORMATO INTERNO:{' '}
                            {detail.anatomical ? 'Anatômica' : 'Reta'}
                          </Column>
                        </Row>
                        <Row>
                          <Column>
                            TONALIDADE: {detail.color.description}
                          </Column>
                        </Row>
                      </>
                    )}
                    <Row>OBSERVAÇÕES: {detail.observation}</Row>

                    {detail.order_detail_stones.length > 0 ? (
                      <Row style={{ fontWeight: 'bold' }}>PEDRAS</Row>
                    ) : (
                      <Row style={{ fontWeight: 'bold' }}>PEDRAS: Não tem</Row>
                    )}
                    {detail.order_detail_stones &&
                      detail.order_detail_stones.map(stone => {
                        return (
                          <Row>
                            <Column>
                              MATERIAL: {stone.material.description}
                            </Column>
                            <Column>QUANTIDADE: {stone.amount}</Column>
                            <Column>PONTOS: {stone.points}</Column>
                          </Row>
                        );
                      })}
                  </Card>
                );
              })}
            </Fieldset>
          </Row>
          <Row>
            <Fieldset>
              <legend>Forma de pagamento</legend>
              {order.order_payments &&
                order.order_payments.map(payment => {
                  return (
                    <>
                      <Row>
                        <Column>
                          <Row>{payment.payment_type.description}</Row>
                        </Column>
                        <Column>
                          <Row style={{ justifyContent: 'flex-end' }}>
                            {payment.value}
                          </Row>
                        </Column>
                      </Row>
                    </>
                  );
                })}
            </Fieldset>
            <Fieldset>
              <legend>Forma de envio</legend>
              {order.delivery_type === 'loja' && <Row>Retirado na loja</Row>}
              {order.delivery_type === 'transportadora' && (
                <Row>
                  <Column>TRANSPORTADORA: {order.delivery_carrier.name}</Column>
                  <Column>
                    FRETE: {order.delivery_freight_type.description}
                  </Column>
                </Row>
              )}
              {order.delivery_type === 'motoboy' && <Row>Motoboy</Row>}
              {(order.delivery_type === 'transportadora' ||
                order.delivery_type === 'motoboy') && (
                <>
                  <Row>VALOR: {order.delivery_value}</Row>
                  <Row>
                    <Column>CEP: {`${order.delivery_zip_code}`}</Column>
                    <Column>
                      CIDADE: {order.delivery_city}/{order.delivery_state}
                    </Column>
                  </Row>

                  <Row>
                    ENDEREÇO : {order.delivery_address} nº{' '}
                    {order.delivery_number}
                  </Row>
                  <Row>BAIRRO : {order.delivery_neighborhood}</Row>
                  <Row>COMPLEMENTO: {order.delivery_complement}</Row>
                </>
              )}
            </Fieldset>
          </Row>
          <Total>
            <Fieldset>
              <Row>
                <Column>
                  <Row style={{ justifyContent: 'flex-end' }}>Subtotal: </Row>
                </Column>
                <Column>
                  <Row style={{ justifyContent: 'flex-end' }}>
                    {order.subTotal}
                  </Row>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Row style={{ justifyContent: 'flex-end' }}>Frete: </Row>
                </Column>
                <Column>
                  <Row style={{ justifyContent: 'flex-end' }}>
                    {order.delivery_value}
                  </Row>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Row
                    style={{ justifyContent: 'flex-end', fontWeight: 'bold' }}
                  >
                    Valor total:{' '}
                  </Row>
                </Column>
                <Column>
                  <Row
                    style={{ justifyContent: 'flex-end', fontWeight: 'bold' }}
                  >
                    {order.total}
                  </Row>
                </Column>
              </Row>
            </Fieldset>
          </Total>
        </Content>
      )}
    </Container>
  );
}

Print.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Print.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};

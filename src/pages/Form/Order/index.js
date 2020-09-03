import React, { useEffect, useState, useRef, useCallback } from 'react';
import { IoIosArrowBack, IoIosCheckmark } from 'react-icons/io';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import OrderProvider from '~/context/Order';
import {
  Form,
  Textarea,
  Input,
  AsyncSelect,
  DatePicker,
  CurrencyInput,
  Select,
} from '~/components';

import { ToastSuccess, MessageError } from '~/components/Message';
import history from '~/services/history';
import api from '~/services/api';

import OrderDetail from './OrderDetail';
import OrderPayment from './OrderPayment';
import OrderDelivery from './OrderDelivery';

import { Container } from './styles';

import {
  TitlePage,
  PageHeader,
  Options,
  BackButton,
  SaveButton,
  Row,
  Column,
} from '~/styles/Default';

const schema = Yup.object().shape({
  id_customer: Yup.number()
    .transform(value => (Number.isNaN(value) ? undefined : value))
    .required('Informe o cliente.'),
  id_status: Yup.number()
    .transform(value => (Number.isNaN(value) ? undefined : value))
    .required('Informe o status.'),
  delivery_forecast: Yup.date(),
  delivery_date: Yup.date(),
  total: Yup.number()
    .min(1, 'Valor inválido.')
    .required('Informe o total.'),
  grams_used: Yup.number()
    .transform(value => (Number.isNaN(value) ? null : value))
    .nullable(),
  delivery_type: Yup.string().required('Informe o tipo de envio.'),
  delivery_value: Yup.number().when('delivery_type', (delivery_type, field) =>
    delivery_type === 'transportadora' || delivery_type === 'motoboy'
      ? field
          .transform(value => (Number.isNaN(value) ? undefined : value))
          .required('Informe o valor.')
      : field
  ),
  delivery_id_carrier: Yup.number().when(
    'delivery_type',
    (delivery_type, field) =>
      delivery_type === 'transportadora'
        ? field
            .transform(value => (Number.isNaN(value) ? undefined : value))
            .required('Informe a transportadora.')
        : field
  ),
  delivery_id_freight_type: Yup.number().when(
    'delivery_type',
    (delivery_type, field) =>
      delivery_type === 'transportadora'
        ? field
            .transform(value => (Number.isNaN(value) ? undefined : value))
            .required('Informe o tipo de frete.')
        : field
  ),
  delivery_zip_code: Yup.string().when(
    'delivery_type',
    (delivery_type, field) =>
      delivery_type === 'transportadora' || delivery_type === 'motoboy'
        ? field.required('Informe o cep.')
        : field
  ),
  delivery_state: Yup.string().when('delivery_type', (delivery_type, field) =>
    delivery_type === 'transportadora' || delivery_type === 'motoboy'
      ? field.required('Informe o estado.')
      : field
  ),
  delivery_city: Yup.string().when('delivery_type', (delivery_type, field) =>
    delivery_type === 'transportadora' || delivery_type === 'motoboy'
      ? field.required('Informe a cidade.')
      : field
  ),
  delivery_neighborhood: Yup.string().when(
    'delivery_type',
    (delivery_type, field) =>
      delivery_type === 'transportadora' || delivery_type === 'motoboy'
        ? field.required('Informe o bairro.')
        : field
  ),
  delivery_address: Yup.string().when('delivery_type', (delivery_type, field) =>
    delivery_type === 'transportadora' || delivery_type === 'motoboy'
      ? field.required('Informe o endereço.')
      : field
  ),
  delivery_number: Yup.string().when('delivery_type', (delivery_type, field) =>
    delivery_type === 'transportadora' || delivery_type === 'motoboy'
      ? field.required('Informe o número.')
      : field
  ),
  delivery_complement: Yup.string().when(
    'delivery_type',
    (delivery_type, field) =>
      delivery_type === 'transportadora' || delivery_type === 'motoboy'
        ? field.required('Informe o complemento.')
        : field
  ),

  order_details: Yup.array().of(
    Yup.object().shape({
      item_type: Yup.string().required('Informe o tipo de jóia.'),
      value: Yup.number()
        .min(1, 'Valor inválido.')
        .required('Informe o valor.'),
      observation: Yup.string(),

      /**
       * Other validation
       */
      description: Yup.string().when('item_type', (item_type, field) =>
        item_type === 'outros' ? field.required('Informe a descrição.') : field
      ),
      amount: Yup.number().when('item_type', (item_type, field) =>
        item_type === 'outros'
          ? field
              .transform(value => (Number.isNaN(value) ? undefined : value))
              .min(1, 'Quantidade inválida.')
              .required('Informe a quantidade.')
          : field
      ),

      /**
       * Aliannce validation
       */
      ring_size_2: Yup.string(),
      recording_1: Yup.string(),
      recording_2: Yup.string(),
      id_finishing: Yup.number()
        .transform(value => (Number.isNaN(value) ? undefined : value))
        .when('item_type', (item_type, field) =>
          item_type === 'alianca'
            ? field.required('Informe o acabamento.')
            : field.nullable()
        ),
      width: Yup.number().when('item_type', (item_type, field) =>
        item_type === 'alianca'
          ? field
              .transform(value => (Number.isNaN(value) ? undefined : value))
              .min(3, 'Largura inválida.')
              .max(12, 'Largura inválida.')
              .required('Informe a largura.')
          : field
      ),
      weight: Yup.number().when('item_type', (item_type, field) =>
        item_type === 'alianca'
          ? field
              .transform(value => (Number.isNaN(value) ? undefined : value))
              .required('Informe o peso.')
          : field
      ),

      /**
       * Rings and Alliances validation
       */
      ring_size_1: Yup.number().when('item_type', (item_type, field) =>
        item_type === 'anel' || item_type === 'alianca'
          ? field
              .transform(value => (Number.isNaN(value) ? undefined : value))
              .min(8, 'Tamanho inválido.')
              .max(35, 'Tamanho inválido.')
              .required('Informe o tamanho.')
          : field
      ),
      id_color: Yup.number()
        .transform(value => (Number.isNaN(value) ? undefined : value))
        .when('item_type', (item_type, field) =>
          item_type === 'anel' || item_type === 'alianca'
            ? field.required('Informe a cor.')
            : field.nullable()
        ),
      order_detail_stones: Yup.array().when('item_type', (item_type, field) =>
        item_type === 'anel' || item_type === 'alianca'
          ? field.of(
              Yup.object().shape({
                amount: Yup.number()
                  .transform(value => (Number.isNaN(value) ? undefined : value))
                  .min(1, 'Quantidade inválida.')
                  .required('Informe a quantidade.'),
                points: Yup.number()
                  .transform(value => (Number.isNaN(value) ? undefined : value))
                  .min(1, 'Tamanho inválido.')
                  .required('Informe o tamanho.'),
                id_material: Yup.number()
                  .transform(value => (Number.isNaN(value) ? undefined : value))
                  .required('Informe o material.'),
              })
            )
          : field
      ),
    })
  ),

  order_payments: Yup.array().of(
    Yup.object().shape({
      id_payment_type: Yup.number()
        .transform(value => (Number.isNaN(value) ? undefined : value))
        .required('Informe o tipo de pagamento.'),
      value: Yup.number()
        .min(0.1, 'Valor inválido.')
        .required('Informe o valor.'),
      date: Yup.date().required('Informe a data.'),
    })
  ),
});

export default function FormOrder({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);
  const [editMode] = useState(typeof id !== 'undefined');
  const [status, setStatus] = useState([]);
  const [data, setData] = useState({
    order_details: [{ id: 1, amount: 1 }],
    order_payments: [{ id: 1 }],
  });
  const profile = useSelector(state => state.user.profile);

  const handleSubmit = useCallback(
    async sendData => {
      try {
        if (editMode) {
          await api.put(`orders/${id}`, sendData);
        } else {
          sendData = { ...sendData, id_user: profile.id };
          await api.post('orders', sendData);
        }

        ToastSuccess('Pedido salvo com sucesso');
        history.push('/list-orders');
      } catch ({ response }) {
        const msg =
          response && response.status === 400
            ? Object.values(response.data.messages)
                .map(err => err.message)
                .join('<br>')
            : 'Não foi possivel gravar os dados!';

        MessageError(msg);
      }
    },
    [editMode, id, profile.id]
  );

  const customerPromise = useCallback(value => {
    return value.length > 2
      ? api
          .get('/customers', {
            params: {
              q: value,
            },
          })
          .then(result =>
            result.data.docs.map(item => ({ id: item.id, title: item.name }))
          )
          .catch(() => [])
      : [];
  }, []);

  const loadStatus = useCallback(async () => {
    const response = await api.get(`/status`);

    const dataFormatted = response.data.docs.map(item => ({
      id: item.id,
      title: item.description,
    }));

    setStatus(dataFormatted);
  }, []);

  const loadData = useCallback(async () => {
    await loadStatus();
    if (!editMode) return;

    const { data: orderData } = await api.get(`/orders/${id}`);

    const dataFormatted = {
      ...orderData,
      id_customer: {
        id: orderData.customer.id,
        title: orderData.customer.name,
      },
    };
    setData(dataFormatted);
  }, [editMode, id, loadStatus]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Container>
      <OrderProvider initialOrder={data} formRef={formRef}>
        <PageHeader>
          <TitlePage>
            {editMode ? 'Edição' : 'Cadastro'} de pedido
            {editMode && data.id && ` nº ${data.id}`}
          </TitlePage>
          <Options>
            <BackButton type="button" onClick={history.goBack}>
              <IoIosArrowBack size={16} color="#FFF" />
              VOLTAR
            </BackButton>
            <SaveButton type="submit" form="form">
              <IoIosCheckmark size={26} color="#FFF" />
              SALVAR
            </SaveButton>
          </Options>
        </PageHeader>
        <Form
          id="form"
          initialData={data}
          schema={schema}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <Row>
            <Column width="65%">
              <AsyncSelect
                name="id_customer"
                label="Cliente"
                loadOptions={customerPromise}
                placeholder="Selecione o cliente"
              />
            </Column>
            <Column width="35%">
              <Select name="id_status" label="Status" options={status} />
            </Column>
          </Row>
          <Row>
            <Column>
              <DatePicker
                label="Previsão de entrega"
                name="delivery_forecast"
                isClearable
              />
            </Column>
            <Column>
              <DatePicker
                label="Data de entrega"
                name="delivery_date"
                isClearable
              />
            </Column>
            <Column>
              <CurrencyInput name="total" label="Valor total" disabled />
            </Column>
            <Column>
              <Input
                type="number"
                step="any"
                name="grams_used"
                label="Gramas utilizadas"
                placeholder="Gramas utilizadas"
              />
            </Column>
          </Row>
          <Textarea
            name="observation"
            label="Observações"
            rows="4"
            placeholder="Observações gerais do pedido"
          />

          <OrderDetail />
          <OrderDelivery formRef={formRef} />

          <OrderPayment />
        </Form>
      </OrderProvider>
    </Container>
  );
}

FormOrder.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

FormOrder.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};

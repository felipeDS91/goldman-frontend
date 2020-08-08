import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosCheckmark } from 'react-icons/io';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { ToastSuccess, MessageError } from '~/components/Message';
import { Form, DatePicker, Input, Textarea, Address } from '~/components';
import history from '~/services/history';
import api from '~/services/api';
import { unformat } from '~/util/format';

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
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  cpf: Yup.string().required('O CPF é obrigatório'),
  phone: Yup.string(),
  cellphone: Yup.string(),
  birth_date: Yup.date()
    .nullable()
    .typeError('Campo data inválida'),
  state: Yup.string(),
  city: Yup.string(),
  address: Yup.string(),
  neighborhood: Yup.string(),
  zip_code: Yup.string(),
  complement: Yup.string(),
  number: Yup.string(),
  observation: Yup.string(),
});

export default function FormCustomer({ match }) {
  const { id } = match.params;
  const [editMode] = useState(typeof id !== 'undefined');
  const [customer, setCustomer] = useState({});

  async function loadData() {
    if (!editMode) return;

    const response = await api.get(`/customers/${id}`);

    setCustomer(response.data);
  }

  async function handleSubmit(data) {
    try {
      const clearData = {
        ...data,
        cpf: unformat(data.cpf),
        birth_date: data.birth_date,
      };

      if (editMode) {
        await api.put(`customers/${id}`, clearData);
      } else {
        await api.post('customers', clearData);
      }

      ToastSuccess('Cadastro salvo com sucesso');
      history.push('/list-customers');
    } catch ({ response }) {
      const msg =
        response && response.status === 400
          ? Object.values(response.data.messages)
              .map(err => err.message)
              .join('<br>')
          : 'Não foi possivel gravar os dados!';

      MessageError(msg);
    }
  }

  useEffect(() => {
    loadData();

    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <PageHeader>
        <TitlePage>{editMode ? 'Edição' : 'Cadastro'} de cliente</TitlePage>
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
        initialData={customer}
        schema={schema}
        onSubmit={handleSubmit}
      >
        <Input name="name" label="Nome completo" placeholder="Nome completo" />
        <Input
          name="email"
          label="E-mail"
          type="email"
          placeholder="Seu email completo"
        />

        <Row>
          <Column>
            <Input
              type="text"
              mask="999.999.999-99"
              label="CPF"
              name="cpf"
              placeholder="CPF"
            />
          </Column>
          <Column>
            <Input
              type="text"
              mask="(99) 9999-9999"
              label="Telefone"
              name="phone"
              placeholder="Telefone"
            />
          </Column>
          <Column>
            <Input
              type="text"
              mask="(99) 99999-9999"
              label="Celular"
              name="cellphone"
              placeholder="Celular"
            />
          </Column>
          <Column>
            <DatePicker
              label="Data de nascimento"
              name="birth_date"
              isClearable
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              onChange={date => {
                setCustomer({
                  ...customer,
                  birth_date: date,
                });
              }}
            />
          </Column>
        </Row>
        <Address initialData={customer} />
        <Textarea
          name="observation"
          label="Observações"
          rows="4"
          placeholder="Observações gerais"
        />
      </Form>
    </Container>
  );
}

FormCustomer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

FormCustomer.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};

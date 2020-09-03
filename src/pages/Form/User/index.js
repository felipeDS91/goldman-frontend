import React, { useEffect, useState, useCallback } from 'react';
import { IoIosArrowBack, IoIosCheckmark } from 'react-icons/io';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Input, CheckBox } from '~/components';

import { ToastSuccess, MessageError } from '~/components/Message';
import history from '~/services/history';
import api from '~/services/api';

import {
  TitlePage,
  PageHeader,
  Options,
  BackButton,
  SaveButton,
  Row,
  Column,
} from '~/styles/Default';
import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  profile_admin: Yup.boolean()
    .nullable()
    .default(false),
  password: Yup.string()
    .transform(v => (v === '' ? null : v))
    .nullable()
    .min(6, 'Senha deve ter ao mínimo 6 caracteres.'),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('Informe a confirmação da senha')
          .oneOf([Yup.ref('password')], 'As senhas não conferem.')
      : field
  ),
});

export default function FormUser({ match }) {
  const { id } = match.params;
  const [editMode] = useState(typeof id !== 'undefined');
  const [data, setData] = useState({});

  const loadData = useCallback(async () => {
    if (!editMode) return;

    const response = await api.get(`/users/${id}`);

    setData(response.data);
  }, [editMode, id]);

  const handleSubmit = useCallback(
    async sendData => {
      try {
        if (editMode) {
          await api.put(`users/${id}`, sendData);
        } else {
          await api.post('users', sendData);
        }

        ToastSuccess('Cadastro salvo com sucesso');
        history.push('/list-users');
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
    [editMode, id]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Container>
      <PageHeader>
        <TitlePage>{editMode ? 'Edição' : 'Cadastro'} de usuário</TitlePage>
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
      >
        <Input name="name" label="Nome" placeholder="Nome completo" />
        <Row>
          <Column width="80%">
            <Input
              name="email"
              label="E-mail"
              type="email"
              placeholder="Email completo"
            />
          </Column>
          <Column width="20%">
            <Row>
              <CheckBox name="profile_admin" label="Administrador" />
            </Row>
          </Column>
        </Row>
        <Row>
          <Column>
            <Input
              name="password"
              label="Senha"
              type="password"
              placeholder="Digite a senha"
            />
          </Column>
          <Column>
            <Input
              name="confirmPassword"
              label="Confirmação da senha"
              type="password"
              placeholder="Digite senha novamente"
            />
          </Column>
        </Row>
      </Form>
    </Container>
  );
}

FormUser.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

FormUser.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};

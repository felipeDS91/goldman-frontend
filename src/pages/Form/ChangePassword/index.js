import React from 'react';
import { IoIosArrowBack, IoIosCheckmark } from 'react-icons/io';
import * as Yup from 'yup';
import { Form, Input } from '~/components';

import { ToastSuccess, MessageError } from '~/components/Message';
import history from '~/services/history';
import api from '~/services/api';

import { Container } from './styles';

import {
  TitlePage,
  PageHeader,
  Options,
  BackButton,
  SaveButton,
} from '~/styles/Default';

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Informe a senha.')
    .min(6, 'Senha deve ter ao mínimo 6 caracteres.'),
  confirmPassword: Yup.string()
    .required('Informe a confirmação da senha.')
    .oneOf([Yup.ref('password')], 'As senhas não conferem.'),
  oldPassword: Yup.string().required('Informe a senha antiga.'),
});

export default function FormChangePassword() {
  async function handleSubmit(sendData) {
    try {
      await api.put('change-password', sendData);

      ToastSuccess('Senha alterada com sucesso');
      history.push('/home');
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

  return (
    <Container>
      <PageHeader>
        <TitlePage>Alteração de senha</TitlePage>
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

      <Form id="form" schema={schema} onSubmit={handleSubmit}>
        <Input
          name="oldPassword"
          label="Senha atual"
          type="password"
          placeholder="Digite a senha atual"
        />
        <Input
          name="password"
          label="Nova senha"
          type="password"
          placeholder="Digite a nova senha"
        />
        <Input
          name="confirmPassword"
          label="Confirmação da nova senha"
          type="password"
          placeholder="Digite nova senha novamente"
        />
      </Form>
    </Container>
  );
}

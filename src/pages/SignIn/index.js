import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '~/components';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logotipo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = useCallback(
    ({ email, password }) => {
      dispatch(signInRequest(email, password));
    },
    [dispatch]
  );

  return (
    <>
      <img src={logo} alt="GOLDMAN" width="153" height="100" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          label="SEU E-MAIL"
          placeholder="Seu e-mail"
        />
        <Input
          name="password"
          type="password"
          label="SUA SENHA"
          placeholder="Sua senha secreta"
        />
        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}

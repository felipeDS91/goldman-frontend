import React, { useCallback } from 'react';
import { IoIosArrowBack, IoIosCheckmark, IoIosImage } from 'react-icons/io';
import * as Yup from 'yup';

import { ToastSuccess, MessageError } from '~/components/Message';
import { Form, Input, Address } from '~/components';
import history from '~/services/history';
import api from '~/services/api';
import { unformat } from '~/util/format';

import { Container, LogoInput } from './styles';

import {
  TitlePage,
  PageHeader,
  Options,
  BackButton,
  SaveButton,
  Row,
  Column,
} from '~/styles/Default';

import { useCompany } from '~/context/Company';

const schema = Yup.object().shape({
  name: Yup.string().required('Informe o nome.'),
  fantasy_name: Yup.string().required('Informe o nome fantasia.'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  cnpj: Yup.string().required('O CPF é obrigatório'),
  phone: Yup.string(),
  cellphone: Yup.string(),
  state: Yup.string(),
  city: Yup.string(),
  address: Yup.string(),
  neighborhood: Yup.string(),
  zip_code: Yup.string(),
  complement: Yup.string(),
  number: Yup.string(),
  observation: Yup.string(),
});

export default function FormCompany() {
  const { company, setCompany } = useCompany();

  const handleLogoChange = useCallback(
    e => {
      if (e.target.files) {
        const data = new FormData();
        data.append('file', e.target.files[0]);

        api.patch('/company/logo', data).then(response => {
          setCompany({ ...company, logo_name: response.data.logo_name });
          ToastSuccess('Logo salvo com sucesso');
        });
      }
    },
    [company, setCompany]
  );

  const handleSubmit = useCallback(async data => {
    try {
      const clearData = {
        ...data,
        cnpj: unformat(data.cnpj),
      };

      await api.post('company', clearData);

      ToastSuccess('Configurações salvas com sucesso');
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
  }, []);

  return (
    <Container>
      <PageHeader>
        <TitlePage>Configurações</TitlePage>
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
        initialData={company}
        schema={schema}
        onSubmit={handleSubmit}
      >
        <Row>
          <Column>
            <Input
              name="name"
              label="Razão social"
              placeholder="Razão social"
            />
          </Column>
          <Column width="150px">
            <LogoInput>
              <img src={company.logo_url} alt={company.fantasy_name} />
              <label htmlFor="logo">
                <IoIosImage />
                <input
                  data-testid="input-file"
                  type="file"
                  accept="image/*"
                  id="logo"
                  onChange={handleLogoChange}
                />
              </label>
            </LogoInput>
          </Column>
        </Row>

        <Input
          name="fantasy_name"
          label="Nome fantasia"
          placeholder="Nome fantasia"
        />
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
              mask="99.999.999/9999-99"
              label="CNPJ"
              name="cnpj"
              placeholder="CNPJ"
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
        </Row>
        <Address initialData={company} />
      </Form>
    </Container>
  );
}

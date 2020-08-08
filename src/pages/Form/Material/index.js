import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosCheckmark } from 'react-icons/io';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Input } from '~/components';

import { ToastSuccess, MessageError } from '~/components/Message';
import history from '~/services/history';
import api from '~/services/api';

import {
  TitlePage,
  PageHeader,
  Options,
  BackButton,
  SaveButton,
} from '~/styles/Default';
import { Container } from './styles';

const schema = Yup.object().shape({
  description: Yup.string().required('Informe a descrição.'),
});

export default function FormMaterial({ match }) {
  const { id } = match.params;
  const [editMode] = useState(typeof id !== 'undefined');
  const [data, setData] = useState({});

  async function loadData() {
    if (!editMode) return;

    const response = await api.get(`/materials/${id}`);

    setData(response.data);
  }

  async function handleSubmit(sendData) {
    try {
      if (editMode) {
        await api.put(`materials/${id}`, sendData);
      } else {
        await api.post('materials', sendData);
      }

      ToastSuccess('Cadastro salvo com sucesso');
      history.push('/list-materials');
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
        <TitlePage>{editMode ? 'Edição' : 'Cadastro'} de material</TitlePage>
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
        <Input name="description" label="Descrição" placeholder="Descrição" />
      </Form>
    </Container>
  );
}

FormMaterial.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

FormMaterial.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};

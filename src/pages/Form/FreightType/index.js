import React, { useEffect, useState, useCallback } from 'react';
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

export default function FormFreightType({ match }) {
  const { id } = match.params;
  const [editMode] = useState(typeof id !== 'undefined');
  const [data, setData] = useState({});

  const loadData = useCallback(async () => {
    if (!editMode) return;

    const response = await api.get(`/freight-types/${id}`);

    setData(response.data);
  }, [editMode, id]);

  const handleSubmit = useCallback(
    async sendData => {
      try {
        if (editMode) {
          await api.put(`freight-types/${id}`, sendData);
        } else {
          await api.post('freight-types', sendData);
        }

        ToastSuccess('Cadastro salvo com sucesso');
        history.push('/list-freight-types');
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
        <TitlePage>
          {editMode ? 'Edição' : 'Cadastro'} de tipo de frete
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
      >
        <Input name="description" label="Descrição" placeholder="Descrição" />
      </Form>
    </Container>
  );
}

FormFreightType.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

FormFreightType.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};

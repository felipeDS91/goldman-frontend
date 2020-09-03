import React, { useState, useRef, useCallback } from 'react';
import { IoIosSearch } from 'react-icons/io';
import * as consultaCep from 'cep-promise';

import { ShowMessage } from '~/components/Message';
import { Loading } from '~/styles/Loading';
import { Row, Column, Button } from '~/styles/Default';
import { Input } from '~/components';

function Address({ prefix = '' }) {
  const [loading, setLoading] = useState(false);
  const refState = useRef(null);
  const refCity = useRef(null);
  const refNeighborhood = useRef(null);
  const refAddress = useRef(null);
  const refZipCode = useRef(null);

  const searchCep = useCallback(async value => {
    setLoading(true);
    try {
      const res = await consultaCep(value);

      refState.current.value = res.state ? res.state : '';
      refCity.current.value = res.city ? res.city : '';
      refNeighborhood.current.value = res.neighborhood ? res.neighborhood : '';
      refAddress.current.value = res.street ? res.street : '';
    } catch (e) {
      setLoading(false);

      ShowMessage({
        icon: 'error',
        title: 'Oops...',
        html: 'CEP não localizado.',
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setLoading(false);
  }, []);

  return (
    <>
      <Row>
        <Column width="40%">
          <Input
            ref={refZipCode}
            type="text"
            mask="99.999-999"
            label="CEP"
            name={`${prefix}zip_code`}
            placeholder="CEP"
          />
        </Column>

        <Column width="15%">
          <Button
            disabled={loading}
            onClick={() => searchCep(refZipCode.current.value)}
          >
            {loading ? <Loading /> : <IoIosSearch size={16} color="#FFF" />}
          </Button>
        </Column>

        <Column width="25%">
          <Input name={`${prefix}state`} label="Estado" ref={refState} />
        </Column>
        <Column>
          <Input
            name={`${prefix}city`}
            label="Cidade"
            placeholder="Cidade"
            ref={refCity}
          />
        </Column>
        <Column>
          <Input
            name={`${prefix}neighborhood`}
            label="Bairro"
            placeholder="Bairro"
            ref={refNeighborhood}
          />
        </Column>
      </Row>
      <Row length="2">
        <Column width="75%">
          <Input
            name={`${prefix}address`}
            label="Endereço"
            placeholder="Endereço"
            ref={refAddress}
          />
        </Column>
        <Column width="25%">
          <Input name={`${prefix}number`} label="Número" placeholder="Número" />
        </Column>
      </Row>
      <Input
        name={`${prefix}complement`}
        label="Complemento"
        placeholder="Complemento"
      />
    </>
  );
}

export default Address;

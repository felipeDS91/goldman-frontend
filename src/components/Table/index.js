import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';
import { Loading } from '~/styles/Loading';

export default function Table({ children, loading, pagination }) {
  return (
    <Wrapper>
      {loading ? (
        <center>
          <Loading color="#666" />
        </center>
      ) : (
        <>
          <table>{children}</table>
          {pagination}
        </>
      )}
    </Wrapper>
  );
}

Table.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
};

Table.defaultProps = {
  pagination: () => {},
  loading: false,
};

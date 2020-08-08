import React from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import { Button, PaginationContainer } from './styles';

export default function Pagination({ info, handlePage }) {
  const { page, pages, total } = info;

  return (
    <PaginationContainer>
      <Button
        disabled={!(page > 1 && total)}
        onClick={() => handlePage(page - 1)}
      >
        <MdKeyboardArrowLeft size="20" />
        Anterior
      </Button>

      <span>{pages > 0 && `Página ${page} de ${pages}`}</span>

      <Button
        disabled={!(page < pages && total)}
        onClick={() => handlePage(page + 1)}
      >
        Próxima
        <MdKeyboardArrowRight size="20" />
      </Button>
    </PaginationContainer>
  );
}

Pagination.propTypes = {
  info: PropTypes.shape({
    page: PropTypes.number,
    pages: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
  handlePage: PropTypes.func,
};

Pagination.defaultProps = {
  handlePage: () => {},
};

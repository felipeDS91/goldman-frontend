import React from 'react';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

import { SearchInput } from './styles';

let searchTimeout = null;

export default function Search({ loadData, onChange, value }) {
  function handleSearch(e) {
    const search = e.target.value;
    onChange(e);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(async () => {
      loadData(search);
    }, 600);
    searchTimeout = timeout;
  }

  return (
    <SearchInput>
      <FiSearch size={16} color="#999" />
      <input
        type="text"
        placeholder="Buscar cadastro"
        onChange={handleSearch}
        value={value}
      />
    </SearchInput>
  );
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  loadData: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

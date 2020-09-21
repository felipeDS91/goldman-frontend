import React, { useCallback } from 'react';
import { FiFilter } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { colors } from '~/styles';

import { Wrapper, SearchButton } from './styles';

let searchTimeout = null;

export default function Search({
  loadData,
  onChange,
  value,
  hasFilter,
  onClickFilter,
}) {
  const handleSearch = useCallback(
    e => {
      const search = e.target.value;
      onChange(e);

      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      const timeout = setTimeout(async () => {
        loadData(search);
      }, 600);
      searchTimeout = timeout;
    },
    [loadData, onChange]
  );

  return (
    <Wrapper>
      <SearchButton
        title="Clique aqui para definir um filtro"
        background="#dedede"
        onClick={() => onClickFilter && onClickFilter()}
      >
        <FiFilter
          size={16}
          color={hasFilter ? colors.label : colors.background}
        />
      </SearchButton>

      <input
        type="text"
        placeholder="Buscar"
        onChange={handleSearch}
        value={value}
      />
    </Wrapper>
  );
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  loadData: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  hasFilter: PropTypes.bool,
  onClickFilter: PropTypes.func,
};

Search.defaultProps = {
  hasFilter: false,
  onClickFilter: () => {},
};

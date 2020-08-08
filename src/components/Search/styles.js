import styled from 'styled-components';

export const SearchInput = styled.div`
  input {
    border: 1px solid #d6d7da;
    border-radius: 4px;
    height: 36px;
    padding: 15px 15px 15px 40px;

    &::placeholder {
      color: #c4c4c4;
    }
  }

  svg {
    position: relative;
    left: 30px;
    top: 3px;
  }
`;

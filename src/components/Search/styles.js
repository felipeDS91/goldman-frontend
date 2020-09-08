import styled from 'styled-components';
import { colors } from '~/styles';

export const SearchInput = styled.div`
  input {
    border: 1px solid ${colors.border};
    border-radius: 4px;
    height: 36px;
    padding: 15px 15px 15px 40px;

    &::placeholder {
      color: ${colors.placeholder};
    }
  }

  svg {
    position: relative;
    left: 30px;
    top: 3px;
  }
`;

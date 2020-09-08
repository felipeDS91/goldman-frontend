import styled from 'styled-components';
import { colors } from '~/styles';

export const Wrapper = styled.div`
  label {
    margin-top: 0 !important;
  }

  span {
    color: ${colors.error};
    align-self: flex-start;
    margin-top: 3px;
    font-weight: bold;
  }
`;

export const Radio = styled.input`
  height: 12px !important;
  margin-right: 4px;
`;

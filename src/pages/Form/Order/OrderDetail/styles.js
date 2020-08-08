import styled from 'styled-components';
import { darken } from 'polished';

export const DelDetail = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 4px;
  font-weight: bold;
  background: transparent;
  text-align: right;
  height: 47px;
  width: 120px;
  margin-top: 12px;
  align-self: flex-end;
  color: #ee4d64;
  font-size: 16px;

  svg {
    margin: 0 5px 0 5px;
  }

  &:hover {
    color: ${props => (props.disabled ? null : darken(0.05, '#ee4d64'))};
    cursor: ${props => props.disabled && 'not-allowed'};
  }
`;

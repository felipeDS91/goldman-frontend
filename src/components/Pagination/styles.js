import styled from 'styled-components';
import { lighten } from 'polished';
import { colors } from '../../styles';

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: 10px;
`;

export const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  border-radius: 4px;
  background: ${props =>
    props.disabled ? lighten(0.08, colors.primary) : colors.primary};
  font-size: 12px;
  color: ${colors.buttonFont};
  padding: 6px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

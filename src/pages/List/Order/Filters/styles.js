import styled from 'styled-components';
import { darken } from 'polished';
import { colors } from '~/styles';

export const ApplyButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  margin-top: 33px;
  margin-left: auto;
  vertical-align: bottom;
  border-radius: 4px;
  height: 36px;
  width: 115px;
  font-size: 14px;
  font-weight: bold;
  color: ${colors.secondary};
  background: ${colors.primary};
  text-align: right;

  svg {
    margin: 0 6px 0 8px;
  }

  &:hover {
    background: ${darken(0.08, colors.primary)};
  }
`;

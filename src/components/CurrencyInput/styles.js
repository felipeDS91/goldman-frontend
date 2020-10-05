import styled, { css } from 'styled-components';
import { colors } from '../../styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  input {
    border: 1px solid ${colors.border};
    border-radius: 4px;
    height: 36px;
    padding: 14px;

    ${props =>
      props.isFocused &&
      css`
        border-color: ${colors.focusedBorder};
      `}
  }

  label {
    font-size: 14px;
    color: ${colors.label};
    text-align: left;
    margin-bottom: 4px;
    font-weight: bold;
    margin-top: 12px !important;
  }

  span {
    color: ${colors.error};
    align-self: flex-start;
    margin-top: 3px;
    font-weight: bold;
  }
`;

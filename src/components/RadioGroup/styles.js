import styled from 'styled-components';
import { colors } from '~/styles';

export const Wrapper = styled.div`
  width: 100%;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  fieldset {
    padding: 8px;
    width: 100%;
    border: 1px solid ${colors.border};
    border-radius: 4px;
  }

  label {
    font-size: 14px;
    color: ${colors.label};
    text-align: left;
    font-weight: bold;

    input {
      width: auto;
    }
  }

  span {
    color: ${colors.error};
    align-self: flex-start;
    margin-top: 3px;
    font-weight: bold;
  }

  legend {
    font-size: 14px;
    font-weight: bold;
    padding: 4px;
    color: ${colors.label};
  }
`;

export const Radio = styled.input.attrs(_ => ({
  type: 'radio',
}))`
  height: 12px !important;
  margin-right: 4px;
`;

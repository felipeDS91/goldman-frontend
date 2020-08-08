import styled from 'styled-components';

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
    border: 1px solid #d6d7da;
    border-radius: 4px;
  }

  label {
    font-size: 14px;
    color: #444444;
    text-align: left;
    font-weight: bold;
  }

  span {
    color: #f66f91;
    align-self: flex-start;
    margin-top: 3px;
    font-weight: bold;
  }

  legend {
    font-size: 14px;
    font-weight: bold;
    padding: 4px;
    color: #444444;
  }
`;

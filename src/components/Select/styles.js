import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  select {
    width: 100%;
    border: 1px solid #d6d7da;
    border-radius: 4px;
    height: 36px;
    padding: 8px;
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    -webkit-appearance: none;
    background-position-y: 5px;
    font-size: 14px;
    cursor: pointer;

    option {
      color: #757575;
      border: 0;
      border-radius: 4px;
    }
  }

  input {
    border: 1px solid #d6d7da;
    border-radius: 4px;
    height: 36px;
    padding: 14px;
  }

  label {
    font-size: 14px;
    color: #444444;
    text-align: left;
    margin-bottom: 4px;
    font-weight: bold;
    margin-top: 12px !important;
  }

  span {
    color: #f66f91;
    align-self: flex-start;
    margin-top: 3px;
    font-weight: bold;
  }
`;

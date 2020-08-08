import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 14px;
    color: #444444;
    text-align: left;
    margin-bottom: 4px;
    font-weight: bold;
    margin-top: 12px !important;
  }

  textarea {
    border: 1px solid #d6d7da;
    border-radius: 4px;
    padding: 14px;

    &::placeholder {
      color: #c4c4c4;
    }
  }

  span {
    color: #f66f91;
    align-self: flex-start;
    margin-top: 3px;
    font-weight: bold;
  }
`;

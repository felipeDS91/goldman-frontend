import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  /* background: #eebe52; */
  /* background: #ee4d64; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 370px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.4) 0 0 10px;

  img {
    margin-top: 25px;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 30px;

    label {
      display: flex;
      font-weight: bold;
      font-size: 14px;

      margin-bottom: 4px;
      margin-top: 12px;
    }

    input {
      border: 1px solid #d6d7da;
      border-radius: 4px;
      height: 44px;
      padding: 15px;

      &::placeholder {
        color: #c4c4c4;
      }
    }

    span {
      color: #f66f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin-top: 25px;
      height: 44px;
      background: #eebe52;
      font-weight: bold;
      color: #fff;
      border: 20px;
      border-radius: 4px;
      font-size: 16px;
      transition: backgroud 0.2s;

      &:hover {
        background: ${darken(0.03, '#eebe52')};
      }
    }
  }
`;

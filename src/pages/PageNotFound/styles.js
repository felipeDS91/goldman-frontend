import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    svg {
      margin-left: 4px;
    }
    span {
      font-size: 26px;
    }
    strong {
      font-size: 50px;
    }
  }

  a {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 36px;
    width: 142px;
    background: #ee4d64;
    color: #fff;
    border: 20px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    transition: backgroud 0.2s;
    border: 20px;
    padding: 0 10px 0 10px;
    margin-top: 50px;

    &:hover {
      background: ${darken(0.03, '#EE4D64')};
    }
  }
`;

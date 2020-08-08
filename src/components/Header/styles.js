import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    align-content: space-around;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #dddddd;
    }

    a {
      font-weight: bold;
      margin: 15px;
      opacity: 0.8;
      color: #999;

      &:hover {
        opacity: 1;
      }
    }

    a.active {
      color: #444;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666666;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      color: #de3b3b;
    }

    button {
      float: right;
      border: 0;
      background: transparent;
      display: block;
      margin-top: 2px;
      align-self: right;
      font-size: 14px;
      color: #de3b3b;
    }
  }
`;

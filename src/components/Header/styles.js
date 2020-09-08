import styled from 'styled-components';
import { colors } from '../../styles';

export const Container = styled.div`
  background: ${colors.background};
  padding: 0 30px;

  @media print {
    display: none;
  }
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
      border-right: 1px solid ${colors.border};
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
      color: ${colors.label};
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
  border-left: 1px solid ${colors.border};

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666666;
    }

    button {
      float: right;
      border: 0;
      background: transparent;
      display: block;
      margin-top: 2px;
      align-self: right;
      font-size: 14px;
      color: ${colors.primary};
    }
  }
`;

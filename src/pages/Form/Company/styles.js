import styled from 'styled-components';
import { shade } from 'polished';
import { colors } from '~/styles';

export const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;
`;

export const LogoInput = styled.div`
  align-self: center;
  padding-top: 32px;
  img {
    width: 135px;
    height: 34px;
  }
  label {
    position: absolute;
    width: 28px;
    height: 28px;
    background: ${colors.primary};
    border: none;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    cursor: pointer;
    input {
      display: none;
    }
    &:hover {
      background: ${shade(0.2, colors.primary)};
    }
    svg {
      color: ${colors.secondary};
    }
  }
`;

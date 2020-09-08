import styled from 'styled-components';
import { colors } from '~/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  height: 100%;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  height: 100%;
  width: 100%;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.label};
  font-weight: bold;
  font-size: 18px;
  padding: 0px 14px 14px 0;
`;

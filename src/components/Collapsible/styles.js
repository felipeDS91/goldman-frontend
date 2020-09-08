import styled from 'styled-components';
import { colors } from '~/styles';

export const Header = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: center;

  width: 100%;
  margin-top: 12px;
  height: 30px;
  border: solid 1px ${colors.border};
  padding: 0 12px 0 12px;
  background-color: ${colors.darkerBackground};
  color: ${colors.font};

  div {
    display: flex;
  }
`;

export const Content = styled.div`
  cursor: default;
  display: ${props => (props.opened ? 'block' : 'none')};
  border-left: solid 1px ${colors.border};
  border-right: solid 1px ${colors.border};
  border-bottom: solid 1px ${colors.border};
  border-radius: 0 0 5px 5px;
  padding: 15px;
`;

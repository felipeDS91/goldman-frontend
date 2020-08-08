import styled from 'styled-components';

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
  border: solid 1px #d6d7da;
  padding: 0 12px 0 12px;
  background-color: #999;
  color: #fff;

  div {
    display: flex;
  }
`;

export const Content = styled.div`
  cursor: default;
  display: ${props => (props.opened ? 'block' : 'none')};
  border-left: solid 1px #d6d7da;
  border-right: solid 1px #d6d7da;
  border-bottom: solid 1px #d6d7da;
  border-radius: 0 0 5px 5px;
  padding: 15px;
`;

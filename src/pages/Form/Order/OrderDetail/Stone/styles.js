import styled from 'styled-components';
import { darken } from 'polished';

export const AddDetail = styled.button`
  display: flex;
  align-items: center;
  margin-block-start: auto;
  border: 0;
  border-radius: 4px;
  height: 36px;
  width: 100%;
  min-width: 110px;
  font-size: 14px;
  font-weight: bold;
  color: #4ec162;
  background: #f2f2f2;
  line-height: 36px;
  justify-content: center;
  margin-top: 15px;
  border: 1px solid #d6d7da;
  border-radius: 4px;

  svg {
    margin: 0 5px;
  }

  &:hover {
    background: ${darken(0.04, '#d6d7da')};
  }
`;

export const DelDetail = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 4px;
  height: 36px;
  font-weight: bold;
  background: transparent;
  text-align: right;
  margin-top: ${props => props.marginTop};
  color: #ee4d64;
  font-size: 16px;

  svg {
    margin: 0 5px 0 5px;
  }

  &:hover {
    color: darken(0.05, '#ee4d64');
  }
`;

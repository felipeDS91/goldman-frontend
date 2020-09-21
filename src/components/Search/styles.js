import styled from 'styled-components';
import { darken } from 'polished';
import { colors } from '~/styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: -7px;

  input {
    border: 1px solid ${colors.border};
    border-radius: 4px;
    height: 36px;
    padding: 15px 15px 15px 38px;

    &::placeholder {
      color: ${colors.placeholder};
    }
  }
`;

export const SearchButton = styled.button.attrs(_ => ({
  type: 'button',
}))`
  position: relative;
  left: 30px;
  border: none;
  border: 1px solid ${colors.border};
  border-radius: 1px;
  width: 22px;

  background: ${props => props.background};

  svg {
    position: relative;
    align-self: center;
    top: 2px;
  }

  &:hover {
    background: ${props => props.background && darken(0.08, props.background)};
  }
`;

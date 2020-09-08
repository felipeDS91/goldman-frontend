import styled from 'styled-components';
import { darken } from 'polished';
import { colors } from '~/styles';

export const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;

  strong {
    font-size: 20px;
    color: ${colors.label};
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  height: 400px;
  flex-direction: column;
  margin-top: 14px;
  padding: 22px;
  background: ${colors.background};
  border-radius: 4px;
`;

export const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  font-size: 18px;
  strong {
    color: ${colors.primary};
    padding-left: 4px;
  }
`;

export const FilterButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 4px;
  height: 30px;
  min-width: 110px;
  font-size: 14px;
  font-weight: bold;
  color: #666;
  background: ${props => (props.checked ? darken(0.08, '#f2f2f2') : '#f2f2f2')};
  line-height: 36px;
  justify-content: center;
  margin: 5px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  margin-right: 0;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  color: #666;
  padding: 0px 14px 14px 0;

  span {
    color: #312e38;
    font-weight: bold;
    font-size: 20px;
  }
`;

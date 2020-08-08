import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex !important;
  flex-direction: ${props =>
    props.position === 'below' ? 'column' : 'row'}!important;

  label {
    font-size: 14px;
    color: #444444;
    text-align: center;
    margin-bottom: 4px;
    font-weight: bold;
    margin-top: 12px !important;
  }

  span {
    color: #f66f91;
    align-self: flex-start;
    margin-top: 3px;
    font-weight: bold;
  }
`;

export const CheckBox = styled.input.attrs(props => ({
  size: props.size || '1em',
}))`
  font-size: 1em;
  margin-top: 5px;
  margin-left: ${props => (props.position === 'below' ? null : '5px')};
  height: 20px !important;
  width: 20px !important;
  align-self: center;
`;

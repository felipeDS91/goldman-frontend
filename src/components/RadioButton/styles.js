import styled from 'styled-components';

export const Wrapper = styled.div`
  label {
    margin-top: 0 !important;
  }

  span {
    color: #f66f91;
    align-self: flex-start;
    margin-top: 3px;
    font-weight: bold;
  }
`;

export const Radio = styled.input.attrs(props => ({
  // we can define static props
  // or we can define dynamic ones
  // size: props.size || '0.1em',
}))`
  height: 12px !important;
  margin-right: 4px;
`;

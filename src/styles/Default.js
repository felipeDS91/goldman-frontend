import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  width: 100%;
`;

export const Column = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: ${props => (props.width ? props.width : '100%')};

  input {
    width: 100%;
  }

  & + div {
    padding-left: 12px;
  }
`;

export const Card = styled.div`
  margin: 20px;
  padding: 14px;
  background: #f2f2f2;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 10px;
`;

export const AddButton = styled.button.attrs(props => ({
  type: 'button',
}))`
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
  color: #fff;
  background: #4ec162;
  line-height: 36px;
  justify-content: center;
  margin: 10px 20px 20px 20px;

  svg {
    margin-left: 5px;
  }

  &:hover {
    background: ${darken(0.08, '#4ec162')};
  }
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 36px;
    width: 142px;
    background: #ee4d64;
    color: #fff;
    border: 20px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    transition: backgroud 0.2s;
    border: 20px;
    padding: 0 10px 0 10px;

    &:hover {
      background: ${darken(0.03, '#EE4D64')};
    }
  }
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
  @media print {
    display: none;
  }
`;

export const TitlePage = styled.strong`
  color: #444;
  font-size: 24px;
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 4px;
  height: 36px;
  width: 110px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background: #ee4d64;
  text-align: right;

  svg {
    margin: 0 10px 0 10px;
  }

  &:hover {
    background: ${darken(0.08, '#ee4d64')};
  }
`;

export const PrintButton = styled.button.attrs(props => ({
  type: 'button',
}))`
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 4px;
  height: 36px;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background: ${props => props.background};

  svg {
    margin-right: ${props => (props.children.length > 1 ? '10px' : '0')};
  }

  &:hover {
    background: ${props => props.background && darken(0.08, props.background)};
  }
`;

export const BackButton = styled.button.attrs(props => ({
  type: 'button',
}))`
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 4px;
  height: 36px;
  width: 110px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background: #cccccc;
  text-align: right;
  margin-right: 14px;

  svg {
    margin: 0 10px 0 10px;
  }

  &:hover {
    background: ${darken(0.08, '#cccccc')};
  }
`;

export const Button = styled.button.attrs(props => ({
  type: 'button',
}))`
  display: flex;
  align-items: center;
  border: 0;
  margin-top: 33px;
  vertical-align: bottom;
  display: table-cell;
  position: absolute;
  border-radius: 4px;
  height: 36px;
  width: 36px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background: #cccccc;
  text-align: right;
  margin-right: 14px;

  svg {
    margin: 0 10px 0 10px;
  }

  &:hover {
    background: ${darken(0.08, '#cccccc')};
  }
`;

export const EditButton = styled(Link)`
  width: 50px;
  color: #4d85ee;
  text-align: right;
  font-size: 15px;

  &:hover {
    color: ${darken(0.08, '#4d85ee')};
  }
`;

// export const PrintButton = styled(Link)`
//   width: 50px;
//   color: #4d85ee;
//   text-align: right;
//   font-size: 15px;
//   background: red;
//   border: solid 1px #d6d7da;
//   border-radius: 4px;

//   &:hover {
//     color: ${darken(0.08, '#4d85ee')};
//   }
// `;

export const RemoveButton = styled.td`
  width: 60px;
  border: 0;
  background: transparent;
  color: #de3b3b;
  text-align: center;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    color: ${darken(0.08, '#de3b3b')};
  }
`;

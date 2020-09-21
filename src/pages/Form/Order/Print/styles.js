import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 30px auto;

  @media print {
    body * {
      visibility: hidden;
    }

    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

export const Card = styled.div`
  padding: 14px;
  border-radius: 4px;
  border: 1px solid #dddddd;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  background: #fff;

  img {
    width: 155px;
    height: 100px;
    display: inline-block;
    vertical-align: middle;
  }

  @media print {
    padding-top: 0;
  }

  @page {
    size: auto;
    margin: 0mm;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  width: 100%;
  margin-top: 5px;
  white-space: pre-wrap;
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-content: center;
  width: 100%;
`;

export const Column = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  width: ${props => (props.width ? props.width : '100%')};
`;

export const Total = styled.div`
  display: flex;
  align-self: flex-end;
  margin-top: 10px;
  margin-right: 0;
  width: 200px;
`;

export const Fieldset = styled.fieldset`
  padding: 3px 15px 15px 15px;
  width: 100%;
  border: 1px solid #d6d7da;
  border-radius: 4px;

  legend {
    font-size: 14px;
    font-weight: bold;
    padding: 4px;
    color: #444444;
  }

  & + fieldset {
    margin-left: 12px;
  }
`;

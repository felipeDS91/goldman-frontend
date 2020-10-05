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

  @page {
    size: auto;
    margin: 0.5cm;
  }
`;

export const Filter = styled.div`
  @media print {
    visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

export const Content = styled.div`
  display: flex;
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
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  width: 100%;
  margin-top: 5px;
  white-space: pre-wrap;
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
  flex-direction: column;
  align-self: flex-end;
  margin-top: 10px;
  margin-left: auto;
  width: 200px;
  align-items: flex-end;
  white-space: nowrap;
  font-weight: bold;
`;

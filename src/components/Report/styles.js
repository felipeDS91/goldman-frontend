import styled from 'styled-components';
import { colors } from '~/styles';

export const TableWrapper = styled.div`
  width: 100%;
  background: ${colors.background};
  border-radius: 4px;

  table {
    width: 100%;
  }

  thead {
    font-size: 16px;
    color: ${colors.label};
    text-align: left;
  }

  tbody {
    color: #666;
    font-size: 16px;
    line-height: 20px;

    tr {
      & + tr {
        td {
          border-top: 1px solid #eeeeee;
        }
      }
    }

    td {
      padding: 12px 12px 12px 0;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  @page {
    size: auto;
    margin: 0.5cm;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-content: center;
  padding-bottom: 15px;

  @media screen {
    visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-content: center;
  padding-bottom: 15px;
  font-size: 20px;
  font-weight: bold;
  color: ${colors.label};
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: flex-start;
  margin-right: auto;
`;

export const HeaderCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: center;
  margin-right: auto;
  width: 100%;
`;

export const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: flex-end;
  margin-left: auto;
  white-space: nowrap;
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-content: center;
  width: 100%;
`;

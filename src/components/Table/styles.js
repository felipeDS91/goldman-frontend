import styled from 'styled-components';
import { colors } from '~/styles';

export const Wrapper = styled.div`
  background: ${colors.background};
  border-radius: 4px;
  padding: 25px;

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
      padding: 15px 15px 15px 0;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

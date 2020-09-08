import styled from 'styled-components';
import { colors } from '../../styles';

export const Menu = styled.nav`
  .nav-item {
    position: relative;
    display: block;
    flex-direction:row;
    margin: 15px;
    height: 17px;
    font-weight: bold;
    opacity: 0.8;
    color: ${colors.darkerBackground};
    z-index: 1;

      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }

    a.active {
      color: ${colors.label};
    }

    div {
      display: flex;
    }

  }

  .nav-item:hover .dropdown {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  svg {
    margin-left: 4px;
  }
`;

export const DropdownMenu = styled.div`
  .dropdown {
    background: ${colors.background};
    position: absolute;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 200px;
    text-align: left;
    top: 18px;
    border: 1px solid ${colors.secondary};
    box-shadow: 0px 1px 1px 1px ${colors.secondary};
  }

  .dropdown__item {
    cursor: pointer;
    text-align: left;
    line-height: 24px;
    font-size: 14px;
    a {
      margin: 8px 16px;
      text-decoration: none;
      display: block;
      svg {
        margin-right: 5px;
        align-items: center;
        vertical-align: -10%;
        width: 24px;
      }
      span {
        white-space: nowrap;
        overflow: hidden;
        color: #4a4d55;
      }
    }
  }

  .dropdown__item--large {
    border-bottom: 1px solid #ededee;
    a {
      margin: 16px;
    }
  }
`;

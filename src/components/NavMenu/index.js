import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';
import PropTypes from 'prop-types';
import { Menu, DropdownMenu } from './styles';

export default function NavMenu(props) {
  const { children, menu } = props;
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <Menu onMouseEnter={() => setOpened(true)}>
        <ul>
          <li className="nav-item">
            <div>
              <div>{children}</div>
              <div>
                <IoMdArrowDropdown />
              </div>
            </div>
            {opened && (
              <DropdownMenu onClick={() => setOpened(false)}>
                <div>
                  <ul className="dropdown">
                    {menu.map(item => {
                      const { classNames, Icon, title, href } = item;
                      return (
                        <li key={title} className={classNames}>
                          <Link to={href}>
                            {Icon && <Icon />}
                            <span>{title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </DropdownMenu>
            )}
          </li>
        </ul>
      </Menu>
    </div>
  );
}

NavMenu.propTypes = {
  children: PropTypes.string.isRequired,
  menu: PropTypes.arrayOf(PropTypes.object).isRequired,
};

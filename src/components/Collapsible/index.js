import React, { useState, useCallback } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import PropTypes from 'prop-types';
import { Header, Content } from './styles';

export default function Collapsible({ title, children }) {
  const [opened, setOpen] = useState(true);

  const togglePanel = useCallback(() => {
    setOpen(!opened);
  }, [opened]);

  return (
    <>
      <Header
        role="button"
        tabIndex={0}
        onClick={() => togglePanel()}
        onKeyPress={() => togglePanel()}
      >
        <div>{title}</div>
        <div>
          {opened ? (
            <IoMdArrowDropup size={20} color="#FFF" />
          ) : (
            <IoMdArrowDropdown size={20} color="#FFF" />
          )}
        </div>
      </Header>

      <Content className="closed" opened={opened}>
        {children}
      </Content>
    </>
  );
}

Collapsible.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

export default function Modal({ children, ...rest }) {
  ReactModal.setAppElement('#root');

  return (
    <ReactModal
      style={{
        content: {
          top: '40%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          height: '380px',
          overflow: 'none',
        },
      }}
      {...rest}
    >
      {children}
    </ReactModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

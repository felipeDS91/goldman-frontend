import React from 'react';

const CustomDate = React.forwardRef((props, ref) => {
  return (
    <>
      <input
        readOnly
        placeholder={props.placeholder}
        className={props.className}
        onClick={props.onClick}
        value={props.value}
        onChange={props.onChange}
        type="text"
        name={props.name}
        ref={ref}
        onBlur={props.onBlur}
      />
    </>
  );
});

export default CustomDate;

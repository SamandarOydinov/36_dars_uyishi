import React from 'react';
import './Button.scss';
import { btnTypes, btnSizes } from './constants';

const Button = (props) => {
  const {
    type = btnTypes.primary,
    size = btnSizes.md,
    children,
    px = 12,
    onClick, // ← bu yerda destructuring qiling
    ...rest // boshqa propslar ham kerak bo'lishi mumkin
  } = props;

  return (
    <button
      onClick={onClick} // ← bu yerda ulang
      className={`button btn-${type} btn-${size}`}
      style={{ padding: `0 ${px}px 0 ${px}px` }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

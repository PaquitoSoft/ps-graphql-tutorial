import { ReactNode } from 'react';
import cx from 'classnames';

type TButtonProps = {
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  size?: 's' | 'm' | 'l';
  onClick: () => void;
  children: ReactNode;
};

function Button({
  type = 'button',
  isDisabled = false,
  size = 'm',
  onClick,
  children
}: TButtonProps) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={
        cx(
          'mt-10 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
          { 'cursor-not-allowed bg-gray-500 hover:bg-gray-600 focus:ring-0': isDisabled },
          { 'w-32': size === 's' },
          { 'w-64': size === 'm' },
          { 'w-full': size === 'l' },
        )
      }
    >
      {children}
    </button>
  );
}

export default Button;

import React from 'react';
import { containerPadding } from '../../styles/styles';

const Footer = () => {
  return (
    <div className='w-full h-12 bg-gray-500'>
      <div
        className={
          containerPadding +
          ' p-2 flex items-center justify-center bg-blue-200 '
        }
      >
        <span>hello</span>
      </div>
    </div>
  );
};

export default Footer;

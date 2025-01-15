import React from 'react';
import logo from '@/public/imgs/logo.webp';
import Image from 'next/image';

const Logo = ({ className = '' }) => {
  return (
    <div className={`rounded-full bg-primary p-0.5 ${className}`}>
      <div className="flex h-full w-full items-center justify-center rounded-full">
        <Image src={logo} alt="logo" className="w-full object-cover" />
      </div>
    </div>
  );
};

export default Logo;

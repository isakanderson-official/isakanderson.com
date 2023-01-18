import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <section id='hero' className='flex w-full h-[656px] justify-between'>
      <div id='left' className='flex items-center h-full relative '>
        <div className='mb-28'>
          <h1
            className='text-[96px] font-bold leading-[80px]
              text-transparent bg-clip-text bg-gradient-to-t from-blue-300 to-blue-600 font-sans'
          >
            Isak
            <br />
            Anderson.
          </h1>
          <div className='bg-orange-300 p-1 w-16 mt-4'></div>
          <div
            id='hero-image'
            className='h-[650px] w-[1120px] absolute bottom-0 left-[10px] -z-10 greyscale'
          >
            <Image
              src={require('../../public/img/profile.png')}
              //   width='1000'
              //   height='1000'
              //   style={{ objectFit: 'fit' }}
              fill
              className='grayscale opacity-30'
            />
          </div>
        </div>
      </div>
      <div id='right' className='w-[340px]'>
        <nav className='mt-10 py-5 text-[24px] font-bold text-slate-800'>
          <ul className='flex gap-5 cursor-pointer'>
            <div className='flex flex-col justify-center items-center group '>
              <li className='text-slate-300'>Works</li>
              <div className=' bg-orange-400 w-1 p-[3px] rounded-full group-hover: visable'></div>
            </div>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </nav>
        {/* Content */}
        <div id='content-block' className='flex flex-col gap-4 mt-20'>
          <h3 className='text-slate-300'>- Introduction</h3>
          <h2 className='text-[32px] font-bold leading-9 '>
            Fullstack Developer, based in Oregon.
          </h2>

          <p className='text-slate-400 break-all'>
            sdasdasdsadasdasdkasdlas;kd;laskd;lasdassadkl;askd;lakd;lsak;ldksdlkasldk;laskd;lsakl;sakdl;askdl;akdl;ak.
          </p>

          <div className='flex items-center'>
            <h3 className='text-orange-300 underline underline-offset-4 cursor-pointer mt-5'>
              <Link href='/#'>My Story</Link>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

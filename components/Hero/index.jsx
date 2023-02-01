import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';

const Hero = () => {
  return (
    <section
      id='hero'
      className='flex w-full h-[656px] bg-[#333646] justify-center'
    >
      <div
        id='content'
        className='flex flex-col md:flex-row  md:w-[1336px] justify-between mx-4'
      >
        <div id='left' className='flex items-center h-full relative '>
          <div className='mb-28 z-10'>
            <h1
              className='text-[96px] font-bold leading-[80px]
              text-transparent bg-clip-text bg-gradient-to-t from-[#EDECED] to-[#EDEBEA] font-sans '
            >
              Isak
              <br />
              Anderson.
            </h1>
            <div className='bg-orange-300 p-1 w-16 mt-4'></div>
            <div
              id='hero-image'
              className='h-[650px] w-[1120px] absolute bottom-0 left-[150px]'
            >
              <Image
                src={require('../../public/img/profile.png')}
                //   width='1000'
                //   height='1000'
                //   style={{ objectFit: 'fit' }}
                fill
                className='grayscale opacity-80 z-0'
                alt='Isak Anderson Image'
                priority
              />
            </div>
          </div>
        </div>
        <div id='right' className=' w-[340px]'>
          {/* Content */}
          <div id='content-block' className='flex flex-col gap-4 mt-60'>
            <h3 className='text-slate-300'>- Introduction</h3>
            <h2 className='text-[32px] font-bold leading-9 text-slate-100'>
              Fullstack Developer, based in Oregon.
            </h2>

            <p className='text-slate-400 break-all'>
              sdasdasdsadasdasdkasdlas;kd;laskd;lasdassadkl;askd;lakd;lsak;ldksdlkasldk;laskd;lsakl;sakdl;askdl;akdl;ak.
            </p>

            <div className='flex items-center text-orange-300 underline underline-offset-4 cursor-pointer mt-5 gap-5'>
              <h3 className=''>
                <Link href='/#'>My Story</Link>
              </h3>
              <BiRightArrowAlt className='text-2xl underline' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

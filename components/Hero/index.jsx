import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { containerPadding } from '../../styles/styles';

const Hero = () => {
  return (
    <section id='hero' className='flex w-full h-[656px] bg-[#333646] z-0 '>
      <div id='content' className={'flex justify-between ' + containerPadding}>
        <div id='left' className='flex items-center h-full relative z-0 '>
          <div className='mb-28 z-10'>
            <h1
              className='text-[96px] font-bold leading-[80px]
              text-transparent bg-clip-text bg-gradient-to-t from-[#EDECED] to-[#EDEBEA]'
            >
              Isak
              <br />
              Anderson.
            </h1>
            <div className='bg-orange-300 p-1 w-16 mt-4'></div>
            <div
              id='hero-image'
              className='h-[650px] w-[1120px] absolute bottom-[-20px] left-[140px]'
            >
              <Image
                src={require('../../public/img/profile.png')}
                className='grayscale z-10 object-contain '
                alt='Isak Anderson Image'
                priority
              />
            </div>
          </div>
        </div>
        <div id='right' className=' w-[340px]'>
          {/* Content */}
          <div id='content-block' className='flex flex-col gap-4 mt-60 '>
            <h3 className='text-slate-300 z-0'>- Introduction</h3>
            <h2 className='text-[32px] font-bold leading-9 text-slate-100 z-0'>
              Fullstack Developer, based in Oregon.
            </h2>

            <p className='text-slate-400 break-all z-0'>
              sdasdasdsadasdasdkasdlas;kd;laskd;lasdassadkl;askd;lakd;lsak;ldksdlkasldk;laskd;lsakl;sakdl;askdl;akdl;ak.
            </p>

            <div className='flex items-center text-orange-300 underline underline-offset-4 cursor-pointer mt-5 gap-5'>
              <h3 className='z-0'>
                <Link href='/#' className='cursor-pointer'>
                  My Story
                </Link>
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

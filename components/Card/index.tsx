import React from 'react';
import Image from 'next/image';
import demoPic from '../../public/demopic.jpg';
import Link from 'next/link';
export const Card = (props: any) => {
  return (
    <>
      <Link href='http://youtube.com/videotechdude'>
        <div className='border rounded-lg group cursor-pointer overflow-hidden'>
          <Image
            className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
            src={demoPic}
            alt='test pic'
          />

          {/* Bottom banner */}
          <div className='flex justify-between p-5 bg-white'>
            {/* Left Side */}
            <div>
              <p className='font-bold'>Post Title</p>
              <p className=''>Post description by Isak</p>
            </div>
            {/* Right Side */}

            <div>
              <p>Catagory Title</p>
              <button>hi</button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

// <Image src={demoPic} alt='temp image for card' className='h-20 ' />
// {/* The bottom bar */}
// <div className='shadow-sm flex justify-between bg-slate-300 w-full h-20 items-center px-6 overflow-clip'>
//   <h1 className='font-bold text-2xl '>This is the Card Title</h1>
//   <button className='px-10 bg-white py-3 rounded-md font-bold'>
//     Button
//   </button>
// </div>

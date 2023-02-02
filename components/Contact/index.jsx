import Link from 'next/link';
import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { containerPadding } from '../../styles/styles';

const Contact = () => {
  return (
    <>
      <section
        id='card-section'
        className=' bg-[#252734] w-full h-[722px] flex  pt-32'
      >
        <div
          id='content-box'
          className={'h-[300px]  text-slate-200 ' + containerPadding}
        >
          <div className='leftbox  flex flex-col gap-5 w-[312px] '>
            <p className='font-thin'>- Contact</p>
            <h3 className='text-2xl font-bold'>Say Hello</h3>
            <p className='text-xs break-all leading-8'>
              aasfdjlksdjalfjaslfsldkfjlksajflksadjflksjdalfksakfdalfjlsakjflk.aasfdjlksdjalfjaslfsldkfjlksajflksadjflksjdalfksakfdalfjlsakjflk.
            </p>
            <div className='text-md mt-12'>
              <Link href={'/contact'} className='flex'>
                <span>Send me a message</span>
                <BiRightArrowAlt className='text-2xl underline' />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

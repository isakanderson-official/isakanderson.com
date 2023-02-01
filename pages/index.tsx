import Link from 'next/link';
import { BiRightArrowAlt } from 'react-icons/bi';
import { Card } from '../components/Card';
import Header from '../components/Header';
import Hero from '../components/Hero';

export default function Homepage() {
  return (
    // <div className='max-w-[1300px] mx-auto px-8 flex flex-col justify-center h-full'>
    <div className=''>
      <Hero />
      <section
        id='card-section'
        className=' bg-[#252734] w-full h-[722px] shadow-stone-800 flex justify-center pt-32'
      >
        <div
          id='content-box'
          className='w-[1336px] h-[300px]  text-slate-200  flex border border-blue-600 '
        >
          <div className='leftbox  flex flex-col gap-5 w-[312px] '>
            <p>- Contact</p>
            <h3 className='text-2xl'>Say Hello</h3>
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
      <section
        id='featured-card-section'
        className=' bg-[#333646] w-full h-[222px] shadow-stone-800 flex justify-center items-center gap-6'
      >
        <div
          id='block'
          className='w-[300px] h-[300px] bg-gray-400 mt-[-200px] text-white shadow-lg'
        >
          <div className='flex bottom-0 bg-red-200 mt-32 justify-center'>
            <h4>
              Product
              <br />
              Designer.
            </h4>
          </div>
        </div>
        <div
          id='block'
          className='w-[300px] h-[300px] bg-gray-400 mt-[-200px]'
        ></div>
        <div
          id='block'
          className='w-[300px] h-[300px] bg-gray-400 mt-[-200px]'
        ></div>
      </section>
    </div>
  );
}

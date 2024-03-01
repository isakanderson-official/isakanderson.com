'use client';
import Image from 'next/image';
import { FaAngleDown } from 'react-icons/fa6';

export default function Home() {
  const smoothScrollToId = (id) =>
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <section className='w-full h-screen flex flex-col items-center justify-center relative '>
        <div className='flex flex-col-reverse sm:flex-col'>
          <nav className='border-blue-300 border-3 '>
            <ul className='flex space-x-4 justify-center'>
              <li>
                <a href='#'>Home</a>
              </li>
              <li>
                <a href='#'>About</a>
              </li>
              <li>
                <a href='#portfolio'>Projects</a>
              </li>
              <li>
                <a href='#'>Contact</a>
              </li>
            </ul>
          </nav>
          <h1 className='font-bold text-7xl text-center'>Isak Anderson</h1>
        </div>
        <div
          className='absolute bottom-0 cursor-pointer'
          onClick={() => smoothScrollToId('#portfolio')}
        >
          <FaAngleDown size={55} />
        </div>
      </section>

      {/* Portfolio */}
      <section
        id='portfolio'
        className='w-full h-screen flex flex-col items-center justify-center relative'
      >
        <div>
          <h2 className='font-bold text-5xl'>Portfolio</h2>
        </div>
        <div
          className='absolute bottom-0 cursor-pointer'
          onClick={() =>
            document
              .querySelector('#portfolio')
              .scrollIntoView({ behavior: 'smooth' })
          }
        >
          <FaAngleDown />
        </div>
      </section>
    </main>
  );
}

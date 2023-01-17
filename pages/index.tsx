import { Card } from '../components/Card';

export default function Homepage() {
  return (
    <>
      <section id='hero' className='flex mx-[216px] h-[656px] justify-between'>
        <div id='left' className='flex items-center h-full '>
          <h1
            className='text-[96px] font-bold leading-[80px]
          text-transparent bg-clip-text bg-gradient-to-t from-blue-300 to-blue-600'
          >
            Isak
            <br />
            Anderson.
          </h1>
          <div className='bg-orange-400 h-[10px] w-[30px] p-5'>.</div>
        </div>
        <div id='right' className='w-[318px]'>
          <nav className='mt-10 py-5 text-2xl font-bold text-slate-800'>
            <ul className='flex gap-5'>
              <li className='text-slate-300'>Works</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </nav>
          {/* Content */}
          <div id='content-block' className='flex flex-col gap-4 mt-20'>
            <h3 className='text-slate-300'>- Introduction</h3>
            <h2 className='text-[32px] font-bold leading-9'>
              Fullstack Developer, based in Oregon.
            </h2>

            <p className='text-slate-400 break-all'>
              sdasdasdsadasdasdkasdlas;kd;laskd;lasdassadkl;askd;lakd;lsak;ldksdlkasldk;laskd;lsakl;sakdl;askdl;akdl;ak.
            </p>

            <div className='flex items-center'>
              <h3 className='text-orange-400 underline underline-offset-4'>
                My Story
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section
        id='card-section'
        className=' bg-blue-400 p-5 h-screen shadow-stone-800'
      >
        {/* <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> */}
      </section>
    </>
  );
}

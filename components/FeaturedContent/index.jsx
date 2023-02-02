import React from 'react';

const FeaturedContent = () => {
  return (
    <>
      <section
        id='featured-card-section'
        className=' bg-[#333646] w-full h-[222px] shadow-stone-800 flex justify-center items-center gap-6'
      >
        {/* <div className='w-[100%] h-32 bg-blue-500'></div> */}
        <div
          id='block'
          className='w-[300px] h-[300px] bg-gray-400 mt-[-200px] text-white shadow-lg '
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
    </>
  );
};

export default FeaturedContent;

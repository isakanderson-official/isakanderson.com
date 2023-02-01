import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  return (
    <>
      <nav className='flex w-full h-20 justify-center items-center absolute pr-4 z-50'>
        <ul className='flex w-[1336px] justify-end gap-5 cursor-pointer text-[24px] text-slate-300'>
          {[
            {
              item: 'Works',
              link: '/',
            },
            {
              item: 'Blog',
              link: '/blog',
            },
            {
              item: 'Contact',
              link: '/contact',
            },
          ].map((i, index) => {
            const isActive = router.pathname === i.link;

            return (
              <li
                key={index}
                className={`flex flex-col items-center cursor-pointer ${
                  isActive && 'text-slate-100'
                }`}
              >
                <Link href={i.link}>{i.item}</Link>
                {isActive && (
                  <div className=' bg-orange-400 w-1 p-[3px] rounded-full'></div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
    // <div className='bg-blue-200'>
    //   <nav className='flex mt-10  text-[24px] font-bold max-w-[1336px] bg-red-200  items-center justify-end '>
    //     <ul className='flex gap-5 cursor-pointer'>
    //       <div className='flex flex-col justify-center items-center group '>
    //         <li className='text-slate-300'>Works</li>
    //         <div className=' bg-orange-400 w-1 p-[3px] rounded-full group-hover: visable'></div>
    //       </div>
    //       <li>Blog</li>
    //       <li>Contact</li>
    //     </ul>
    //   </nav>
    // </div>
  );
}
{
  /* <div className='flex text-2xl font-bold text-white justify-between '>
        <h1 className=''>IsakAnderson.com</h1>
        
        <ul className='hidden md:flex gap-x-10 items-center md:visable'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </div> */
}

import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
export default function Header() {
  return (
    <header className=' bg-blue-400 px-5 h-[56px] sticky top-0 shadow-md align-center flex justify-between md:justify-center items-center'>
      <div className=' flex md:hidden justify-center items-center h-[40px] w-[40px] rounded-full hover:bg-slate-400/50 transition ease-in-out duration-100 op'>
        <MenuIcon className=' text-white items-center ' />
      </div>
      <h1 className='text2xl font-bold text-white'>IsakAnderson.com</h1>
    </header>
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

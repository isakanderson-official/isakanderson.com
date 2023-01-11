import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
export default function Header() {
  return (
    <header className=' bg-blue-400 px-5 h-[56px] sticky top-0 shadow-md align-center flex justify-between items-center'>
      <div className='md:hidden h-[24px] w-[24px] text-white bg-red-400 items-center flex rounded-full'>
        <MenuIcon />
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

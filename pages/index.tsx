import { Card } from '../components/Card';
import Hero from '../components/Hero';

export default function Homepage() {
  return (
    <div className='max-w-[1300px] mx-auto px-8 flex flex-col justify-center h-full'>
      <Hero />
      <section
        id='card-section'
        className=' bg-slate-400 w-full h-screen shadow-stone-800'
      >
        {/* <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> */}
      </section>
    </div>
  );
}

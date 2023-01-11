import { Card } from '../components/Card';

export default function Homepage() {
  return (
    <>
      <div className='flex justify-center items-center h-60'>
        <p className='text-center text-5xl'>Welcome to the homepage</p>
      </div>

      <section
        id='card-section'
        className='grid grid-cols-1 md:grid-cols-2 px-10 gap-10 gap-y-16 pb-24 max-w-7xl mx-auto'
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </>
  );
}

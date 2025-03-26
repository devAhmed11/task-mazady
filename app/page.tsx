import React from 'react';
import Link from 'next/link';
export default function Home() {
  return (
      <div className='flex bg-[#000] h-screen flex-col items-center justify-center'>
        <h1 className='font-bold text-3xl text-white mb-10'>Home Page</h1>
        <Link href="/category-form" className=' text-white'>Category Form Page</Link>
        <Link href="/static-page" className=' text-white'>Static Page </Link>
      </div>  
  );
}

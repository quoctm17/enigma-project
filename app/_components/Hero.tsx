import { Button } from '@/components/ui/button'
import { ArrowRight, Code } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <section className="bg-black bg-fixed bg-cover bg-no-repeat" style={{ backgroundImage: "url('/hero-bg-image.png')" }}>
      {/* Starry background image positioned at the bottom right */}
      <div className="absolute right-0 bottom-0 h-full w-full" style={{ backgroundImage: "url('/bg-stars.png')", backgroundPosition: 'bottom right', backgroundRepeat: 'no-repeat' }}></div>

      <div className="container h-screen max-w-screen-xl py-12 lg:flex lg:items-center">
        <div className="relative mt-50 max-w-4xl text-left pl-10">
          {/* Adjusted Gradient Line
          <div className="absolute left-0 top-0 bottom-0 w-1">
            <div style={{ height: '60%', background: 'linear-gradient(to bottom, #8CBAFF 0%, #579BFF 25%, #022C6B 50%, #023A8C 75%, #023A8C 100%)' }}></div>
            Icon
            <svg className="relative" style={{ top: '60%', height: '30px', width: '2px', fill: '#FFF', transform: 'translateY(-50%)' }} viewBox="0 0 24 24">
              <Code />
            </svg>
            <div style={{ top: '60%', height: '40%', background: 'linear-gradient(to bottom, #8CBAFF 0%, #579BFF 10%, #6A1339 70%, #8E1A4C 80%, #EC2B7E 100%)' }}></div>
          </div> */}

          <h1 className="text-6xl text-white font-extrabold sm:text-6xl">
            From Thoughts to Talks
            <strong className="block mt-5 font-extrabold text-sky-300 sm:block"> We have Got You Covered </strong>
          </h1>

          <p className="mt-10 text-3xl sm:text-3xl/relaxed text-slate-200">
            All-in-one markdown editor, collaborative canvas, and diagram-as-code builder
          </p>

          <div className="mt-10 flex items-center py-7" >
            <input type="email" placeholder="Email address" className="input input-bordered input-primary rounded-l-md p-2 h-auto" style={{ flex: '2 0 auto', minWidth: '300px' }} />
            <Button className='bg-blue-500 hover:bg-blue-400 text-white rounded-r-md'>
              <a href='#'>Sign up for Enigma</a>
            </Button>
            <Button className='ml-5 bg-transparent border border-blue-500 text-white hover:text-blue-500 flex justify-center'>
              <a href='#' className='flex items-center'>Try Enigma Now <ArrowRight className='ml-3' /></a>
            </Button>
          </div>

        </div>
      </div>
    </section>


  )
}

export default Hero

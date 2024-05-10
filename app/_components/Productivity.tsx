import { BriefcaseBusiness } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Productivity() {
    return (
        <div className="relative bg-black bg-fixed bg-cover bg-no-repeat pt-10" style={{ backgroundImage: "url('/bg-stars.png')" }}>
            <div className="bg-transparent relative flex flex-col p-14 items-start pt-20 pb-24" style={{ paddingLeft: '340px' }}>
                {/* Vector and Icon */}
                <div className="absolute top-30 bottom-0 w-1 h-96 bg-gradient-to-b from-pink-500 from-0% via-pink-700 via-50% to-black to-100%" style={{ left: '300px', borderRadius: '10px' }}></div>
                {/* Circular Blur Effect for Icon */}
                <div className="absolute left-[270px] w-16 h-16 filter blur-lg" style={{ top: '58px', background: 'radial-gradient(circle, rgba(255,105,180,0.5) 0%, rgba(255,105,180,0) 100%)', zIndex: '5' }}></div>
                <BriefcaseBusiness className="absolute top-20 bottom-0 text-white" style={{ left: '290px', zIndex: '10' }} />
                <p className="text-2xl text-white ml-6">Productivity</p>

                {/* Header */}
                <div className="relative mt-50 max-w-5xl text-left ml-6 mb-10 mt-10" style={{ zIndex: '10' }}>
                    <h2 className="text-6xl font-bold mb-4 text-pink-600">Accelerate high-quality working process development</h2>
                    <p className="text-3xl text-white mt-10 mb-10">Our platform drives innovation with tools that boost working velocity.</p>
                </div>

            </div>
            {/* Image for Content */}
            <div className='bg-transparent relative flex flex-col pl-20 items-start'>
                {/* Circular Blur Effect */}
                <div className="absolute left-1/4 -top-32 w-2/3 h-2/3 filter blur-3xl" style={{ background: 'radial-gradient(circle, rgba(255,105,180,0.5) 0%, rgba(255,105,180,0) 70%)', zIndex: '5' }}></div>

                <div className="relative pl-36 pr-36" style={{ zIndex: '10' }}>
                    <Image
                        src='/productivity.png'
                        alt='productivity'
                        layout='responsive'
                        width={1000}
                        height={500}
                        objectFit='cover'
                    />
                </div>
            </div>

        </div>

    )
}

export default Productivity

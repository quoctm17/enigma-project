import { CodeXml } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function ForDevelopers() {
    return (
        <div className="relative bg-black bg-fixed bg-cover bg-no-repeat pt-32" style={{ backgroundImage: "url('/bg-stars.png')" }}>
            <div className="bg-transparent relative flex flex-col p-14 items-start pt-20 pb-24" style={{ paddingLeft: '340px' }}>
                {/* Vector and Icon */}
                <div className="absolute bottom-0 w-1 bg-gradient-to-b from-indigo-300 from-0% via-indigo-500 via-50% to-black to-100%" style={{ height: '450px', top: '150px', left: '300px', borderRadius: '10px' }}></div>
                {/* Circular Blur Effect for Icon */}
                <div className="absolute left-[270px] w-16 h-16 filter blur-lg" style={{ top: '58px', background: 'radial-gradient(circle, rgba(104,137,255,0.5) 0%, rgba(104,137,255,0) 100%)', zIndex: '5' }}></div>
                <CodeXml className="absolute top-20 bottom-0 text-white" style={{ left: '290px', zIndex: '10' }} />
                <p className="text-2xl text-white ml-6">For Developers</p>

                {/* Header */}
                <div className="relative mt-50 max-w-5xl text-left ml-6 mb-10 mt-20" style={{ zIndex: '10' }}>
                    <h2 className="text-6xl font-bold mb-4 text-indigo-400">Designed by developers for developers</h2>
                    <p className="text-3xl text-white mt-10 mb-10">We provide unlimited repositories, best-in-class version control, and the world’s most powerful open source community—so your team can work more efficiently together.</p>
                </div>

            </div>
            {/* Image for Content */}
            <div className='bg-transparent relative flex flex-col pl-20 items-start'>
                {/* Circular Blur Effect */}
                <div className="absolute left-1/4 -top-32 w-2/3 h-2/3 filter blur-3xl" style={{ background: 'radial-gradient(circle, rgba(104,137,255,0.5) 0%, rgba(104,137,255,0) 70%)', zIndex: '5' }}></div>

                <div className="relative w-full pl-44 pr-44" style={{ zIndex: '10' }}>
                    <Image
                        style={{ borderRadius: '90px 2rem 0.5rem 0.5rem' }}
                        src='/for-developers.png'
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

export default ForDevelopers

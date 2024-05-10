import { AtSign, FileSearch, FolderOpen, Users } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Collaboration() {
    return (
        <div className="relative bg-black bg-fixed bg-cover bg-no-repeat pt-24" style={{ backgroundImage: "url('/bg-stars.png')" }}>
            {/* Part 1 */}
            <div className="bg-transparent relative flex flex-col p-14 items-start pt-20 pb-24" style={{ paddingLeft: '340px' }}>
                {/* Vector */}
                <div className="absolute top-30 bottom-0 w-1 h-96 bg-gradient-to-b from-green-300 from-0% via-green-400 via-35% via-green-500 via-65% to-black to-100%" style={{ left: '300px', borderRadius: '10px' }}></div>
                {/* Circular Blur Effect for Icon */}
                <div className="absolute left-[270px] w-16 h-16 filter blur-lg" style={{ top: '58px', background: 'radial-gradient(circle, rgba(144,238,144,0.5) 0%, rgba(144,238,144,0) 100%)', zIndex: '5' }}></div>
                <Users className="absolute top-20 bottom-0 text-white" style={{ left: '290px', zIndex: '10' }} />
                <p className="text-2xl text-white ml-6">Collaboration</p>

                {/* Header */}
                <div className="relative mt-50 max-w-5xl text-left ml-6 mb-10 mt-10" style={{ zIndex: '10' }}>
                    <h2 className="text-6xl font-bold mb-4 text-green-400">Supercharge collaboration</h2>
                    <p className="text-3xl text-white mt-10 mb-10">We provide unlimited repositories, best-in-class version control, and the world’s most powerful open source community—so your team can work more efficiently together.</p>
                </div>

            </div>
            {/* Image for Content */}
            <div className='bg-transparent relative flex flex-col pl-20 items-start'>
                {/* Circular Blur Effect */}
                <div className="absolute left-1/4 -top-32 w-2/3 h-2/3 filter blur-3xl" style={{ background: 'radial-gradient(circle, rgba(144,238,144,0.5) 0%, rgba(144,238,144,0) 70%)', zIndex: '5' }}></div>

                <div className="relative w-full pl-44 pr-44" style={{ zIndex: '10' }}>
                    <Image
                        style={{ borderRadius: '2rem' }}
                        src='/collaboration.png'
                        alt='productivity'
                        layout='responsive'
                        width={1000}
                        height={500}
                        objectFit='cover'
                    />
                </div>
            </div>

            {/* Part 2 */}
            <div className="bg-transparent bg-fixed bg-no-repeat bg-right relative flex flex-col p-14 items-start" style={{ backgroundImage: "url('/bg-stars.png')", paddingBottom: '300px', paddingLeft: '340px' }}>
                <div className="absolute -top-52 bottom-0 w-1 bg-gradient-to-b from-black from-0% via-green-500 via-35% via-green-500 via-65% to-black to-100%" style={{ height: '800px', left: '300px', borderRadius: '10px' }}></div>

                {/* Function Sections */}
                <div className="flex flex-row items-start ml-36 mt-36 space-x-10">
                    <div className="flex items-center">
                        <FolderOpen className="text-green-400 w-10 h-10 mr-4" />
                        <div className="text-white">
                            <h3 className="text-2xl font-bold">Robust file management</h3>
                            <p>Customize your file setup with folders and private files.</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FileSearch className="text-green-400 w-10 h-10 mr-4" />
                        <div className="text-white">
                            <h3 className="text-2xl font-bold">Blazing fast file search</h3>
                            <p>Search through your name file and text on the canvas.</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <AtSign className="text-green-400 w-10 h-10 mr-4" />
                        <div className="text-white">
                            <h3 className="text-2xl font-bold">Wikilinks & mentions</h3>
                            <p>Construct a knowledge graph across files and teams.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image for Content */}
            <div className='bg-transparent relative flex flex-col pl-20 items-start'>
                {/* Circular Blur Effect */}
                <div className="absolute left-1/4 -top-32 w-2/3 h-2/3 filter blur-3xl" style={{ background: 'radial-gradient(circle, rgba(144,238,144,0.5) 0%, rgba(144,238,144,0) 70%)', zIndex: '5' }}></div>

                <div className="relative w-full pl-44 pr-44" style={{ zIndex: '10' }}>
                    <Image
                        style={{ borderRadius: '2rem' }}
                        src='/collaboration-1.png'
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

export default Collaboration

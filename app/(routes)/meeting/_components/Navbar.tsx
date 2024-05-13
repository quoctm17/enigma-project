import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex-between fixed z-50 w-full bg-enm-bg-side-nav px-6 py-4 lg:px-10'>
            <Link
                href='/' className='flex gap-1 items-center'
            >
                <Image src={'/logo.png'} alt='Enigma logo' width={40} height={40} className='max-sm:size-10' />
                <p className='text-enm-main-text font-bold text-[26px]'>Enigma</p>
            </Link>

            <div className='flex-between gap-5'>

            </div>

        </nav>
    )
}

export default Navbar
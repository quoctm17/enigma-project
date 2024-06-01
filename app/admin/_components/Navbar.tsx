"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const { user }: any = useKindeBrowserClient();
    return (
        <nav className='flex justify-between fixed z-50 w-full bg-enm-bg px-6 py-4 lg:px-10  items-center'>
            <Link
                href='/' className='flex gap-1 items-center'
            >
                <Image src={'/logo.png'} alt='Enigma logo' width={40} height={40} className='max-sm:size-10' />
                <p className='text-enm-main-text font-bold text-[26px]'>Enigma</p>
            </Link>

            <div className='flex justify-end gap-5'>
                <div className='flex gap-2 items-center'>
                    <Image src={user?.picture} alt='user' width={30} height={30} className='rounded-full' />
                </div>
                <div className='gap-2 '>
                    <div className='text-enm-main-text font-bold'>Hello, {user?.given_name}!</div>
                    <div className='text-enm-main-text text-[14px]'>{user?.email}</div>
                </div>

            </div>

        </nav>
    )
}

export default Navbar
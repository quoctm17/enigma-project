import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Header() {
    return (
        <header className="absolute top-0 left-0 w-full text-white z-50">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center px-4 sm:px-6 lg:px-8">
                <a href='/' className='hover:text-gray-100/75'>
                    <div className='flex items-center gap-3 pl-4'>
                        <Image src='/logo.png' alt='logo'
                            width={50}
                            height={50} />
                        <div className="text-white font-bold transition text-2xl"> Enigma </div>
                    </div>
                </a>

                <div className="flex flex-1 items-center pl-8 gap-8 justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">

                            <li>
                                <a className="text-white transition hover:text-gray-100/75" href="#"> Use Cases </a>
                            </li>

                            <li>
                                <a className="text-white transition hover:text-gray-100/75" href='/about'> About </a>
                            </li>

                            <li>
                                <a className="text-white transition hover:text-gray-100/75" href="/pricing"> Pricing </a>
                            </li>

                            <li>
                                <a className="text-white transition hover:text-gray-100/75" href="#"> Resources </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <span
                                className="block rounded-md px-5 py-2.5 text-sm font-medium 
                                text-white transition"
                            >
                                <LoginLink postLoginRedirectURL='/dashboard'>Login</LoginLink>
                            </span>

                            <span
                                className="hidden rounded-md bg-gray-100 
                                px-4 py-2.5 text-sm font-medium
                                text-black transition
                                hover:text-slate-200 sm:block"
                            >
                                <RegisterLink className='flex items-center'>Register <ArrowRight className='ml-3' /></RegisterLink>
                            </span>
                        </div>

                        <button
                            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

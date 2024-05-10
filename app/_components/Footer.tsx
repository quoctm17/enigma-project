import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="bg-black">
                <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div>
                            <a href='#' className='hover:text-gray-100/75'>
                                <div className='flex items-center gap-3'>
                                    <Image src='/logo.png' alt='logo'
                                        width={50}
                                        height={50} />
                                    <div className="text-white font-bold transition text-2xl"> Enigma </div>
                                </div>
                            </a>

                            <p className="mt-6 max-w-md text-center leading-relaxed text-white sm:max-w-xs sm:text-left dark:text-gray-400">
                                Subscribe to our newsletter
                            </p>
                            <p className="max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left dark:text-gray-400">
                                Get product updates, company news, and more.
                            </p>

                            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
                                <li>
                                    <a
                                        href="#"
                                        rel="noreferrer"
                                        target="_blank"
                                        className="text-indigo-700 transition hover:text-indigo-700/75 dark:indigo-gray-500 dark:hover:text-indigo-500/75"
                                    >
                                        <span className="sr-only">Facebook</span>
                                        <Facebook />
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        rel="noreferrer"
                                        target="_blank"
                                        className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-indigo-500 dark:hover:text-indigo-500/75"
                                    >
                                        <span className="sr-only">Gmail</span>
                                        <Mail />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Component */}
                        <div className="grid grid-cols-1 gap-8 ml-20 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">

                            {/* Use Cases */}
                            <div className="text-center sm:text-left">
                                <p className="text-lg font-medium text-indigo-600 dark:text-white">About Us</p>

                                <ul className="mt-8 space-y-4 text-sm">
                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            Architect Diagram
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            Design Docs
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            Documentation
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            Brainstorming
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            Wifeframes
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            Whiteboard Interview
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* About */}
                            <div className="text-center sm:text-left">
                                <p className="text-lg font-medium text-indigo-600 dark:text-white">About</p>

                                <ul className="mt-8 space-y-4 text-sm">
                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            Terms
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="#"
                                        >
                                            Pricing
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Us */}
                            <div className="text-center sm:text-left">
                                <p className="text-lg font-medium text-indigo-600 dark:text-white">Contact Us</p>

                                <ul className="mt-8 space-y-4 text-sm">
                                    <li>
                                        <a
                                            className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                            href="#"
                                        >
                                            <Mail className=" text-gray-500" />

                                            <span className="flex-1 text-gray-500"> enigmaproject131 </span>
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                            href="#"
                                        >
                                            <Phone className=" text-gray-500" />
                                            <span className="flex-1 ml-2 text-gray-500">0123456789</span>
                                        </a>
                                    </li>

                                    <li
                                        className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                    >
                                        <MapPin className=" text-gray-500" />

                                        <div className="-mt-0.5 flex-1 not-italic text-gray-500">
                                            213 Lane, London, United Kingdom
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* All Right Served */}
                    <div className="mt-12 border-t border-gray-100 pt-6 dark:border-gray-800">
                        <div className="text-center sm:flex sm:justify-between sm:text-left">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="block sm:inline">All rights reserved.</span>

                                <a
                                    className="inline-block text-indigo-600 underline transition hover:text-indigo-600/75 dark:text-indigo-500 dark:hover:text-indigo-500/75"
                                    href="#"
                                >
                                    Terms & Conditions
                                </a>

                                <span>&middot;</span>

                                <a
                                    className="inline-block text-indigo-600 underline transition hover:text-indigo-600/75 dark:text-indigo-500 dark:hover:text-indigo-500/75"
                                    href="#"
                                >
                                    Privacy Policy
                                </a>
                            </p>

                            <p className="mt-4 text-sm text-indigo-500 sm:order-first sm:mt-0 dark:text-indigo-400">
                                &copy; 2024 Enigma Project
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer

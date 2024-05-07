'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';

function About() {
    const [activeButton, setActiveButton] = useState<string>('Document'); // Mặc định active là 'Document'

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    return (
        <div>
            <header className='p-3 border-b flex justify-between items-center bg-enm-bg-side-nav'>
                <div className='flex gap-2 items-center'>
                    <Image src={'/logo.png'}
                        alt='logo'
                        height={40}
                        width={40} />
                    <h2 className='text-enm-main-text font-bold text-[18px]'>Work at Enigma</h2>
                    <p className='text-enm-secondary-text border-2 border-enm-secondary-text px-2 rounded ml-4'>Read Only</p>
                </div>
                <div className="flex gap-1">
                    <Button
                        onClick={() => handleButtonClick('Document')}
                        className={activeButton === 'Document' ? 'bg-enm-primary text-white' : ''}
                    >
                        Document
                    </Button>
                    <Button
                        onClick={() => handleButtonClick('Both')}
                        className={activeButton === 'Both' ? 'bg-enm-primary text-white' : ''}
                    >
                        Both
                    </Button>
                    <Button
                        onClick={() => handleButtonClick('Canvas')}
                        className={activeButton === 'Canvas' ? 'bg-enm-primary text-white' : ''}
                    >
                        Canvas
                    </Button>
                </div>
                <div>
                    {/* <Button>Signin</Button> */}
                    <a
                        className="block rounded-md px-5 py-2.5 text-sm font-medium 
                                text-white transition hover:underline"
                        href="#"
                    >
                        <LoginLink postLoginRedirectURL='/dashboard'>Login</LoginLink>
                    </a>
                </div>
            </header>
            {activeButton === 'Document' && (
                <div className="w-1/2 mt-8 mb-8 mx-auto">
                    <h2 className="text-3xl font-bold mb-5">Work at Enigma</h2>
                    <h2 className="text-2xl font-bold mb-5">What we do</h2>
                    <p className="mb-5">
                        Enigma is an ideation and brainstorming app for technical teams.
                    </p>
                    <p className="mb-5 leading-8">
                        We allow users to communicate ideas at the speed of thought using a markdown note editor, a lightweight canvas, and audio chat.
                    </p>
                    <p className="mb-5 leading-8">
                        Engineering teams use Enigma for technical specs, UI/UX wireframes, and systems interviews. No more having to <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">⌘</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Tab</kbd> through 4-5 apps just through a technical brainstorming session.
                    </p>
                    <p className='mb-5 leading-8'>
                        Since soft launching in Mar. 2021, 1.5M+ users have spent 300K+ hours in Enigma. We raised significant venture funding from top investors like Elad Gil.
                    </p>
                    <h2 className="text-2xl font-bold mt-4 mb-5">How we work</h2>
                    <p className='mb-2'>User obsession. We sweat the details and take pride in delighting users.</p>
                    <ul className="list-disc ml-5 leading-9">
                        <li>Owners wanted. Everyone owns problems end-to-end.</li>
                        <li>Move quickly but deliberately. We ship small and iterate based on user feedback.</li>
                    </ul>
                    <h2 className="text-2xl font-bold mt-4 mb-5">Open roles</h2>
                    <p >No open roles currently</p>
                </div>
            )}
        </div>
    );
}

export default About;

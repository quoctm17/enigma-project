import { Button } from '@/components/ui/button';
import { Link as LucideLink, Save, Video } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';


function WorkspaceHeader({ onSave }: any) {
    return (
        <div className='p-3 border-b flex justify-between items-center bg-enm-bg-side-nav'>
            <div className='flex gap-2 items-center'>
                <Image src={'/logo.png'}
                    alt='logo'
                    height={40}
                    width={40} />
                <h2 className='text-enm-main-text'>File Name</h2>
            </div>
            <div className='flex items-center gap-4'>
                <Link href="/meeting/home">
                    {/* <Button className='h-8 text-[16px] gap-2 bg-gradient-to-r from-sky-600 to-enm-primary hover:from-sky-600 hover:to-sky-600'>
                        <Video className='h-4 w-4' /> Meeting
                    </Button> */}

                    <div className="h-8 flex items-center h-full w-full border-2 border-pink-300 px-3 rounded-md">
                        <Video className='h-5 w-5 text-pink-400' />
                        <h1 className="text-[16px] font-bold py-1 pl-4 bg-gradient-to-r from-pink-400 via-pink-300 to-sky-400 inline-block text-transparent bg-clip-text">Meeting</h1>
                    </div>

                </Link>
            </div>
            <div className='flex items-center gap-4'>
                <Button className='h-8 text-[12px] gap-2 bg-gradient-to-r from-pink-500 to-enm-primary hover:from-pink-600 hover:to-sky-600'
                    onClick={() => onSave()}
                >
                    Save <Save className='h-4 w-4' />
                </Button>
                <Button className='h-8 text-[12px] gap-2 bg-gradient-to-r from-pink-500 to-enm-primary hover:from-pink-600 hover:to-sky-600'>
                    Share <LucideLink className='h-4 w-4' />
                </Button>
            </div>

        </div>
    )
}

export default WorkspaceHeader;

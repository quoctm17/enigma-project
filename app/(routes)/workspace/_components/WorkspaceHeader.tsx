import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

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
                <Button className='h-8 text-[12px]
            gap-2 bg-pink-400 hover:bg-pink-500'
                    onClick={() => onSave()}
                >
                    Save <Save className='h-4 w-4' /></Button>
                <Button className='h-8 text-[12px]
            gap-2 bg-enm-primary hover:bg-sky-600'>
                    Share <Link className='h-4 w-4' /></Button>
            </div>
        </div>
    )
}

export default WorkspaceHeader

import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Header() {
    const { user }: any = useKindeBrowserClient();
    return (
        <div className='flex justify-end w-full gap-2 items-center'>
            <div className='flex gap-2 items-center border rounded-md p-1 '>
                <Search color='white' className='h-4 w-4 ' />
                <input className='bg-transparent text-enm-main-text focus:outline-none' type='text' placeholder='Search for...' />
            </div>
            <div>
                <Image src={user?.picture} alt='user'
                    width={30}
                    height={30}
                    className='rounded-full'
                />
            </div>
            <Button className='gap-2 flex
            h-8 bg-gradient-to-r from-pink-500 to-enm-primary hover:from-pink-600 hover:to-sky-500
            '><Send className='h-4 w-4' /> Invite</Button>
        </div>
    )
}

export default Header

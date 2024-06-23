import { Button } from '@/components/ui/button'
import { Archive, Flag, Github } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import PricingDialog from './PricingDialog'

function SideNavBottomSection({ onFileCreate, totalFiles, maxFiles }: any) {
    const menuList = [
        {
            id: 1,
            name: 'Getting Started',
            icon: Flag,
            path: ''
        },
        {
            id: 2,
            name: 'Github',
            icon: Github,
            path: ''
        },
        {
            id: 3,
            name: 'Archie',
            icon: Archive,
            path: ''
        }
    ]
    const [fileInput, setFileInput] = useState('');
    return (
        <div>
            {menuList.map((menu, index) => (
                <h2 key={index} className='flex gap-2 p-1 px-2 text-[14px] 
                hover:bg-enm-bg-hover rounded-md cursor-pointer text-enm-main-text'>
                    <menu.icon className='h-5 w-5' />
                    {menu.name}</h2>
            ))}

            <Dialog>
                <DialogTrigger className='w-full' asChild>
                    <div className="w-full rounded-md bg-gradient-to-r from-pink-500 to-enm-primary p-1 mt-4 cursor-pointer">
                        <div className="flex h-full w-full bg-enm-bg-side-nav back">
                            <h1 className="text-[16px] font-bold bg-gradient-to-r from-pink-400 via-sky-400 to-sky-400 inline-block text-transparent bg-clip-text ml-4 py-2">Create New File</h1>
                        </div>
                    </div>
                </DialogTrigger>
                {totalFiles < maxFiles ?
                    <DialogContent className='bg-enm-bg-side-nav border-none text-enm-main-text'>
                        <DialogHeader >
                            <DialogTitle>Create New File</DialogTitle>
                            <DialogDescription>
                                <Input placeholder='Enter File Name'
                                    className='mt-3'
                                    onChange={(e) => setFileInput(e.target.value)}
                                />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="">
                            <DialogClose asChild>
                                <Button type="button"
                                    className='bg-gradient-to-r from-pink-500 to-enm-primary hover:from-pink-600 hover:to-sky-600'
                                    disabled={!(fileInput && fileInput.length > 3)}
                                    onClick={() => onFileCreate(fileInput)}
                                >
                                    Create
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent> :
                    <PricingDialog />}
            </Dialog>

            <div className='h-4 w-full bg-gray-200 rounded-full mt-5'>
                <div className={`h-4 bg-enm-primary rounded-full`}
                    style={{ width: `${(totalFiles / maxFiles) * 100}%` }}
                >
                </div>
            </div>

            <h2 className='text-[12px] mt-3 text-enm-main-text'>
                <strong>{totalFiles}</strong> out of <strong>{maxFiles}</strong> files used</h2>
            <h2 className='text-[12px] mt-1 text-enm-main-text'>
                <span style={{ textDecoration: 'underline' }}>Upgrade</span> your plan for unlimited access.
            </h2>
        </div>
    )
}

export default SideNavBottomSection;

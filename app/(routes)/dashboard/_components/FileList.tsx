import { FileListContext } from '@/app/_context/FilesListContext'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Archive, MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

export interface FILE {
    archive: boolean,
    createdBt: string,
    document: string,
    fileName: string,
    teamId: string,
    whiteboard: string,
    _id: string,
    _creationTime: number
}
function FileList() {

    const { fileList_, setFileList_ } = useContext(FileListContext);
    const [fileList, setFileList] = useState<any>();
    const { user }: any = useKindeBrowserClient();
    const router = useRouter();
    useEffect(() => {
        fileList_ && setFileList(fileList_);
        console.log(fileList_);
    }, [fileList_])
    return (
        <div className='mt-10'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-neutral-400 text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-enm-main-text">File Name</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-enm-main-text">Created At</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-enm-main-text">Edited</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-enm-main-text">Author</td>
                        </tr>
                    </thead>

                    <tbody>
                        {fileList && fileList.map((file: FILE, index: number) => (
                            <tr key={index} className="hover:bg-enm-bg-hover cursor-pointer"
                                onClick={() => router.push('/workspace/' + file._id)}
                            >
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-enm-main-text">
                                    {file.fileName}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-enm-main-text">
                                    {moment(file._creationTime).format('DD MMM YYYY')}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-enm-main-text">
                                    {moment(file._creationTime).format('DD MMM YYYY')}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-enm-main-text">
                                    <Image src={user?.picture}
                                        alt='user'
                                        width={30}
                                        height={30}
                                        className='rounded-full'
                                    />
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-enm-main-text">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreHorizontal />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='bg-enm-bg-side-nav text-enm-main-text border-none shadow-md shadow-enm-bg'>
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className='gap-3'>
                                                <Archive className='h-4 w-4' /> Archive</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FileList
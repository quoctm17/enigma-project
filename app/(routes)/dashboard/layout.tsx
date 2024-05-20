// app/(routes)/dashboard/layout.tsx
"use client"
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import { FileListContext } from '@/app/_context/FilesListContext';

function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const convex = useConvex();
    const { user }: any = useKindeBrowserClient();
    const [fileList_, setFileList_] = useState();
    const [activeTeam, setActiveTeam] = useState(); // Thêm state cho activeTeam
    const router = useRouter();

    useEffect(() => {
        user && checkTeam();
    }, [user]);

    const checkTeam = async () => {
        const result = await convex.query(api.teams.getTeam, { email: user?.email });

        if (!result?.length) {
            router.push('teams/create');
        } else {
            setActiveTeam(result[0]); // Thiết lập activeTeam
        }
    };

    return (
        <div>
            <FileListContext.Provider value={{ fileList_, setFileList_, activeTeam, setActiveTeam }}>
                <div className='grid grid-cols-4'>
                    <div className='h-screen w-64 fixed'>
                        <SideNav />
                    </div>
                    <div className='col-span-4 ml-72'>
                        {children}
                    </div>
                </div>
            </FileListContext.Provider>
        </div>
    );
}

export default DashboardLayout;
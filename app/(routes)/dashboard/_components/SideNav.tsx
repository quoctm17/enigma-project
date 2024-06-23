// app/(routes)/dashboard/_components/SideNav.tsx
import React, { useContext, useEffect, useState } from 'react';
import SideNavTopSection from './SideNavTopSection';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import SideNavBottomSection from './SideNavBottomSection';
import { api } from '@/convex/_generated/api';
import { useConvex, useQuery } from 'convex/react';
import { toast } from 'sonner';
import { FileListContext } from '@/app/_context/FilesListContext';

function SideNav() {
    const { user }: any = useKindeBrowserClient();
    const convex = useConvex();
    const { fileList_, setFileList_, activeTeam, setActiveTeam } = useContext(FileListContext);
    const [maxFiles, setMaxFiles] = useState(0);

    useEffect(() => {
        if (user?.email) {
            const fetchTeamData = async () => {
                const teamList = await convex.query(api.teams.getTeam, { email: user.email });
                if (teamList && teamList.length > 0) {
                    setActiveTeam(teamList[0]);
                }
            };
            fetchTeamData();
        }
    }, [user?.email]);

    useEffect(() => {
        if (activeTeam) {
            getFiles();
            calculateMaxFiles();
        }
    }, [activeTeam]);

    const getFiles = async () => {
        if (!activeTeam) return;
        const result = await convex.query(api.files.getFiles, { teamId: activeTeam._id });
        console.log(result);
        setFileList_(result);
    };

    const calculateMaxFiles = async () => {
        if (!activeTeam) return;

        // Get user info
        const userInfo = await convex.query(api.user.getUser, { email: activeTeam.createBy });
        if (!userInfo || !userInfo.length) throw new Error('User not found');

        // Get plan info
        const planList = await convex.query(api.subscriptionPlan.getSubscriptionPlans);
        const plan = planList.find(p => p.name === userInfo[0].currentPlan);
        if (!plan) throw new Error('Plan not found');

        setMaxFiles(plan.maxFiles);
    };

    return (
        <div className='bg-enm-bg-side-nav h-screen fixed w-72 p-6 flex flex-col'>
            <div className='flex-1'>
                <SideNavTopSection user={user} setActiveTeamInfo={setActiveTeam} />
            </div>
            <div>
                <SideNavBottomSection
                    totalFiles={fileList_?.length}
                    maxFiles={maxFiles}
                    onFileCreate={async (fileName: string) => {
                        const result = await convex.mutation(api.files.createFile, {
                            fileName,
                            teamId: activeTeam?._id,
                            createdBy: user?.email,
                            archive: false,
                            document: '',
                            whiteboard: ''
                        });
                        if (result) {
                            getFiles();
                            toast('File created successfully!');
                        } else {
                            toast('Error while creating file');
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default SideNav;

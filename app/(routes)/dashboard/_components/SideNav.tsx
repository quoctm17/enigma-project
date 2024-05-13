import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import SideNavTopSection, { TEAM } from './SideNavTopSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import SideNavBottomSection from './SideNavBottomSection'
import { api } from '@/convex/_generated/api'
import { useConvex, useMutation, useQuery } from 'convex/react'
import { toast } from 'sonner'
import { FileListContext } from '@/app/_context/FilesListContext'

function SideNav() {
    const { user }: any = useKindeBrowserClient();
    const createFile = useMutation(api.files.createFile);
    const [activeTeam, setActiveTeam] = useState<TEAM | any>();
    const convex = useConvex();
    const [totalFiles, setTotalFiles] = useState<Number>();
    const { fileList_, setFileList_ } = useContext(FileListContext);
    const teamList = useQuery(api.teams.getTeam, { email: user?.email });

    useEffect(() => {
        if (teamList) {
            setActiveTeam(teamList[0]);
        }
    }, [teamList]);

    useEffect(() => {
        activeTeam && getFiles();
    }, [activeTeam])

    const onFileCreate = (fileName: string) => {
        console.log(fileName)
        createFile({
            fileName: fileName,
            teamId: activeTeam?._id,
            createdBy: user?.email,
            archive: false,
            document: '',
            whiteboard: ''
        }).then(resp => {
            if (resp) {
                getFiles();
                toast('File created successfully!')
            }
        }, (e) => {
            toast('Error while creating file')

        })
    }

    const getFiles = async () => {
        const result = await convex.query(api.files.getFiles, { teamId: activeTeam._id });
        console.log(result);
        setFileList_(result);
        setTotalFiles(result?.length)
    }

    return (
        <div
            className='bg-enm-bg-side-nav h-screen
            fixed w-72 p-6
            flex flex-col'
        >
            <div className='flex-1'>
                <SideNavTopSection user={user}
                    setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)} />
            </div>

            <div>
                <SideNavBottomSection
                    totalFiles={totalFiles}
                    onFileCreate={onFileCreate}
                />
            </div>
        </div>
    )
}

export default SideNav

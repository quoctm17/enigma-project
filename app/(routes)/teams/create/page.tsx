"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

function CreatTeam() {

    const [teamName, setTeamName] = useState('');
    const createTeam = useMutation(api.teams.createTeam);
    const { user }: any = useKindeBrowserClient();
    const router = useRouter();
    const createNewTeam = () => {
        createTeam({
            teamName: teamName,
            createBy: user?.email
        }).then(resp => {
            console.log(resp);
            if (resp) {
                router.push('/dashboard')
                toast('Team created successfully!!!')
            }
        })
    }
    return (
        <div className='px-6 md:px-16 py-16 min-h-screen bg-enm-bg'>
            <Image src='/logo.png'
                alt='logo'
                width={50}
                height={50} />
            <div className='flex flex-col items-center mt-8'>
                <h2 className='font-bold text-[40px] py-3 text-enm-main-text'>What should we call your team?</h2>
                <h2 className='text-enm-secondary-text'>You can always change this later from settings</h2>
                <div className='mt-7 w-[40%]'>
                    <label className='text-enm-secondary-text'>Team Name</label>
                    <Input placeholder='Team name'
                        className='mt-3'
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </div>
                <Button className='bg-enm-primary mt-10 w-[30%] hover:bg-sky-600'
                    disabled={!(teamName && teamName?.length > 0)}
                    onClick={() => createNewTeam()}
                >Create Team</Button>

            </div>
        </div>
    )
}

export default CreatTeam

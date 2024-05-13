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
    const createNewTeam = async () => {
        if (!user?.email) {
            toast.error('User not logged in');
            return;
        }
        try {
            console.log('Creating team with:', { teamName, createBy: user.email });
            const response = await createTeam({
                teamName: teamName,
                createBy: user.email
            });
            console.log('Team created:', response);
            if (response) {
                toast.success('Team created successfully!!!');
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Error creating team:', error);
            toast.error('Failed to create team');
        }
    }

    return (
        <div className='px-6 md:px-16 py-16 min-h-screen bg-enm-bg'>
            <Image src='/logo.png'
                alt='logo'
                width={50}
                height={50} />
            <div className='flex flex-col items-center mt-8'>
                <h2 className='font-bold text-[50px] py-3 text-enm-main-text'>What should we call your team?</h2>
                <h2 className='text-enm-secondary-text text-2xl'>You can always change this later from settings</h2>
                <div className='mt-10 w-[40%]'>
                    <label className='text-enm-secondary-text text-lg'>Team Name</label>
                    <Input placeholder='Team name'
                        className='mt-3 '
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </div>
                <Button className='text-[18px] bg-gradient-to-r from-pink-500 to-enm-primary hover:from-pink-600 hover:to-sky-600 mt-10 w-[30%]'         
                    disabled={!(teamName && teamName?.length > 0)}
                    onClick={() => createNewTeam()}
                >Create Team</Button>

            </div>
        </div>
    )
}

export default CreatTeam

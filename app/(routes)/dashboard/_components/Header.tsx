import { FileListContext } from '@/app/_context/FilesListContext';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMutation } from 'convex/react';
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import React, { useContext, useState } from 'react'
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

function Header() {
    const { user }: any = useKindeBrowserClient();
    const [inviteEmail, setInviteEmail] = useState('');
    const inviteUser = useMutation(api.teams.inviteUser);
    const { activeTeam, setActiveTeam } = useContext(FileListContext);

    const handleInvite = async () => {
        if (inviteEmail && activeTeam?._id) {
            try {
                console.log(`Inviting ${inviteEmail} to team ${activeTeam._id}`);
                const response = await inviteUser({
                    teamId: activeTeam._id,
                    email: inviteEmail,
                });
                console.log('Invite Response:', response);
                if (response.success) {
                    toast.success('User invited successfully!');
                    setActiveTeam({
                        ...activeTeam,
                        members: [...activeTeam.members, inviteEmail]
                    });
                } else {
                    toast.error('Failed to invite user');
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error inviting user:', error);
                    toast.error(`Error: ${error.message}`);
                } else {
                    toast.error('An unknown error occurred');
                }

            }
            setInviteEmail('');
        }
    };


    return (
        <div className='flex justify-end w-full gap-2 items-center'>
            <div className='flex gap-2 items-center border rounded-md p-1 '>
                <Search color='white' className='h-4 w-4 ' />
                <input className='bg-transparent text-enm-main-text focus:outline-none' type='text' placeholder='Search for...' />
            </div>
            <div>
                <Image src={user?.picture} alt='user' width={30} height={30} className='rounded-full' />
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='gap-2 flex h-8 bg-gradient-to-r from-pink-500 to-enm-primary hover:from-pink-600 hover:to-sky-500'>
                        <Send className='h-4 w-4' /> Invite
                    </Button>
                </DialogTrigger>
                <DialogContent className='bg-black'>
                    <DialogHeader>
                        <DialogTitle className='text-white'>Invite User</DialogTitle>
                        <DialogDescription className='text-white'>
                            Enter the email address of the user you want to invite to this team.
                        </DialogDescription>
                    </DialogHeader>
                    <Input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="User's email" />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className='bg-gradient-to-r from-pink-500 to-enm-primary hover:from-pink-600 hover:to-sky-500' onClick={handleInvite} disabled={!inviteEmail}>Invite</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Header

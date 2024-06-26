import { FileListContext, Team } from '@/app/_context/FilesListContext';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useMutation } from 'convex/react';
import { Search, Send, UserMinus, LogOut } from 'lucide-react';
import Image from 'next/image';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import React, { useContext, useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { DialogClose } from '@radix-ui/react-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface FILE {
    archive: boolean;
    createdBy: string;
    document: string;
    fileName: string;
    teamId: string;
    whiteboard: string;
    _id: string;
    _creationTime: number;
}

function Header() {
    const { user } = useKindeBrowserClient();
    const [inviteEmail, setInviteEmail] = useState('');
    const [openInviteDialog, setOpenInviteDialog] = useState(false);
    const [openMemberDialog, setOpenMemberDialog] = useState(false);
    const inviteUser = useMutation(api.teams.inviteUser);
    const removeUser = useMutation(api.teams.removeUser);
    const { activeTeam, setActiveTeam, setFileList_ } = useContext(FileListContext);

    const handleInvite = async () => {
        if (inviteEmail && activeTeam?._id) {
            try {
                const response = await inviteUser({
                    teamId: activeTeam._id,
                    email: inviteEmail,
                });
                if (response.success) {
                    toast.success(response.message);
                    setActiveTeam((prevTeam: Team) => ({
                        ...prevTeam,
                        members: [...prevTeam.members, inviteEmail],
                        roles: { ...prevTeam.roles, [inviteEmail]: 'Collaborator' },
                        images: { ...prevTeam.images, [inviteEmail]: user?.picture },
                    }));
                    setFileList_((prevList: FILE[]) => [...prevList]);
                    setOpenInviteDialog(false);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error('Error inviting user');
            }
            setInviteEmail('');
        } else {
            toast.error('Invite email or active team ID is missing');
        }
    };

    const handleRemoveUser = async (email: string) => {
        if (email && activeTeam?._id) {
            try {
                const response = await removeUser({
                    teamId: activeTeam._id,
                    email: email,
                });
                if (response.success) {
                    toast.success(response.message);
                    setActiveTeam((prevTeam: Team) => ({
                        ...prevTeam,
                        members: prevTeam.members.filter((member: string) => member !== email),
                        roles: Object.fromEntries(Object.entries(prevTeam.roles).filter(([key]) => key !== email)),
                        images: Object.fromEntries(Object.entries(prevTeam.images).filter(([key]) => key !== email)),
                    }));
                    setFileList_((prevList: FILE[]) => [...prevList]);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error('Error removing user');
            }
        } else {
            toast.error('User email or active team ID is missing');
        }
    };

    const handleLeaveTeam = async () => {
        if (user?.email && activeTeam?._id) {
            await handleRemoveUser(user.email);
        }
    };

    return (
        <div className="flex justify-end w-full gap-2 items-center">
            <div className="flex gap-2 items-center border rounded-md p-1 ">
                <Search color="white" className="h-4 w-4" />
                <input
                    className="bg-transparent text-enm-main-text focus:outline-none"
                    type="text"
                    placeholder="Search for..."
                />
            </div>
            <div className="flex gap-2 items-center">
                {activeTeam?.members
                    .filter((member: string) => member !== user?.email)
                    .slice(0, 3)
                    .map((member: string, index: number) => (
                        <Image
                            key={index}
                            src={activeTeam.images[member]}
                            alt="member"
                            width={30}
                            height={30}
                            className="rounded-full"
                        />
                    ))}
                {activeTeam?.members.filter((member: string) => member !== user?.email).length > 3 && (
                    <div
                        className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full"
                        onClick={() => setOpenMemberDialog(true)}
                    >
                        <span className="text-black">...</span>
                    </div>
                )}
            </div>
            <div>
                <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.picture || ''} />
                    <AvatarFallback>{user?.given_name?.substring(0, 2)}</AvatarFallback>
                </Avatar>
            </div>
            <Dialog open={openInviteDialog} onOpenChange={setOpenInviteDialog}>
                <DialogTrigger asChild>
                    <Button className="gap-2 flex h-8 bg-gradient-to-r from-pink-500 to-enm-primary hover:from-pink-600 hover:to-sky-600">
                        <Send className="h-4 w-4" /> Invite
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-black">
                    <DialogHeader>
                        <DialogTitle className="text-white">Invite User</DialogTitle>
                        <DialogDescription className="text-white">
                            Enter the email address of the user you want to invite to this team.
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="User's email"
                    />
                    <DialogFooter>
                        <DialogClose>
                            <Button
                                className="bg-gradient-to-r from-pink-500 to-enm-primary hover:from-pink-600 hover:to-sky-500"
                                onClick={handleInvite}
                                disabled={!inviteEmail}
                            >
                                Invite
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={openMemberDialog} onOpenChange={setOpenMemberDialog}>
                <DialogTrigger asChild>
                    <Button className="gap-2 flex h-8 bg-gradient-to-r from-pink-500 to-enm-primary hover:from-pink-600 hover:to-sky-600">
                        <UserMinus className="h-4 w-4" /> Manage Members
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-black">
                    <DialogHeader>
                        <DialogTitle className="text-white">Manage Team Members</DialogTitle>
                        <DialogDescription className="text-white">
                            Below is a list of team members. You can remove collaborators from the team.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        {activeTeam?.members.map((member: string) => (
                            <div key={member} className="flex justify-between items-center py-2">
                                <span className="text-white">{member}</span>
                                {activeTeam.roles[member] !== 'Owner' &&
                                    (member === user?.email ? (
                                        <Button className="bg-red-500 hover:bg-red-600" onClick={handleLeaveTeam}>
                                            Leave Team
                                        </Button>
                                    ) : (
                                        activeTeam.roles[user?.email!] === 'Owner' && (
                                            <Button
                                                className="bg-red-500 hover:bg-red-600"
                                                onClick={() => handleRemoveUser(member)}
                                            >
                                                Remove
                                            </Button>
                                        )
                                    ))}
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button className="bg-gradient-to-r from-pink-500 to-enm-primary hover:from-pink-600 hover:to-sky-500">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Header;

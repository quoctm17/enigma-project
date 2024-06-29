"use client"
import { useState } from 'react';
import { useConvex, useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';

type Id<T> = string & { __tableName: T };

interface Team {
    _id: Id<"teams">;
    teamName: string;
    createBy: string;
    members: string[];
    roles: { [key: string]: string };
    images: { [key: string]: string };
}

const initialTeam = {
    teamName: '',
    createBy: '',
    image: ''
};

function TeamsPage() {
    const convex = useConvex();
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [isNewTeamModalOpen, setIsNewTeamModalOpen] = useState(false);
    const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);
    const [newTeam, setNewTeam] = useState(initialTeam);

    const teams = useQuery(api.teams.getAllTeams) as Team[] | undefined;
    const createTeam = useMutation(api.teams.createTeam);
    const inviteUser = useMutation(api.teams.inviteUser);
    const removeUser = useMutation(api.teams.removeUser);

    const handleCreateTeam = async () => {
        await createTeam(newTeam);
        setNewTeam(initialTeam);
        setIsNewTeamModalOpen(false);
    };

    const handleInviteUser = async (teamId: Id<"teams">, email: string) => {
        await inviteUser({ teamId, email });
    };

    const handleRemoveUser = async (teamId: Id<"teams">, email: string) => {
        await removeUser({ teamId, email });
    };

    return (
        <div className="p-6 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Teams</h1>
            <Button onClick={() => setIsNewTeamModalOpen(true)} className="mb-6 bg-blue-600 hover:bg-blue-700 text-white">Create Team</Button>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Team Name</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teams?.map((team) => (
                        <TableRow key={team._id}>
                            <TableCell>{team.teamName}</TableCell>
                            <TableCell>{team.createBy}</TableCell>
                            <TableCell>{team.members.join(', ')}</TableCell>
                            <TableCell>
                                <Button onClick={() => { setSelectedTeam(team); setIsEditTeamModalOpen(true); }} className="bg-green-600 hover:bg-green-700 text-white">Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal isOpen={isEditTeamModalOpen} onClose={() => setIsEditTeamModalOpen(false)}>
                <div className="p-6 bg-gray-800 text-white">
                    <h2 className="text-2xl font-semibold mb-4">Edit Team</h2>
                    {selectedTeam && (
                        <>
                            <Input
                                value={selectedTeam.teamName}
                                onChange={(e) => setSelectedTeam({ ...selectedTeam, teamName: e.target.value })}
                                placeholder="Team Name"
                                className="mb-4 bg-gray-700 text-white placeholder-gray-400"
                            />
                            <Input
                                value={selectedTeam.images[selectedTeam.createBy]}
                                onChange={(e) => setSelectedTeam({ ...selectedTeam, images: { ...selectedTeam.images, [selectedTeam.createBy]: e.target.value } })}
                                placeholder="Image URL"
                                className="mb-4 bg-gray-700 text-white placeholder-gray-400"
                            />
                            <Button onClick={() => handleInviteUser(selectedTeam._id, selectedTeam.createBy)} className="bg-blue-600 hover:bg-blue-700 text-white mb-2">Invite User</Button>
                            <Button onClick={() => handleRemoveUser(selectedTeam._id, selectedTeam.createBy)} className="bg-red-600 hover:bg-red-700 text-white">Remove User</Button>
                        </>
                    )}
                </div>
            </Modal>

            <Modal isOpen={isNewTeamModalOpen} onClose={() => setIsNewTeamModalOpen(false)}>
                <div className="p-6 bg-gray-800 text-white">
                    <h2 className="text-2xl font-semibold mb-4">Create Team</h2>
                    <Input
                        value={newTeam.teamName}
                        onChange={(e) => setNewTeam({ ...newTeam, teamName: e.target.value })}
                        placeholder="Team Name"
                        className="mb-4 bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                        value={newTeam.createBy}
                        onChange={(e) => setNewTeam({ ...newTeam, createBy: e.target.value })}
                        placeholder="Created By"
                        className="mb-4 bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                        value={newTeam.image}
                        onChange={(e) => setNewTeam({ ...newTeam, image: e.target.value })}
                        placeholder="Image URL"
                        className="mb-4 bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Button onClick={handleCreateTeam} className="bg-blue-600 hover:bg-blue-700 text-white">Create</Button>
                </div>
            </Modal>
        </div>
    );
}

export default TeamsPage;

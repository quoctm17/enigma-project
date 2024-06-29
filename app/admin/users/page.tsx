"use client"
import { useState } from 'react';
import { useConvex, useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';

interface User {
    name: string;
    email: string;
    image: string;
    currentPlan: string;
}

function UsersPage() {
    const convex = useConvex();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [newUser, setNewUser] = useState<User | null>({
        name: '',
        email: '',
        image: '',
        currentPlan: ''
    });

    const users = useQuery(api.user.getAllUsers) as User[] | undefined;
    const createUser = useMutation(api.user.createUser);
    const updateUserPlan = useMutation(api.user.updateUserPlan);

    const handleCreateUser = async () => {
        if (newUser) {
            await createUser(newUser);
            setNewUser({
                name: '',
                email: '',
                image: '',
                currentPlan: ''
            });
        }
    };

    const handleUpdateUser = async () => {
        if (editingUser) {
            await updateUserPlan({ email: editingUser.email, currentPlan: editingUser.currentPlan });
            setEditingUser(null);
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Users</h1>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Create User</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        type="text"
                        placeholder="Name"
                        value={newUser?.name || ''}
                        onChange={(e) => setNewUser(newUser ? { ...newUser, name: e.target.value } : null)}
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={newUser?.email || ''}
                        onChange={(e) => setNewUser(newUser ? { ...newUser, email: e.target.value } : null)}
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                        type="text"
                        placeholder="Image URL"
                        value={newUser?.image || ''}
                        onChange={(e) => setNewUser(newUser ? { ...newUser, image: e.target.value } : null)}
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                        type="text"
                        placeholder="Current Plan"
                        value={newUser?.currentPlan || ''}
                        onChange={(e) => setNewUser(newUser ? { ...newUser, currentPlan: e.target.value } : null)}
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                </div>
                <Button onClick={handleCreateUser} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Create User</Button>
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Users List</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Current Plan</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((user) => (
                            <TableRow key={user.email}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.currentPlan}</TableCell>
                                <TableCell>
                                    <Button onClick={() => setEditingUser(user)} variant="secondary" className="bg-green-600 hover:bg-green-700">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {editingUser && (
                <Modal isOpen={Boolean(editingUser)} onClose={() => setEditingUser(null)} className="bg-gray-800 text-white">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
                        <Input
                            value={editingUser?.currentPlan || ''}
                            onChange={(e) => setEditingUser(editingUser ? { ...editingUser, currentPlan: e.target.value } : null)}
                            className="bg-gray-700 text-white placeholder-gray-400"
                        />
                        <Button onClick={handleUpdateUser} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default UsersPage;

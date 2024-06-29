"use client"
import { useState } from 'react';
import { useConvex, useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';

type Id<T> = string & { __tableName: T };

interface Plan {
    id: Id<'subscriptionPlans'>;
    name: string;
    price: number;
    durationDays: number;
    maxFiles: number;
}

const initialPlan: Omit<Plan, 'id'> = {
    name: '',
    price: 0,
    durationDays: 0,
    maxFiles: 0,
};

function SubscriptionPlansPage() {
    const convex = useConvex();
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
    const [newPlan, setNewPlan] = useState<Omit<Plan, 'id'>>(initialPlan);

    const plans = useQuery(api.subscriptionPlan.getSubscriptionPlans) as Plan[] | undefined;
    const createPlan = useMutation(api.subscriptionPlan.createSubscriptionPlan);
    const updatePlan = useMutation(api.subscriptionPlan.updateSubscriptionPlan);

    const handleCreatePlan = async () => {
        await createPlan(newPlan);
        resetNewPlan();
    };

    const handleUpdatePlan = async () => {
        if (editingPlan) {
            await updatePlan(editingPlan);
            setEditingPlan(null);
        }
    };

    const resetNewPlan = () => {
        setNewPlan(initialPlan);
    };

    return (
        <div className="p-6 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Create Plan</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        type="text"
                        placeholder="Name"
                        value={newPlan.name}
                        onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                        type="number"
                        placeholder="Price"
                        value={newPlan.price}
                        onChange={(e) => setNewPlan({ ...newPlan, price: Number(e.target.value) })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                        type="number"
                        placeholder="Duration (Days)"
                        value={newPlan.durationDays}
                        onChange={(e) => setNewPlan({ ...newPlan, durationDays: Number(e.target.value) })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                        type="number"
                        placeholder="Max Files"
                        value={newPlan.maxFiles}
                        onChange={(e) => setNewPlan({ ...newPlan, maxFiles: Number(e.target.value) })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                </div>
                <Button onClick={handleCreatePlan} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Create Plan</Button>
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Plans List</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Duration (Days)</TableHead>
                            <TableHead>Max Files</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {plans?.map((plan) => (
                            <TableRow key={plan.id}>
                                <TableCell>{plan.name}</TableCell>
                                <TableCell>{plan.price}</TableCell>
                                <TableCell>{plan.durationDays}</TableCell>
                                <TableCell>{plan.maxFiles}</TableCell>
                                <TableCell>
                                    <Button onClick={() => setEditingPlan(plan)} variant="secondary" className="bg-green-600 hover:bg-green-700">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {editingPlan && (
                <Modal isOpen={Boolean(editingPlan)} onClose={() => setEditingPlan(null)} className="bg-gray-800 text-white">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Edit Plan</h2>
                        <Input
                            value={editingPlan?.name || ''}
                            onChange={(e) => setEditingPlan(editingPlan ? { ...editingPlan, name: e.target.value } : null)}
                            className="bg-gray-700 text-white placeholder-gray-400"
                        />
                        <Input
                            value={editingPlan?.price || 0}
                            onChange={(e) => setEditingPlan(editingPlan ? { ...editingPlan, price: Number(e.target.value) } : null)}
                            className="bg-gray-700 text-white placeholder-gray-400"
                        />
                        <Input
                            value={editingPlan?.durationDays || 0}
                            onChange={(e) => setEditingPlan(editingPlan ? { ...editingPlan, durationDays: Number(e.target.value) } : null)}
                            className="bg-gray-700 text-white placeholder-gray-400"
                        />
                        <Input
                            value={editingPlan?.maxFiles || 0}
                            onChange={(e) => setEditingPlan(editingPlan ? { ...editingPlan, maxFiles: Number(e.target.value) } : null)}
                            className="bg-gray-700 text-white placeholder-gray-400"
                        />
                        <Button onClick={handleUpdatePlan} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default SubscriptionPlansPage;

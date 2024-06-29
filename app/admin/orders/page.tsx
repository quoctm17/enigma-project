"use client"
import { useState, useEffect } from 'react';
import { useConvex, useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';
import { Select, SelectContent, SelectTrigger, SelectItem } from '@/components/ui/select';

interface Order {
    orderCode: string;
    amount: number;
    userEmail: string;
    status: string;
    description: string;
    planName: string;
    expirationDate: string;
    paymentOrderCode: string;
}

interface Plan {
    name: string;
    price: number;
    durationDays: number;
}

function OrdersPage() {
    const convex = useConvex();
    const statuses = ["PAYING", "PENDING", "PAID", "CANCELED", "FAILED"];

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [newOrder, setNewOrder] = useState<Order>({
        orderCode: '',
        amount: 0,
        userEmail: '',
        status: '',
        description: '',
        planName: '',
        expirationDate: '',
        paymentOrderCode: ''
    });
    const [plans, setPlans] = useState<Plan[]>([]);

    const orders = useQuery(api.order.getAllOrders) as Order[] | undefined;
    const subscriptionPlans = useQuery(api.subscriptionPlan.getSubscriptionPlans) as Plan[] | undefined;
    const createOrder = useMutation(api.order.createOrder);
    const updateOrderStatus = useMutation(api.order.updateOrderStatus);
    const deleteOrder = useMutation(api.order.deleteOrder);

    useEffect(() => {
        if (subscriptionPlans) {
            setPlans(subscriptionPlans);
        }
    }, [subscriptionPlans]);

    const handleCreateOrder = async () => {
        await createOrder(newOrder);
        setNewOrder({
            orderCode: '',
            amount: 0,
            userEmail: '',
            status: '',
            description: '',
            planName: '',
            expirationDate: '',
            paymentOrderCode: ''
        });
    };

    const handleUpdateOrder = async () => {
        if (editingOrder) {
            await updateOrderStatus({ orderCode: editingOrder.orderCode, status: editingOrder.status });
            setEditingOrder(null);
        }
    };

    const handleDeleteOrder = async (orderCode: string) => {
        await deleteOrder({ orderCode });
    };

    const handlePlanChange = (planName: string) => {
        const selectedPlan = plans.find(plan => plan.name === planName);
        if (selectedPlan) {
            let expirationDate = '';
            if (selectedPlan.durationDays > 0) {
                const date = new Date();
                date.setDate(date.getDate() + selectedPlan.durationDays);
                expirationDate = date.toISOString().split('T')[0];
            }
            setNewOrder({
                ...newOrder,
                planName,
                amount: selectedPlan.price,
                expirationDate,
                paymentOrderCode: 'YourGeneratedPaymentCode'
            });
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Create Order</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        type="text"
                        placeholder="Order Code"
                        value={newOrder.orderCode}
                        onChange={e => setNewOrder({ ...newOrder, orderCode: e.target.value })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={newOrder.amount}
                        onChange={e => setNewOrder({ ...newOrder, amount: Number(e.target.value) })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                        readOnly
                    />
                    <Input
                        type="text"
                        placeholder="User Email"
                        value={newOrder.userEmail}
                        onChange={e => setNewOrder({ ...newOrder, userEmail: e.target.value })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <div className="bg-gray-700 text-white placeholder-gray-400">
                        <label className="block text-sm font-medium text-gray-400">Status</label>
                        <Select
                            value={newOrder.status}
                            onValueChange={status => setNewOrder({ ...newOrder, status })}
                        >
                            <SelectTrigger className="bg-gray-700 text-white placeholder-gray-400">
                                {newOrder.status || "Select a status"}
                            </SelectTrigger>
                            <SelectContent>
                                {statuses.map(status => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Input
                        type="text"
                        placeholder="Description"
                        value={newOrder.description}
                        onChange={e => setNewOrder({ ...newOrder, description: e.target.value })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <div className="bg-gray-700 text-white placeholder-gray-400">
                        <label className="block text-sm font-medium text-gray-400">Plan Name</label>
                        <Select
                            value={newOrder.planName}
                            onValueChange={handlePlanChange}
                        >
                            <SelectTrigger className="bg-gray-700 text-white placeholder-gray-400">
                                {newOrder.planName || "Select a plan"}
                            </SelectTrigger>
                            <SelectContent>
                                {plans.map(plan => (
                                    <SelectItem key={plan.name} value={plan.name}>
                                        {plan.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Input
                        type="date"
                        placeholder="Expiration Date"
                        value={newOrder.expirationDate}
                        onChange={e => setNewOrder({ ...newOrder, expirationDate: e.target.value })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                        readOnly
                    />
                </div>
                <Button onClick={handleCreateOrder} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Create Order</Button>
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Orders List</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order Code</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>User Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Plan Name</TableHead>
                            <TableHead>Expiration Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders?.map(order => (
                            <TableRow key={order.orderCode}>
                                <TableCell>{order.orderCode}</TableCell>
                                <TableCell>{order.amount}</TableCell>
                                <TableCell>{order.userEmail}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{order.description}</TableCell>
                                <TableCell>{order.planName}</TableCell>
                                <TableCell>{order.expirationDate || 'N/A'}</TableCell>
                                <TableCell>
                                    <Button onClick={() => setSelectedOrder(order)} variant="outline" className="text-white bg-blue-600 hover:bg-blue-700">Details</Button>
                                    <Button onClick={() => setEditingOrder(order)} variant="secondary" className="bg-green-600 hover:bg-green-700">Edit</Button>
                                    <Button onClick={() => handleDeleteOrder(order.orderCode)} variant="destructive" className="bg-red-600 hover:bg-red-700">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {selectedOrder && (
                <Modal isOpen={Boolean(selectedOrder)} onClose={() => setSelectedOrder(null)} className="bg-gray-800 text-white">
                    <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                    <p><strong>Order Code:</strong> {selectedOrder.orderCode}</p>
                    <p><strong>Amount:</strong> {selectedOrder.amount}</p>
                    <p><strong>User Email:</strong> {selectedOrder.userEmail}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <p><strong>Description:</strong> {selectedOrder.description}</p>
                    <p><strong>Plan Name:</strong> {selectedOrder.planName}</p>
                    <p><strong>Expiration Date:</strong> {selectedOrder.expirationDate || 'N/A'}</p>
                </Modal>
            )}
            {editingOrder && (
                <Modal isOpen={Boolean(editingOrder)} onClose={() => setEditingOrder(null)} className="bg-gray-800 text-white">
                    <h2 className="text-2xl font-semibold mb-4">Edit Order</h2>
                    <Input
                        type="text"
                        placeholder="Order Code"
                        value={editingOrder.orderCode}
                        onChange={e => setEditingOrder({ ...editingOrder, orderCode: e.target.value })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={editingOrder.amount}
                        onChange={e => setEditingOrder({ ...editingOrder, amount: Number(e.target.value) })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                        readOnly
                    />
                    <Input
                        type="text"
                        placeholder="User Email"
                        value={editingOrder.userEmail}
                        onChange={e => setEditingOrder({ ...editingOrder, userEmail: e.target.value })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                        readOnly
                    />
                    <div className="bg-gray-700 text-white placeholder-gray-400">
                        <label className="block text-sm font-medium text-gray-400">Status</label>
                        <Select
                            value={editingOrder?.status}
                            onValueChange={status => setEditingOrder({ ...editingOrder, status })}
                        >
                            <SelectTrigger className="bg-gray-700 text-white placeholder-gray-400">
                                {editingOrder?.status || "Select a status"}
                            </SelectTrigger>
                            <SelectContent>
                                {statuses.map(status => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Input
                        type="text"
                        placeholder="Description"
                        value={editingOrder.description}
                        onChange={e => setEditingOrder({ ...editingOrder, description: e.target.value })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                    />
                    <div className="bg-gray-700 text-white placeholder-gray-400">
                        <label className="block text-sm font-medium text-gray-400">Plan Name</label>
                        <Select
                            value={editingOrder.planName}
                            onValueChange={(planName) => {
                                const selectedPlan = plans.find(plan => plan.name === planName);
                                if (selectedPlan) {
                                    let expirationDate = '';
                                    if (selectedPlan.durationDays > 0) {
                                        const date = new Date();
                                        date.setDate(date.getDate() + selectedPlan.durationDays);
                                        expirationDate = date.toISOString().split('T')[0];
                                    }
                                    setEditingOrder({
                                        ...editingOrder,
                                        planName,
                                        amount: selectedPlan.price,
                                        expirationDate
                                    });
                                }
                            }}
                        >
                            <SelectTrigger className="bg-gray-700 text-white placeholder-gray-400">
                                {editingOrder.planName || "Select a plan"}
                            </SelectTrigger>
                            <SelectContent>
                                {plans.map(plan => (
                                    <SelectItem key={plan.name} value={plan.name}>
                                        {plan.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Input
                        type="date"
                        placeholder="Expiration Date"
                        value={editingOrder.expirationDate}
                        onChange={e => setEditingOrder({ ...editingOrder, expirationDate: e.target.value })}
                        className="bg-gray-700 text-white placeholder-gray-400"
                        readOnly
                    />
                    <Button onClick={handleUpdateOrder} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Update Order</Button>
                    <Button onClick={() => setEditingOrder(null)} className="mt-4 bg-gray-600 hover:bg-gray-700 text-white">Cancel</Button>
                </Modal>
            )}
        </div>
    );
}

export default OrdersPage;

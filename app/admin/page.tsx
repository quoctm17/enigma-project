"use client"
import React, { ReactNode } from 'react'
import { OrdersByDayChart } from './_components/charts/OrdersByDayChart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UsersByDayChart } from './_components/charts/UsersByDayChart'
import { RevenueByProductChart } from './_components/charts/RevenueByProductChart'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

type DashboardCardProps = {
    title: string
    subtitle: string
    body: string
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    )
}

type ChartCardProps = {
    title: string
    children: ReactNode
}

function ChartCard({ children, title }: ChartCardProps) {
    return (
        <Card>
            <CardHeader>
                <div className='flex gap-4 justify-between items-center'>
                    <CardTitle>{title}</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Select Range
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                Last 7 Days
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Last 30 Days
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Last Year
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    )
}

export default function AdminDashboard() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DashboardCard
                    title="Sales"
                    subtitle="5 Orders"
                    body="$534"
                />
                <DashboardCard
                    title="Customers"
                    subtitle="$106.8 Average Value"
                    body='5'
                />
                <DashboardCard
                    title="Active Products"
                    subtitle= "0 Inactive"
                    body='2'
                />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8'>
                <ChartCard title="Total Sales">
                    <OrdersByDayChart />
                </ChartCard>
                <ChartCard title="Total Users">
                    <UsersByDayChart />
                </ChartCard>
                <ChartCard title="Revenue By Product">
                    <RevenueByProductChart />
                </ChartCard>
            </div>
        </>
    )
}

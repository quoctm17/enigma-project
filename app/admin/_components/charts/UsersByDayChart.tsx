"use client"
import { CartesianGrid, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { date: "Day 1", totalUsers: 12 },
    { date: "Day 2", totalUsers: 5 },
    { date: "Day 3", totalUsers: 20 },
    { date: "Day 4", totalUsers: 0 },
]

export function UsersByDayChart() {
    return (
        <ResponsiveContainer width="100%" minHeight={300}>
            <BarChart data={data}>
                <CartesianGrid stroke="hsl(var(--muted))" />
                <XAxis dataKey="date" name="Date" stroke="hsl(var(--primary))" />
                <YAxis stroke="hsl(var(--primary))" />
                <Tooltip cursor={{ fill: "hsl(var(--muted))"}}/>
                <Bar dataKey="totalUsers" type="monotone" name="New Customers" fill="#34b1eb"/>
            </BarChart>
        </ResponsiveContainer>
    )

}
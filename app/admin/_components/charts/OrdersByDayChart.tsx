"use client"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { value: 12, date: "2024-10-05" },
    { value: 25, date: "2024-10-10" },
    { value: 5, date: "2024-10-13" },
    { value: 23, date: "2024-10-20" },
]

export function OrdersByDayChart() {
    return (
        <ResponsiveContainer width="100%" minHeight={300}>
            <LineChart data={data}>
                <CartesianGrid stroke="hsl(var(--muted))" />
                <XAxis dataKey="date" name="Date" stroke="hsl(var(--primary))" />
                <YAxis tickFormatter={value => `$${value}`} stroke="hsl(var(--primary))" />
                <Tooltip formatter={value => `$${value}`} labelFormatter={value => value} />
                <Line dot={false} dataKey="value" type="monotone" name="Total Sales" stroke="hsl(var(--primary))" />
            </LineChart>
        </ResponsiveContainer>
    )

}
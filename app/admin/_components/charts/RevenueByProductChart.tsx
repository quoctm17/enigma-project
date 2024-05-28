"use client"
import { ResponsiveContainer, Tooltip, PieChart, Pie } from "recharts";

const data = [
    { name: "Product 1", revenue: 200 },
    { name: "Product 2", revenue: 500 },
    { name: "Product 3", revenue: 250 },
    { name: "Product 4", revenue: 100 },
]

export function RevenueByProductChart() {
    return (
        <ResponsiveContainer width="100%" minHeight={300}>
            <PieChart>
                <Tooltip cursor={{ fill: "hsl(var(--muted))" }} formatter={value => `$${value}`} />
                <Pie data={data} label={item => item.name} dataKey="revenue" nameKey="name" name="New Customers" fill="#fc539d"  />
            </PieChart>
        </ResponsiveContainer>
    )

}
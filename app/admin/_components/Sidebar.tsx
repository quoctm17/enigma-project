"use client"
import React from 'react'
import { BadgeDollarSign, LayoutDashboard, PackageSearch, TicketPercent, UsersRound } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const Sidebar = () => {
    const pathname = usePathname();
    const menu = [
        {
            label: 'Dashboard',
            route: '/admin',
            icon: LayoutDashboard
        },
        {
            label: 'Products',
            route: '/admin/products',
            icon: PackageSearch
        },
        {
            label: 'Customers',
            route: '/admin/customers',
            icon: UsersRound
        },
        {
            label: 'Sales',
            route: '/admin/sales',
            icon: BadgeDollarSign
        },
        {
            label: 'Coupons',
            route: '/admin/coupons',
            icon: TicketPercent
        }
    ];

    return (
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-enm-bg p-6 pt-28 text-enm-main-text max-sm:hidden lg:w-[264px]'>
            <div className='flex flex-col gap-6'>
                {menu.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(link.route);

                    return (
                        <Link href={link.route} key={link.label} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                            'bg-enm-primary': isActive,
                        })}>

                            <link.icon className="w-6 h-6" />
                            <span>{link.label}</span>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Sidebar

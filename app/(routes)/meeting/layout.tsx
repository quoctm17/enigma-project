import React, { ReactNode } from 'react'
import Navbar from './_components/Navbar'
import Sidebar from './_components/Sidebar'

const MeetingLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='relative'>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 bg-black'>
                    <div className='w-full'>
                        {children}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default MeetingLayout
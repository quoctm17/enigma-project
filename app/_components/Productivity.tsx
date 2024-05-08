import { BriefcaseBusiness } from 'lucide-react'
import React from 'react'

function Productivity() {
    return (
        <div className="container h-screen max-w-screen-xl py-12 lg:flex lg:items-center">
            <div className="bg-black text-white relative p-10">
                <div className="absolute left-0 top-1/4 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-purple-700"></div>
                <BriefcaseBusiness className="absolute -left-5 top-0 h-6 w-6" style={{ top: '20px', left: '-3px' }} />
                <div className="relative mt-50 max-w-4xl text-left ml-12">
                    <h2 className="text-4xl font-bold mb-4 text-pink-600">Accelerate high-quality working process development</h2>
                    <p className="text-xl mb-10">Our platform drives innovation with tools that boost working velocity.</p>
                </div>
            </div>
        </div>
    )
}

export default Productivity

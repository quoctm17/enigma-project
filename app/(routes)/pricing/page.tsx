import { Button } from '@/components/ui/button';
import React from 'react';

export default function Pricing() {
    return (
        <div className="h-screen w-full bg-enm-bg">
            <div className="p-10 rounded-xl bg-enm-neutral w-fit">
                <h1 className="text-3xl text-enm-main-text">Pricing page</h1>
                <h2 className="text-2xl text-enm-secondary-text">This is the pricing page</h2>
                <Button className="bg-enm-primary">Get Started</Button>
            </div>
        </div>
    );
}

"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Header from './_components/Header';
import Hero from './_components/Hero';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect } from 'react';
import Productivity from './_components/Productivity';

export default function Home() {
    const { user } = useKindeBrowserClient();

    useEffect(() => {
        console.log("--", user)
    }, [user])
    return (
        // Start homepage
        <div>
            <Header></Header>
            <Hero></Hero>
            <Productivity></Productivity>
        </div>
    );
}

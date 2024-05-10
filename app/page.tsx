"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Header from './_components/Header';
import Hero from './_components/Hero';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect } from 'react';
import Productivity from './_components/Productivity';
import Collaboration from './_components/Collaboration';
import ForDevelopers from './_components/ForDevelopers';
import Workflow from './_components/Workflow';
import Footer from './_components/Footer';

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
            <Collaboration></Collaboration>
            <ForDevelopers></ForDevelopers>
            <Workflow></Workflow>
            <Footer></Footer>
        </div>
    );
}

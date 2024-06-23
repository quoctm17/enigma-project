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
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function Home() {
    const { user } = useKindeBrowserClient();
    const convex = useConvex();
    const seedOrders = useMutation(api.seed.seedOrders);
    const seedSubscriptionPlans = useMutation(api.seed.seedSubscriptionPlans);
    const seedUsers = useMutation(api.seed.seedUsers);

    useEffect(() => {
        console.log("--", user)
    }, [user])

    useEffect(() => {
        runSeeding();
    }, []);


    const runSeeding = async () => {
        try {
            const resultPlans = await seedSubscriptionPlans();
            console.log(resultPlans);

            const resultOrders = await seedOrders();
            console.log(resultOrders);

            const resultUsers = await seedUsers();
            console.log(resultUsers);
        } catch (error) {
            console.error('Seeding error:', error);
        }
    };
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

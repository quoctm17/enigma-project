'use client';
import Header from '@/app/_components/Header';
import { Button } from '@/components/ui/button';
import React from 'react';
import {
    CircleCheck,
    MoveRight,
    File,
    UsersRound,
    UserRoundPlus,
    LineChart,
    Component,
    MessageCircle,
    MousePointerClick,
    FileDown,
    FileText,
    Eye,
    FileX2,
    Pencil,
    FileSymlink,
    FileClock,
    CreditCard,
    ReceiptText,
    Star,
} from 'lucide-react';

export default function Pricing() {
    return (
        <div className="w-full bg-enm-bg">
            <Header />
            <div className="mx-auto max-w-screen-xl text-enm-main-text pb-16">
                <main className="flex gap-8 w-full h-[640px] pt-16">
                    <div className="flex-[4]">
                        <h1 className="text-[80px] leading-[1.15] font-bold">Pricing Plan</h1>
                        <p className="text-lg text-enm-secondary-text text-balance">
                            Choose a pricing plan that suits you and your team the best.
                        </p>
                        <div className="mt-8 p-2 bg-white rounded-full flex flex-row">
                            <Button className="flex-1 py-6 rounded-full text-lg bg-enm-primary ">Monthly</Button>
                            <Button className="flex-1 py-6 rounded-full text-lg bg-transparent text-black ">
                                Semiannually
                            </Button>
                            <Button className="flex-1 py-6 rounded-full text-lg bg-transparent text-black ">
                                Yearly
                            </Button>
                        </div>
                    </div>
                    <div className="flex-[8] flex gap-2">
                        <div className="flex-1 rounded-2xl bg-enm-neutral p-6 height-[100%]">
                            <h2 className="text-4xl font-semibold">Starter</h2>
                            <div>
                                <span className="text-4xl font-semibold">$0</span>
                                <span className="text-enm-secondary-text ml-2">/month</span>
                            </div>
                            <Button className="my-8 border bg-enm-neutral w-full py-6 text-lg">
                                Get started
                                <MoveRight className="ml-4" />
                            </Button>
                            <p>What you get:</p>
                            <ul>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />5 files
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    7-day version history
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    Unlimited guests
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    Team collaboration
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    File management
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    Diagram drawing
                                </li>
                            </ul>
                        </div>
                        <div className="relative flex-1 rounded-t-none rounded-2xl bg-enm-neutral p-6 height-[100%] border border-enm-primary border-2">
                            <p className="rounded-t-2xl border border-enm-primary border-2 absolute translate-y-[-100%] top-0 right-[-2px] left-[-2px] text-center bg-enm-primary text-white">
                                Most popular ✨
                            </p>
                            <h2 className="text-4xl font-semibold">Professional</h2>
                            <div>
                                <span className="text-4xl font-semibold">$6.59</span>
                                <span className="text-enm-secondary-text ml-2">/month</span>
                            </div>
                            <Button className="my-8 hover:bg-enm-primary/90 bg-enm-primary w-full py-6 text-lg">
                                Get started
                                <MoveRight className="ml-4" />
                            </Button>
                            <p>All starter features, plus:</p>
                            <ul>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    Unlimited files
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    90-day version history
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    Unlimited guests
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-primary" />
                                    PDF exports
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-primary" />
                                    Publicly editable files
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-primary" />
                                    Unlock 5 templates
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-primary" />+ Everything in free
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 rounded-2xl bg-enm-neutral p-6 height-[100%]">
                            <h2 className="text-4xl font-semibold">Enterprise</h2>
                            <div>
                                <span className="text-4xl font-semibold text-enm-neutral"></span>
                                <span className="text-enm-secondary-text">Call us for pricing details</span>
                            </div>
                            <Button className="my-8 border bg-enm-neutral w-full py-6 text-lg">
                                Get started
                                <MoveRight className="ml-4" />
                            </Button>
                            <p>All free features, plus:</p>
                            <ul>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    Unlimited files
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    Unlimited version history
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    Unlimited guests
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    Flexible payment
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    Custom contract
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />
                                    Unlock 5 templates
                                </li>
                                <li className="text-enm-secondary-text flex gap-2 mt-4">
                                    <CircleCheck className="text-enm-main-text" />+ Every in Professional
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>

                <div>
                    {data.map((section, index) => (
                        <section className="mt-20">
                            <div className="flex px-6 mb-4">
                                <h3 className="flex-1 text-2xl font-semibold">{section.category}</h3>
                                {index === 0 && (
                                    <>
                                        <h3 className="flex-1 text-2xl font-semibold">Free</h3>
                                        <h3 className="flex-1 text-2xl font-semibold">Professional</h3>
                                        <h3 className="flex-1 text-2xl font-semibold">Enterprise</h3>
                                    </>
                                )}
                            </div>
                            {section.features.map((feature, index) => {
                                const bgColor = index % 2 === 0 ? 'bg-enm-neutral' : 'bg-enm-bg';
                                const { title, content, icon, subTitle } = feature;

                                const getContent = (content: any) => {
                                    if (content === true) return <CircleCheck />;
                                    return content;
                                };

                                return (
                                    <div className={`flex p-6 rounded-xl ${bgColor}`}>
                                        <div className="flex-1 flex items-start gap-2">
                                            <span>{icon}</span>
                                            <div>
                                                <h4 className="font-semibold">{feature.title}</h4>
                                                {subTitle && (
                                                    <p className="text-enm-secondary-text text-balance text-base">
                                                        {subTitle}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <span className="flex-1 font-medium">{getContent(content.free)}</span>
                                        <span className="flex-1 font-medium text-enm-primary">
                                            {getContent(content.pro)}
                                        </span>
                                        <span className="flex-1 font-medium">{getContent(content.enterprise)}</span>
                                    </div>
                                );
                            })}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}

const data = [
    {
        category: 'Usage',
        features: [
            {
                title: '# of File',
                subTitle: 'A file consists of a single infinite canvas and note editor',
                icon: <File />,
                content: {
                    free: '5',
                    pro: 'Unlimited',
                    enterprise: 'Unlimited',
                },
            },
            {
                title: '# of Team',
                subTitle: 'Maximum team can be created',
                icon: <UsersRound />,
                content: {
                    free: '5',
                    pro: 'Unlimited',
                    enterprise: 'Unlimited',
                },
            },
            {
                title: '# of Team member',
                subTitle: 'Maximum number of people per team',
                icon: <UserRoundPlus />,
                content: {
                    free: '5',
                    pro: 'Unlimited',
                    enterprise: 'Unlimited',
                },
            },
        ],
    },
    {
        category: 'Canvas Feature',
        features: [
            {
                title: 'Infinity canvas',
                icon: <File />,
                content: {
                    free: true,
                    pro: true,
                    enterprise: true,
                },
            },
            {
                title: 'Diagram as code',
                subTitle: 'Create diagrams using simple markup',
                icon: <LineChart />,
                content: {
                    free: true,
                    pro: true,
                    enterprise: true,
                },
            },
            {
                title: '500+ tech icons and logos',
                subTitle: 'Maximum number of people per team',
                icon: <Component />,
                content: {
                    free: true,
                    pro: true,
                    enterprise: true,
                },
            },
        ],
    },
    {
        category: 'Collaboration Feature',
        features: [
            {
                title: 'Commenting and tagging',
                icon: <MessageCircle />,
                content: {
                    free: true,
                    pro: true,
                    enterprise: true,
                },
            },
            {
                title: 'Realtime collaboration',
                icon: <MousePointerClick />,
                content: {
                    free: true,
                    pro: true,
                    enterprise: true,
                },
            },
            {
                title: 'Export to file',
                icon: <FileDown />,
                content: {
                    free: 'PNG, SVG, MD',
                    pro: 'PDF, PNG, SVG, MD',
                    enterprise: 'PDF, NG, SVG, MD',
                },
            },
        ],
    },
    {
        category: 'Access & Controls',
        features: [
            {
                title: 'Team file',
                subTitle: 'Accessible to all team members and guests',
                icon: <FileText />,
                content: {
                    free: true,
                    pro: true,
                    enterprise: true,
                },
            },
            {
                title: 'Publicly viewable files',
                subTitle: 'Anyone with the file link can view without signing in to Enigma',
                icon: <Eye />,
                content: {
                    free: true,
                    pro: true,
                    enterprise: true,
                },
            },
            {
                title: 'Private files',
                subTitle: 'Create diagrams using simple markup',
                icon: <FileX2 />,
                content: {
                    free: false,
                    pro: true,
                    enterprise: true,
                },
            },
            {
                title: 'Public editable files',
                subTitle: 'Anyone with the file link can edit without signing in to Enigma',
                icon: <Pencil />,
                content: {
                    free: false,
                    pro: true,
                    enterprise: true,
                },
            },
            {
                title: 'Default file link setting',
                subTitle: 'Set default link settings for all new files at the team level',
                icon: <FileSymlink />,
                content: {
                    free: false,
                    pro: true,
                    enterprise: true,
                },
            },
            {
                title: 'Version Control',
                icon: <FileClock />,
                content: {
                    free: '7 days',
                    pro: '90 days',
                    enterprise: 'Unlimited',
                },
            },
        ],
    },
    {
        category: 'Billing',
        features: [
            {
                title: 'Flexible payments',
                icon: <CreditCard />,
                content: {
                    free: false,
                    pro: false,
                    enterprise: true,
                },
            },
            {
                title: 'Custom contracts',
                icon: <ReceiptText />,
                content: {
                    free: false,
                    pro: false,
                    enterprise: true,
                },
            },
            {
                title: 'Customer success manager',
                icon: <Star />,
                content: {
                    free: false,
                    pro: false,
                    enterprise: true,
                },
            },
        ],
    },
];

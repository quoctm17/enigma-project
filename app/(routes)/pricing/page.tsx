'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import React, { useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import { v4 } from 'uuid';
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

import Header from '@/app/_components/Header';
import { createPaymentLink } from './_actions';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function Pricing() {
    const [plans, setPlans] = useState<any[]>([]);
    const { user } = useKindeBrowserClient();
    const convex = useConvex();
    const createOrder = useMutation(api.order.createOrder);
    const updateOrderStatusByPaymentCode = useMutation(api.order.updateOrderStatusByPaymentCode);

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [redirectLoading, setRedirectLoading] = useState(false);

    // /pricing?code=00&id=4edcf8143dff44ef9d315f77d6e89ae4&cancel=true&status=CANCELLED&orderCode=656551
    const RETURN_URL = `${process.env.NEXT_PUBLIC_ENM_CLIENT_URL}${pathname}` || '';
    const CANCEL_URL = `${process.env.NEXT_PUBLIC_ENM_CLIENT_URL}${pathname}` || '';

    const type = searchParams.get('type') || 'monthly';
    const code = searchParams.get('code');
    const id = searchParams.get('id');
    const cancel = searchParams.get('cancel');
    const status = searchParams.get('status');
    const orderCode = searchParams.get('orderCode');
    const currentPlan = plans.find((plan) => plan.name.toUpperCase() === type?.toUpperCase());

    useEffect(() => {
        const fetchPlans = async () => {
            // Get plan info
            const planList = await convex.query(api.subscriptionPlan.getSubscriptionPlans);
            setPlans(planList);
        };

        fetchPlans();
    }, []);

    useEffect(() => {
        if (!user) return;
        if (cancel === 'true' && status === 'CANCELLED') {
            updateOrderStatusByPaymentCode({
                paymentOrderCode: '' + orderCode,
                status: 'FAILED',
            }).then(() => {
                setTimeout(() => toast.error('Payment Cancelled'));
            });
        } else if (cancel === 'false') {
            switch (status) {
                case 'PAID':
                    setTimeout(() => toast.success('Payment Successful'));
                    break;
                case 'PENDING':
                    break;
                case 'PROCESSING':
                    break;
                default:
                    break;
            }
        }
    }, [user]);

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            // const params = new URLSearchParams(searchParams.toString());
            const params = new URLSearchParams();
            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    const handleClickStart = async () => {
        // check user login
        if (!user) router.push('/login');

        const orderIdCode = v4();
        const paymentOrderCode = Number(String(new Date().getTime()).slice(-9));
        console.log(paymentOrderCode);
        await createOrder({
            orderCode: orderIdCode,
            userEmail: user?.email || '',
            description: 'Professional Plan',
            paymentOrderCode: paymentOrderCode.toString(),
            planName: 'Monthly',
            status: 'PENDING',
        });

        // create link
        createPaymentLinkHandle(redirectPaymentLink, setRedirectLoading, paymentOrderCode);
    };

    const createPaymentLinkHandle = async function (
        callbackFunction: (data: any) => void,
        setLoading: any,
        paymentOrderCode: number,
    ) {
        setLoading(true);
        try {
            const body = {
                orderCode: paymentOrderCode,
                description: `Professional Plan`, //max 25 chars
                amount: currentPlan?.price || 5000,
                returnUrl: RETURN_URL,
                cancelUrl: CANCEL_URL,
                buyerEmail: user?.email!,
            };
            let response = await createPaymentLink(body);
            if (response.error != 0) throw new Error('Call Api failed: ');
            callbackFunction(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('Error occur, please try again!');
        }
    };

    const redirectPaymentLink = async function (checkoutResponse: any) {
        if (checkoutResponse) {
            let url = checkoutResponse.checkoutUrl;
            // if (checkoutResponse.checkoutUrl.startsWith('https://dev.pay.payos.vn')) {
            //     url = checkoutResponse.checkoutUrl.replace('https://dev.pay.payos.vn', 'https://next.dev.pay.payos.vn');
            // }

            // if (checkoutResponse.checkoutUrl.startsWith('https://pay.payos.vn')) {
            //     url = checkoutResponse.checkoutUrl.replace('https://pay.payos.vn', 'https://next.pay.payos.vn');
            // }

            // redirect to url with nextjs
            router.push(url);
        }
    };

    return (
        <div className="w-full bg-enm-bg">
            <Header />
            <div className="mx-auto max-w-screen-xl text-enm-main-text py-16">
                <main className="flex gap-8 w-full min-h-[640px] pt-16">
                    <div className="flex-[4]">
                        <h1 className="text-[80px] leading-[1.15] font-bold">Pricing Plan</h1>
                        <p className="text-lg text-enm-secondary-text text-balance">
                            Choose a pricing plan that suits you and your team the best.
                        </p>
                        <div className="mt-8 p-2 bg-white rounded-full flex flex-row">
                            <Button
                                onClick={() => {
                                    router.push(pathname + '?' + createQueryString('type', 'monthly'));
                                }}
                                className={twMerge(
                                    'flex-1 py-6 rounded-full text-lg bg-transparent hover:bg-enm-primary/50 text-black',
                                    type === 'monthly' && 'bg-enm-primary text-white',
                                )}
                            >
                                Monthly
                            </Button>
                            <Button
                                onClick={() => {
                                    router.push(pathname + '?' + createQueryString('type', 'semi-annual'));
                                }}
                                className={twMerge(
                                    'flex-1 py-6 rounded-full text-lg bg-transparent hover:bg-enm-primary/50 text-black',
                                    type === 'semi-annual' && 'bg-enm-primary text-white',
                                )}
                            >
                                Semiannually
                            </Button>
                            <Button
                                onClick={() => {
                                    router.push(pathname + '?' + createQueryString('type', 'annual'));
                                }}
                                className={twMerge(
                                    'flex-1 py-6 rounded-full text-lg bg-transparent hover:bg-enm-primary/50 text-black',
                                    type === 'annual' && 'bg-enm-primary text-white',
                                )}
                            >
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
                        <div className="relative flex-1 rounded-t-none rounded-2xl bg-enm-neutral p-6 height-[100%] border-enm-primary border-2">
                            <p className="rounded-t-2xl border-enm-primary border-2 absolute translate-y-[-100%] top-0 right-[-2px] left-[-2px] text-center bg-enm-primary text-white">
                                Most popular ✨
                            </p>
                            <h2 className="text-4xl font-semibold">Professional</h2>
                            <div>
                                <span className="text-4xl font-semibold">
                                    {currentPlan?.price.toLocaleString({
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </span>
                                <span className="text-enm-secondary-text ml-2">/{currentPlan?.durationDays} days</span>
                            </div>
                            <Button
                                onClick={handleClickStart}
                                className="my-8 hover:bg-enm-primary/90 bg-enm-primary w-full py-6 text-lg"
                            >
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
                        <section key={index} className="mt-20">
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
                                const { title, content, icon, subTitle } = feature as any;

                                const getContent = (content: any) => {
                                    if (content === true) return <CircleCheck />;
                                    return content;
                                };

                                return (
                                    <div key={index} className={`flex p-6 rounded-xl ${bgColor}`}>
                                        <div className="flex-1 flex items-start gap-2">
                                            <span>{icon}</span>
                                            <div>
                                                <h4 className="font-semibold">{title}</h4>
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

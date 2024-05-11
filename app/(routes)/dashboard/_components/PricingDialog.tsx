import React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

function PricingDialog() {
    return (
        <DialogContent className="max-w-4xl text-enm-main-text bg-enm-bg border-0">
            <DialogHeader>
                <DialogTitle>Upgrade Plan</DialogTitle>
                <DialogDescription>
                    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
                            <div className="bg-enm-neutral rounded-2xl p-6 shadow-sm ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12">
                                <div className="text-center">
                                    <h2 className="text-lg font-medium text-enm-main-text">
                                        Pro
                                        <span className="sr-only">Plan</span>
                                    </h2>

                                    <p className="mt-2 sm:mt-4">
                                        <strong className="text-3xl font-bold text-enm-main-text sm:text-4xl">
                                            {' '}
                                            30${' '}
                                        </strong>

                                        <span className="text-sm font-medium text-enm-secondary-text">/month</span>
                                    </p>
                                </div>

                                <ul className="mt-6 space-y-2">
                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>

                                        <span className="text-enm-secondary-text"> 20 users included </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>

                                        <span className="text-enm-secondary-text"> 5GB of storage </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>

                                        <span className="text-enm-secondary-text"> Email support </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>

                                        <span className="text-enm-secondary-text"> Help center access </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>

                                        <span className="text-enm-secondary-text"> Phone support </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>

                                        <span className="text-enm-secondary-text"> Community access </span>
                                    </li>
                                </ul>

                                <a
                                    href="/pricing"
                                    className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500"
                                >
                                    Explore Details
                                </a>
                            </div>

                            <div className="bg-enm-neutral rounded-2xl p-6 shadow-sm sm:px-8 lg:p-12">
                                <div className="text-center">
                                    <h2 className="text-lg font-medium text-enm-main-text">
                                        Enterprise
                                        <span className="sr-only">Plan</span>
                                    </h2>

                                    <p className="mt-2 sm:mt-4">
                                        <strong className="text-3xl font-bold text-enm-main-text sm:text-4xl">
                                            {' '}
                                            20${' '}
                                        </strong>

                                        <span className="text-sm font-medium text-enm-secondary-text">/month</span>
                                    </p>
                                </div>

                                <ul className="mt-6 space-y-2">
                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>

                                        <span className="text-enm-secondary-text"> 10 users included </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>

                                        <span className="text-enm-secondary-text"> 2GB of storage </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>

                                        <span className="text-enm-secondary-text"> Email support </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>

                                        <span className="text-enm-secondary-text"> Help center access </span>
                                    </li>
                                </ul>

                                <a
                                    href="/pricing"
                                    className="mt-8 block rounded-full border border-indigo-600 bg-transparent px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                                >
                                    Explore Details
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="">
                <DialogClose asChild></DialogClose>
            </DialogFooter>
        </DialogContent>
    );
}

export default PricingDialog;

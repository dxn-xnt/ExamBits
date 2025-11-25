import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function LandingPage() {

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-[radial-gradient(ellipse_at_bottom,#dc2626aa_0%,#dc262654_40%,transparent_85%)] p-6 text-[#1b1b18] justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <div className=" flex flex-col w-full items-center justify-center gap-7 opacity-100 transition-opacity duration-750 starting:opacity-0 ">
                    <div className="flex flex-row gap-4 items-center align-middle">
                        <svg width="52" height="52" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M60 60H0V0C33.137 0 60 26.8626 60 60Z" fill="#DC2626"/>
                            <path d="M120 60H60V0C93.137 0 120 26.8626 120 60Z" fill="#DC2626"/>
                            <path d="M60 120H0V60C33.137 60 60 86.8626 60 120Z" fill="#DC2626"/>
                            <path d="M120 120H60V60C93.137 60 120 86.8626 120 120Z" fill="#DC2626"/>
                        </svg>
                        <div className="flex flex-col leading-none gap-1">
                            <p className="text-foreground font-semibold">Cooperative</p>
                            <p className="text-foreground font-semibold">Profiling System</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 text-center">
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col leading-none">
                                <p className="text-foreground font-semibold text-xl">Real-time cooperative profiling and management</p>
                            </div>
                            <div className="flex flex-col leading-none">
                                <p className="text-foreground font-light text-sm">Cooperative Profiling System streamlines tracking, evaluating, and managing cooperative</p>
                                <p className="text-foreground font-light text-sm"> members’ profiles and progress in a secure platform.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 text-center">

                    </div>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}

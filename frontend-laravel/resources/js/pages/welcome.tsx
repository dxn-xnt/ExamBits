import { Head, Link } from '@inertiajs/react';

export default function Welcome() {

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
w
                    </div>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}

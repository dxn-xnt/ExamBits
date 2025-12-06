import { useState } from 'react';
import { User } from '@/types'; // your SharedData user type
import { ChevronDown } from 'lucide-react';
import { redirect } from 'react-router-dom';

type Props = {
    user?: User; // optional
    isMobile?: boolean
};

export function UserProfile({ user, isMobile }: Props) {
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        redirect('/logout'); // Laravel logout route
    };

    // Default avatar placeholder if no user
    const displayName = user?.name || 'Guest';
    const avatarUrl = user?.avatar || '';

    return (
        <div className="relative inline-block text-left">
            {/* Avatar Button */}
            <button
                type="button"
                className="flex items-center space-x-2 rounded-full p-1.5 px-2 hover:bg-accent border-2 border-transparent focus:outline-none"
                onClick={() => setOpen(!open)}
            >
                <div className="h-10 w-10 rounded-full bg-accent-blue flex items-center justify-center text-foreground font-bold">
                    {displayName[0].toUpperCase()}
                </div>

                {isMobile && (
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-md text-foreground">
                            {displayName}
                        </span>
                        <ChevronDown className="h-4 w-4 text-foreground" />
                    </div>
                )}

            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-48 font-medium rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                        <a
                            href="/exam-library"
                            className="block px-4 py-2 text-foreground hover:bg-gray-100"
                        >
                            My ExamBits
                        </a>

                        {user && (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-foreground hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

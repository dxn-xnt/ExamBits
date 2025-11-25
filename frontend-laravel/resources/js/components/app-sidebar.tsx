import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import {Link, usePage} from '@inertiajs/react';
import {BookOpen, Building, DollarSign, FileText, Folder, LayoutGrid, UserCog, Users} from 'lucide-react';
import AppLogo from './app-logo';
import {sidebarConfigs} from "@/layouts/app/sidebar-config";
import admin from "@/routes/admin";

const adminNavItems: NavItem[] = [
    {
        title: 'Overview',
        href: admin.overview(),
        icon: LayoutGrid,
    },
    {
        title: 'Members',
        href: admin.members(),
        icon: Users,
    },
    {
        title: 'Accounts',
        href: admin.accounts(),
        icon: Building,
    },
    {
        title: 'Loans',
        href: admin.loans(),
        icon: DollarSign,
    },
    {
        title: 'Transactions',
        href: admin.transactions(),
        icon: FileText,
    },
    {
        title: 'Staff',
        href: admin.staff(),
        icon: UserCog,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const role = window.location.pathname.split("/")[1] || "loan_officer"
    const items = sidebarConfigs[role] || []
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={items} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

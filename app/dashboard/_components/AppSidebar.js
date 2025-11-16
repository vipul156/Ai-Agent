'use client'
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar"
import { Database, Gem, Headphones, LayoutDashboardIcon, UserIcon, WalletCards } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MenuOptions = [
    {
        title: "Dashboard",
        icon: LayoutDashboardIcon,
        href: "/dashboard",
    },
    {
        title: "AI Agent",
        icon: Headphones,
        href: "/dashboard/ai-agent",
    },
    {
        title: "Data",
        icon: Database,
        href: "#",
    },
    {
        title: "Pricing",
        icon: WalletCards,
        href: "/dashboard/pricing",
    },
    {
        title: "Profile",
        icon: UserIcon,
        href: "/dashboard/profile",
    }
]

export function AppSidebar() {
    const { open } = useSidebar()
    const path = usePathname()
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader />
            <div className="flex gap-2 items-center px-2">
                <Image src="/logo.svg" alt="logo" width={45} height={45} />
                {open && <h2 className="text-2xl font-bold">ToolChain</h2>}
            </div>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {MenuOptions.map((option, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild size={open ? "lg" : "default"} isActive={path === option.href}>
                                    <Link href={option.href}>
                                        <option.icon />
                                        <span>{option.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter className='mb-10'>
                <div className="flex gap-2 items-center">
                    <Gem />
                    {open && <h2>Remaining Credits: 10</h2>}
                </div>
                {open && <Link href="/dashboard/pricing"><Button className={'w-full'}>Upgrade to Unlimited</Button></Link>}
            </SidebarFooter>
        </Sidebar>
    )
}
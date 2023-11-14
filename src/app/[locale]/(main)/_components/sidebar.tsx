'use client';
import React from 'react';
import Logo from '@/components/ui/atoms/logo';
import { cn } from '@/lib/utils';
import { selectSidebarConfig, selectSidebarItem, toggleSidebar } from '@/store/slices';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLast,
  ChevronFirst,
  LucideIcon,
  UserCircleIcon,
  SettingsIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession({ required: true });
  const sidebar = useAppSelector(selectSidebarConfig);
  const dispatch = useAppDispatch();

  return (
    <aside className='h-screen'>
      <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
        <div className='p-4 pb-2 flex justify-between items-center h-12'>
          <AnimatePresence>
            {sidebar.expanded && (
              <motion.div
                initial={{ opacity: 0, width: 20 }}
                animate={{ opacity: 1, width: 180 }}
                exit={{ opacity: 0, width: 0 }}>
                <Logo />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className={cn(
              'p-1 rounded-lg bg-gray-50 hover:bg-gray-100',
              sidebar.expanded ? '' : 'ml-1',
            )}>
            {sidebar.expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className='flex-1 space-y-1 px-3 mt-5'>{children}</ul>

        {status === 'authenticated' && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className='border-t flex p-3 flex-row'>
                <Image
                  src={session?.user.image!}
                  alt={session?.user.name!}
                  className={cn(
                    'w-10 h-10 transition-all ease-in-out duration-300',
                    sidebar.expanded ? 'rounded-md' : 'rounded-full ml-1',
                  )}
                  width={50}
                  height={50}
                />
                <div
                  className={`
                  flex justify-between items-center overflow-hidden transition-all ${
                    sidebar.expanded ? 'w-40 ml-3' : 'w-0'
                  }
              `}>
                  <div className='leading-4'>
                    <h4 className='font-semibold text-ellipsis'>{session?.user.name}</h4>
                    <span className='text-xs text-gray-600 text-ellipsis'>
                      {session?.user.email}
                    </span>
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  id: string;
  icon: LucideIcon;
  text: string;
  alert?: boolean;
  link: string;
}

export function SidebarItem({ id, icon: Icon, text, alert, link }: SidebarItemProps) {
  const sidebar = useAppSelector(selectSidebarConfig);
  const dispatch = useAppDispatch();
  const locale = useLocale();
  return (
    <Link
      href={link}
      locale={locale}>
      <li
        onClick={() => dispatch(selectSidebarItem(id))}
        className={`
        relative flex items-center py-2 px-3 my-0
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          sidebar.active === id
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
            : 'hover:bg-indigo-50 text-gray-600'
        }
    `}>
        <Icon className='w-6 h-6' />
        <span
          className={`overflow-hidden transition-all text-[.9em]  ${
            sidebar.expanded ? 'w-40 ml-3' : 'w-0'
          }`}>
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              sidebar.expanded ? '' : 'top-2'
            }`}
          />
        )}

        {!sidebar.expanded && (
          <div
            className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}>
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}

export const UserSidebar = () => {
  return (
    <Sidebar>
      <SidebarItem
        icon={LayoutDashboardIcon}
        text='Dashboard'
        id={`dashboard`}
        link={`/app`}
      />
      <SidebarItem
        icon={UserCircleIcon}
        id={`users`}
        text='Users'
        link={`/app/users`}
      />
      <hr className='block m-2' />
      <SidebarItem
        icon={SettingsIcon}
        id={`settings`}
        text='Settings'
        link={`/app/settings`}
      />
      <SidebarItem
        icon={HelpCircleIcon}
        id={`help`}
        text='Help'
        link={`/app/help`}
      />
    </Sidebar>
  );
};

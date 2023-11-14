'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { User, Role } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { CheckCircle2Icon, MoreVerticalIcon, ShieldCheckIcon, XCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { SafeUser } from '../../../../../../../../next-auth';

export const userColumns: ColumnDef<unknown>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean | string) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean | string) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'image',
    header: '',
  },
  {
    accessorKey: 'name',
    header: 'Username',
    cell: ({ row }) => {
      const user = row.original as User;
      return (
        <div className='flex flex-row space-x-4 items-center'>
          <Image
            className='rounded-full'
            width={25}
            height={25}
            alt={user.name}
            src={user.image}
          />
          <p>{user.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Email'
      />
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role') as Role;
      return <Badge variant={'outline'}>{role.displayName}</Badge>;
    },
  },
  {
    accessorKey: 'emailVerified',
    header: 'Verified',
    cell: ({ row }) => {
      const emailVerified = row.getValue('emailVerified') as boolean;
      return emailVerified ? (
        <ShieldCheckIcon className={'text-green-600'} />
      ) : (
        <XCircleIcon className={'text-red-300'} />
      );
    },
  },
  {
    accessorKey: 'accountActive',
    header: 'Active',
    cell: ({ row }) => {
      const accountActive = row.getValue('accountActive') as boolean;
      return accountActive ? (
        <CheckCircle2Icon className={'text-green-600'} />
      ) : (
        <XCircleIcon className={'text-red-300'} />
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className={'flex flex-row space-x-2 items-center justify-end'}>
          <Button
            variant={'default'}
            size={'sm'}>
            Edit user
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size={'sm'}
                className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreVerticalIcon className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Validate email account</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Update account password</DropdownMenuItem>
              <DropdownMenuItem>Delete account</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

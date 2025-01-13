import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './ui/dateTable'; // Importa el componente DataTable de ShadCN
import { Group_extended } from '../types';
import { ArrowUpDown } from "lucide-react"
interface TableGroupProps {
    group: Group_extended;
    fetchGroup: (id:string) => Promise<void>;
}

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import useGroups from '@/integration/useGroups';
import useRoles from '@/integration/useRoles';
import { isMobile } from 'react-device-detect';
  

const TableGroup: React.FC<TableGroupProps> = ({ group , fetchGroup}) => {
  const { setRole } = useRoles();
  const { deleteUserFromGroup } = useGroups();

  const columns: ColumnDef<typeof group.users[number]>[] = [
      {
          accessorKey: 'role',
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Rol
                {isMobile ||<ArrowUpDown className="ml-2 h-4 w-4" />}
                
              </Button>
            )
      },
          cell: ({ row }) => (
              <span className={row.original.role === 'writer' ? 'font-bold text-blue-600' : ''}>
                  {row.original.role}
              </span>
          ),
      },
      {
          accessorKey: 'name',
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Nombre
                {isMobile ||<ArrowUpDown className="ml-2 h-4 w-4" />}
                
              </Button>
            )
      },cell: ({ row }) => <div>{row.getValue("name")}</div>,
      },
      { 
        accessorKey: 'email',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Email
             <ArrowUpDown className="ml-2 h-4 w-4" />
              
            </Button>
          )
        },
    },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) =>
            group.role === 'writer' ? (
              <DropdownMenu >
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="py-1 flex align-center justify-center flex-col gap-2">
                  <DropdownMenuLabel className='flex justify-center'>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='flex justify-center' onClick={() => handleEdit(row.original.email, row.original.role)}>
                    Cambiar rol
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className='flex justify-center !text-white !bg-red-500 hover:!bg-red-700 transition-colors duration-200'
                    onClick={() => handleRemove(row.original.email)}
                  >
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null,
      },
  ];

  const columnsMobile: ColumnDef<typeof group.users[number]>[] = [
    {
        accessorKey: 'role',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Rol
              {isMobile ||<ArrowUpDown className="ml-2 h-4 w-4" />}
              
            </Button>
          )
    },
        cell: ({ row }) => (
            <span className={row.original.role === 'writer' ? 'font-bold text-blue-600' : ''}>
                {row.original.role}
            </span>
        ),
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Nombre
              {isMobile ||<ArrowUpDown className="ml-2 h-4 w-4" />}
              
            </Button>
          )
    },cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) =>
          group.role === 'writer' ? (
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="py-1 flex align-center justify-center flex-col gap-2">
                <DropdownMenuLabel className='flex justify-center'>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='flex justify-center' onClick={() => handleEdit(row.original.email, row.original.role)}>
                  Cambiar rol
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className='flex justify-center !text-white !bg-red-500 hover:!bg-red-700 transition-colors duration-200'
                  onClick={() => handleRemove(row.original.email)}
                >
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null,
    },
];


  // Funciones de manejo (simples, para extender según necesidades)
  const handleEdit =async (email: string, rol:string) => {
      await setRole(group.id, rol === 'writer' ? 'reader' : 'writer', email);
      await fetchGroup(group.id);

  };

  const handleRemove = async (email: string) => {
    await deleteUserFromGroup(group.id, email);
    await fetchGroup(group.id);

  };

  return (
    <div className="p-4 w-full max-w-2xl">
      <div className="overflow-y-auto">
        <DataTable
          columns={isMobile ? columnsMobile : columns}
          data={group.users}
          className=" border border-gray-200 rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default TableGroup;
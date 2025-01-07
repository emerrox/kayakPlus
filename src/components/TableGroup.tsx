import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './ui/dateTable'; // Importa el componente DataTable de ShadCN
import { Group_extended } from '../types';

interface TableGroupProps {
    group: Group_extended;
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
  

const TableGroup: React.FC<TableGroupProps> = ({ group }) => {
    // Define las columnas de la tabla
    const columns: ColumnDef<typeof group.users[number]>[] = [
        {
            accessorKey: 'role',
            header: 'Rol',
            cell: ({ row }) => (
                <span className={row.original.role === 'writer' ? 'font-bold text-blue-600' : ''}>
                    {row.original.role}
                </span>
            ),
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) =>
                row.original.role === 'writer' ? (
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="h-8 w-8 p-0">
      <span className="sr-only">Open menu</span>
      <MoreHorizontal />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="center" className="py-1 flex align-center justify-center flex-col gap-2">
    <DropdownMenuLabel className='flex justify-center'>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className='flex justify-center' onClick={() => handleEdit(row.original.email)}>
      Editar
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
    const handleEdit = (email: string) => {
        alert(`Editando configuración para: ${email}`);
    };

    const handleRemove = (email: string) => {
        alert(`Eliminando usuario: ${email}`);
    };

    return (
        <div className="p-4">
            {/* Contenedor para hacer scroll horizontal en pantallas pequeñas */}
            <div className="overflow-x-auto">
                <DataTable
                    columns={columns}
                    data={group.users}
                    className="min-w-full border border-gray-200 rounded-lg shadow-md"
                />
            </div>
        </div>
    );
};

export default TableGroup;
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './ui/dateTable'; // Importa el componente DataTable de ShadCN
import { Group_extended } from '../types';

interface TableGroupProps {
    group: Group_extended;
}

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
                    <div className="flex gap-2">
                        <button
                            className="px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                            onClick={() => handleEdit(row.original.email)}
                        >
                            Editar
                        </button>
                        <button
                            className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                            onClick={() => handleRemove(row.original.email)}
                        >
                            Eliminar
                        </button>
                    </div>
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

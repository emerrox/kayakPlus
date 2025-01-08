import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useGroups from '@/integration/useGroups';
import { Group_extended } from '../types';
import TableGroup from '@/components/TableGroup';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import useIsLogged from '@/contexts/useIsLogged';
const Group: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || '';
    const { getGroup, deleteGroup, deleteUserFromGroup } = useGroups();
    const { email } = useIsLogged();

    const [group, setGroup] = useState<Group_extended | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGroup = async (): Promise<Group_extended | null> => {
            setLoading(true);
            setError(null);
            try {
                const groupData = await getGroup(id);
                if (groupData) {
                    setGroup(groupData);
                    return groupData;
                } else {
                    setError('Group data is undefined.');
                    return null;
                }
            } catch {
                setError('Failed to fetch group data.');
                return null;
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchGroup();
        } else {
            setError('Invalid group ID.');
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!group) {
        return <div>No group found</div>;
    }
    console.log(group.role);
    
    return (
        <>
            <TableGroup group={group} />
            <div className="flex justify-center mt-4 buttons">
                {group.role === 'writer' && 
                <AlertDialog>
                <AlertDialogTrigger className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Borrar grupo </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Si borras el grupo, toda la información del grupo se perderá de forma permanente.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 hover:bg-red-700 text-white font-bold" onClick={async ()=> {
                            await deleteGroup(id)
                            window.location.href = '/home'
                        }} >Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>              
                }

                <AlertDialog>
                <AlertDialogTrigger className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Salir del grupo </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Si sales del grupo, perderás el acceso a la información del grupo de forma permanente.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 hover:bg-red-700 text-white font-bold" onClick={
                            async ()=> {
                                await deleteUserFromGroup(id, email)
                                window.location.href = '/home'
                            }
                        } >Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>  
            </div>
        </>
    );
};

export default Group;

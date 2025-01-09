import React, { useCallback, useEffect, useState } from 'react';
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
import 'ldrs/ring'


const Group: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || '';
    const { getGroup, deleteGroup, deleteUserFromGroup } = useGroups();
    const { email } = useIsLogged();

    const [group, setGroup] = useState<Group_extended | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGroup = useCallback(async (id:string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const groupData = await getGroup(id);
            if (groupData) {
                setGroup(groupData);
            } else {
                setError('Group data is undefined.');
            }
        } catch {
            setError('Failed to fetch group data.');
        } finally {
            setLoading(false);
        }
    }, [id, getGroup]);
    
    useEffect(() => {
        if (id) {
            fetchGroup(id);
        } else {
            setError('Invalid group ID.');
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) {
        return <div className='w-full h-screen flex justify-center items-center'>  
        <l-ring
          size="40"
          stroke="5"
          bg-opacity="0"
          speed="2"
          color="black" 
        ></l-ring></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!group) {
        return <div>No group found</div>;
    }
    console.log(group.role);
    
    return (
        <div className="flex flex-col items-center gap-12 w-full p-5 max-h-fit m-0">
            <TableGroup group={group} fetchGroup={fetchGroup}  />
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
        </div>
    );
};

export default Group;

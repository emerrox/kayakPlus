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
} from '@/components/ui/alert-dialog';
import useIsLogged from '@/contexts/useIsLogged';
import { Oval } from 'react-loader-spinner';

const Group: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || '';
  const { getGroup, deleteGroup, deleteUserFromGroup } = useGroups();
  const { email } = useIsLogged();

  const [group, setGroup] = useState<Group_extended | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroup = useCallback(
    async (id: string): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const groupData = await getGroup(id);
        if (groupData) {
          setGroup(groupData);
        } else {
          setError('Group data is undefined.');
        }
      } catch (err) {
        setError('Failed to fetch group data.' + err);
      } finally {
        setLoading(false);
      }
    },
    [getGroup]
  );

  useEffect(() => {
    if (id) {
      fetchGroup(id);
    } else {
      setError('Invalid group ID.');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Oval
          visible={true}
          height={80}
          width={80}
          color="#4fa94d"
          ariaLabel="oval-loading"
        />
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center w-screen h-screen">{error}</div>;
  }

  if (!group) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        No se encontró el grupo.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-12 w-full p-5 max-h-fit m-0">
      <TableGroup group={group} fetchGroup={fetchGroup} />
      <div className="flex justify-center mt-4">
        {group.role === 'writer' && (
          <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
              Borrar grupo
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Si borras el grupo, toda la información se perderá de forma permanente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-700 text-white font-bold"
                  onClick={async () => {
                    await deleteGroup(id);
                    window.location.href = '/home';
                  }}
                >
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        <AlertDialog>
          <AlertDialogTrigger className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
            Salir del grupo
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Si sales del grupo, perderás el acceso a toda su información.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-700 text-white font-bold"
                onClick={async () => {
                  await deleteUserFromGroup(id, email);
                  window.location.href = '/home';
                }}
              >
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Group;

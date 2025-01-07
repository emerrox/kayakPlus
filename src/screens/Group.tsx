import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useGroups from '@/integration/useGroups';
import { Group_extended } from '../types';
import TableGroup from '@/components/TableGroup';

const Group: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || '';
    const { getGroup } = useGroups();

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
        <TableGroup group={group} />
    );
};

export default Group;

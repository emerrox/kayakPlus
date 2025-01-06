import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useGroups from '@/integration/useGroups';
import Sidebar from '@/layout/Sidebar';
import MainLayout from '@/layout/MainLayout';

const Group: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || '';
    const { getGroup } = useGroups();

    const [group, setGroup] = useState<{ name: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGroup = async () => {
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

    return (
        <Sidebar>
            <MainLayout>    
                <div className="container">
                    <h3>{group.name}</h3>
                </div>
            </MainLayout>
        </Sidebar>
    );
};

export default Group;

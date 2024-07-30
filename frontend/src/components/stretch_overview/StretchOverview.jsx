import React from 'react'
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Sidebar from './Sidebar';
import StretchCard from './StretchCard';
import { GET_MUSCLE_GROUPS } from '../../queries/muscleGroupQueries';



function StretchOverview({ muscleGroup }) {
    const { loading, error, data } = useQuery(GET_MUSCLE_GROUPS);
    
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    if (loading) return <p>Loading...</p>;// <Spinner />; // TODO: improve
    if (error) return <p>Something went wrong</p>;
    
    muscleGroup = data.muscleGroups[0]; // Hardcoded for testing
    
    const styles = {
        stretchOverview: {
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            height: '100%',
            overflow: 'hidden',
            alignItems: 'center',
            padding: '0',
            backgroundColor: '#fff',
            margin: '0'
        },
        mainContent: {
            display: 'flex',
            height: '100%',
            overflow: 'hidden',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1200px',
            padding: '20px',
        },
    };

    return (
        <div style={styles.stretchOverview}>

            {/* Sidebar, TODO: add props */}
            <Sidebar muscleGroup={muscleGroup}/>

            {/* Main Content */}
            <main style={styles.mainContent}>

                {/* Stretch Cards, TODO: add props 
                <StretchCard />
                <StretchCard />
                <StretchCard />
                <StretchCard />
                */}

                {/* Start routine button*/}
            </main>

        </div>
    )
}

export default StretchOverview
 
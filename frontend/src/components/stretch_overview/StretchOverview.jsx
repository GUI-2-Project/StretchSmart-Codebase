import React from 'react'
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Sidebar from './Sidebar';
import StretchCard from './StretchCard';
import { GET_MUSCLE_GROUPS } from '../../queries/muscleGroupQueries';



function StretchOverview({ muscleGroup }) {
    const { loading, error, data } = useQuery(GET_MUSCLE_GROUPS);   // TODO: change to load stretch by id
    
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    if (loading) return <p>Loading...</p>;// <Spinner />; // TODO: improve
    if (error) return <p>Something went wrong</p>;
    
    muscleGroup = data.muscleGroups[0]; // Hardcoded for testing
    
    const styles = {
        stretchOverview: {
            display: 'flex',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            alignItems: 'center',
            padding: '0',
            backgroundColor: '#fff',
            margin: '0'
        },
        mainContent: {
            display: 'flex',
            backgroundColor: '#f0f0f0',
            overflow: 'hidden',
            justifyContent: 'space-evenly',
            alignItems: 'space-evenly',
            height: '100%',
            width: '100%',
            padding: '20px',
        },
    };

    return (
        <div style={styles.stretchOverview}>
            <Sidebar muscleGroup={muscleGroup}/>
            <main style={styles.mainContent}>
                {muscleGroup.stretches.map((stretchID) => (     // TODO: limit to 4
                    <StretchCard key={stretchID} stretchID={stretchID} />
                ))}
                {/* Start routine button*/}
            </main>
        </div>
    )
}

export default StretchOverview
//TODO: rename muscle group overview

import React from 'react'
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Sidebar from './Sidebar';
import StretchCard from './StretchCard';
import { GET_MUSCLE_GROUP_BYNAME } from '../../queries/muscleGroupQueries';
import StretchRoutine from './StretchRoutine';
import {useLocation} from 'react-router-dom';


function StretchOverview() {

    // accept 'muscleName' arg from previous page
    const location = useLocation();
    const muscleName = location.state.muscleName;   


    const { loading, error, data } = useQuery(GET_MUSCLE_GROUP_BYNAME, {
                                              variables: {name: muscleName},
                                     });
    
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    if (loading) return <p>Loading...</p>;// <Spinner />; // TODO: improve
    if (error) return <p>Something went wrong</p>;
    
    const muscleGroup = data.muscleGroupByName; // Hardcoded for testing
    
    const styles = {
        stretchOverview: {
            display: 'flex',
            width: '100%',
            height: '100%',
            //overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
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
                {muscleGroup.stretches.map((stretch) => (     // TODO: limit to 4
                    <StretchCard key={stretch._id} stretch={stretch} />
                ))}
                {/* Start routine button*/}
            </main>
        </div>
    )
}

export default StretchOverview
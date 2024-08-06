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
    
    const [routine, setRoutine] = useState(false);
    const startRoutine = () => setRoutine(true);
    const endRoutine = () => setRoutine(false);


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
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
            columnGap: '50px',
            rowGap: '50px',
            backgroundColor: '#f0f0f0',
            height: '100%',
            width: '100%',
            padding: '50px',
        },
        button: {
            position: 'fixed',
            width: '175px',
            height: '75px',
            padding: '20px',
            margin: '10px',
            bottom: '100px',
            right: '150px',
        }
    };

    return (
        <>
        { routine ? (
            <>
                <button className='btn btn-primary' style={styles.button} onClick={endRoutine}>End Routine</button>
                <StretchRoutine muscleGroup={muscleGroup}/>
            </>
        ) : (
            <div style={styles.stretchOverview}>
                <Sidebar muscleGroup={muscleGroup}/>
                <main style={styles.mainContent}>
                    {muscleGroup.stretches.map((stretch) => (     // TODO: limit to 4
                        <StretchCard key={stretch._id} stretch={stretch} />
                    ))}
                <button className='btn btn-primary' style={styles.button} onClick={startRoutine}>Start Routine</button>
                </main>
            </div>
        )}
        </>
    )
}

export default StretchOverview
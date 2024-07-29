import React from 'react'
import { gql, useQuery } from '@apollo/client'


const GET_STRETCHES = gql`
    query GetStretches {
        stretches {
            id
            title
            description
            goodFor
            badFor
            imageURL
            instructions
        }
    }
`;  


const Stretches = () => {

    const stretches = useQuery(GET_STRETCHES);
    let loading = stretches.loading;
    let error = stretches.error;
    let data = stretches.data;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <>
            { !loading && !error && data.stretches.map((stretch, index) => (stretch.id))}
        </>
    )
}

export default Stretches
// TODO: reformat to for consistncy
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_STRETCHES } from '../../queries/stretchQueries';
import StretchRow from './StretchRow';
import AddStretchMod from './AddStretch';

// Acceptes stretches object as prop, 
// or queries backend for stretches if no prop is provided
export default function Stretches({ stretches, handleAddStretch }) {

  const [isAddStretchOpen, setIsAddStretchOpen] = useState(false);
  const openAddStretchModal = () => setIsAddStretchOpen(true);
  const closeAddStretchModal = () => setIsAddStretchOpen(false);
  
  // if no valid "stretches" prop, query backend from here
  if (typeof stretches != 'object') {
    stretches = useQuery(GET_STRETCHES);

    // guard for failed query
    if (stretches.loading) return <p>Loading...</p>;// <Spinner />; // TODO: improve
    if (stretches.error) return <p>Something Went Wrong</p>;
  };

  const styles = {
    questions: {
      display: 'flex',
    },
    table: {
      width: '90%',
      margin: 'auto',
      marginTop: '20px',
      padding: '10px',
      border: '1px solid #ccc',
      textAlign: 'center',
      verticalAlign: 'middle',
    },
    tableTitle: {
      textAlign: 'center',
      margin: '20px',
      fontSize: 'x-large',
      fontWeight: 'bold',
    },
    buttonRow: {
      height: '65px',
    }
  }
  
  return (
    <div>
      {/* Table */}
      {!stretches.loading && !stretches.error && (
        <table className='table table-hover mt-3' style={styles.table}>
          <thead>
            <tr>
              <th colSpan='9' style={styles.tableTitle}>Stretches</th>
            </tr>
            <tr>
              <th>Unique ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Good For</th>
              <th>Bad For</th>
              <th>Images</th>
              <th>ImageURL</th>
              <th>Instructions</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            {stretches.data.stretches.map((stretch) => (
                <StretchRow key={stretch._id} stretch={stretch} />
            ))}
            <tr>
              <td style={styles.buttonRow}>
                {/* Add new content button */}
                <button className='btn btn-primary' onClick={openAddStretchModal}>Add New Stretch</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <AddStretchMod isOpen={isAddStretchOpen} onClose={closeAddStretchModal} handleAddStretch={handleAddStretch} />
    </div>
  );
}

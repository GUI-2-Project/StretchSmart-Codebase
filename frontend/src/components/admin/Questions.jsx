// TODO: reformat to for consistncy

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_QUESTIONS } from '../../queries/questionQueries';
import QuestionRow from './QuestionRow';

export default function Questions({ questions, handleAddQuestion }) {
  const loading = false;
  const error = false;
  if (!questions) {
    const { loading, error, data } = useQuery(GET_QUESTIONS);

    // guard for failed query
    if (loading) return <p>Loading...</p>;// <Spinner />; // TODO: improve
    if (error) return <p>Something Went Wrong</p>;

    questions = data.questions;
  }


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
      {!loading && !error && (
        <table className='table table-hover mt-3'style={styles.table}>
          <thead>
            <tr>
              <th colSpan='4' style={styles.tableTitle}>Questions</th>
            </tr>
            <tr>
              <th>Unique ID</th>
              <th>Question</th>
              <th>Options</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
                <QuestionRow key={question._id} question={question}/>
            ))}
            <tr>
              <td style={styles.buttonRow}>
                {/* Add new content button */}
                <button className='btn btn-primary' onClick={handleAddQuestion}>Add New Question</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
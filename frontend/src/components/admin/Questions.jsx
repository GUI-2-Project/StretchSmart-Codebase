// TODO: reformat to for consistncy

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_QUESTIONS } from '../../queries/questionQueries';
import QuestionRow from './QuestionRow';

export default function Questions({ handleAddQuestion }) {
  const { loading, error, data } = useQuery(GET_QUESTIONS);

  // guard for failed query
  if (loading) return <p>Loading...</p>;// <Spinner />; // TODO: improve
  if (error) return <p>Something Went Wrong</p>;

  return (
    <div>
      {!loading && !error && (
        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Question</th>
              <th>Options</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.questions.map((question) => (
                <QuestionRow key={question._id} question={question}/>
            ))}
          </tbody>
        </table>
      )}
      {/* Add new content button */}
      <button className='btn btn-primary' onClick={handleAddQuestion}>Add New Question</button>
    </div>
  );
}

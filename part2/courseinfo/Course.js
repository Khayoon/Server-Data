/*Separate module for the Course component The key prop is used to give each course a unique key,
 as it is necessary for React to keep track of each course when rendering a list.*/
import React from 'react';

const Course = ({ course }) => {
  /*reduce method to calculate the sum of exercises. The reduce method takes an initial 0 for the accumulator 
  adds each part's exercise count to the accumulator as it iterates over the array of parts.
  The final value of the accumulator is then returned and used to render the total.*/
  const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <p key={part.id}>{part.name} {part.exercises}</p>
      ))}
      <p><b>Total of {total} exercises</b></p>
    </>
  );
};

export default Course;




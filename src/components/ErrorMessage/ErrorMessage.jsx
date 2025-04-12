import React from 'react'
import s from './ErrorMessage.module.css'
const ErrorMessage = ({query}) => {
  return (
    <div className={s.errorMessage}>
      <h1>Oops! Nothing found for "<span className={s.query}>{query}</span>"</h1>
      <p>Even our best search gnomes came back empty-handed 🧙‍♂️</p>
    </div>
  );
};

export default ErrorMessage

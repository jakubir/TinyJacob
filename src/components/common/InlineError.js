import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function InlineError({ error }) {

  if (error !== '')
    return (
      <span className="text-red-500"><FontAwesomeIcon icon={faTriangleExclamation} /> {error} <FontAwesomeIcon icon={faTriangleExclamation} /></span>
    );
  else 
    return (
      <span></span>
    );      
}

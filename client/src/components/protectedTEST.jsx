import React from 'react';
import { Message } from 'semantic-ui-react';

const ProtectedTEST = () => {
  
  return (
  <Message info>
    <Message.Header>You've been logged in.</Message.Header>
    <p>The rest of the site is under construciton.</p>
  </Message>
  )
  };

export default ProtectedTEST;

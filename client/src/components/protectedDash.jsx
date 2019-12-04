import React from 'react';
import { Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
const ProtectedTEST = () => {
  return <Redirect to="/dashboard" />;
};

export default ProtectedTEST;

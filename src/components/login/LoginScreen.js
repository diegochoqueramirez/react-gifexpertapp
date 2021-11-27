import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';

export const LoginScreen = ({ history }) => {
  const { dispatch } = useContext(AuthContext);
  const path = localStorage.getItem('lastPath');

  const handleLogin = () => {
    // history.push('/');
    dispatch({
      type: types.login,
      payload: {
        name: 'Diego',
      },
    });
    
    history.replace(path);
  };

  return (
    <div className='container mt-5'>
      <h1>Login Screen</h1>
      <hr />
      <button className='btn btn-primary' onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
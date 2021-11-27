import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegister } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [{ name, email, password, password2 }, handleInputChange] = useForm({
    name: 'Marcelo',
    email: 'diego123@gmail.com',
    password: '123456',
    password2: '123456',
  });

  const handleRegister = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      dispatch(startRegister(email, password, name))
    }
  };

  const isValidForm = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('email is not valid'));
      return false;
    } else if (password !== password2 || password.length < 6) {
      dispatch(
        setError(
          'the password should be at least 6 characters and match each other'
        )
      );
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className='auth__title'>Register</h3>

      <form onSubmit={handleRegister} className='animate__animated animate__fadeIn animate__faster'>
        {msgError && <div className='auth__alert-error'>{msgError}</div>}
        <input
          className='auth__input'
          autoComplete='off'
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={handleInputChange}
        />
        <input
          className='auth__input'
          autoComplete='off'
          type='text'
          placeholder='Email'
          name='email'
          value={email}
          onChange={handleInputChange}
        />
        <input
          className='auth__input'
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleInputChange}
        />
        <input
          className='auth__input'
          type='password'
          placeholder='Confirm'
          name='password2'
          value={password2}
          onChange={handleInputChange}
        />
        <button className='btn btn-primary btn-block mb-5' type='submit'>
          Register
        </button>

        <Link className='link' to='/auth/login'>
          Already registered?
        </Link>
      </form>
    </>
  );
};

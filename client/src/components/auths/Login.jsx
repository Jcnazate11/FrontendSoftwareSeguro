import React, { useState } from 'react';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// Datos quemados de usuarios para autenticación
const mockUsers = [
  { username: 'admin', password: 'admin123' },
  { username: 'user1', password: 'password1' },
  { username: 'elonmusk', password: 'spacex2024' },
];

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const loginSuccessful = () => {
    toast.success('Logged in Successfully!', { autoClose: 1000 });

    setTimeout(() => {
      setAuth(true);
    }, 1500);
  };

  const loginFailed = () => {
    toast.error('Invalid username or password!', { autoClose: 1000 });
  };

  const { username, password } = inputs;

  const onSubmit = (e) => {
    e.preventDefault();

    // Verificar si el usuario existe en los datos quemados
    const userExists = mockUsers.some(
      (user) => user.username === username && user.password === password
    );

    if (userExists) {
      localStorage.setItem('token', 'fake-jwt-token');
      loginSuccessful();
    } else {
      loginFailed();
    }
  };

  return (
    <div className='flex flex-col h-auto w-[620px] border rounded-md shadow-md mx-auto my-52 justify-center flex-wrap border-t-4 border-t-red-500'>
      <ToastContainer />
      <div className=''>
        <div className='flex justify-between items-center px-8 pt-6 pb-2'>
          {/* GREETINGS */}
          <div>
            <h1 className='text-xl font-semibold'>Welcome back</h1>
            <small className='text-gray-400'>
              Welcome back! Please enter your details
            </small>
          </div>

          {/* BACK ARROW */}
          <div className='ml-8'>
            <Link to='/'>
              <ArrowBackIosNew />
            </Link>
          </div>
        </div>

        <form onSubmit={onSubmit} className='bg-white px-8 pt-6 pb-8'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
              Username
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              placeholder='Username'
              name='username'
              value={username}
              onChange={onChange}
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='******************'
              name='password'
              value={password}
              onChange={onChange}
            />
          </div>
          <div className='flex flex-col items-center justify-between gap-5'>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
              type='submit'
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

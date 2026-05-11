import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './Login.css';
import facturacionLogo from '../assets/facturacion.png';

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      token
      user {
        username
        displayName
        email
        description
      }
    }
  }
`;

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.login.success) {
        localStorage.setItem('token', data.login.token);
        localStorage.setItem('user', JSON.stringify(data.login.user));

        setError('');
        if (onLoginSuccess) {
          onLoginSuccess(data.login.user);
        }
      }
    },
    onError: (loginError) => {
      console.error('Error en login:', loginError);
      setError(loginError.message.replace('Error: ', '') || 'Error al iniciar sesión');
      setPassword('');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor ingrese usuario y contraseña');
      return;
    }

    try {
      await login({
        variables: {
          input: {
            username,
            password
          }
        }
      });
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <img src={facturacionLogo} alt="Facturación" className="logo-image" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              <span>{error}</span>
            </div>
          )}

          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Usuario"
            disabled={loading}
            required
            autoComplete="username"
            autoFocus
            className="form-input"
          />

          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Contraseña"
              disabled={loading}
              required
              autoComplete="current-password"
              className="form-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              <>
                <div className="login-button-spinner"></div>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

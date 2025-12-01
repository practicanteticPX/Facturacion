import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './Login.css';
import logoPrexxa from '../assets/Prexxa.png';

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

/**
 * Login Component
 * @param {Object} props
 * @param {Function} props.onLoginSuccess - Callback ejecutado al autenticarse exitosamente
 */
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
    onError: (error) => {
      console.error('Error en login:', error);
      setError(error.message.replace('Error: ', '') || 'Error al iniciar sesión');
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

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-card">
          <div className="login-logo">
            <img src={logoPrexxa} alt="Prexxa" />
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="username">Usuario</label>
              <div className="login-input-wrapper">
                <input
                  type="text"
                  id="username"
                  className="login-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Usuario"
                  disabled={loading}
                  autoComplete="username"
                  autoFocus
                />
              </div>
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="login-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error-message">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
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
    </div>
  );
}

export default Login;

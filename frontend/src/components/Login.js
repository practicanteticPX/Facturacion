import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './Login.css';

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
      <div className="login-box">
        <div className="login-header">
          <h1>Sistema de Control de Facturas</h1>
          <p>Prexxa - Administración y Finanzas</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="usuario.dominio"
              disabled={loading}
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-footer">
          <p>Acceso restringido - Solo personal autorizado</p>
          <small>Use sus credenciales de Active Directory</small>
        </div>
      </div>
    </div>
  );
}

export default Login;

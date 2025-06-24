import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../redux/slices/authSlice';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      return;
    }

    dispatch(loginUser({ username, password }));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister);
    handleClearError();
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{showRegister ? 'Register' : 'Login'}</h2>
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={handleClearError} className="close-error">×</button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Loading...' : (showRegister ? 'Register' : 'Login')}
          </button>
        </form>

        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p>Username: emilys</p>
          <p>Password: emilyspass</p>
        </div>

        <div className="toggle-form">
          {/* <p>
            {showRegister ? 'Already have an account?' : "Don't have an account?"}
            <button onClick={toggleRegister} className="toggle-btn">
              {showRegister ? 'Login' : 'Register'}
            </button>
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
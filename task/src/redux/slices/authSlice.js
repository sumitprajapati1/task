import { createSlice } from '@reduxjs/toolkit';

const getTokenFromStorage = () => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    return null;
  }
};

const initialState = {
  user: null,
  token: getTokenFromStorage(),
  isLoggedIn: !!getTokenFromStorage(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;


export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());

  try {
    
    const body = {
      ...credentials,
      expiresInMins: credentials.expiresInMins || 30
    };

    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(loginSuccess({
        user: data,
        token: data.token 
      }));
    } else {
      dispatch(loginFailure(data.message || 'Login failed'));
    }
  } catch (error) {
    dispatch(loginFailure('Network error. Please try again.'));
  }
};

export default authSlice.reducer;
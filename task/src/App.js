import React from 'react';
import { useSelector } from 'react-redux';
import Login from "./Components/Login.js";
import ProductList from './Components/ProductList.js';
import './App.css';

function App() {
  // Get authentication state from Redux store
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="App">
      {isLoggedIn ? <ProductList /> : <Login />}
    </div>
  );
}

export default App;
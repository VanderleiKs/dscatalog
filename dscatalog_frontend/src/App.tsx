import React from 'react';
import './core/assets/style/custom.scss';
import './app.scss';
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <>
    <ToastContainer />
    <Routes />
  </>

);

export default App;

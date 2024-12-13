import React from 'react';
import logo from '../assets/96x96.png';

const Header: React.FC = () => (
  <header>
    <img src={logo} alt="Logo" />
    <h1>EasyPatientsManager</h1>
    <button>Login/Logout</button>
    <button>Close</button>
  </header>
);

export default Header;
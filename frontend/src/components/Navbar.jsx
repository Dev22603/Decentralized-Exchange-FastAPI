import React from 'react';
import { signOut } from 'supertokens-auth-react/recipe/session';

export default function Navbar() {
  const handleLogout = async () => {
    await signOut();
    window.location.href = '/auth';
  };
  return (
    <header className="header">
      <span className="title">AMM Exchange</span>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
} 
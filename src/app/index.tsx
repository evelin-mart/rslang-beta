import './index.scss';
import React from 'react';
import { withProviders } from './providers';
import { Routing } from 'pages';
import { AuthModal } from 'pages/user/auth-modal';
import { useOverflowObserver } from '../shared/lib/hooks/overflow';

const App = () => {
  useOverflowObserver();

  return (
    <>
      <AuthModal />
      <div className="app">
        <Routing />
      </div>
    </>
  );
}

export default withProviders(<App />);

import React from 'react'
import { Provider } from 'react-redux';
import { store } from 'app/store';

export const withStore = (component: JSX.Element) => (
  <Provider store={store}>   
    {component}
  </Provider>
);

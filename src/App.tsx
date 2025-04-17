import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './store/store';
import Bootstrap from './bootstrap';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Bootstrap>
          <AppNavigator />
        </Bootstrap>
      </PersistGate>
    </Provider>
  );
}

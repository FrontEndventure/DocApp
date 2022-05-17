import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;

import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import {Loading} from './components';
import {LogBox} from 'react-native'

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  console.log('state global: ', stateGlobal);
  LogBox.ignoreLogs([''])
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;

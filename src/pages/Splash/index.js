/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ILLogo} from '../../assets';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('GetStarted')
    }, 3000);
    
  }, [])
  
  return (
    <View
      style={styles.page}>
      <ILLogo />
      <Text
        style={styles.title}>
        My Doctor
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '600',
        fontSize: 20,
        color: '#112340',
        marginTop: 20,
      },
});

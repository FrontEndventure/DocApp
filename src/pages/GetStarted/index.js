/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View, BackHandler, Alert} from 'react-native';
import {ILGetStarted, ILLogo} from '../../assets';
import {Button, Gap} from '../../components';
import { colors } from '../../utils';

const GetStarted = ({navigation}) => {

  

  return (
    <ImageBackground source={ILGetStarted} style={styles.page}>
      <View>
        <ILLogo />
        <Text style={styles.title}>
          Konsultasi dengan dokter jadi lebih mudah & fleksibel
        </Text>
      </View>

      <View>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('Register')}
        />
        <Gap height={16} />
        <Button
          title="Sign in"
          type="secondary"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.white
  },
  title: {
    marginTop: 91,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 28,
    color: colors.white,
  },
});
